import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  timeout: 60000
})
const defaultOpt = {login: true}

function baseRequest(options) {
  const token = ''
  const headers = options.headers || {}
  if (token) {
    // headers['X-Token'] = token
    // options.headers = headers
  }
  return new Promise((resolve, reject) => {
    instance(options).then(res => {
      const data = res.data || {}
      if (res.status !== 200) {
        return reject({message: '请求失败', res, data})
      }
      return resolve(data, res)
    }).catch(message => reject({message}));
  })
}

const request = ['post', 'put', 'patch', 'delete'].reduce((request, method) => {
  /**
   *
   * @param url string 接口地址
   * @param data object get参数
   * @param options object axios 配置项
   * @returns {AxiosPromise}
   */
  request[method] = (url, data = {}, options = {}) => {
    return baseRequest(
      Object.assign({url, data, method}, defaultOpt, options)
    )
  }
  return request
}, {});

['get', 'head'].forEach(method => {
  /**
   *
   * @param url string 接口地址
   * @param params object get参数
   * @param options object axios 配置项
   * @returns {AxiosPromise}
   */
  request[method] = (url, params = {}, options = {}) => {
    return baseRequest(
      Object.assign({url, params, method}, defaultOpt, options)
    )
  }
})

export default request
