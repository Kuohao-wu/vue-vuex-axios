# my-vue-axios

## 项目由来
自己再学习vue的过程中，发现了这个项目，用来练手非常不错，先把整个项目的架构脉络看一遍，然后边写注释边解读，虽然是一个小小的项目，但是其中用到的前端登录拦截功能却很实用。自己造的过程中，发现关键点就是，路由的配置和拦截，axios拦截器，vuex数据存取三个。然后又优化一下样式和体验。比如顶部导航条的logo的位置问题，logo旁边的文字切换问题，增加了无限下拉加载功能，loading加载样式。

最后也感谢原项目的作者，项目练手十分好，在这里贴出原作者的文章地址： https://segmentfault.com/a/1190000008383094

## 项目结构

``` shell

├── App.vue
├── assets
│   └── logo.png
├── common
│   ├── config     ## 项目通用配置
│   │   ├── api.js  ##  API配置
│   │   └── http.js ##  封装axios配置，拦截器配置文件
│   └── style
│       ├── base.scss     ## 基础样式
│       ├── index.scss    ## 项目样式入口
│       ├── loader.scss   ## loading css
│       └── variable.scss ## scss全局变量
├── components
│   ├── error.vue  ## 404 error
│   ├── home.vue  ## 主页组件
│   ├── index.vue ## 首页路由组件
│   ├── login.vue ## 登录路由组件
│   └── repository.vue ## 仓库展示路由组件
├── main.js
├── router
│   ├── index.js  ## 路由配置、拦截
│   └── routes.js ## 路由分发
└── vuex
    ├── store.js ## vuex数据仓库
    └── types.js ## mutations 常量

```

## 路由拦截逻辑

**第一步: 路由信息配置**
首先在定义路由的时候设置repository的meta属性，使用一个requireAuth属性标注这个路由是需要登录验证的，为之后的拦截立flag。

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


**第二部分：全局路由钩子拦截**

```markdown
1. 设置完路由之后就通过 router.beforeEach钩子来对所有的路由进行拦截，检查路由是否需要验证
2. 如果需要验证
    ————检查vuex中是否存有Token，如果有则直接进入repository路由，展示repository信息
    ————如果vuex中没有Token，则跳转到login组件，要求进行登录。
3. 如果不需要验证
    ————直接进入使用next()放行路由，渲染router中配置好的路由组件
```

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

### 登录跳转

我们在index.vue中，view your repository按钮的router-link是跳转到repository的，为什么不是login呢？因为就是考虑到了已经登录过在本地缓存中有Token的情况。


至于本地没有Token的情况则会有router.beforeEach中进行跳转处理

第一次进入的时候，因为本地没有储存Token，则会进入login的路由，在login的路由中，我们只需要把用户输入的token存到vuex中，再跳转到repository路由。因为获取数据，渲染数据是在repository组件中做的，所以请求也会在repository发起。



### axios http拦截

**http request 拦截**

```javascript
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

```


**http response 拦截**

```javascript

axios.interceptors.response.use(response => response, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 如果返回的状态码是401未授权，说明token无效，则logout清除localStore的token和vuex中的token
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

```

如果Token有效的话，则会返回你的repository信息，然后使用vue渲染数据即可


### 体验优化

登录之后，我们当然想能够保持登录状态一段时间。这个也有几种解决方案比如说 **cookie**,**session**,**localStorage**,**sessionStorage**,这个项目作为简单的登录入门，只使用localStorage来存储数据，大家有兴趣的可以去了解其他几种登录状态保持方法。

我们登录之后，能够看到github返回的数据。但是一刷新之后，页面又跳转到了login，这是怎么回事？不是已经在localStorage里面存储了Token了吗？
虽然存储了Token, 但是localStorage的Token并没有自动加载到vuex里面，而vuex是一刷新就没有了的。

所以我们需要在router的index.js里面加上以下代码:

```javascript

// 当页面刷新的之后，如果localStorage存在Token的话，就把它写入vuex的state里面
if (window.localStorage.token) {
  store.state.token = window.localStorage.getItem('token')
}

```

这样回过头来看我们之前写的 router.beforeEach，是不是当store存在token,就可以直接进入repository路由了

``` javascript
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})
```


### 总结

登录逻辑就这样简单，一开始看会觉得比较绕，但是仔细分析一下，这种绕是有道理的。因为会有两种不同的情况。

1. 已经登录过，在本地存储了Token的————直接进入repository
2. 第一次登录，输入token，存储Token到本地和vuex中
   ————对了，登录成功
   ————错了，清除本地储存的Token和vuex的Token

还有路由的逻辑也比较分散，一部分router.beforeEach中，一部分在拦截器中，还有一部分在login.vue中，但是只要明白了登录的逻辑，也就不难理解这些写法了。


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
