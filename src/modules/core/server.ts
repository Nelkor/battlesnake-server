import { createServer } from 'http'

import { Server } from 'ws'

import { PORT } from '@core/config'
import { onHttpRequest } from '@core/http-app/http-app'
import { onRealtimeConnection } from '@core/ws-app/ws-app'

export const startServer = (): void => {
  const server = createServer(onHttpRequest)
  const wsServer = new Server({ server })

  wsServer.on('connection', onRealtimeConnection)
  server.listen(PORT)

  console.log(`Started at ${PORT} port`)
}
