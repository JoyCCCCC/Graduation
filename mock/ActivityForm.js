const Mock = require('mockjs')

const data = Mock.mock({
  'items|100': [{ // 生成10个数组
    id: '@id',
    pid: '@integer(1000, 1100)', // 生成一个1000-1100之间的整数
    createusename: '@cname', // 生成一个英文名字，cname为中文名字
    description: '@csentence(10, 20)', // 生成一句中文
    price: '@integer(10,100) $',
    edit: '',
    value: '@float(1,2)', // 生成一个2-5之间的浮点数
    time: '@datetime', // 生成一个日期
    sales: '@integer(300, 400)',
    amount: '@integer(1000, 1100)',
    title: '聚会',
    type: '宴请',
    name: '测试',
    address: '福州大饭店',
    invitedNum: '@integer(0, 10)',
    accompanyNum: '@integer(0, 10)',
    createTime: '@datetime',
    peopleNum: '5',
    applicant: '甲',
    // applytime: '@datetime',
    project: 'project',
    reason: '@csentence(10, 20)'

  }]
})

module.exports = [
  {
    url: '/vue-admin-template/Activitymanagement/ActivityForm', // 路径记得要改

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
