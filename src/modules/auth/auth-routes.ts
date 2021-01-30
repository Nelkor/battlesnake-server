import { register } from '@core/http-app/http-router'
import { jsonParse, success, error } from '@core/tools'

import { authentication } from './auth'

const authRoutes = register('auth')

authRoutes.get('whoami', async payload => {
  success(payload.res, 'You rocks')
})

authRoutes.post('log-in', async payload => {
  const authData = jsonParse(payload.body.toString())

  const name = String(authData['name'])
  const password = String(authData['password'])

  const user = await authentication(payload.res, name, password)

  if (!user) {
    error(payload.res, 'authentication failed')

    return
  }

  success(payload.res, { id: user.id, name: user.name })
})

authRoutes.post('log-out', async payload => {
  success(payload.res, 'stub')
})

authRoutes.post('reg', async payload => {
  success(payload.res, 'stub')
})
