import request from '@/utils/request'

// export function getList (params) {
//   return request({
//     url: '/vue-admin-template/intergratedoffice/report',
//     method: 'get',
//     params
//   })
// }
// export function getconmmunicateList (query) {
//   return request({
//     url: '/vue-admin-template/intergratedoffice/conmmunicateList',
//     method: 'get',
//     params: query
//   })
// }
export function getsealApplication(query) {
  return request({
    url: '/vue-admin-template/intergratedoffice/list',
    method: 'get',
    params: query
  })
}
export function getNoticel(query) {
  return request({
    url: '/vue-admin-template/intergratedoffice/anoucement/index',
    method: 'get',
    params: query
  })
}
export function getYReportList(query) {
  return request({
    url: '/vue-admin-template/intergratedoffice/YReport',
    method: 'get',
    params: query
  })
}
export function getYReportList2(query) {
  return request({
    url: '/office/monthreport',
    method: 'get',
    params: query
  })
}

/*  沟通/跟进记录接口   */

export function getconmmunicateList(query, data) { // 获取沟通跟进记录列表
  return request({
    url: '/office/communicationrecord/list',
    method: 'post',
    params: query,
    data
  })
}

export function addconmmunicateList(data) { // 添加沟通跟进记录列表
  return request({
    url: '/office/communicationrecord',
    method: 'post',
    data
  })
}

export function getList(data) { // 添加日报
  return request({
    url: '/office/dailyreport/write',
    method: 'post',
    data
  })
}
export function fetchconmmunicateDetail(params) { // 获取沟通跟进记录详情
  return request({
    url: `/office/communicationrecord/${params}`,
    method: 'get'

  })
}

export function editconmmunicateList(params, data) { // 修改沟通跟进记录
  return request({
    url: `/office/communicationrecord/${params}`,
    method: 'put',
    data
  })
}
/*   用章申请   */
export function fetchStampList(query, data) { // 获取用章申请列表
  return request({
    url: '/office/stampapply/list',
    method: 'post',
    params: query,
    data
  })
}

export function addStampList(data) { // 添加用章申请记录列表
  return request({
    url: '/office/stampapply',
    method: 'post',
    data
  })
}

export function fetchStampDetail(params) { // 获取用章申请记录详情
  return request({
    url: `/office/stampapply/${params}`,
    method: 'get'
  })
}
export function businesstripapplyList(params, data) { // 出差申请列表
  return request({
    url: '/office/businesstripapply/list',
    method: 'post',
    params,
    data

  })
}
export function businessTripApply(data) { // 出差申请
  return request({
    url: '/office/businesstripapply',
    method: 'post',
    data

  })
}
export function province(params) { // 获取省
  return request({
    url: '/sys/apollo/province',
    method: 'get',
    params

  })
}

/* 公告 */
export function fetchNoticeList(query, data) { // 获取公告列表
  return request({
    url: '/office/notice/list',
    method: 'post',
    params: query,
    data
  })
}
export function addNotice(data) { // 添加公告
  return request({
    url: '/office/notice',
    method: 'post',
    data
  })
}
export function EditNotice(params, data) { // 修改公告
  return request({
    url: `/office/notice/${params}`,
    method: 'put',
    data
  })
}
export function publisNotice(params) { // 发布公告
  return request({
    url: `/office/notice/publish/${params}`,
    method: 'put'
  })
}
export function fetchNoticeDetail(params) { // 获取公告详情
  return request({
    url: `/office/notice/${params}`,
    method: 'post',
    params
  })
}
