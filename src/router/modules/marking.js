import Layout from '@/layout'

const markingRouter = {
  path: '/markmanagement',
  component: Layout,
  redirect: '/markmanagement',
  name: 'markmanagement',
  meta: {
    title: '课程管理',
    icon: 'el-icon-collection'
  },
  children: [
    {
      path: 'markForm',
      component: () => import('@/views/Activitymanagement/ActivityForm'),
      name: 'markForm',
      meta: { title: '课程管理' }
    }

  ]
}
export default markingRouter
