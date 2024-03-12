const Router = require('koa-router');
const router = new Router();
const path = require('path')
const fs = require('fs')
const mime = require('mime-types')

const Track = require('../models/librarySchema').LibraryIndex;

router.get('/track/init', async (ctx) => {
  try {

    const track = new Track({
      track_id: '1',
      title: '偷看',
      artist: ['李汉颖'],
      album: '东方班得瑞',
      album_id: '1',
      genre: 'Blues',
      copyright: '李汉颖',
      length: '7:31',
      track_number: 0,
      quality: 'STD',
      file: '1.mp3'
    })

    track.save()
      ctx.body = {
          data: null,
          msg: 'Success'
      };
  } catch (err) {
      ctx.body = {
          err: 200,
          msg: "Success!"
      };
  }
});

router.get('/stream/:track_id', async (ctx) => {
  const track = await Track.findOne({ track_id: ctx.params.track_id });
  if (track && track.file) {
    const filePath = path.join(__dirname, '../../Libary/' + track.file)
    let file = null
    try {
      // file = fs.readFileSync(filePath)
      // let mimeType = mime.lookup(filePath)
      // ctx.set('content-type', 'audio/mp3');
      // ctx.body = file
      ctx.status = 200
      ctx.body = `http://127.0.0.1:3000/${track.file}`

    } catch (e) {
      console.log('err', e)
      ctx.body = null
    }
  } else {
    ctx.body = null
  }
});

router.get('/track', async (ctx) => {
  try {
    let params = {}
    if (ctx.query && ctx.query.album_id) {
      params.album_id = ctx.query.album_id
    }
        const tracks = await Track.find(params);
        ctx.body = {
            data: tracks,
            total: tracks.length
        };
    } catch (err) {
        ctx.body = {
            err: 201,
            msg: "Resource doesn't exist"
        };
    }
});

router.get('/track/:track_id', async (ctx) => {
    const track = await Track.findOne({ track_id: ctx.params.track_id });
    ctx.body = track;
});

router.put('/track/:track_id', async (ctx) => {
    const UserLibrary = require('../models/librarySchema').createUserLibraryModel(ctx.state.user.uid);
    await new UserLibrary({ type: 'track', id: ctx.params.track_id, added_date: Date.now() }).save();
    ctx.body = { message: 'Track added to collection' };
});

router.delete('/track/:track_id', async (ctx) => {
    const UserLibrary = require('../models/librarySchema').createUserLibraryModel(ctx.state.user.uid);
    await UserLibrary.deleteOne({ type: 'track', id: ctx.params.track_id });
    ctx.body = { message: 'Track removed from collection' };
});

module.exports = router