import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'

Vue.use(VueRouter)

// 路由规则对象
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName:'login' */ '@/views/login/index')
  }, {
    path: '/',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName:'layout' */ '@/views/layout/index'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName:'home' */ '@/views/home/index')
      }, {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName:'role' */ '@/views/role/index')
      }, {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName:'menu' */ '@/views/menu/index')
      }, {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName:'resource' */ '@/views/resource/index')
      }, {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName:'course' */ '@/views/course/index')
      }, {
        path: '/saveOrUpdateCourse/:courseId',
        name: 'saveOrUpdateCourse',
        props: true,
        component: () => import(/* webpackChunkName:'saveOrUpdateCourse' */ '@/views/course/saveOrUpdateCourse')
      }, {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName:'user' */ '@/views/user/index')
      }, {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName:'advert' */ '@/views/advert/index')
      }, {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName:'user' */ '@/views/user/index')
      }, {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName:'advert-space' */ '@/views/advert-space/index')
      }, {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName:'menu-create' */ '@/views/menu/create')
      }, {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName:'menu-edit' */ '@/views/menu/edit')
      }, {
        path: '/role/:roleid/allocMenu',
        name: 'alloc-menu',
        props: true,
        component: () => import(/* webpackChunkName:'alloc-menu' */ '@/views/role/alloc-menu')
      }
    ]
  }, {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName:'error-page' */ '@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 判断 to 路由是否需要进行身份认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 验证 vuex 的store 中的登录用户信息是否存储
    if (!store.state.userInfo) {
      Message({
        message: '请先登录',
        type: 'warning'
      })
      return next({
        name: 'login',
        query: {
          redirect: to.fullPath // 登录之后，重定向的地址
        }
      })
    }
  }
  next()
})

export default router
