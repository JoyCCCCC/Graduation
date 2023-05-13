import request from '@/utils/request'

// 获取客户信息
export function fetchCustomerData () {
  return request({
    url: '/option/drop/customer',
    method: 'get'
  })
}

// 获取员工
export function fetchEmployeeData () {
  return request({
    url: '/option/drop/user',
    method: 'get'
  })
}

// 获取获取apollo下拉框
export function fetchApolloData (params) {
  return request({
    url: `/sys/apollo/dropdown`,
    method: 'get',
    params: params
  })
}

// 获取区域数据
export function fetchAreaData () {
  return request({
    url: `/sys/apollo/area`,
    method: 'get'
  })
}

// 获取项目流转状态
export function fetchProjectStatus (params) {
  return request({
    url: `/option/drop/projectstatus/${params}`,
    method: 'get'
  })
}

// 获取项目
export function fetchProject () {
  return request({
    url: '/option/drop/project',
    method: 'get'
  })
}
// 获取省份
export function province (params) {
  return request({
    url: '/sys/apollo/province',
    method: 'get',
    params

  })
}
