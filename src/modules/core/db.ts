import { createConnection, Connection, ResultSetHeader } from 'mysql2/promise'

import { logDBConnection } from '@core/log'

let connection: Connection = null

export const connect = async (): Promise<void> => {
  connection = await createConnection({
    user: 'snake',
    password: 'battle',
    database: 'battlesnake',
  })

  logDBConnection('connected')

  // Проверяем, какие события приходят от объекта подключения
  connection.on('end', () => logDBConnection('event "end"'))
  connection.on('close', () => logDBConnection('event "close"'))
  connection.on('error', () => logDBConnection('event "error"'))
  connection.on('remove', () => logDBConnection('event "remove"'))
}

export const queryData = async <T>(
  sql: string,
  values: (string | number)[] = [],
): Promise<T[]> => {
  const [rows] = await connection.query(sql, values)

  return (Array.isArray(rows) ? rows : []) as T[]
}

export const queryAction = async (
  sql: string,
  values: (string | number)[] = [],
): Promise<ResultSetHeader> => {
  const [result] = await connection.query(sql, values)

  return result as ResultSetHeader
}
