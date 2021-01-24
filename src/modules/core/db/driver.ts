import { createConnection, Connection } from 'mysql2/promise'

import { User } from '@core/core-types'

let connection: Connection = null
let connectionPromise: Promise<void> = null

const connect = async (): Promise<void> => {
  try {
    connection = await createConnection({
      user: 'snake',
      password: 'battle',
      database: 'battlesnake',
    })
  } catch (e) {
    console.error('Connection to MariaDB failed')
  }
}

const queryArray = async <T>(sql: string): Promise<T[]> => {
  try {
    const [rows] = await connection.query(sql)

    return (Array.isArray(rows) ? rows : []) as T[]
  } catch (e) {
    console.log('Отсутствует подключение к СУБД!')

    if (!connectionPromise) {
      console.log('Процесса подключения тоже нет, запускаю...')

      connectionPromise = connect()
    }

    console.log('Есть процесс подключения, ждём...')

    await connectionPromise

    connectionPromise = null

    console.log('Готово!')


    // TODO сделать что-нибудь с повторением
    const [rows] = await connection.query(sql)

    return (Array.isArray(rows) ? rows : []) as T[]
  }
}

export const test = async (): Promise<void> => {
  const users = await queryArray<User>('SELECT * FROM `users`')

  users.forEach(user => console.log(user.id, user.name, user.nameHash))
}
