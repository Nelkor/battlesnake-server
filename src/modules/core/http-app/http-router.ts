import { /*ModuleRouter, */RequestPayload } from '@core/core-types'
//
// export const register = (name: string): ModuleRouter => {
// }

export const dispatch = (
  method: string,
  path: string[],
  payload: RequestPayload,
): void => {
  payload.res.write(JSON.stringify(path))
}
