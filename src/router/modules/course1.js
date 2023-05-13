import Layout from '@/layout'

const courseRouter = {
  path: '/course',
  component: Layout,
  redirect: '/course',
  name: 'course',
  meta: {
    title: '上课',
    icon: 'el-icon-school'
  },
  children: [
    {
      path: 'course1',
      component: () => import('@/views/Activitymanagement/course1'),
      name: 'course1',
      meta: { title: '数据结构之栈的应用' }
    }
    // {
    //   path: 'textbook02',
    //   component: () => import('@/views/Activitymanagement/math'),
    //   name: 'textbook02',
    //   meta: { title: '数据结构之栈的应用' }
    // },
    // {
    //   path: 'textbook11',
    //   component: () => import('@/views/Activitymanagement/math'),
    //   name: 'textbook11',
    //   meta: { title: '数据结构之图的基本概念' }
    // },
    // {
    //   path: 'textbook12',
    //   component: () => import('@/views/Activitymanagement/math'),
    //   name: 'textbook12',
    //   meta: { title: '数据结构之散列查找' }
    // },
    // {
    //   path: 'textbook',
    //   component: () => import('@/views/Activitymanagement/math'),
    //   name: 'textbook',
    //   meta: { title: '数据结构之外部排序' }
    // }
  //   {
  //     path: 'textbook2',
  //     component: () => import('@/views/Activitymanagement/math'),
  //     name: 'textbook2',
  //     meta: { title: '三年级下册' }
  //   },
  //   {
  //     path: 'textbook3',
  //     component: () => import('@/views/Activitymanagement/class'),
  //     name: 'textbook3',
  //     meta: { title: '四年级上册' }
  //   },
  //   {
  //     path: 'textbook4',
  //     component: () => import('@/views/Activitymanagement/class'),
  //     name: 'textbook4',
  //     meta: { title: '四年级下册' }
  //   },
  //   {
  //     path: 'textbook5',
  //     component: () => import('@/views/Activitymanagement/math_g51'),
  //     name: 'textbook5',
  //     meta: { title: '五年级上册' }
  //   },
  //   {
  //     path: 'textbook6',
  //     component: () => import('@/views/Activitymanagement/class'),
  //     name: 'textbook6',
  //     meta: { title: '五年级下册' }
  //   },
  //   {
  //     path: 'textbook7',
  //     component: () => import('@/views/Activitymanagement/class'),
  //     name: 'textbook7',
  //     meta: { title: '六年级上册' }
  //   },
  //   {
  //     path: 'textbook8',
  //     component: () => import('@/views/Activitymanagement/class'),
  //     name: 'textbook8',
  //     meta: { title: '六年级下册' }
  //   }
  ]
  // children: [
  //   {
  //     path: 'textBook',
  //     component: () => import('@/views/Activitymanagement/math'),
  //     name: 'textBook',
  //     meta: { title: '三年级上册' },
  //     children: [
  //       {
  //         path: 'unit',
  //         component: () => import('@/views/Activitymanagement/math'),
  //         name: 'unit',
  //         meta: { title: '时分秒' }
  //       }
  //     ]
  //   }
  // ]
}

export default courseRouter
