<template>
  <div class="container">
    <div class="topBar clearfix">
      <div class="left clearfix">
        <a href="https://github.com" target="_blank" class="icon">
            <svg aria-hidden="true" class="octicon octicon-mark-github" height="32" version="1.1" viewBox="0 0 16 16" width="32"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
        </a>a
        <span class="title">{{title}}</span>
      </div>
      <div class="right">
        <!-- 如果存在token则显示logout，因为只有正常的通过验证的token才会存到本地 -->
        <span class="logOut" v-show="token" @click="logout">logout</span>
      </div>
    </div>
    <transition name="fade" mode="out-in">
        <div class="viewContainer">
          <router-view></router-view>
        </div>
    </transition>
  </div>
</template>

<script>
  import store from '@/vuex/store.js'
  import * as types from '@/vuex/types'
  import {mapState} from 'vuex'
  export default {
    name: 'hello',
    store,
    data () {
      return {

      }
    },
    computed: {
      ...mapState({
        title: state => state.title,
        token: state => state.token
      })
    },
    methods: {
      logout () {
        store.commit(types.LOGOUT)
        // 跳转回首页
        this.$router.push({
          path: '/'
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import 'src/common/style/variable.scss';

  .container{
    text-align: center
  }
  .topBar{
      position: fixed;
      top:0;
      width: 100%;
      box-shadow: 0 1px 8px 1px rgba(0,0,0,0.2);
      height: 50px;
      line-height: 50px;
      background: $themeColor;
      font-size: 0;
      z-index: 999;
      .left {
        height: inherit;
        float: left;
        margin-left: 120px;
        .title{
          display: inline-block;
          font-size: 18px;
        }
        .icon{
          float: left;
          position: relative;
          top: 8px;
          margin-right: 15px;
          height: inherit;
        }
      }
      .right{
        float:right;
        margin-right: 120px;
        .logOut{
          font-size: 16px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .fade-enter-active,.fade-leave-active{
      transition: all 0.2s;
    }
    .fade-enter,.fade-leave-to {
      opacity: 0;
    }
    .viewContainer{
      margin-top: 100px;
    }
</style>
