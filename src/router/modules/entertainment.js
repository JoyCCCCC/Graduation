import Layout from '@/layout'

const entertainmentRouter = {
  path: '/entertainment',
  component: Layout,
  redirect: 'noRedirect',
  name: '招待费用',
  meta: {
    title: '招待费用',
    icon: 'chart'
  },
  children: [
    {
      path: 'salesentertainmentlist',
      component: () => import('@/views/entertainment/salesEntertainmentList'),
      name: '销售招待列表',
      meta: { title: '销售招待列表', noCache: true }
    },
    {
      path: 'promote',
      component: () => import('@/views/entertainment/promote'),
      name: '招待提额列表',
      meta: { title: '招待提额列表', noCache: true }
    }

  ]
}

export default entertainmentRouter
