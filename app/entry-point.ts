import koa from 'koa'
import { action, KoaRouter } from '@ts-mono/koaster/action'
import { log } from './helpers/logger'

const app = new koa()
app.use(async (ctx, next) => {
  await next()
  log({ path: ctx.path, method: ctx.method, status: ctx.status })
})

const router = new KoaRouter({ prefix: '/api/v1' })
router.get('/user/:id', action(getUser, ({ params }) => [params.id]))

app.use(router.routes())
app.use(router.allowedMethods())

async function getUser(id: string) {
  return { id, createdAt: new Date() }
}

const { PORT = 3003 } = process.env
app.listen(PORT)
log(`http://localhost:${PORT}/api/v1/user/testing-id`)
