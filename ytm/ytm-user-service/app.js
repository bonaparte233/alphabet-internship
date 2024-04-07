const Koa = require('koa');
const app = new Koa();
require('./config/database');
const axios = require('axios')
const userRouters = require('./src/routes/user');
const bodyParser = require('koa-bodyparser');
app.use(bodyParser())

app.use(userRouters.routes(), userRouters.allowedMethods());

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
});  


// 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

// app.callback()

app.listen(3001).addListener('listening', async () => {
  const serverConfig = {
    name: 'userService',
    url: 'http://127.0.0.1',
    port: 3001,
    perfix: '/user'
  }
  try {
    const response = await axios.post('http://127.0.0.1:3000/services/register', serverConfig)
    const msg = `${serverConfig.name},${response.data.message}`
    console.log(msg)
  } catch (err) {
    const msg = `${serverConfig.name},${err.response.data.error}`
      console.log(msg)
  }
})

module.exports = app;
