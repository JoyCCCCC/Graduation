import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/vue-admin-template/project/list',
    method: 'get',
    params: query
  })
}

export function addList(data) {
  return request({
    url: '/vue-admin-template/project/list',
    method: 'post',
    data
  })
}

export function getListDetail(query) {
  return request({
    url: '/vue-admin-template/project/detail',
    method: 'get',
    params: query
  })
}
export function getListbudget(query) {
  return request({
    url: '/vue-admin-template/project/budget',
    method: 'post',
    params: query
  })
}

export function getPurList(query) {
  return request({
    url: '/vue-admin-template/purchase/list',
    method: 'get',
    params: query
  })
}
export function addPurList(data) {
  return request({
    url: '/vue-admin-template/purchase/list',
    method: 'post',
    data
  })
}
export function editPurList(data) {
  return request({
    url: '/vue-admin-template/purchase/list',
    method: 'put',
    data
  })
}
export function deletePurList(data) {
  return request({
    url: '/vue-admin-template/purchase/list',
    method: 'delete',
    data
  })
}
export function getContractList(query) {
  return request({
    url: '/vue-admin-template/contract/list',
    method: 'get',
    params: query
  })
}

export function getPurApplyList(query) {
  return request({
    url: '/vue-admin-template/purApplyList/list',
    method: 'get',
    params: query
  })
}

/** -----------------正式接口------------------------- */

// 添加/修改项目
export function addAndModifyProject(data) {
  return request({
    url: '/project',
    method: 'post',
    data
  })
}

// 获取项目列表
export function fetchProjectList(params, data) {
  return request({
    url: '/project/list',
    method: 'post',
    params,
    data
  })
}

// 获取项目状态详情（进度条数据）
export function fetchProjectSteps(projectId) {
  return request({
    url: `/project/${projectId}/status`,
    method: 'get'
  })
}

// 立项申请
export function approvalProject(data, projectId) {
  return request({
    url: `/project/${projectId}/approval`,
    method: 'post',
    data
  })
}

// 查看项目详情
export function fetchProjectDetail(projectId) {
  return request({
    url: `/project/${projectId}`,
    method: 'get'
  })
}

// 获取立项详情
export function fetchApprovalDetail(projectId) {
  return request({
    url: `/project/${projectId}/approval`,
    method: 'get'
  })
}

// 投标
export function tender(data, projectId) {
  return request({
    url: `/project/${projectId}/tender`,
    method: 'post',
    data
  })
}

// 获取投标详情
export function fetchTenderDetail(projectId) {
  return request({
    url: `/project/${projectId}/tender`,
    method: 'get'
  })
}

// 获取投标产品列表
export function fetchTenderProducts(params, data, projectId) {
  return request({
    url: `/project/${projectId}/tender/product/list`,
    method: 'post',
    params,
    data
  })
}

// 添加产品
export function addProduct(data, projectId) {
  return request({
    url: `/project/${projectId}/tender/product`,
    method: 'post',
    data
  })
}

// 导入产品
export function importProduct(data, projectId) {
  return request({
    url: `/project/${projectId}/tender/product/getupload`,
    method: 'post',
    params: { // 上传文件需添加该字段
      _contentType: 'multipart/form-data'
    },
    data
  })
}

// 删除产品
export function deleteProduct(params) {
  return request({
    url: `/project/${params.projectId}/tender/product/${params.productId}`,
    method: 'delete'
  })
}

// 项目发起流转
export function flowProject(data, projectId) {
  return request({
    url: `/project/${projectId}/status/flow`,
    method: 'post',
    data
  })
}

// 获取产品询价列表
export function fetchInquiryList(params) {
  return request({
    url: `/project/${params.projectId}/product/${params.productId}/inquiry`,
    method: 'get'
  })
}

// 添加询价
export function addInquiry(params, data) {
  return request({
    url: `/project/${params.projectId}/product/${params.productId}/inquiry`,
    method: 'post',
    data
  })
}

