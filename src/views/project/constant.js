/**
 * 商机管理
 */
export const bhandleOpinions = [{ value: 2, label: '跟踪中' }, { value: 1, label: '安排跟踪' }, { value: 3, label: '无效' }]
export const bindustryNameOptions = [{ value: 1, label: 'GA' }, { value: 2, label: 'GB' }]
export const bsecretRelatedOptions = [{ value: 1, label: '否' }, { value: 2, label: '是' }]
export const bproductTypeIdOptions = [{ value: 1, label: '网络硬件' }, { value: 2, label: '算法' }]

/**
 * 项目相关
 */
export const secretRelatedOptions = [{ value: false, label: '否' }, { value: true, label: '是' }]

export const industryOptions = [{ value: 1, label: 'GA' }, { value: 2, label: '公安' }, { value: 3, label: '涉密' }]

export const productTypeIdOptions = [{ value: 1, label: '网络硬件' }, { value: 2, label: '装饰装修' }, { value: 3, label: '算法' }]

export const projectTypeOptions = [{ value: 1, label: '渠道' }, { value: 2, label: '集成' }]

export const projectBtnType = {
  STAND_UP: 'standUp', // 立项
  EDIT: 'edit', // 编辑
  ABOLISH: 'abolish', // 废止
  FOLLOW: 'follow', // 跟进记录
  FEASIBILITY: 'feasibility', // 可研
  ASSIST_TENDER: 'assistTender', // 协助投标
  TENDER_OVER: 'tenderOver', // 投标完成

  INQUIRY: 'inquiry', // 询价
  INQUIRY_OVER: 'inquiryOver', // 询价完成
  BUDGET: 'budget', // 预算录入
  OFFER_PRICE: 'offerPrice', // 报价
  ASSIST_BID: 'assistBid', // 协助中标
  SIGN_CONTRACT: 'signContract', // 签合同
  INCOME_CONTRACT: 'incomeContract', // 收入合同
  EXPEND_CONTRACT: 'expendContract', // 收入合同
  SUPPLY_GOODS: 'supplyGoods', // 供货
  PURCHASE_APPLY: 'purchaseApply', // 采购申请
  ORIGINAL_INTERACTE: 'originalInteracte', // 原厂交互
  GOODS_CHECK: 'goodsCheck', // 到货验收
  OVER: 'over', // 结束
  DETAIL: 'detail' // 查看详情
}

// 集成按钮文字
export const btnImplode = {
  '1101': [ // 准备
    { type: projectBtnType.STAND_UP, name: '立项' },
    { type: projectBtnType.EDIT, name: '修改' }
  ]
  // '1201': [// 立项
  //   { type: projectBtnType.ASSIST_TENDER, name: '协助投标' }
  // ]
}

// 渠道按钮文字
export const btnChannel = {
  '1101': [ // 准备
    { type: projectBtnType.STAND_UP, name: '立项' },
    { type: projectBtnType.EDIT, name: '修改' }
  ],
  '1201': [// 立项
    { type: projectBtnType.ASSIST_TENDER, name: '协助投标' }
  ],
  '1402': [ // 协助投标完成  点击按钮发起接口请求 进入询价阶段
    { type: projectBtnType.TENDER_OVER, name: '投标完成' }
  ],
  '1403': [ // 询价
    { type: projectBtnType.INQUIRY, name: '询价' },
    { type: projectBtnType.INQUIRY_OVER, name: '询价完成' },
    { type: projectBtnType.BUDGET, name: '预算录入' }
  ],
  '1404': [ // 点击询价完成后的状态   报价
    { type: projectBtnType.OFFER_PRICE, name: '报价' },
    { type: projectBtnType.ASSIST_BID, name: '协助中标' },
    { type: projectBtnType.BUDGET, name: '预算录入' }
  ],
  '1406': [ // 协助中标
    { type: projectBtnType.SIGN_CONTRACT, name: '签合同' },
    { type: projectBtnType.BUDGET, name: '预算录入' }
  ],
  '1501': [// 签合同
    { type: projectBtnType.INCOME_CONTRACT, name: '收入合同' },
    { type: projectBtnType.EXPEND_CONTRACT, name: '支出合同' },
    { type: projectBtnType.SUPPLY_GOODS, name: '供货' },
    { type: projectBtnType.BUDGET, name: '预算录入' }
  ],
  '1503': [ // 供货
    { type: projectBtnType.PURCHASE_APPLY, name: '采购申请' },
    { type: projectBtnType.ORIGINAL_INTERACTE, name: '原厂交互' },
    { type: projectBtnType.BUDGET, name: '预算录入' }
  ]
}

