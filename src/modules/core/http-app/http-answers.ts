import { ServerResponse } from 'http'

export const success = (res: ServerResponse, data: unknown): void => {
  res.write(JSON.stringify({ success: true, data }))
}

export const error = (res: ServerResponse, reason: string): void => {
  res.write(JSON.stringify({ success: false, reason }))
}
