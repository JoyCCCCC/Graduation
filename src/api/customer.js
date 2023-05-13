import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/vue-admin-template/customer/crm_table',
    method: 'get',
    params: query
  })
}
export function getSupplierList(query) {
  return request({
    url: '/vue-admin-template/customer/supplierlist',
    method: 'get',
    params: query
  })
}

export function addList(data) {
  return request({
    url: '/vue-admin-template/customer/crm_table',
    method: 'post',
    data
  })
}

/* 客户接口 */

export function fetchCrmList(query, data) { // 获取客户列表
  return request({
    url: '/crm/customer/list',
    method: 'post',
    params: query,
    data
  })
}

export function addCrmList(data) { // 添加客户
  return request({
    url: '/crm/customer',
    method: 'post',
    data
  })
}

export function fetchCrmDetail(params) { // 获取客户详情
  return request({
    url: `/crm/customer/${params}`,
    method: 'get'
  })
}

export function editCrmList(params, data) { // 修改客户信息
  return request({
    url: `/crm/customer/${params}`,
    method: 'put',
    data
  })
}

/*   供应商接口   */
export function fetchSupplierList(query, data) { // 获取供应商列表
  return request({
    url: '/crm/supplier/list',
    method: 'post',
    params: query,
    data
  })
}

export function addSupplierList(data) { // 添加供应商列表
  return request({
    url: '/crm/supplier',
    method: 'post',
    data
  })
}
