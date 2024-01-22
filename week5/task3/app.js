const Koa = require('koa');
const Router = require('@koa/router');
const path = require('path');
const stream = require('koa-stream');

const app = new Koa();
const router = new Router();

router.get('/stream/:track_id', async (ctx, next) => {
    const trackId = ctx.params.track_id;
    await stream.file(ctx, `${trackId}.mp3`, {root: path.join(__dirname, 'audio')});
});

app.use(router.routes()).use(router.allowedMethods());


app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000/stream/track_id`);
});
