import Layout from '@/layout'
const contractManageRouter = {
  path: '/contract-manage',
  component: Layout,
  redirect: '/contract-manage/list',
  name: 'contract-manage',
  meta: {
    title: '合同管理',
    icon: 'people'
  },
  alwaysShow: true,
  children: [
    {
      path: 'list',
      component: () => import('@/views/project/contract/contract-list'),
      name: 'contract-list',
      meta: { title: '合同列表' }
    },
    {
      path: 'change',
      component: () => import('@/views/project/contract/contract-change'),
      name: 'contract-change',
      hidden: true,
      meta: { title: '合同变更' }
    },
    {
      path: 'receipt',
      component: () => import('@/views/project/contract/receipt-bill'),
      name: 'receipt',
      hidden: true,
      meta: { title: '收票' }
    },
    {
      path: 'payback',
      component: () => import('@/views/project/contract/payback'),
      hidden: true,
      name: 'payback',
      meta: { title: '回款' }
    },
    {
      path: 'pending-pay',
      component: () => import('@/views/project/contract/pending-pay'),
      name: 'pending-pay',
      meta: { title: '待付款列表' }
    },
    {
      path: 'pending-bill',
      component: () => import('@/views/project/contract/pending-bill'),
      name: 'pending-bill',
      meta: { title: '待开票列表' }
    },
    {
      path: 'pending-invoice',
      component: () => import('@/views/project/contract/pending-invoice'),
      name: 'pending-invoice',
      hidden: true,
      meta: { title: '开票' }
    }
  ]
}
export default contractManageRouter
