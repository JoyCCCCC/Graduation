import request from '@/utils/request'

// 获取系统配置
export function getSysParams() {
  return request({
    url: `/sys/apollo/systemconfig`,
    method: 'get'
  })
}
