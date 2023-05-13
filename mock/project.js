const Mock = require('mockjs')

const projectdata = Mock.mock({
  'items|30-50': [{
    'projectNo': '2',
    'projectName': 'a',
    'peojectTypeId': 2,
    // 'peojectTypeId': 1,
    'estimateSigningAmount|60000-100000': 80,
    'estimateSigningTime': '2021-05-01',
    'winningRate|60-100': 90,
    'auditStatus|1': ['审批中', '未审批', '审批完成'],
    'lastFollowUserName': '十一',
    'areaName': '福建省',
    'saleUserName': '1234567',
    'createTime': '2021-05-01',
    'createUserName': '十二',
    'updateTime': '2021-05-01',
    'updateUserName': '十二',
    'projectSubStatus|+1': ['1101', '1201', '1402', '1403', '1404', '1406', '1501', '1503', '1504',
      '1601', '1710']
  }]
})

const projectdetail = Mock.mock({
  'projectId': 0,
  'projectNo': 'hnfjxm20210424',
  'projectName': '台商GA服务器采购',
  'peojectTypeId': 1, // 项目类型：0-"",1-渠道，2-集成，3-行政，4-研发（具体配置读取apollo）
  'estimateSigningAmount': 1.1, // 预计签单金额
  'estimateSigningTime': 1, // 预计签单时间
  'winningRate': 90, // 赢率
  'auditStatus|1': ['审批中', '未审批', '审批完成'],
  'lastFollowUserName': '张三',
  'area': '福建省',
  'saleUserName': '十一',
  'createTime': '2021-05-01',
  'createUserName': '十一',
  'updateTime': '2021-05-01',
  'updateUserName': '十一',
  'projectMainStatus': 1, // 项目主状态
  'projectSubStatus': 2, // 项目子状态
  'finishStatus': 1, // 结束状态：0-进行中，1-结束审批中，2-待上传分析报告，3-结束
  'findUserName': '张三',
  'assistUserNames': ['张三', '李四']
})
const budget = Mock.mock({
  'projectId': 0,
  'projectNo': 'hnfjxm20210424',
  'projectName': '台商GA服务器采购',
  'peojectTypeId': 1, // 项目类型：0-"",1-渠道，2-集成，3-行政，4-研发（具体配置读取apollo）
  'estimateSigningAmount': 1.1, // 预计签单金额
  'estimateSigningTime': 1, // 预计签单时间
  'winningRate': 90, // 赢率
  'auditStatus|1': ['审批中', '未审批', '审批完成'],
  'lastFollowUserName': '张三',
  'area': '福建省',
  'saleUserName': '十一',
  'createTime': '2021-05-01',
  'createUserName': '十一',
  'updateTime': '2021-05-01',
  'updateUserName': '十一',
  'projectMainStatus': 1, // 项目主状态
  'projectSubStatus': 2, // 项目子状态
  'finishStatus': 1, // 结束状态：0-进行中，1-结束审批中，2-待上传分析报告，3-结束
  'findUserName': '张三',
  'assistUserNames': ['张三', '李四']

})

const purApplyList = Mock.mock({
  'items|2-20': [{
    'projectPurchaseId': 33, // 采购清单ID
    'productNo': 123,
    'productName|1': ['显示器', 'hdmi线'],
    'brandName': 111,
    'hasBuyNum': 100, // 已购买数量
    'purchasePrice': 22, // 单价
    'quotedPrice': 32, // 报价
    'allPrice': 2200, // 总价
    'isAuxiliaryMaterials': 1, // 是否辅材
    'status|1': [1, 2, 3, 4] // 0-未采购
  }]
})

const purchasedata = Mock.mock({
  'items|2-20': [{
    'projectPurchaseId': 33, // 采购清单ID
    'productNo': 123,
    'productName|1': ['显示器', 'hdmi线'],
    'brandName': 111,
    'hasBuyNum': 100, // 已购买数量
    'purchasePrice': 22, // 单价
    'quotedPrice': 32, // 报价
    'allPrice': 2200, // 总价
    'isAuxiliaryMaterials': 1, // 是否辅材
    'status|1': [1, 2, 3, 4] // 0-未采购
  }]
})

const contractdata = Mock.mock({
  'items|10-30': [{
    'contractId': 111, // 合同ID
    'contractName': '合同1',
    'ContractNo': 'hxjs20200502001', // 编码
    'contractProject|1': [1, 2, 3, 4], // 合同产品
    'contractAmount': '100000',
    'isdues': 1,
    'contractTypeId|1-2': 1, // 合同类型
    'projectName': '集成1',
    'projectNo': 'hxjsxm001', // 编码
    'lPeople': '十一',
    'qPeople': '十一',
    'status': '存档',
    'signDate': '2021-01-01',
    'hPrice': 1000,
    'kPrice': 1000,
    'sPrice': 10100,
    'spPrice': 0,
    'qmainPeople': '海峡基石',
    'oprationStatus|1': ['1', '2', '3'],
    'paymentStatus|1': ['0', '1'],
    'title': '付款申请',
    'purchasingCompany': 'xxx有限公司',
    'paymentTypeId|1': ['1', '2', '3', '4'],
    'cashingTime': '@datetime(2020-MM-dd)',
    'paymentTime': '@datetime(2021-MM-dd)',
    'paymentAmount': '10000',
    'totalpaymentAmount': '1000000',
    'haspaymentAmount': '100000',
    'invoiceStatus|1': ['0', '1'],
    'thisTimeinvoiceAmount': '10000',
    'totalinvoiceAmount': '10000000',
    'invoiceAmount': '100000'
  }]
})

