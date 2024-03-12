const Router = require('koa-router');
const router = new Router();
const path = require('path')
const fs = require('fs')
const mime = require('mime-types')

const Album = require('../models/playlistSchema').PlaylistIndex;

router.get('/image/:album_id', async (ctx) => {
  const album = await Album.findOne({ pid: ctx.params.album_id, type: 'album' });
  if (album && album.image) {
    const filePath = path.join(__dirname, '../../Libary/' + album.image)
    let file = null
    try {
      file = fs.readFileSync(filePath)
      let mimeType = mime.lookup(filePath)
      ctx.set('content-type', mimeType);
      ctx.body = file
    } catch (e) {
      console.log('err', e)
      ctx.body = null
    }
  } else {
    ctx.body = null
  }
});

module.exports = router