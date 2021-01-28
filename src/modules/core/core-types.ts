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
  find(method: string, name: string): RouteHandler
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
