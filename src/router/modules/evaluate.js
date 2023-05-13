import Layout from '@/layout'

const evaluateRouter = {
  path: '/evaluate',
  component: Layout,
  redirect: '/evaluate',
  name: 'evaluate',
  meta: {
    title: '评价管理',
    icon: 'el-icon-edit-outline'
  },
  children: [
    {
      path: 'evaluateManagement',
      component: () => import('@/views/Activitymanagement/evaluateManagement'),
      name: 'evaluateManagement',
      meta: { title: '评价管理' }
    }

  ]
}
export default evaluateRouter
