export const _stepList = [
  // status  0未完成  1完成  2进行中
  {
    title: '准备', description: '描述1', active: 0, status: 1,
    children: [
      { title: '商机录入', description: '', active: 0, status: 1 }
    ]
  },
  {
    title: '立项', description: '描述2', active: 1, status: 1,
    children: [
      { title: '立项', description: '', active: 0, status: 1 }
    ]
  },
  // {
  //   title: '可研', description: '描述3', active: 2, status: 1,
  //   children: [
  //     { title: '可研', description: '', active: 0, status: 1 }
  //   ]
  // },
  {
    title: '招投标', description: '描述4', active: 2, status: 1,
    children: [
      // { title: '投标', description: '', active: 0, status: 1 },
      { title: '协助投标', description: '', active: 1, status: 1 },
      { title: '询价', description: '', active: 2, status: 1 },
      { title: '报价', description: '', active: 3, status: 1 },
      // { title: '中标', description: '', active: 4, status: 1 },
      { title: '协助中标', description: '', active: 5, status: 1 }
    ]
  },
  {
    title: '实施', description: '描述5', active: 3, status: 1,
    children: [
      { title: '签合同', description: '', active: 0, status: 1 },
      // { title: '实施', description: '', active: 1, status: 1 },
      { title: '供货', description: '', active: 2, status: 1 },
      { title: '原厂交付', description: '', active: 3, status: 1 }
    ]
  },
  {
    title: '验收', description: '描述6', active: 4, status: 1,
    children: [
      { title: '到货验收', description: '', active: 0, status: 1 }
      // { title: '初验', description: '', active: 1, status: 0 },
      // { title: '试运行', description: '', active: 2, status: 0 },
      // { title: '终验', description: '', active: 2, status: 0 }
    ]
  },
  {
    title: '运维', description: '描述7', active: 5, status: 1,
    children: [
      // { title: '满意度', description: '', active: 0, status: 1 },
      // { title: '结束-待回款', description: '', active: 1, status: 1 },
      // { title: '结束-质保金', description: '', active: 2, status: 1 },
      { title: '结束', description: '', active: 0, status: 1 }
    ]
  }
]

export const projectForm = {
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
}
// 合同
export const contractForm = {
  'aContractNo': '',
  'bContractNo': '',
  'contractName': '',
  'contractAmount': '',
  'incomeExpenseTypeId ': 1, // 收支类型：1-收入，2-支出
  'incomeExpenseDetailId': 1, // 收支明细：1-项目，2-技术服务，3-采购，4-外包
  'signDate': '',
  'startDate': '',
  'endDate': '',
  'contractQuantity': 1, // 合同份数
  'receiveMoneyRequire': '',
  'warranty': 3.33,
  'warrantyPeriod': 234234, // 质保期：单位“月”
  'deliveryDate': 3, //
  'mainClause': '',
  'deliveryAmount': '',
  'serviceAmount': '',
  'deliveryTaxRate': '',
  'serviceTaxRate': '',
  'accessory': '',
  'aCompanyId': 222, // 甲方公司ID，若无传0
  'aCompanyName': '',
  'acontractorId': 1, // 甲方签订人Id，若无传0
  'acontractorName': '',
  'aContractWay': '',
  'aContractAddress': '',
  'bCompanyId': 222, // 乙方公司ID，若无传0
  'bCompany': 1,
  'bContractorId': 1, // 乙方联系人ID
  'bContractorName': 1,
  'bContractWay': '',
  'bContractAddress': '',
  'isInstallDebug': 1,
  'additionalConcordat': '补充合同',
  'businessOwner': '',
  'Payment': [ // 付款
    {
      'projectContractMoneyId': 0, // 回款Id
      'projectMainStatus': 4, // 项目主状态
      'projectSubStatus': 1, // 项目阶段
      'expectedPaymentData': '2021-5-30', // 回款日期
      'amount': 11, // 金额
      'hasPaymentAmount': 111, // 已回款金额
      'hasInvoiceAmount': 111, // 已开票金额
      'noticeDays': 1, // 提前N天通知
      'paymentTypeId': 1 // 付款方式:1-转账，2-支票，3-银承
    },
    {
      'projectContractMoneyId': 0, // 回款Id
      'projectMainStatus': 4, // 项目主状态
      'projectSubStatus': 1, // 项目阶段
      'expectedPaymentData': '2021-5-30', // 回款日期
      'amount': 11, // 金额
      'hasPaymentAmount': 111, // 已回款金额
      'hasInvoiceAmount': 111, // 已开票金额
      'noticeDays': 1, // 提前N天通知
      'paymentTypeId': 1 // 付款方式:1-转账，2-支票，3-银承
    }
  ]
}

