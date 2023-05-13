/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const commenRouter = {
  path: '/commen',
  component: Layout,
  redirect: '/commen/commen-input',
  name: 'commen',
  meta: {
    title: '样式规范',
    icon: 'people'
  },
  children: [
    {
      path: 'commen-input',
      component: () => import('@/views/commen/commen-input'),
      name: 'commenInput',
      meta: { title: '表单页规范' }
    },
    {
      path: 'commen-description',
      component: () => import('@/views/commen/commen-description'),
      name: 'commenDescription',
      meta: { title: '规范描述' }
    },
    {
      path: 'commen-table',
      component: () => import('@/views/commen/commen-table'),
      name: 'commenTable',
      meta: { title: '表格规范' }
    }
  ]
}
export default commenRouter
