import { startServer } from '@core/server/entry'
import { test } from '@core/db/driver'

Promise.all([
  test(),
  test(),
]).then(startServer)
