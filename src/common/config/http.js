import axios from 'axios'
import store from '@/vuex/store'
import * as types from '@/vuex/types'
import router from '@/router/index'
import api from '@/common/config/api'

// 配置axios
axios.defaults.timeout = 50000
axios.defaults.baseURL = api.baseURL

// axios 拦截器

// http request 拦截
axios.interceptors.request.use(config => {
  // 如果存在token则给在请求头加上Authorization
  if (store.state.token) {
    config.headers.Authorization = `token ${store.state.token}`
  }
  // 返回配置
  return config
}, err => {
  return Promise.reject(err)
})

// http response 拦截
axios.interceptors.response.use(response => response, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 如果返回的状态码是401未授权，则logout清除localStore的token和vuex中的token
        store.commit(types.LOGOUT)
        // 跳转到login
        router.replace({
          path: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
    }
  }
  return Promise.reject(error.response.data)
})

export default axios
