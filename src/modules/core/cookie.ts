import { ServerResponse } from 'http'

import { ZERO_UTC } from '@core/config'

export const getToken = (cookie: string): string => {
  if (!cookie) {
    return ''
  }

  const match = /token=(\w+)/.exec(cookie)

  return match ? match[1] : ''
}

export const setToken = (res: ServerResponse, token: string): void => {
  const value = [
    `token=${token}`,
    'SameSite=Strict',
    'Path=/',
    'HttpOnly',
    'Secure',
  ].join('; ')

  res.setHeader('Set-cookie', value)
}

export const unsetToken = (res: ServerResponse): void => {
  res.setHeader('Set-cookie', `token=deleted; Path=/; Expires=${ZERO_UTC}`)
}