// 集成按钮文字
// export const btnImplode = {
//   '1101': [ // 准备
//     { type: 'create', name: '立项' },
//     { type: 'edit', name: '修改' }
//   ],
//   '1201': [// 立项
//     { type: 'research', name: '可研' }
//   ],
//   '1301': [// 可研
//     { type: 'editResearch', name: '编辑可研' }
//   ],
//   '1401': [// 投标
//     { type: 'editResearch', name: '询价' }
//   ],
//   '1403': [// 询价
//     { type: 'inquiryPrice', name: '询价' },
//     { type: 'quotedPrice', name: '询价完成' },
//     { type: 'budget', name: '预算录入' }
//   ],
//   '1404': [// 报价
//     { type: 'quotedPrice', name: '报价' },
//     { type: 'assistBid', name: '协助中标' },
//     { type: 'budget', name: '预算录入' }
//   ],
//   '1406': [// 协助中标
//     { type: 'contract', name: '签合同' },
//     { type: 'budget', name: '预算录入' }
//   ],
//   '1501': [// 签合同
//     { type: 'income', name: '收入合同' },
//     { type: 'expend', name: '支出合同' },
//     { type: 'supply', name: '实施' },
//     { type: 'budget', name: '预算录入' }
//   ],
//   '1502': [// 实施
//     { type: 'income', name: '采购申请' },
//     { type: 'expend', name: '外包申请' },
//     { type: 'supply', name: '初试' },
//     { type: 'supply', name: '实施进度' },
//     { type: 'budget', name: '预算录入' }
//   ],
//   '1602': [// 初试
//     { type: 'over', name: '试运行' },
//     { type: 'over', name: '实施进度' },
//     { type: 'budget', name: '预算录入' }
//   ],
//   '1603': [// 试运行
//     { type: 'over', name: '终验' },
//     { type: 'over', name: '实施进度' },
//     { type: 'budget', name: '预算录入' }
//   ],
//   '1604': [// 终验
//     { type: 'over', name: '满意度' },
//     { type: 'over', name: '实施进度' },
//     { type: 'budget', name: '预算录入' }
//   ],
//   '1701': [// 满意度
//     { type: 'over', name: '结束' },
//     { type: 'budget', name: '预算录入' }
//   ],
//   '1710': [ // 结束

//   ]
// }

// // 渠道按钮文字
// export const btnChannel = {
//   '1101': [ // 准备
//     { type: 'standup', name: '立项' },
//     { type: 'edit', name: '修改' }
//   ],
//   '1201': [// 立项
//     { type: 'assistinbid', name: '协助投标' }
//   ],
//   '1402': [ // 协助投标
//     { type: 'inquirystart', name: '询价' }
//   ],
//   '1403': [// 询价
//     { type: 'inquiryPrice', name: '询价' },
//     { type: 'inquiryover', name: '询价完成' },
//     { type: 'budget', name: '预算录入' }
//   ],
//   '1404': [// 报价
//     { type: 'quotedPrice', name: '报价' },
//     { type: 'assistBid', name: '协助中标' },
//     { type: 'budget', name: '预算录入' }
//   ],
//   '1406': [// 协助中标
//     { type: 'contractstart', name: '签合同' },
//     { type: 'budget', name: '预算录入' }
//   ],
//   '1501': [// 签合同
//     { type: 'income', name: '收入合同' },
//     { type: 'expend', name: '支出合同' },
//     { type: 'supplystart', name: '供货' },
//     { type: 'budget', name: '预算录入' }
//   ],
//   '1503': [// 供货
//     { type: 'procurement', name: '采购申请' },
//     { type: 'deliver', name: '原厂交互' },
//     { type: 'budget', name: '预算录入' }
//   ],
//   '1504': [// 原厂交互
//     { type: 'check', name: '到货验收' },
//     { type: 'budget', name: '预算录入' }
//   ],
//   '1601': [// 到货验收
//     { type: 'over', name: '结束' },
//     { type: 'budget', name: '预算录入' }
//   ],
//   '1710': []
// }
