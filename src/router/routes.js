import index from '@/components/index'
import repository from '@/components/repository'
import error from '@/components/error'
import login from '@/components/login'

const routes = [
  {
    path: '/',
    name: 'index',
    component: index
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

export default routes
