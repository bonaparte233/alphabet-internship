const Router = require('koa-router');
const router = new Router();
const nanoid = require('nanoid')
const mongoose = require('mongoose');

const Playlist = require('../models/playlistSchema').PlaylistIndex;

router.get('/playlist', async (ctx) => {
  try {
    let playlists = []
    let params = {
      type: 'playlist'
    }
    if (ctx.request.query._user) {
      console.log('headers', ctx.request.headers, ctx.state.user)
      const currentUid = ctx.request.headers["x-uid"]
      params['author'] = currentUid
      params['public'] = true
    } else {
      params['public'] = true
    }
    playlists = await Playlist.find(params).lean();
      ctx.body = {
          data: playlists,
          total: playlists.length
      };
    } catch (err) {
        ctx.body = {
            err: 201,
            msg: "Resource doesn't exist"
        };
    }
});

router.get('/playlist/:pid', async (ctx) => {
    const playlist = await Playlist.findOne({ pid: ctx.params.pid, type: 'playlist' });
    ctx.body = playlist;
});

router.post('/playlist', async (ctx) => {
  try {
    const currentUid = ctx.request.headers["x-uid"]
    const params = {
      ...ctx.request.body,
      type: 'playlist',
      pid: nanoid.nanoid(),
      author: currentUid,
      public: true
    }
    const newPlaylist = new Playlist(params);
    await newPlaylist.save();
    const models = mongoose.modelNames()
    const ukey = `u_${currentUid}`
    if (models.includes(ukey)) {
      mongoose.deleteModel(ukey)
    }
    const UserLibrary = require('../models/librarySchema').createUserLibraryModel(currentUid);
    await new UserLibrary({ type: 'playlist', id: params.pid, added_date: Date.now() }).save();
    ctx.status = 200
    ctx.body = newPlaylist;
  } catch (err) {
    console.log(err)
  }
});

router.put('/playlist/:pid', async (ctx) => {
  const currentUid = ctx.request.headers["x-uid"]
    const UserLibrary = require('../models/librarySchema').createUserLibraryModel(currentUid);
    await new UserLibrary({ type: 'playlist', id: ctx.params.pid, added_date: Date.now() }).save();
    ctx.body = { message: 'Playlist added to collection' };
});

router.delete('/playlist/:pid', async (ctx) => {
  try {
    const models = mongoose.modelNames()
    const currentUid = ctx.request.headers["x-uid"]
    const ukey = `u_${currentUid}`
    if (models.includes(ukey)) {
      mongoose.deleteModel(ukey)
    }
    const UserLibrary = require('../models/librarySchema').createUserLibraryModel(currentUid);
    await UserLibrary.deleteOne({ type: 'playlist', id: ctx.params.pid });
    await Playlist.findOneAndUpdate({ pid: ctx.params.pid }, { public: false })
    ctx.status = 200
    ctx.body = { message: 'Playlist removed from collection' };
  } catch (err) {

  }
});

module.exports = router