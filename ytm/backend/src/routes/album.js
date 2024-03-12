const Router = require('koa-router');
const router = new Router();

const Album = require('../models/playlistSchema').PlaylistIndex;

router.get('/init', async (ctx) => {
  try {

    const album = new Album({
      pid: '1',
      author: 'Jonny Wrong',
      name: 'Test',
      description: '专辑描述',
      added: 0,
      liked: 10,
      shared: 0,
      played: 5,
      public: true,
      image: '',
      type: 'album',
      last_update: new Date()
    })

    album.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    
  } catch (err) {
      ctx.body = {
          err: 201,
          msg: "Insert Fail!"
      };
  }
})

router.get('/album', async (ctx) => {
    try {
      const albums = await Album.find({ type: 'album' });
        ctx.body = {
            data: albums,
            total: albums.length
        };
    } catch (err) {
        ctx.body = {
            err: 201,
            msg: "Resource doesn't exist"
        };
    }
});

router.get('/album/:pid', async (ctx) => {
  const album = await Album.findOne({ pid: ctx.params.pid, type: 'album' });
  console.log(album)
    ctx.body = album;
});

router.put('/album/:pid', async (ctx) => {
    const UserLibrary = require('../models/librarySchema').createUserLibraryModel(ctx.state.user.uid);
    await new UserLibrary({ type: 'album', id: ctx.params.pid, added_date: Date.now() }).save();
    ctx.body = { message: 'Album added to collection' };
});

router.delete('/album', async (ctx) => {
    const UserLibrary = require('../models/librarySchema').createUserLibraryModel(ctx.state.user.uid);
    await UserLibrary.deleteOne({ type: 'album', id: ctx.request.body.pid });
    ctx.body = { message: 'Album removed from collection' };
});

module.exports = router;