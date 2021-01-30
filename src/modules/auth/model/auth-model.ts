import { createHash } from 'crypto'

import { User } from '@core/core-types'
import { queryData } from '@core/db'

import userByNameHash from './queries/user-by-name-hash.sql'
import userById from './queries/user-by-id.sql'

const hashName = (name: string): number => {
  const hashString = createHash('sha1')
    .update(name.toLowerCase())
    .digest('hex')
    .slice(0, 8)

  return parseInt(hashString, 16)
}

export const getUserByName = async (name: string): Promise<User> => {
  const nameHash = hashName(name)

  const [user] = await queryData<User>(userByNameHash, [nameHash])

  return user
}

export const getUserById = async (id: number): Promise<User> => {
  const [user] = await queryData<User>(userById, [id])

  return user
}
