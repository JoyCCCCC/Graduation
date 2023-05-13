import Layout from '@/layout'

const noticeRouter = {
  path: '/noticemanagement',
  component: Layout,
  redirect: '/noticemanagement',
  name: 'noticemanagement',
  meta: {
    title: '通知',
    icon: 'el-icon-collection'
  },
  children: [
    {
      path: 'noticeForm',
      component: () => import('@/views/main/broad'),
      name: 'noticeForm',
      meta: { title: '批阅' }
    }

  ]
}
export default noticeRouter
