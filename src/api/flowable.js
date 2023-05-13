import request from '@/utils/request'

/** -----------------------------以下接口使用flowable地址请求数据-----------------------------------
 *  VUE_APP_BASE_API_FLOWABLE
 *  请求需带上参数 params:{_apiType: 'flowable'}
 */

// 流程定义  （保存、注册流程）
export function createFlowChart(data) {
  return request({
    url: '/process',
    method: 'post',
    params: {
      _apiType: 'flowable'
      // ...params
    },
    data
  })
}

// 获取流程列表分页
export function fetchFlowList(params, data = {}) {
  return request({
    url: `/process/page`,
    method: 'post',
    params: {
      _apiType: 'flowable',
      ...params
    },
    data
  })
}

// 删除流程
export function deleteFlow(deploymentId) {
  return request({
    url: `/process/${deploymentId}`,
    params: {
      _apiType: 'flowable'
    },
    data: {},
    method: 'delete'
  })
}

// 读取xml
export function getFlowXml(deploymentId) {
  return request({
    url: `/process/${deploymentId}/xml`,
    method: 'get',
    params: {
      _apiType: 'flowable'
    },
    data: {}
  })
}

// 修改流程状态
export function changeStatus(deploymentId) {
  return request({
    url: `/process/${deploymentId}/status`,
    method: 'put',
    params: {
      _apiType: 'flowable'
    },
    data: {}
  })
}
