import request from '@/utils/request'

/** -----------------综合办公 待办------------------------- */
// 获取待办列表
export function fetchWaitProcessList(params, data) {
  return request({
    url: '/office/waitingprocessing',
    method: 'post',
    params,
    data
  })
}
// 添加待办
export function addWaitProcessList(data) {
  return request({
    url: '/office/waitingprocessing',
    method: 'post',
    data
  })
}
// 查看待办详情
export function fetchWaitProcessDetail(params) {
  return request({
    url: `/office/waitingprocessing/${params}`,
    method: 'get'
  })
}

