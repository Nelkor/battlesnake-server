import { register } from '@core/http-app/http-router'
import { success } from '@core/http-app/http-answers'

const authRoutes = register('auth')

authRoutes.get('whoami', async payload => {
  success(payload.res, 'You rocks')
})
