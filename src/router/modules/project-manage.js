import Layout from '@/layout'
const projectManageRouter = {
  path: '/project',
  component: Layout,
  redirect: '/project/manage',
  name: 'Broject',
  meta: {
    title: '项目管理',
    icon: 'people'
  },
  children: [
    {
      path: 'manage',
      component: () => import('@/views/project/manage'),
      props: { incomeExpensesType: 1 },
      name: 'manage',
      meta: { title: '项目管理' }
    },

    // {
    //   path: 'abolish',
    //   component: () => import('@/views/project/abolish'),
    //   name: 'abolish',
    //   meta: { title: '项目废止' }
    // },
    {

      path: 'analysis',
      component: () => import('@/views/project/analysis'),
      name: 'analysis',
      hidden: true,
      meta: { title: '废止分析' }
    },
    // {
    //   path: 'projectBudget',
    //   component: () => import('@/views/project/projectBudget'),
    //   name: 'projectBudget',
    //   hidden: true,
    //   meta: { title: '项目预算' }
    // },

    // {
    //   path: 'stand-up',
    //   component: () => import('@/views/project/stand-up'),
    //   name: 'stand-up',
    //   meta: { title: '立项' }
    // },
    {
      path: 'detail/:projectId/:type?',
      component: () => import('@/views/project/detail'),
      name: 'detail',
      hidden: true,
      meta: { title: '项目详情' }
    },
    // {
    //   path: 'income-contract',
    //   component: () => import('@/views/project/contract/income-contract'),
    //   name: 'income-contract',
    //   hidden: true,
    //   meta: { title: '收入合同' }
    // },
    // {
    //   path: 'expenditure-contract/:type?',
    //   component: () => import('@/views/project/contract/expend-contract'),
    //   name: 'expenditure-contract',
    //   hidden: true,
    //   meta: { title: '支出合同' }
    // },
    {
      path: 'contract-info/:entryType/:contractId',
      component: () => import('@/views/project/contract-detail'),
      name: 'contract-detail',
      hidden: true,
      meta: { title: '合同详情' }
    },
    // {
    //   path: 'list-contract',
    //   component: () => import('@/views/project/contract/list-contract'),
    //   name: 'list-contract',
    //   meta: { title: '合同列表' }
    // },
    {
      path: 'invoicing-application/:projectContractMoneyId',
      component: () => import('@/views/project/contract/invoicing-application'),
      name: 'invoicing-application',
      hidden: true,

      meta: { title: '开票申请' }
    },
    // {
    //   path: 'pur-application',
    //   component: () => import('@/views/project/purchase/pur-application'),
    //   name: 'pur-application',
    //   meta: { title: '采购申请' }
    // },
    {
      path: 'pur-contract/:projectId/:projectPurchaseApplyId',
      component: () => import('@/views/project/purchase/pur-contract'),
      name: 'pur-contract',
      hidden: true,
      meta: { title: '采购合同' }
    },
    {
      path: 'purchase',
      component: () => import('@/views/project/purchase/purindex'),
      hidden: true,
      name: 'purindex',
      meta: { title: '采购清单' }
    },
    {
      path: 'purpay',
      component: () => import('@/views/project/purchase/purpay'),
      name: 'purindex',
      hidden: true,
      meta: { title: '付款申请' }
    },
    {
      path: 'business-manage',
      component: () => import('@/views/project/business/business-manage'),
      name: 'business-manage',
      meta: { title: '商机管理' }
    },
    {
      path: 'business-detail/:id',
      component: () => import('@/views/project/business/business-detail'),
      name: 'business-detail',
      meta: { title: '商机详情' },
      hidden: true
    },
    {
      path: 'business-handle/:id',
      component: () => import('@/views/project/business/business-handle'),
      name: 'business-handle',
      meta: { title: '商机处理' },
      hidden: true
    }
    // {
    //   path: 'choosepurlist',
    //   component: () => import('@/views/project/purchase/choosepurlist'),
    //   name: 'choosepurlist',
    //   meta: { title: '选择采购单' }
    // },
    // {
    //   path: 'QuotedPrice',
    //   component: () => import('@/views/project/bid/QuotedPrice'),
    //   name: 'QuotedPrice',
    //   meta: { title: '报价' }
    // },
    // {
    //   path: 'communicationRecord',
    //   component: () => import('@/views/project/communicationRecord'),
    //   name: 'communicationRecord',
    //   meta: { title: '沟通记录' }
    // }
  ]
}
export default projectManageRouter
