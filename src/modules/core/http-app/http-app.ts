import { IncomingMessage, ServerResponse } from 'http'
import { parse } from 'querystring'

import { PATH_LIMIT, PATH_SKIP, MAX_BODY_SIZE } from '@core/config'
import { getToken } from '@core/cookie'
import { authorization } from '@auth/auth'

import { breakConnection } from './http-errors'
import { dispatch } from './http-router'

export const onHttpRequest = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  const { headers, method, url } = req
  const [pathString, queryString] = url.split('?')
  const params = parse(queryString)
  const token = getToken(headers.cookie)
  const userId = authorization(res, token)
  const contentLength = +headers['content-length']

  const path = pathString
    .split('/', PATH_LIMIT + PATH_SKIP)
    .slice(PATH_SKIP)
    .filter(Boolean)

  const hasBody = method == 'POST'
    && contentLength
    && contentLength <= MAX_BODY_SIZE

  const body = hasBody ? [] : null

  let bodySize = 0

  req.on('data', chunk => {
    bodySize += chunk.length

    if (!body || bodySize > MAX_BODY_SIZE) {
      breakConnection(req, res)

      return
    }

    body.push(chunk)
  })

  req.on('end', () => {
    if (res.writableEnded) {
      return
    }

    const payload = {
      res,
      headers,
      params,
      userId,
      body: body ? Buffer.concat(body) : null,
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8')

    dispatch(method, path, payload).then(() => res.end())
  })
}
