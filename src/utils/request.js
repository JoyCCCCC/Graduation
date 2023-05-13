import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

let requestConfig = {}
const loadingParams = {
  ignore: false
}
const baseUrlMap = {
  'file': process.env.VUE_APP_BASE_API_FILE,
  'flowable': process.env.VUE_APP_BASE_API_FLOWABLE
}

// create an axios instance
const service = axios.create({
  // baseUrl默认使用VUE_APP_BASE_API
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.timeout = 4000
    // 将请求缓存起来
    requestConfig = config
    // console.log(config, 'configconfig')
    // 展示loading
    if (config && config.params && '_ignore' in config.params) {
      loadingParams.ignore = config.params._ignore
      delete config.params._ignore
    }
    // store.commit('loading/SHOW_LOADING', loadingParams)
    // do something before request is sent
    // 如果是文件上传/下载请求，api中params带上_apiType为 file
    // 如果是流程类请求，api中params带上_apiType为 flowable
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    if (config && config.params && config.params._apiType) {
      config.baseURL = baseUrlMap[config.params._apiType]
      delete config.params._apiType
    }
    if (config && config.params && config.params._contentType) {
      config.headers['Content-Type'] = config.params._contentType
      delete config.params._contentType
    }

    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?'
      for (const propName of Object.keys(config.params)) {
        const value = config.params[propName]
        const part = encodeURIComponent(propName) + '='
        if (value !== null && typeof (value) !== 'undefined') {
          if (typeof value === 'object') {
            for (const key of Object.keys(value)) {
              const params = propName + '[' + key + ']'
              const subPart = encodeURIComponent(params) + '='
              url += subPart + encodeURIComponent(value[key]) + '&'
            }
          } else {
            url += part + encodeURIComponent(value) + '&'
          }
        }
      }
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }

    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ` + 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ2REZkam5qbUEwYU9sQUxKdDFuVEZfdFBoM0V0WHRnRXIydWY1dWxtV1RvIn0.eyJleHAiOjE2MjYxNzQ4NDAsImlhdCI6MTYyNjEzODg0MCwianRpIjoiMjdlNGI2NmYtNTI3Mi00NGMwLWE3YTgtZjM0YjM5ZmQ0Y2RjIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMjAxLjE5NzozMTAyMy9hdXRoL3JlYWxtcy9rZXlzdG9uZSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI1OTg1ZjRkOC1mMGJjLTQ1N2EtOWUxYy1kMjAyNDBjZmJlNjIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhcGkiLCJzZXNzaW9uX3N0YXRlIjoiMTZiNDQ4NjEtMDEyZS00ZWFhLWI0NWItN2U2NmU3NGIzZTk1IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtYW1hemluZyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoi6Iiq5aiBIOa9mCIsInByZWZlcnJlZF91c2VybmFtZSI6InBhbmhhbmd3ZWkiLCJnaXZlbl9uYW1lIjoi6Iiq5aiBIiwiZmFtaWx5X25hbWUiOiLmvZgiLCJlbWFpbCI6InBhbmhhbmd3ZWlAaHhqc3RlY2guY29tIn0.caOrzBWl5KA-eV3ApKmiUhbneNIWn19nYiz_ht4dVdai2e2masK60bSGmERRKPJTOF_VBCvCuTeQLiOXcY1dVi9BThxE3qhgXYAvj3TS3NhcOU784Ufs13To_5bgJgcu2Y9LO4jV687zeaIfZgZsRNwM9WI3BRYBHnfZFDAPVdDJqbfPyij6w8MjnSExiv68jFyyyXqBnLz6Lj9bqNanGncZ4ytpThAullzSoDse3DijECcbWSzyO7-0uXgNOx3Cnzj8o7rjbPiFo18lnkWJ14tIglgrlN7YgHZuDZWFWAMrw2EbB1tjbTpgMFqdNfyCqvLqLUyYx_RdJzva_rd-aQ'
    }
    config.headers['Authorization'] = `Bearer ` + 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ2REZkam5qbUEwYU9sQUxKdDFuVEZfdFBoM0V0WHRnRXIydWY1dWxtV1RvIn0.eyJleHAiOjE2MjYxNzQ4NDAsImlhdCI6MTYyNjEzODg0MCwianRpIjoiMjdlNGI2NmYtNTI3Mi00NGMwLWE3YTgtZjM0YjM5ZmQ0Y2RjIiwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMjAxLjE5NzozMTAyMy9hdXRoL3JlYWxtcy9rZXlzdG9uZSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI1OTg1ZjRkOC1mMGJjLTQ1N2EtOWUxYy1kMjAyNDBjZmJlNjIiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhcGkiLCJzZXNzaW9uX3N0YXRlIjoiMTZiNDQ4NjEtMDEyZS00ZWFhLWI0NWItN2U2NmU3NGIzZTk1IiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtYW1hemluZyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoi6Iiq5aiBIOa9mCIsInByZWZlcnJlZF91c2VybmFtZSI6InBhbmhhbmd3ZWkiLCJnaXZlbl9uYW1lIjoi6Iiq5aiBIiwiZmFtaWx5X25hbWUiOiLmvZgiLCJlbWFpbCI6InBhbmhhbmd3ZWlAaHhqc3RlY2guY29tIn0.caOrzBWl5KA-eV3ApKmiUhbneNIWn19nYiz_ht4dVdai2e2masK60bSGmERRKPJTOF_VBCvCuTeQLiOXcY1dVi9BThxE3qhgXYAvj3TS3NhcOU784Ufs13To_5bgJgcu2Y9LO4jV687zeaIfZgZsRNwM9WI3BRYBHnfZFDAPVdDJqbfPyij6w8MjnSExiv68jFyyyXqBnLz6Lj9bqNanGncZ4ytpThAullzSoDse3DijECcbWSzyO7-0uXgNOx3Cnzj8o7rjbPiFo18lnkWJ14tIglgrlN7YgHZuDZWFWAMrw2EbB1tjbTpgMFqdNfyCqvLqLUyYx_RdJzva_rd-aQ'

    // console.log(config, 'sdsds')
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // console.log(response, 'responseresponse')
    const res = response.data
    store.commit('loading/HIDE_LOADING')
    // success:true  表示请求成功
    if (!res.success) {
      /**
 * token过期 根据接口返回数据判断，如果过期，
 * 则向服务端请求新token，若获取到新token则重新发起之前的请求(如果页面同时有多个请求,也需要全部重新请求)，
 * 若未取到新token则需要用户重新登录
*/
      // if (res.code === '404_0031') {
      //   store.commit('app/ADD_REQUEST', requestConfig)
      //   if (store.getters.requestInfo.isRefreshing) {
      //     store.commit('app/CHANGE_IS_REFRESH')
      //     store.dispatch('user/refreshToken')
      //   }
      // } else {
      //   store.commit('app/CLEAR_REQUEST')
      // }
      if (res.alterMsg && res.code !== '404_0031') {
        Message({
          message: res.alterMsg,
          type: 'error',
          duration: 3 * 1000
        })
      }
      // console.log(res, 'rrrrr')
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  },
  error => {
    store.commit('loading/HIDE_LOADING')
    console.log('errInfo ' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
