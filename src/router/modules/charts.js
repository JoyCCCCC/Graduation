/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: '/charts',
  name: 'charts',
  meta: {
    title: '数据分析',
    icon: 'el-icon-s-data'
  },
  children: [
    {
      path: 'data',
      component: () => import('@/views/Activitymanagement/data2'),
      name: 'data',
      meta: { title: '数据分析' }
    }
    // {
    //   path: 'line',
    //   component: () => import('@/views/charts/line'),
    //   name: 'LineChart',
    //   meta: { title: 'Line Chart', noCache: true }
    // },
    // {
    //   path: 'mix-chart',
    //   component: () => import('@/views/charts/mix-chart'),
    //   name: 'MixChart',
    //   meta: { title: 'Mix Chart', noCache: true }
    // }
  ]
}

export default chartsRouter
