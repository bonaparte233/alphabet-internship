const Router = require('koa-router');
const router = new Router();
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')

const { User } = require('../models/userSchema');
const SECRET = '123456';

router.post('/user/register', async (ctx) => {
  try {
    const newUser = new User({
      ...ctx.request.body,
      uid: uuidv4(),
      subscribe_expired: -1,
      last_login: 0,
      playing: '1'
    });
    await newUser.save();
    ctx.body = newUser;
  } catch (err) {
    ctx.body = {
      err: 201,
      msg: "Register Fail!"
    };
  }
});

router.post('/user/login', async (ctx) => {
  try {
    const loginUser = await User.findOne({ name: ctx.request.body.name, secret: ctx.request.body.secret }).lean()
    if (!loginUser) {
      ctx.status = 201
      ctx.body = {
        err: 201,
        msg: "Login Fail!"
      };
    }
    const payload = loginUser
    const token = jwt.sign(payload, SECRET, { expiresIn: '1h' });
    ctx.status = 200
    ctx.body = {
      msg: 'success',
      data: {
        token: token,
        user: loginUser
      }
    }

  } catch (err) {
    console.log(err)
    ctx.status = 201
    ctx.body = {
      err: 201,
      msg: "Login Fail!"
    };
  }
});

router.delete('/user/login', async (ctx) => {
    ctx.session = null;
    ctx.body = { message: 'Logged out' };
});

router.post('/user/:uid', async (ctx) => {
  try {
    await User.findOneAndUpdate({ uid: ctx.params.uid }, { playing: ctx.request.body.playing })
    ctx.status = 200;
  } catch (err) {
    console.log(err)
    ctx.status = 500;
    ctx.body = {
      err: 500,
      msg: "Report Fail!"
    };
  }
});

router.get('/user/:uid', async (ctx) => {
  const user = await User.findOne({ uid: ctx.params.uid }).lean();
  ctx.status = 200;
  ctx.body = user;
});

module.exports = router