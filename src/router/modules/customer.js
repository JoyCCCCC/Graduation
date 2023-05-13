import Layout from '@/layout'

const customerRouter = {
  path: '/crm',
  component: Layout,
  redirect: 'crm/customer',
  name: '合作方管理',
  meta: {
    title: '合作方管理',
    icon: 'people'
  },
  children: [
    {
      path: 'customer',
      component: () => import('@/views/crm/customer'),
      name: '客户列表',
      meta: { title: '客户列表' }
    },
    // {
    //   path: 'test_page',
    //   component: () => import('@/views/customer/testpage'),
    //   name: '测试',
    //   meta: { title: '测试' }
    // },
    {
      path: 'supplier_add_edit',
      component: () => import('@/views/crm/supplier_add_edit'),
      name: '添加供应商',
      meta: { title: '添加供应商' },
      hidden: true
    },
    {
      path: 'supplier',
      component: () => import('@/views/crm/supplier'),
      name: '供应商管理',
      meta: { title: '供应商管理' }
    }

  ]
}
export default customerRouter
