import { IncomingMessage, ServerResponse } from 'http'

const messages = {
  403: 'Forbidden',
}

const sendError = (res: ServerResponse, code: number): void => {
  res.statusCode = code
  res.statusMessage = messages[code]

  res.end()
}

export const breakConnection = (
  req: IncomingMessage,
  res: ServerResponse,
): void => {
  sendError(res, 403)

  req.destroy()
}
