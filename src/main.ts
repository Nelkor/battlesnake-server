import { startServer } from '@core/server'
import { connect } from '@core/db'

import '@/routes-aggregator'

connect()
  .then(startServer)
  .catch(() => console.error('connection to db failed'))
