import { ServerResponse } from 'http'

import {
  TOKEN_RENEW_LIMIT,
  DEVICES_COUNT_LIMIT,
  EXPIRATION_CHECK_INTERVAL,
} from '@core/config'

import { User } from '@core/core-types'
import { createToken, parseToken } from '@core/token'
import { setToken, unsetToken } from '@core/cookie'
import { hashString } from '@core/tools'

import { getUserByName, addUser } from './model/auth-model'

const usersTokens: Map<number, string[]> = new Map

export const authorization = (
  res: ServerResponse,
  token: string,
): number => {
  if (!token) {
    return null
  }

  const now = Date.now()
  const { id, expires } = parseToken(token)
  const userTokens = usersTokens.get(id)

  if (!userTokens || expires < now || !userTokens.includes(token)) {
    unsetToken(res)

    return null
  }

  if (expires - now < TOKEN_RENEW_LIMIT) {
    const newToken = createToken(id)
    const index = userTokens.indexOf(token)

    userTokens.splice(index, 1)
    userTokens.push(newToken)

    setToken(res, newToken)
  }

  return id
}

export const authentication = async (
  res: ServerResponse,
  name: string,
  password: string,
): Promise<User> => {
  const user = await getUserByName(name)

  if (!user || user.password != hashString(user.name + password)) {
    return null
  }

  if (!usersTokens.has(user.id)) {
    usersTokens.set(user.id, [])
  }

  const tokens = usersTokens.get(user.id)
  const token = createToken(user.id)

  tokens.push(token)

  while (tokens.length > DEVICES_COUNT_LIMIT) {
    tokens.shift()
  }

  setToken(res, token)

  return user
}

export const registration = async (
  res: ServerResponse,
  name: string,
  password: string,
): Promise<number> => {
  const user = await getUserByName(name)

  if (user) {
    return null
  }

  const hashPassword = hashString(name + password)
  const id = await addUser(name, hashPassword)
  const token = createToken(id)

  usersTokens.set(id, [token])

  setToken(res, token)

  return id
}

export const logOut = (
  res: ServerResponse,
  userId: number,
  token: string,
  mode: string,
): void => {
  // Токен точно существует, т.к. клиент авторизован по нему
  const tokens = usersTokens.get(userId)
  const tokenIndex = tokens.indexOf(token)

  switch (mode) {
    case 'this':
      tokens.splice(tokenIndex, 1)

      unsetToken(res)

      break
    case 'all':
      usersTokens.delete(userId)

      unsetToken(res)

      break
    case 'others':
      tokens.length = 0
      tokens.push(token)

      break
  }
}

const expirationCheck = () => {
  const now = Date.now()

  usersTokens.forEach((tokens, key) => {
    const aliveTokens = tokens.filter(token => {
      const { expires } = parseToken(token)

      return now < expires
    })

    if (tokens.length == aliveTokens.length) {
      return
    }

    if (!aliveTokens.length) {
      usersTokens.delete(key)

      return
    }

    usersTokens.set(key, aliveTokens)
  })
}

setInterval(expirationCheck, EXPIRATION_CHECK_INTERVAL)
