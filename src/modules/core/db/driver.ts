import { createConnection, Connection } from 'mysql2/promise'

import { User } from '@core/core-types'

import selectAllUsers from './select-all-users.sql'
import insertUser from './insert-user.sql'

let connection: Connection = null

export const connect = async (): Promise<void> => {
  try {
    connection = await createConnection({
      user: 'snake',
      password: 'battle',
      database: 'battlesnake',
    })

    // TODO писать в файл
    connection.on('end', () => console.log('Connection "end"'))
    connection.on('close', () => console.log('Connection "close"'))
    connection.on('error', () => console.log('Connection "error"'))
    connection.on('remove', () => console.log('Connection "remove"'))
  } catch (e) {
    console.error('Connection to MariaDB failed')
  }
}

const queryData = async <T>(
  sql: string,
  values: (string | number)[] = [],
): Promise<T[]> => {
  const [rows] = await connection.query(sql, values)

  return (Array.isArray(rows) ? rows : []) as T[]
}

const queryAction = async (
  sql: string,
  values: (string | number)[] = [],
): Promise<void> => {
  await connection.query(sql, values)
}

export const test = async (): Promise<User[]> => {
  const newUser = [
    Math.random().toString(36).slice(2),
    Math.round(Math.random() * 1e6),
    'default_password',
  ]

  await queryAction(insertUser, newUser)

  return queryData<User>(selectAllUsers)
}
