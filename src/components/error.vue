<template>
  <div class="">
    <h1>{{msg}}</h1>
    <a class="back" @click="back" href="javascript:">go back</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '404 not defined !'
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
  @import "src/common/style/variable.scss";
  .back{
    display: inline-block;
    text-decoration: none;
    color: #fff;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    border-radius: 2px;
    box-shadow: 0 0 10px 2px rgba(0,0,0,0.2);
    background: $themeColor;
  }
</style>
