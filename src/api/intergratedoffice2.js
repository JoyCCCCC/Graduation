import request from '@/utils/request'

export function getList (params) {
  return request({
    url: '/vue-admin-template/intergratedoffice/mreport',
    method: 'get',
    params
  })
}
export function WeekReportList (params) {
  return request({
    url: '/office/weekreport/list',
    method: 'post',
    params
  })
}

export function monthreport (data) {
  return request({
    url: '/office/monthreport/write',
    method: 'post',
    data
  })
}
export function monthReportList (params, data) {
  return request({
    url: '/office/monthreport/list',
    method: 'post',
    params,
    data
  })
}
export function weekSalesReport (params, data) {
  return request({
    url: '/office/saleweekreport/list',
    method: 'post',
    params,
    data
  })
}
export function weekSalesReportDetails (params, data) {
  return request({
    url: '/office/saleweekreport/',
    method: 'post',
    params,
    data
  })
}

export function addWeekSalesReport (data) {
  return request({
    url: '/office/saleweekreport',
    method: 'post',
    data
  })
}
export function reimbursementForm (reimbursementApplyId) {
  return request({
    url: `/office/reimbursementapply/${reimbursementApplyId}`,
    method: 'get '

  })
}
export function editreimbursementForm (reimbursementApplyId, data) {
  return request({
    url: `/office/reimbursementapply/${reimbursementApplyId}`,
    method: 'put',
    data:
      reimbursementApplyId
  })
}
export function reimbursementList (params) {
  return request({
    url: '/office/reimbursementapply',
    method: 'get',
    params

  })
}

