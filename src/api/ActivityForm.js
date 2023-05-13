import request from '@/utils/request'

export function getList (params) {
  return request({
    url: '/vue-admin-template/Activitymanagement/ActivityForm',
    method: 'get',
    params
  })
}

export function dataForm (data) {
  return request({
    url: '/vue-admin-template/Activitymanagement/ActivityForm',
    method: 'post',
    data
  })
}

export function baoxiaolist2 (params) {
  return request({
    url: '/office/reimbursementapply',
    method: 'get',
    params
  })
}
export function zhoubao (params) {
  return request({
    url: '/office/weekreport',
    method: 'get',
    params
  })
}
export function apply (data) {
  return request({
    url: '/office/reimbursementapply',
    method: 'post',
    data
  })
}
