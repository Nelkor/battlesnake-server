import { IncomingHttpHeaders } from 'http'
import { ParsedUrlQuery } from 'querystring'

export type RequestPayload = {
  headers: IncomingHttpHeaders
  params: ParsedUrlQuery
  body?: Buffer
}

// асинхронный обработчик запросов
export type RouteHandler = (payload: RequestPayload) => Promise<void>

// register сохраняет fn по ключу name
export type ModuleRouter = {
  register(name: string, fn: RouteHandler): void
}

// register создаёт ModuleRouter и записывает его себе по ключу name
//
// dispatch находит ModuleRouter и RouteHandler по path
// и вызывает RouteHandler с аргументом payload
export type AppRouter = {
  register(name: string): ModuleRouter
  dispatch(path: string[], payload: RequestPayload): void
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
