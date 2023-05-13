import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user',
    method: 'get'
  })
}

export function refreshToken(token) {
  return request({
    url: '/refresh/token?AccessToken=' + token,
    method: 'get'
    // params: {
    //   AccessToken: token
    // }
  })
}
