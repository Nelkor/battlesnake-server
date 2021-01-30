import { ModuleRouter, RequestPayload, RouteHandler } from '@core/core-types'

import { error } from '../tools'

const moduleRouters: Map<string, ModuleRouter> = new Map

export const register = (name: string): ModuleRouter => {
  const getHandlers: Map<string, RouteHandler> = new Map
  const postHandlers: Map<string, RouteHandler> = new Map

  const moduleRouter: ModuleRouter = {
    get(name: string, fn: RouteHandler) {
      getHandlers.set(name, fn)
    },
    post(name: string, fn: RouteHandler) {
      postHandlers.set(name, fn)
    },
    find(method: string, name: string): RouteHandler {
      const store = {
        GET: getHandlers,
        POST: postHandlers,
      }[method]

      return store && store.get(name)
    },
  }

  moduleRouters.set(name, moduleRouter)

  return moduleRouter
}

export const dispatch = async (
  method: string,
  path: string[],
  payload: RequestPayload,
): Promise<void> => {
  if (path.length != 2) {
    error(payload.res, 'unexpected path length')

    return
  }

  const [moduleName, handlerName] = path
  const moduleRouter = moduleRouters.get(moduleName)

  if (!moduleRouter) {
    error(payload.res, 'unknown module')

    return
  }

  const routeHandler = moduleRouter.find(method, handlerName)

  if (!routeHandler) {
    error(payload.res, 'unknown method')

    return
  }

  await routeHandler(payload)
}
