import { ServerResponse } from 'http'
import { createHash } from 'crypto'

export const jsonParse = <T>(source: string): T => {
  try {
    return JSON.parse(source) || Object.create(null)
  } catch (e) {
    return Object.create(null)
  }
}

export const success = (res: ServerResponse, data?: unknown): void => {
  res.write(JSON.stringify({ success: true, data }))
}

export const error = (res: ServerResponse, reason: string): void => {
  res.write(JSON.stringify({ success: false, reason }))
}

export const getCurrentTimestamp = (): number => Math.floor(Date.now() / 1000)

export const hashString = (str: string): string => createHash('sha1')
  .update(str)
  .digest('hex')
