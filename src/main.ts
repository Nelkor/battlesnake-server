import { startServer } from '@core/server/entry'
import { connect } from '@core/db/driver'

connect().then(startServer)
