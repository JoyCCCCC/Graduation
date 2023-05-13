import Layout from '@/layout'

const desktopRouter = {
  path: '/desktop',
  component: Layout,
  redirect: '/desktop',
  name: 'desktop',
  meta: {
    title: '学生主页',
    icon: 'el-icon-s-order'
  },
  children: [
    {
      path: 'desktop',
      component: () => import('@/views/main/index'),
      name: 'desktop',
      meta: { title: '学生主页' }
    }

  ]
}
export default desktopRouter
