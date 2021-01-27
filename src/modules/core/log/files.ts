import { appendFile } from 'fs'

const cb = () => 0

const createLogger = (filename: string) => (text: string) => {
  const path = `./log/${filename}`
  const content = `${(new Date).toLocaleString()}: ${text}\n`

  appendFile(path, content, cb)
}

export const logDBConnection = createLogger('db-connections.log')