module.exports = [
  // {
  //   url: '/vue-admin-template/project/list',  //获取
  //   type: 'get',
  //   response: config => {
  //     const items = data.items
  //     return {
  //       code: 20000,
  //       data: {
  //         total: items.length,
  //         items: items
  //       }
  //     }
  //   }
  // },
  {
    url: '/vue-admin-template/project/list', // 获取
    type: 'get',
    response: config => {
      const items = projectdata.items
      const { page = 1, limit = 10 } = config.query
      const itemList = items.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: items.length,
          items: itemList
        }
      }
    }
  },
  {
    url: '/vue-admin-template/project/list', // 添加
    type: 'post',
    response: config => {
      const { name } = config.body
      const items = projectdata.items
      items.unshift(Mock.mock({
        'projectNo': 'hnfjxm20210424',
        'projectName': name,
        'peojectTypeId': 2,
        'estimateSigningAmount|60000-100000': 80,
        'estimateSigningTime': '2021-05-01',
        'winningRate': 90, // 赢率
        'auditStatus': '未审批',
        'lastFollowUserName': '十一',
        'areaName': '福建省',
        'saleUserName': '1234567',
        'createTime': '2021-05-01',
        'createUserName': '十二',
        'updateTime': '2021-05-01',
        'updateUserName': '十二',
        'projectSubStatus': '1101'
      }))
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/vue-admin-template/project/list', // 添加
    type: 'post',
    response: config => {
      const { name } = config.body
      const items = projectdata.items
      items.unshift(Mock.mock({
        'projectNo': 'hnfjxm20210424',
        'projectName': name,
        'peojectTypeId': 2,
        'estimateSigningAmount|60000-100000': 80,
        'estimateSigningTime': '2021-05-01',
        'winningRate': 90, // 赢率
        'auditStatus': '未审批',
        'lastFollowUserName': '十一',
        'areaName': '福建省',
        'saleUserName': '1234567',
        'createTime': '2021-05-01',
        'createUserName': '十二',
        'updateTime': '2021-05-01',
        'updateUserName': '十二',
        'projectSubStatus': '1101'
      }))
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/vue-admin-template/project/detail', // 获取
    type: 'get',
    response: config => {
      const items = projectdetail
      return {
        code: 20000,
        data: {
          items: items
        }
      }
    }
  },
  {
    url: '/vue-admin-template/project/budget', // 获取
    type: 'get',
    response: config => {
      const items = budget
      return {
        code: 200,
        data: {
          items: items
        }
      }
    }
  },
  // 合同列表
  {
    url: '/vue-admin-template/contract/list', // 获取
    type: 'get',
    response: config => {
      const items = contractdata.items
      const { page = 1, limit = 10 } = config.query
      const itemList = items.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: items.length,
          items: itemList
        }
      }
    }
  },
  // 采购单
  {
    url: '/vue-admin-template/purchase/list', // 添加
    type: 'post',
    response: config => {
      const { productName, productNo } = config.body
      const items = purchasedata.items
      items.unshift(Mock.mock({
        'projectPurchaseId': 33, // 采购清单ID
        'productNo': productNo,
        'productName': productName,
        'brandName': 111,
        'hasBuyNum': 100, // 已购买数量
        'purchasePrice': 22, // 单价
        'quotedPrice': 32, // 报价
        'allPrice': 2200, // 总价
        'isAuxiliaryMaterials': 1, // 是否辅材
        'status|1': [1, 2, 3, 4] // 0-未采购
      }))
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/vue-admin-template/purchase/list', // 获取'/vue-admin-template/purApplyList/list',
    type: 'get',
    response: config => {
      const items = purchasedata.items
      const { page = 1, limit = 10 } = config.query
      const itemList = items.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: items.length,
          items: itemList
        }
      }
    }
  },
  {
    url: '/vue-admin-template/purchase/list', // 删除
    type: 'post',
    response: config => {
      const { index } = config.body
      const items = purchasedata.items
      items.splice(index, 1)
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/vue-admin-template/purchase/list', // 修改
    type: 'put',
    response: config => {
      const items = purchasedata.items
      const { index, productName } = config.body
      items[index].productName = productName
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/vue-admin-template/purApplyList/list',
    type: 'get',
    response: config => {
      const items = purApplyList.items
      const { page = 1, limit = 10 } = config.query
      const itemList = items.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        code: 20000,
        data: {
          total: items.length,
          items: itemList
        }
      }
    }
  }
]
