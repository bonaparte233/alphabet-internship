import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  timeout: 60000
})
const defaultOpt = { login: true }

// request interceptor
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bear ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

 instance.interceptors.response.use(
      response => {
        const res = response
        if (res.status === 401) {
          window.location.href = '/login';
          return Promise.reject(res);
        }
        if (res.status !== 200) {
          return Promise.reject(new Error(res.data.msg || 'Error'))
        } else {
          return res.data
        }
      },
      error => {
        window.location.href = '/login';
        return Promise.reject(error)
      }
    )

function baseRequest(options) {
  return new Promise((resolve, reject) => {

    // instance.interceptors.response.use(
    //   response => {
    //     const res = response
    //     if (res.status === 401) {
    //       window.location.href = '/login';
    //       return
    //       return Promise.reject(res);
    //     }
    //     if (res.status !== 200) {
    //       return Promise.reject(new Error(res.data.msg || 'Error'))
    //     } else {
    //       return resolve(res.data)
    //     }
    //   },
    //   error => {
    //     window.location.href = '/login';
    //     return Promise.reject(error)
    //   }
    // )

    instance(options).then(res => {
      const data = res || {}
      return resolve(data, res)
    }).catch(message => {
      reject({message})
    });
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
