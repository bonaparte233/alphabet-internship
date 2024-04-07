const Koa = require('koa');
const app = new Koa();
require('./config/database');

const k2c = require("koa2-connect")
const {createProxyMiddleware} = require('http-proxy-middleware');

app.context.services = []

const serviceRouter = require('./src/routes/services.js')
const bodyParser = require('koa-bodyparser');

// 自定义中间键
const verifyToken = require('./auth/token.js')
app.use(verifyToken)

app.use(async (ctx, next) => {
  const arr = ctx.path.split('/')
  if (ctx.path == '/services/register') {
    await next()
    return
  }
  const perfix = ['/album', '/image', '/playlist'].includes(`/${arr[1]}`) ? '/resource' : (['/track', '/stream'].includes(`/${arr[1]}`) ? '/stream' : `/${arr[1]}`)
  const targetService = ctx.services.find(item => item.perfix === perfix)
  if (targetService) {
    ctx.respond = false
    const targetAddr = `${targetService.url}:${targetService.port}`
    await k2c(
      createProxyMiddleware({
        target: targetAddr,
        changeOrigin: true,
        on: {
          'proxyReq': (proxyReq, req, res) => {
            if (ctx.state.user) {
              proxyReq.setHeader('X-Uid', ctx.state.user.uid);
            }
          }
        },
        parseReqBody: false
      })
    )(ctx, next);
  } else {
    await next()
  }
});

app.use(bodyParser())
app.use(serviceRouter.routes(), serviceRouter.allowedMethods())


// 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

app.listen(3000);

module.exports = app;
