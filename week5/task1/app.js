const Koa = require('koa');
const Router = require('@koa/router');
const fs = require('fs');
const path = require('path');

const app = new Koa();
const router = new Router();

router.get('/stream/:track_id', async (ctx) => {
    const trackId = ctx.params.track_id;
    const filePath = path.join(__dirname, '/audio', `${trackId}.mp3`);
    if (fs.existsSync(filePath)) {
        ctx.type = 'audio/mpeg';
        ctx.body = fs.createReadStream(filePath);
    } else {
        ctx.status = 404;
        ctx.body = 'Audio file not found';
    }
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000/stream/track_id`);
});
