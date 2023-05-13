const Mock = require('mockjs')

const data = Mock.mock({
  'items|20': [{
    'id|+1': 1,
    name: '@cname',
    'relationID|1': ['0', '1', '2'],
    'importantID|1': ['1', '2', '3'],
    linkPhone: '@integer(12000000000, 19999999999)',
    'ownerID|1': ['1', '2', '3'],
    creatTime: '@datetime',
    'position|1': ['1', '2', '3']

  }]
})
const supplierData = Mock.mock({
  'items|30': [{
    supplierName: '@cword(2,4)有限公司',
    'supplierTypeName|1': ['1', '2', '3', '4'],
    'supplierBrandName|1': ['1', '2', '3', '4', '5'],
    'scopeOfBusiness': '1，2',
    'contracterName': '@cname',
    'contractTel': '@integer(12000000000, 19999999999)',
    'contracterPosition|1': ['1', '2', '3'],
    ourCompanyConnecter: '@cname',
    'accountingPeriod|1': '@integer(30, 60) 天',
    'agencyLevel|1': ['1', '2', '3'],
    'relation|1': ['0', '1', '2'],
    createTime: '@datetime',
    createUserName: '@cname'

  }]
})
module.exports = [
  {
    url: '/vue-admin-template/customer/crm_table',
    type: 'get',
    response: config => {
      const items = data.items
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
    url: '/vue-admin-template/customer/supplierlist',
    type: 'get',
    response: config => {
      const items = supplierData.items
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
    url: '/vue-admin-template/customer/crm_table', // 添加
    type: 'post',
    response: config => {
      const { name, relationID, linkPhone, importantID, ownerID, position } = config.body
      const items = data.items
      items.unshift(Mock.mock({
        'name': name,
        'relationID': relationID,
        'importantID': importantID,
        'linkPhone': linkPhone,
        'ownerID': ownerID,
        'position': position,
        'creatTime': '@datetime'
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
    url: '/vue-admin-template/customer/list', // 获取
    type: 'get',
    response: config => {
      const items = data.items
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
