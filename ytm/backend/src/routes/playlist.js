const Router = require('koa-router');
const router = new Router();

const Playlist = require('../models/playlistSchema').PlaylistIndex;

router.get('/playlist', async (ctx) => {
    try {
        const playlists = await Playlist.find({ type: 'playlist' });
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
    const newPlaylist = new Playlist({ ...ctx.request.body, type: 'playlist' });
    await newPlaylist.save();
    ctx.body = newPlaylist;
});

router.put('/playlist/:pid', async (ctx) => {
    const UserLibrary = require('../models/librarySchema').createUserLibraryModel(ctx.state.user.uid);
    await new UserLibrary({ type: 'playlist', id: ctx.params.pid, added_date: Date.now() }).save();
    ctx.body = { message: 'Playlist added to collection' };
});

router.delete('/playlist/:pid', async (ctx) => {
    const UserLibrary = require('../models/librarySchema').createUserLibraryModel(ctx.state.user.uid);
    await UserLibrary.deleteOne({ type: 'playlist', id: ctx.params.pid });
    ctx.body = { message: 'Playlist removed from collection' };
});

module.exports = router