const Router = require('koa-router');
const router = new Router();

router.post('/services/register', async (ctx) => {
  const { name, url } = ctx.request.body;
  if (!name || !url) {
    ctx.status = 400;
    ctx.body = { error: 'Missing required parameters' };
    return;
  }
  const existingService = ctx.services.find(service => service.name === name);
  if (existingService) {
    ctx.status = 400;
    ctx.body = { error: 'Service already registered' };
    return;
  }
  ctx.services.push({ ...ctx.request.body });
  ctx.status = 200;
  ctx.body = { message: 'Service registered successfully' };
});

module.exports = router;