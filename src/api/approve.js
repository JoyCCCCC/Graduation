import request from '@/utils/request'

/**
 * 审批模块相关接口
 */

// 获取已发起的审批
export function fetchMyApproval(params, data) {
  return request({
    url: `/approve/page`,
    method: 'post',
    params,
    data
  })
}

// 获取已处理审批
export function fetchDealApproval(params, data) {
  return request({
    url: `/approve/participate`,
    method: 'post',
    params,
    data
  })
}

// 获取待我审批列表
export function fetchWaitApproval(params, data) {
  return request({
    url: `/approve/wait/my`,
    method: 'post',
    params,
    data
  })
}

// 获取审批详情
export function fetchApprovalDetail(flowInstanceId) {
  return request({
    url: `/approve/${flowInstanceId}`,
    method: 'get'
  })
}

// 审批撤销
export function deleteApproval(flowInstanceId) {
  return request({
    url: `/approve/${flowInstanceId}`,
    method: 'delete'
  })
}

// 获取审批流程图
export function fetchApprovalImg(flowInstanceId) {
  return request({
    url: `/approve/${flowInstanceId}/image`,
    method: 'get'
  })
}

// 发起审批
export function sendApproval(data, flowInstanceId) {
  return request({
    url: `/approve/${flowInstanceId}`,
    method: 'post',
    data
  })
}

// 流程评论
export function sendComment(data, flowInstanceId) {
  return request({
    url: `/approve/${flowInstanceId}/comment`,
    method: 'post',
    data
  })
}

// 获取审批记录
export function fetchApprovalRecord(flowInstanceId) {
  return request({
    url: `/approve/${flowInstanceId}/comment`,
    method: 'get'
  })
}

/** 立项申请------start */
// 获取立项申请详情
export function fetchStandUp(projectApprovalId) {
  return request({
    url: `/approve/approval/${projectApprovalId}`,
    method: 'get'
  })
}
/** 立项申请------end */

/** 中标申请------start */
// 获取中标申请详情
export function fetchWinBid(projectWinningBidId) {
  return request({
    url: `/approve/winningbid/${projectWinningBidId}`,
    method: 'get'
  })
}

/** 中标申请------end */

/** 报价申请------start */
// 获取报价申请详情
export function fetchOfferPrice(productQuotedPriceApplyId) {
  return request({
    url: `/approve/quotedprice/${productQuotedPriceApplyId}`,
    method: 'get'
  })
}

/** 报价申请------end */

/** 报销申请----- start */

// 获取报销申请详情(审批详情页)
export function fetchReimbursementDetail(reimbursementApplyId) {
  return request({
    url: `/office/reimbursementapply/${reimbursementApplyId}`,
    method: 'get'
  })
}

// 修改报销申请(审批详情页重新发起申请)
export function editReimbursement(data, reimbursementApplyId) {
  return request({
    url: `/office/reimbursementapply/${reimbursementApplyId}`,
    method: 'put',
    data
  })
}

/** 报销申请----- end */
