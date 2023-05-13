import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'

Vue.use(Router)
// Vue.prototype.$store = store
/* Layout */
import Layout from '@/layout'
import markingRouter from './modules/marking'
import mathmanagementRouter from './modules/mathmanagement'
import classmanagementRouter from './modules/classmanagement.js'
import desktopRouter from './modules/desktop'
import desktopRouter2 from './modules/desktop2'
import ActivitymanagementRouter from './modules/Activitymanagement'
import course1 from '../views/Activitymanagement/course1'
import evaluateRouter from './modules/evaluate'
import userRouter from './modules/user'
import chartsRouter from './modules/charts'
import courseRouter from './modules/course1'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // {
  //   path: '/course1',
  //   name: 'course1',
  //   component: course1
  // },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    // path: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/login/index')
      // component: () => import('@/views/main/index'),

    }]
  },

  // desktopRouter,
  // desktopRouter2,
  markingRouter,
  // mathmanagementRouter,
  // classmanagementRouter,
  // ActivitymanagementRouter,
  evaluateRouter,
  userRouter,
  // chartsRouter,
  // courseRouter,
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    hidden: true,
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    hidden: true,
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // if(store.state.app.userType == 1 )
  // {
  //   constantRoutes.push(desktopRouter)
  //   constantRoutes.push(mathmanagementRouter)
  //   constantRoutes.push(classmanagementRouter)
  // },
  // else if(this.$store.state.app.userType==2)
  // {
  //   constantRoutes.push(desktopRouter2)
  //   constantRoutes.push(markingRouter)
  //   constantRoutes.push(mathmanagementRouter)
  //   constantRoutes.push(ActivitymanagementRouter)
  //   constantRoutes.push(chartsRouter)
  // },
  // else if(this.$store.state.app.userType==3)
  // {
  //   constantRoutes.push(markingRouter)
  //   constantRoutes.push(evaluateRouter)
  //   constantRoutes.push(userRouter)
  // },
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
