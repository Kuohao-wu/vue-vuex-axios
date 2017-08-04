import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/vuex/store'
import * as types from '@/vuex/types'

Vue.use(Router)

const router = new Router({
  routes
})

// 如果页面刷新，如果本地有token则从localstorage中获取token，免登陆
if (localStorage.getItem('token')) {
  store.commit(types.LOGIN, localStorage.getItem('token'))
}

// 全局路由拦截
router.beforeEach((to, from, next) => {
  // 当进入repository路由的时候，判断repository是否需要验证，是则进入验证阶段
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
    // 其他路由不需要验证则直接进入
  } else {
    next()
  }
})

export default router
