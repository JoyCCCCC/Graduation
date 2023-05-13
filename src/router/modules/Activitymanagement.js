/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const ActivitymanagementRouter = {
  path: '/Activitymanagement',
  component: Layout,
  redirect: '/Activitymanagement',
  name: 'Activitymanagement',
  meta: {
    title: '评价',
    icon: 'el-icon-chat-line-square'
  },
  children: [
    {
      path: 'ActivityForm',
      component: () => import('@/views/Activitymanagement/evaluate'),
      name: 'ActivityForm',
      meta: { title: '评价' }
    }

  ]
}
export default ActivitymanagementRouter
