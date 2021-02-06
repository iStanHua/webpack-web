// utils/axios.js

import axios from 'axios'

import { API_BASE_URL } from './variable'

// 过滤不超时接口
const filterTimeouts = [

]

// HTTP CODE及错误提示
const errorMessage = {
  400: '请求错误',
  401: '未授权，请登录',
  403: '拒绝访问',
  404: '请求地址出错',
  408: '请求超时',
  500: '服务器内部错误',
  501: '服务未实现',
  502: '网关错误',
  503: '服务不可用',
  504: '网关超时',
  505: 'HTTP版本不受支持',
}


// http request 拦截器
axios.interceptors.request.use(
  config => {
    // 不超时接口
    if (filterTimeouts.indexOf(config.url) > -1) config.timeout = 0

    // let _token = store.getters.userInfo.token
    // if (_token) {
    //   config.headers.common['authorization'] = _token
    // }

    config.withCredentials = true
    return config
  }, function (error) {
    return Promise.reject(error)
  }
)
// http response 拦截器
axios.interceptors.response.use(function (response) {
  if (response.statusCode === 200) {
    return response.data
  }
  return Promise.reject(response.data)
}, (err) => {
  if (err) {
    let msg = errorMessage[err.response.status]
    console.log(msg ? msg : '服务器开小差了，请稍后再次')
  }
  else {
    console.log('服务器开小差了，请稍后再次')
  }
  return Promise.reject(err)
})

/**
 * 请求
 * @param {String} options.url    地址
 * @param {String} options.type   类型
 * @param {Object} options.data   数据
 */
export const fetch = (options = {}) => {
  options.url && options.url.indexOf('/api/') === -1 && (options.url = API_BASE_URL + options.url)

  if (options.type) {
    options.method = String(options.type).toUpperCase()
    delete options.type
  }

  if (options.method === 'GET') {
    options.params = options.data
    delete options.data
  }

  if (Object.prototype.toString.call(options.data) === '[object FormData]')
    options.headers = Object.assign({}, options.headers, { 'Content-Type': `multipart/form-data; boundary=----WebKitFormBoundary${new Date().getTime()}` })

  return axios(options)
}
