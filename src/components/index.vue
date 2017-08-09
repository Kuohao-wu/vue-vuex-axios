<template>
  <div>
    <router-link :to="{path: '/repository'}">
      <span class="viewRepo">view your repositories</span>
    </router-link>
  </div>
</template>

<script>
  import store from '@/vuex/store'
  import * as types from '@/vuex/types'
  export default {
    beforeRouteEnter (to, from, next) {
      // 配置一个路由钩子，返回对index的时候改变title
      store.commit(types.TITLE, 'github')
      next()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import 'src/common/style/variable.scss';
  @import 'src/common/style/mixin.scss';
  .viewRepo{
     @include btn;
  }
</style>
