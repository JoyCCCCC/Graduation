import request from '@/utils/request'

export function getList (params) {
  return request({
    url: '/office/saleweekreport',
    method: 'get',
    params
  })
}
export function getList2 (data) {
  return request({
    url: '/office/monthreport/write',
    method: 'post',
    data
  })
}
/* 接口 */
export function getList3 (data) {
  return request({
    url: '/office/weekreport',
    method: 'post',
    data
  })
}
export function getList4 (params) {
  return request({
    url: '/office/monthreport/4',
    method: 'get',
    params
  })
}
export function getList5 (params) {
  return request({
    url: '/office/dailyreport',
    method: 'get',
    params
  })
}
