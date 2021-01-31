import { startServer } from '@core/server'
import { connect } from '@core/db'
import { logExceptions } from '@core/log'

import '@/routes-aggregator'

connect()
  .then(startServer)
  .catch(() => console.error('connection to db failed'))

process.on('uncaughtException', error => logExceptions(error.message))
