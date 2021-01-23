import { createServer } from 'http'

import { Db } from 'mongodb'
import { Server } from 'ws'

import { createRequestHandler } from '@core/server/http-app'
import { onRealtimeConnection } from '@core/server/ws-app'

export const startServer = (port: number, db: Db): void => {
  const onHttpRequest = createRequestHandler(db)

  const server = createServer(onHttpRequest)
  const wsServer = new Server({ server })

  wsServer.on('connection', onRealtimeConnection)

  server.listen(port)

  console.log(`Started at ${port} port`)
}
