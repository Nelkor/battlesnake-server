import { ServerResponse } from 'http'

export const jsonParse = (source: string): unknown => {
  try {
    return JSON.parse(source) || Object.create(null)
  } catch (e) {
    return Object.create(null)
  }
}

export const success = (res: ServerResponse, data: unknown): void => {
  res.write(JSON.stringify({ success: true, data }))
}

export const error = (res: ServerResponse, reason: string): void => {
  res.write(JSON.stringify({ success: false, reason }))
}
