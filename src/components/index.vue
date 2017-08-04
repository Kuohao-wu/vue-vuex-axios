<template>
  <div>
    <router-link :to="{path: '/repository'}">
      <button class="btn viewRepo">view your repositories</button>
    </router-link>
  </div>
</template>

<script>
  export default {
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import 'src/common/style/variable.scss';
  .btn{
    background:$themeColor;
    border: none;
    border-radius: 2px;
    box-shadow: 0 0 10px 2px rgba(0,0,0,0.2)
  }
  .viewRepo{
      height: 35px;
      padding: 0px 12px;
      outline: none;
      cursor: pointer;
      color: #fff;
  }
</style>
