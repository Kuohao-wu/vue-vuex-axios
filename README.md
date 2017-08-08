# my-vue-axios

## 项目由来
自己再学习vue的过程中，发现了这个项目，用来练手非常不错，先把整个项目的架构脉络看一遍，然后边写注释边解读，虽然是一个小小的项目，但是其中用到的前端登录拦截功能却很实用。自己造的过程中，发现关键点就是，路由的配置和拦截，axios拦截器，vuex数据存取三个。然后又优化一下样式和体验。比如顶部导航条的logo的位置问题，logo旁边的文字切换问题。

最后也感谢原项目的作者，项目练手十分好，在这里贴出原作者的文章地址： https://segmentfault.com/a/1190000008383094

## 项目结构
├── App.vue
├── assets
│   └── logo.png
├── common  // 项目通用配置
│   ├── config
│   │   └── http.js // 封装axios配置，拦截器配置文件
│   └── style
│       ├── base.scss  // 基础css
│       ├── index.scss // 项目主css
│       ├── loader.scss // laoding样式
│       └── variable.scss // 全局scss变量
├── components
│   ├── error.vue  // 404 error
│   ├── home.vue  // 主页组件
│   ├── index.vue // 首页路由组件
│   ├── login.vue // 登录路由组件
│   └── repository.vue // 仓库路由组件
├── constant
│   └── api.js   // api配置
├── main.js
├── router
│   ├── index.js  // 路由配置,拦截文件
│   └── routes.js // 路由分发配置
└── vuex
    ├── store.js  // vuex数据仓库
    └── types.js // mutations公共常量

##登录拦截逻辑

* 第一步: 路由拦截*
首先在定义路由的时候设置repository的meta属性，使用一个requireAuth属性说明这个路由是需要登录验证的

``` javascript
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
```

设置完路由之后再通过 router.beforeEach钩子来对所有的路由进行拦截，检查路由是否需要验证,如果需要验证，则检查vuex中是否存有token，如果有则直接进入repository路由，展示repository信息，如果vuex中没有token，则跳转到login组件，要求进行登录。如果不需要验证，则直接进入使用next()放行路由

``` javascript
router.beforeEach((to, from, next) => {
  // 判断路由是否需要验证
  if (to.meta.requireAuth) {
    if (store.state.token) {
      // 如果vuex中存在token，则直接进入repository
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
    // 不需要验证就直接进入
  } else {
    next()
  }
})
```



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
