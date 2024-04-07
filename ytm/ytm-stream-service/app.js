const Koa = require('koa');
const app = new Koa();
require('./config/database');
const path = require('path');
const axios = require('axios')
const trackRouters = require('./src/routes/track')
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
app.use(bodyParser())

app.use(trackRouters.routes(), trackRouters.allowedMethods());

app.use(static(path.join(__dirname, 'Libary')));



app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
});  


// 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

app.listen(3003).addListener('listening', async () => {
  const serverConfig = {
    name: 'streamService',
    url: 'http://127.0.0.1',
    port: 3003,
    perfix: '/stream'
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
