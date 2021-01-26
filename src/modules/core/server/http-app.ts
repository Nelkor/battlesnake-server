import { IncomingMessage, ServerResponse } from 'http'
import { parse } from 'querystring'

import { PATH_LIMIT, MAX_BODY_SIZE } from '@core/config'
import { breakConnection } from '@core/server/http-errors'

import { test } from '@core/db/driver'

export const onHttpRequest = async (
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> => {
  const { headers, method, url } = req
  const [pathString, queryString] = url.split('?')

  const path = pathString.split('/', PATH_LIMIT).slice(1).filter(Boolean)
  const params = parse(queryString)

  // token, user...
  // const token = getToken(headers.cookie)

  // TODO delete
  const users = await test()

  const contentLength = +headers['content-length']

  const hasBody = method === 'POST'
    && contentLength
    && contentLength <= MAX_BODY_SIZE

  const body = hasBody ? [] : null

  let bodySize = 0

  const onData = chunk => {
    bodySize += chunk.length

    if (!body || bodySize > MAX_BODY_SIZE) {
      breakConnection(req, res)

      return
    }

    body.push(chunk)
  }

  const onEnd = () => {
    const payload = {
      headers,
      method,
      path,
      params,
      // user,
      body: body ? Buffer.concat(body) : null,
    }

    res.setHeader('Content-Type', 'text/plain; charset=utf-8')

    // TODO delete
    res.write(payload.method + '\n\n')
    users.forEach(user => res.write(`${user.id}: ${user.name}\n`))
    res.end()
  }

  req.on('data', onData)
  req.on('end', onEnd)
}
