<template>
  <div>
    <div class="input-group">
      <input type="password" class="input" v-model="token" :placeholder="holderMsg"
      @keydown.enter="login"
      @focus="enter($event)"
      @blur="leave($event)"
      >
      <transition name="fade">
        <span class="submitIcon" v-show="show">→</span>
      </transition>
      <div class="getToken">
        <a href="https://github.com/settings/tokens/" target="_blank">generate your token</a>
      </div>
    </div>
  </div>
</template>

<script>
  import * as types from '@/vuex/types'
  export default {
    data () {
      return {
        token: '',
        show: false,
        holderMsg: 'please enter your token'
      }
    },
    mounted () {
      this.$store.commit(types.TITLE, 'Login')
    },
    methods: {
      login () {
        if (this.token) {
          this.$store.commit(types.LOGIN, this.token)
          // 跳转到repository，发起数据请求
          this.$router.push({
            path: decodeURIComponent(this.$route.query.redirect || '/')
          })
        }
      },
      enter (event) {
        this.show = true
        event.target.setAttribute('placeholder', '')
        event.target.style.width = '320px'
      },
      leave (event) {
        this.show = false
        event.target.setAttribute('placeholder', this.holderMsg)
        event.target.style.width = '250px'
      }
    }
  }
</script>

<style lang="scss">
  @import 'src/common/style/variable.scss';
  @import 'src/common/style/mixin.scss';

  .input{
    border: none;
    width: 250px;
    height: 25px;
    padding: 4px 8px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    transition: all 0.1s;
    &:focus{
      border-bottom: 2px solid $themeColor;
      outline: none;
    }
  }
  .submitIcon{
    margin-left: -20px;
    &.fade-enter-active, &.fade-leave-active {
      transition: all 0.2s;
    }
    &.fade-enter, &.fade-leave-to{
      opacity: 0;
    }
  }
  .getToken{
    margin-top: 50px;
    a{
      @include btn;
    }
  }
</style>
