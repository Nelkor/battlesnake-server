import { ServerResponse } from 'http'

import { User } from '@core/core-types'
import { TOKEN_RENEW_LIMIT, DEVICES_COUNT_LIMIT } from '@core/config'
import { createToken, parseToken } from '@core/token'
import { setToken, unsetToken } from '@core/cookie'

import { getUserByName } from './model/auth-model'

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

  if (!user || user.password != password) {
    return null
  }

  if (!usersTokens.has(user.id)) {
    usersTokens.set(user.id, [])
  }

  const tokens = usersTokens.get(user.id)
  const token = createToken(user.id)

  while (tokens.length > DEVICES_COUNT_LIMIT) {
    tokens.shift()
  }

  tokens.push(token)

  setToken(res, token)

  return user
}

// TODO протестировать
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

setInterval(expirationCheck, 1000 * 10)
