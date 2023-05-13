import request from '@/utils/request'

export function getList (params) {
  return request({
    url: '/vue-admin-template/entertainment/salesEntertainmentList',
    method: 'get',
    params
  })
}
export function getList2 (params, data) {
  return request({
    url: '/office/businesstripapply/list',
    method: 'post',
    params,
    data
  })
}
