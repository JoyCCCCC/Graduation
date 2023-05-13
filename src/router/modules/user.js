import Layout from '@/layout'

const userRouter = {
  path: '/user',
  component: Layout,
  redirect: '/user',
  name: 'user',
  meta: {
    title: '用户管理',
    icon: 'el-icon-user-solid'
  },
  children: [
    {
      path: 'userManagement',
      component: () => import('@/views/Activitymanagement/userManagement'),
      name: 'userManagement',
      meta: { title: '用户管理' }
    }

  ]
}
export default userRouter
