
// 文件上传地址
export const UPLOAD_ACTION = process.env.VUE_APP_BASE_API + '/file/uploads/'

// 文件类型
export const FILE_TYPE = {
  'excel': '.xlsx, .xls'
}

export const defaultCfg = {
  pageSize: 10, // 分页默认设置每页10条
  maxPageSize: 999, // 最大值设置
  closeOnClickModal: false // 是否可以通过点击modal关闭dialog
}

export const payType = [
  { key: 1, value: '转账' },
  { key: 2, value: '支票' },
  { key: 3, value: '银行承兑汇票' },
  { key: 4, value: '商业承兑汇票' }
]

