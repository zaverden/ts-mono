import koaRouter from 'koa-router'
import { Context, Middleware } from 'koa'

export { koaRouter as KoaRouter }

export function action<T>(handler: () => Promise<T>): Middleware
export function action<T, P1>(
  handler: (p1: P1) => Promise<T>,
  extractor: (ctx: Context) => [P1],
): Middleware
export function action<T, P1, P2>(
  handler: (p1: P1, p2: P2) => Promise<T>,
  extractor: (ctx: Context) => [P1, P2],
): Middleware
export function action<T, P1, P2, P3>(
  handler: (p1: P1, p2: P2, p3: P3) => Promise<T>,
  extractor: (ctx: Context) => [P1, P2, P3],
): Middleware

export function action<T>(handler: (...params: any[]) => Promise<T>, extractor?: (ctx: Context) => any[]): Middleware {
  return actionMiddleware((ctx) => {
    const params = extractor === undefined ? [] : extractor(ctx)
    return handler(...params)
  })
}

function actionMiddleware<T>(handler: (ctx: Context) => Promise<T>): Middleware {
  return async (ctx) => {
    try {
      ctx.body = await handler(ctx)
      ctx.status = 200
    } catch (err) {
      handleError(ctx, err)
    }
  }
}

function handleError(ctx: Context, err: any) {
  ctx.body = {
    name: err.name,
    msg: err.message,
  }
  ctx.status = err.status || 500
}
