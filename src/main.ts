import { startServer } from '@core/server/entry'
import { connect, test } from '@core/db/driver'

const bootstrap = () => {
  Promise.all([
    test(),
    test(),
  ]).then(startServer)
}

connect().then(bootstrap)
