import Layout from '@/layout'

const classmanagementRouter = {
  path: '/classmanagement',
  component: Layout,
  redirect: '/classmanagement',
  name: 'classmanagement',
  meta: {
    title: '评价',
    icon: 'el-icon-headset'
  },
  children: [
    {
      path: 'class',
      component: () => import('@/views/Activitymanagement/class'),
      name: 'class',
      meta: { title: '评价' }
    }

  ]
}
export default classmanagementRouter
