// token.js
const jwt = require('jsonwebtoken')

const verifyToken = async (ctx, next)=> {
  let url = ctx.request.url.split('?')[0]
    // 以下接口不校验token
    let url_config = [
        '/user/login',
        '/user/register'
    ]
    
    // 检测接口是否在不校验接口列表中
    let changer = url_config.some((item) => {
        return item == url
    })
    
    if (changer || url.indexOf('.') > -1) {
        await next()
    } else {
        // 检测token
      const authHeader = ctx.request.headers["authorization"] || ''
      const token = authHeader.split(' ')[1] || ''
      if (token) {
        try {
          const payload = jwt.verify(token, '123456')
          ctx.state.user = payload
          await next()
        } catch (err) {
          ctx.status = 401
            ctx.body = {
                code: 401,
                msg: 'unauthorized'
            }
            await next()
        }
        
        } else {
          ctx.status = 401
            ctx.body = {
                code: 401,
                msg: 'unauthorized'
            }
            await next()
        }
    }
}
module.exports = verifyToken