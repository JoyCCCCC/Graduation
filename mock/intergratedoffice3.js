
const Mock = require('mockjs')

const data = Mock.mock({
  'items|100': [{ // 生成10个数组
    // id: '@id',
    // pid: '@integer(1000, 1100)', // 生成一个1000-1100之间的整数
    name: '@cname', // 生成一个英文名字，cname为中文名字
    // description: '@csentence(10, 20)', // 生成一句中文
    // price: '@integer(10,100) $',
    // edit: '',
    // value: '@float(1,2)', // 生成一个2-5之间的浮点数
    // display_time: '@datetime', // 生成一个日期
    sales: '@integer(300, 400)',
    projectName: '@cname',
    winningBidUserNam: '@cname',
    projectNo: '@integer(1000, 1100)',
    'isOverdue|1': ['0', '1'],
    doneWork: '测试'

  }]
})

module.exports = [
  {
    url: '/vue-admin-template/intergratedoffice/SReport', // 路径记得要改
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
