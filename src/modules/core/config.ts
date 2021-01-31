export const PORT = 3063
export const PATH_LIMIT = 2
export const MAX_BODY_SIZE = 1024
export const ZERO_UTC = (new Date(0)).toUTCString()
export const DEVICES_COUNT_LIMIT = 3
export const TOKEN_LIFETIME = 1000 * 60 * 60 * 24 * 2
export const TOKEN_RENEW_LIMIT = TOKEN_LIFETIME - 1000 * 60 * 60 * 2
export const EXPIRATION_CHECK_INTERVAL = 1000 * 60 * 10