// 合同
export const contractFormInfo = {
  'noDuesAmount': '111',
  'ContractAmount': '1111'
}
export const signFormInfo = {
  'aCompanyName': 'xxx公司',
  'acontractorName': '张三',
  'aContractWay': '13076521305',
  'aContractAddress': '福建省福州市',
  'bCompany': '海峡基石',
  'bContractorName': '李四',
  'isInstallDebug': '是',
  'businessOwner': '王五'
}
export const curFormInfo = {
  'title': '123',
  'isOutsource': '否',
  'productTypeId': '硬件',
  'remark': 'shsu',
  'purchaseTypeId': '合同内',
  'consignee': '张三',
  'receivingAddress': '福建省',
  'contactNumber': '13809872345',
  'areaId': '福建省', // 区域
  'maintenancePeriod': '2021-6-31',
  'expectedArrivalTime': '2021-6-31'
}

export const getCurrentComponent = (active, subActive, type) => {
  const componentMap = {
    // 'create': 'StandUp', // 立项
    // 'income': 'ContractInfo',
    // 'expend': 'ContractInfo',
    // 'procurement': 'PurchaseApply',
    // 'purchaseContract': 'PurchaseApplyList',
    // 'assistBid': 'AssistBid'
    '1-0': 'StandUp', // 立项
    '2-1': 'AssistInBid', // 协助投标
    '2-2': 'InquiryPrice', // 询价
    '2-3': 'QuotedPrice', // 报价
    '2-5': 'AssistBid', // 协助中标
    '3-0': 'ContractList',
    '3-2': 'PurchaseApplyList',
    '3-3': 'Delivery', // 原厂交付
    '4-0': 'Acceptance'// 到货验收
    // '4-0': 'PurchaseApply',
    // '3-2': 'ContractInfo'
  }
  const result = `${active}-${subActive}`
  if (type && type === 'procurement' && result === '3-2') { // 暂时特殊处理
    return 'PurchaseApply'
  }
  if (type && ['income', 'expend'].includes(type) && result === '3-0') { // 暂时特殊处理
    return 'ContractInfo'
  }
  // if (type && type === 'expend' && result === '3-0') { // 暂时特殊处理
  //   return 'ContractList'
  // }

  return componentMap[result] || null
}

// export const defaulActive = {
//   '1101': {
//     active: 1,
//     subActive: 0
//   },
//   // '1201': {
//   //   active: 1,
//   //   subActive: 0
//   // },
//   '1201': { // 招投标 协助投标
//     active: 2,
//     subActive: 1
//   },
//   // '1402': {
//   //   active: 2,
//   //   subActive: 5
//   // },
//   '1402': {
//     active: 2,
//     subActive: 2
//   },
//   '1403': { // 招投标 询价
//     active: 2,
//     subActive: 3
//   },
//   '1501': {
//     active: 3,
//     subActive: 0
//   },
//   '1503': {
//     active: 3,
//     subActive: 2
//   },
//   '1504': {
//     active: 4,
//     subActive: 0
//   }
// }
export const defaulActive = {
  // 详情进入
  '1101': { // 准备点
    active: 0,
    subActive: 0
  },
  '1201': { // 立项
    active: 1,
    subActive: 0
  },
  '1402': { // 协助投标
    active: 2,
    subActive: 1
  },
  '1403': { // 询价
    active: 2,
    subActive: 2
  },
  '1404': { // 报价
    active: 2,
    subActive: 3
  },
  '1406': { // 协助中标
    active: 2,
    subActive: 5
  },
  '1501': { // 实施签合同
    active: 3,
    subActive: 0
  },
  '1503': { // 供货
    active: 3,
    subActive: 2
  },
  '1504': { // 原厂交互
    active: 3,
    subActive: 3
  },
  '1601': { // 到货验收
    active: 4,
    subActive: 0
  },
  '1710': { // 到货验收
    active: 5,
    subActive: 0
  },
  // 按钮进入
  'standup': { // 立项
    active: 1,
    subActive: 0
  },
  'assistinbid': { // 协助投标
    active: 2,
    subActive: 1
  },
  'inquirystart': { // 询价
    active: 2,
    subActive: 2
  },
  'quotedPrice': { // 报价
    active: 2,
    subActive: 3
  },
  'assistBid': { // 协助中标
    active: 2,
    subActive: 5
  },
  'deliver': { // 原厂交互
    active: 3,
    subActive: 3
  },
  'check': { // 到货验收
    active: 4,
    subActive: 0
  }
}

