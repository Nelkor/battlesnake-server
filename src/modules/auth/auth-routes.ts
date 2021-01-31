import { register } from '@core/http-app/http-router'
import { jsonParse, success, error } from '@core/tools'

import { authentication, logOut, registration } from './auth'
import { getUserById } from './model/auth-model'

const authRoutes = register('auth')

authRoutes.get('whoami', async payload => {
  const { res, userId } = payload

  if (!userId) {
    success(res, {})

    return
  }

  const { id, name } = await getUserById(userId)

  success(res, { id, name })
})

authRoutes.post('log-in', async payload => {
  const { res, userId, body } = payload
  const authData = jsonParse(body.toString())

  if (userId) {
    error(res, 'you are already logged in')

    return
  }

  const name = String(authData['name'])
  const password = String(authData['password'])

  const user = await authentication(res, name, password)

  if (!user) {
    error(res, 'authentication failed')

    return
  }

  success(res, { id: user.id, name: user.name })
})

authRoutes.post('log-out', async payload => {
  const { res, body, userId, headers } = payload

  if (!userId) {
    error(res, 'you are not logged in')

    return
  }

  const mode = String(jsonParse(body.toString())['mode'])
  const token = String(headers.token)

  logOut(res, userId, token, mode)
  success(res)
})

authRoutes.post('reg', async payload => {
  const { res, userId, body } = payload
  const authData = jsonParse(body.toString())

  if (userId) {
    error(res, 'you are already logged in')

    return
  }

  const name = String(authData['name'])
  const password = String(authData['password'])

  const id = await registration(res, name, password)

  success(res, { id })
})
