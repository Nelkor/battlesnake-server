import { IncomingHttpHeaders, ServerResponse } from 'http'
import { ParsedUrlQuery } from 'querystring'

export type RequestPayload = {
  res: ServerResponse,
  headers: IncomingHttpHeaders
  params: ParsedUrlQuery
  body?: Buffer
}

export type RouteHandler = (payload: RequestPayload) => Promise<void>

export type ModuleRouter = {
  get(name: string, fn: RouteHandler): void
  post(name: string, fn: RouteHandler): void
}

// register создаёт ModuleRouter и записывает его себе по ключу name
//
// dispatch находит ModuleRouter и RouteHandler по method + path
// и вызывает RouteHandler с аргументом payload
export type AppRouter = {
  register(name: string): ModuleRouter

  dispatch(
    method: string,
    path: string[],
    payload: RequestPayload,
  ): void
}


export type User = {
  id: number
  name: string
  nameHash: number
  password: string
}

export type TokenData = {
  id: number
  expires: number
}
