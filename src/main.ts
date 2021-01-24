import { startServer } from '@core/server/entry'
import { test } from '@core/db/driver'

test().then(startServer)
