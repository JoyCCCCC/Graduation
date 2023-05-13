const Mock = require('mockjs')

const data = Mock.mock({
  'items|100': [{ // 生成10个数组
    id: '@id',
    pid: '@integer(1000, 1100)', // 生成一个1000-1100之间的整数
    name: '@cname', // 生成一个英文名字，cname为中文名字
    description: '@csentence(10, 20)', // 生成一句中文
    price: '@integer(10,100) $',
    edit: '',
    value: '@float(1,2)', // 生成一个2-5之间的浮点数
    display_time: '@datetime', // 生成一个日期
    sales: '@integer(300, 400)',
    dailyReportId: '1',
    createUserName: '@cname',
    day: '@date',
    morningWorkContent: '测试内容',
    afternoonWorkContent: '测试内容2',
    unfinishedWorkContent: '测试内容3',
    coordinateWorkContent: '测试内容4',
    accessory: '@img',
    workPlan: '测试内容4',
    'isOverdue|1': ['0', '1'],
    createTime: '@date'

  }]
})
const communicateData = Mock.mock({
  'items|30': [{
    productName: '项目1',
    'projectSubStatus|1': ['1101', '1201', '1402', '1403'],
    'customerName|1': ['1', '2', '3'],
    time: '@datetime',
    nextCommunicateTime: '@datetime'

  }]
})
const sealApplictionData = Mock.mock({
  'items|17': [{
    sealApplicationNo: 'hxjs2021070101',
    sealUser: '@cname',
    'applyDepartment|1': ['1', '2', '3'],
    'sealName|1': ['1', '2', '3'],
    applyDate: '@datetime',
    useDate: '@datetime',
    'lend|1': ['0', '1'],
    toUnit: '1',
    'applyStatus|1': ['0', '1', '2']
  }]
})
const noticelData = Mock.mock({
  'items|15': [{
    title: '公告1',
    createUserName: '@cname',
    creatTime: '@datetime',
    updataUserName: '@cname',
    publishTime: '@datetime',
    updataTime: '@datetime',
    'status|1': ['0', '1']
  }]
})
module.exports = [
  {
    url: '/vue-admin-template/intergratedoffice/report', // 路径记得要改
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
    url: '/vue-admin-template/intergratedoffice/anoucement/index', // 路径记得要改
    type: 'get',
    response: config => {
      const items = noticelData.items
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
    url: '/vue-admin-template/intergratedoffice/list', // 获取
    type: 'get',
    response: config => {
      const items = sealApplictionData.items
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
    url: '/vue-admin-template/intergratedoffice/conmmunicateList',
    type: 'get',
    response: config => {
      const items = communicateData.items
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

