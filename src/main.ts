import { startServer } from '@core/server'
import { connect } from '@core/db'

connect().then(startServer)
