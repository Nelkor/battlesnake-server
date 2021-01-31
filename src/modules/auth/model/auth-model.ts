import { User } from '@core/core-types'
import { queryData, queryAction } from '@core/db'
import { getCurrentTimestamp, hashString } from '@core/tools'

import userByNameHash from './queries/user-by-name-hash.sql'
import userById from './queries/user-by-id.sql'
import insertUser from './queries/insert-user.sql'

const hashName = (name: string): number =>
  parseInt(hashString(name.toLowerCase()).slice(0, 8), 16)

export const getUserByName = async (name: string): Promise<User> => {
  const nameHash = hashName(name)

  const [user] = await queryData<User>(userByNameHash, [nameHash])

  return user
}

export const getUserById = async (id: number): Promise<User> => {
  const [user] = await queryData<User>(userById, [id])

  return user
}

export const addUser = async (
  name: string,
  hashPassword: string,
): Promise<number> => {
  const now = getCurrentTimestamp()

  const values = [
    name,
    hashName(name),
    hashPassword,
    now,
    now,
  ]

  const result = await queryAction(insertUser, values)

  return result.insertId
}
