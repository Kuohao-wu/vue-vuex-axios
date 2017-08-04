// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 导入所有的css预配置
import '@/common/style/index.scss'
import axios from '@/common/config/http'

// 将axios挂载到Vue原型上，可以全局使用,this.axios
Vue.prototype.axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }})
