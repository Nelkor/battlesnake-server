import { TokenData } from '@core/core-types'
import { TOKEN_LIFETIME } from '@core/config'

export const createToken = (id: number): string => {
  const secret = Array.from({ length: 6 })
    .map(() => Math.random().toString(36).slice(2))
    .reduce((acc, cur) => [...acc, ...cur], [])
    .map(char => Math.random() < .5 ? char.toUpperCase() : char)
    .join('')

  return `${id}_${secret}_${Date.now() + TOKEN_LIFETIME}`
}

export const parseToken = (token: string): TokenData => {
  const result = { id: 0, expires: 0 }
  const parts = token.split('_')

  if (parts.length != 3) {
    return result
  }

  const [id, , expires] = parts

  result.id = +id
  result.expires = +expires

  return result
}
