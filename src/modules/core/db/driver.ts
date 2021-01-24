import { createConnection } from 'mysql2/promise'

export const test = async (): Promise<void> => {
  const connection = await createConnection({
    host: 'localhost',
    user: 'snake',
    password: 'battle',
    database: 'battlesnake',
  })

  const [rows] = await connection.query('SELECT * FROM `users`')

  if (!Array.isArray(rows)) {
    return
  }

  rows.forEach(row => console.log(row.id, row.name, row.nameHash))

  connection.end()
}
