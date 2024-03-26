const Koa = require('koa');
const app = new Koa();
require('./config/database');
const koaJwt = require('koa-jwt')
const path = require('path');
// const router = require('koa-router')();
const albumRouters = require('./src/routes/album');
const playlistRouters = require('./src/routes/playlist');
const userRouters = require('./src/routes/user');
const trackRouters = require('./src/routes/track')
const imageRouters = require('./src/routes/image');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
app.use(bodyParser())
// 自定义中间键
const verifyToken = require('./auth/token.js')
app.use(verifyToken)

// app.use(async ctx => {
//     ctx.body = 'Hello World';
// });

app.use(albumRouters.routes(), albumRouters.allowedMethods());
app.use(imageRouters.routes(), albumRouters.allowedMethods());
app.use(playlistRouters.routes(), playlistRouters.allowedMethods());
app.use(trackRouters.routes(), trackRouters.allowedMethods());
app.use(userRouters.routes(), userRouters.allowedMethods());

app.use(static(path.join(__dirname, 'Libary')));



app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
});  


// 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

app.listen(3000);

module.exports = app;