// 询价采用
export function useInquiryPrice(params, data) {
  return request({
    url: `/project/${params.projectId}/product/${params.productId}/inquiry/choose/${params.tenderProductInquiryPriceId}`,
    method: 'post',
    data
  })
}

// 预算申请
export function budgetApply(data, projectId) {
  return request({
    url: `/project/${projectId}/budget`,
    method: 'post',
    data
  })
}

// 项目预算申请详情
// export function budgetApply(data, projectId) {
//   return request({
//     url: `/project/${projectId}/budget`,
//     method: 'post',
//     data
//   })
// }

// 询价完成  发起报价申请
export function offerApply(projectId) {
  return request({
    url: `/project/${projectId}/product/quotedprice`,
    method: 'post',
    data: {}
  })
}

// 获取报价清单 （询价完成的）
export function fetchOfferList(params, data, projectId) {
  return request({
    url: `/project/${projectId}/product/quotedprice/list?pageIndex=1&pageSize=20`,
    method: 'post',
    params,
    data
  })
}

// 产品报价
export function offerPrice(params, data) {
  return request({
    url: `/project/${params.projectId}/product/quotedprice/${params.productQuotedPriceId}`,
    method: 'post',
    data
  })
}

// 协助中标信息录入
export function bidApply(data, projectId) {
  return request({
    url: `/project/${projectId}/bid/winning`,
    method: 'post',
    data
  })
}

// 中标详情
export function bidDetail(projectId) {
  return request({
    url: `/project/${projectId}/bid/winning`,
    method: 'get'
  })
}

// 录入合同
export function contractApply(data, projectId) {
  return request({
    url: `/project/${projectId}/contract`,
    method: 'post',
    data
  })
}

// 获取合同列表（签合同页面）
export function fetchContractList(params, data, projectId) {
  return request({
    url: `/project/${projectId}/contract/list`,
    method: 'post',
    params,
    data
  })
}

// 获取合同详情
export function fetchContractDetail(params) {
  return request({
    url: `/project/${params.projectId}/contract/${params.contractId}`,
    method: 'get'
  })
}

// 开票申请
export function invoiceApply(data, projectContractMoneyId) {
  return request({
    url: `/project/contract/invoice/${projectContractMoneyId}`,
    method: 'post',
    data
  })
}

// 获取采购清单列表
export function fetchPurchaseList(params, projectId) {
  return request({
    url: `/project/${projectId}/purchase`,
    method: 'get',
    params
  })
}

// 采购申请
export function purchaseApply(data, projectId) {
  return request({
    url: `/project/${projectId}/purchase/apply`,
    method: 'post',
    data
  })
}

// 获取采购申请列表
export function fetchPurchaseApply(projectId) {
  return request({
    url: `/project/${projectId}/purchase/list`,
    method: 'get'
  })
}

// 获取采购申请详情
export function fetchPurchaseApplyDetail(params) {
  return request({
    url: `/project/${params.projectId}/purchase/apply/${params.projectPurchaseApplyId}`,
    method: 'get'
  })
}

/** -----------------商机管理------------------------- */
// 获取商机列表
export function fetchBusinessList(params, data) {
  return request({
    url: '/business/opportunity/list',
    method: 'post',
    params,
    data
  })
}
// 添加商机
export function addBusinessList(data) {
  return request({
    url: '/business/opportunity',
    method: 'post',
    data
  })
}

// 编辑商机
export function editBusinessList(params, data) {
  return request({
    url: `/business/opportunity/${params}`,
    method: 'put',
    data
  })
}

// 商机处理
export function handleBusinessList(params, data) {
  return request({
    url: `/business/opportunity/${params}`,
    method: 'post',
    data
  })
}
// 查看商机详情
export function fetchBusinessDetail(params) {
  return request({
    url: `/business/opportunity/${params}`,
    method: 'get'
  })
}

