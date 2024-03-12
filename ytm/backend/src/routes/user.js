const Router = require('koa-router');
const router = new Router();

const User = require('../models/userSchema');

router.post('/user/login', async (ctx) => {
    const newUser = new User(ctx.request.body);
    await newUser.save();
    ctx.body = newUser;
});

router.delete('/user/login', async (ctx) => {
    ctx.session = null;
    ctx.body = { message: 'Logged out' };
});

router.get('/user/:uid', async (ctx) => {
    const user = await User.findOne({ uid: ctx.params.uid });
    ctx.body = user;
});