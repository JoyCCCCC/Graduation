import Layout from '@/layout'

const desktopRouter2 = {
  path: '/desktop2',
  component: Layout,
  redirect: '/desktop2',
  name: 'desktop2',
  meta: {
    title: '教师主页',
    icon: 'el-icon-s-order'
  },
  children: [
    {
      path: 'desktop2',
      component: () => import('@/views/main/index2'),
      name: 'desktop2',
      meta: { title: '教师主页' }
    }

  ]
}
export default desktopRouter2
