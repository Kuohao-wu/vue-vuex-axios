import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import repository from '@/components/repository'
import error from '@/components/error'
import login from '@/components/login'
import store from '@/vuex/store'
import * as types from '@/vuex/types'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      // 配置一个路由钩子，返回对index的时候改变title
      beforeEnter: (to, from, next) => {
        store.commit(types.TITLE, 'github')
        next()
      }
    }, {
      path: '/repository',
      name: 'repository',
      component: repository,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/login',
      name: 'login',
      component: login
    }, {
      // 配置错误页面路由
      path: '*',
      name: 'error',
      component: error
    }
  ]
})

// 如果页面刷新，如果本地有token则从localstorage中获取token
if (localStorage.getItem('token')) {
  store.commit(types.LOGIN, localStorage.getItem('token'))
}

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.token) {
      // 如果vuex中存在token，则进入repository
      next()
    } else {
      // 不存在Token跳转到login
      next({
        path: '/login',
        // 带上repository的路径，成功登录之后就转到repository
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    // 不需要验证则直接进去repository
    next()
  }
})

export default router
