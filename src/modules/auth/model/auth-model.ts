import { createHash } from 'crypto'

import { User } from '@core/core-types'
import { queryData } from '@core/db'

import usersByNameHash from './queries/users-by-name-hash.sql'

const hashName = (name: string): number => {
  const hashString = createHash('sha1')
    .update(name.toLowerCase())
    .digest('hex')
    .slice(0, 8)

  return parseInt(hashString, 16)
}

export const getUserByName = async (name: string): Promise<User> => {
  const nameHash = hashName(name)

  const [user] = await queryData<User>(usersByNameHash, [nameHash])

  return user
}
