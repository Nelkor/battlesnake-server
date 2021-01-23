import { connect } from '@core/db/driver'
import { startServer } from '@core/server/entry'

const PORT = 3063

connect().then(db => startServer(PORT, db))
