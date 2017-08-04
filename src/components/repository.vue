<template>
  <div>
    <div class="loader" v-show="isShow">
      <svg class="circular" viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10">
        </circle>
      </svg>
    </div>
    <ul class="repoList">
      <li v-for="item in list" class="listItem clearfix" :key="item.id">
        <div class="left">
            <h2 class="title">{{item.name}}</h2>
            <p class="description">{{item.description || 'no description'}}</p>
            <p class="updatedTime">updated: {{item.updated_at}}</p>
        </div>
        <div class="right">
          <div class="advatar">
            <img :src="item.owner.avatar_url" width="90" height="90">
          </div>
          <a class="viewMoreLink" :href="item.html_url" target="_blank">view more</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import api from '@/constant/api'
  import * as types from '@/vuex/types'
  export default {
    data () {
      return {
        list: [],
        isShow: true
      }
    },
    mounted () {
      this.getRepository()
    },
    methods: {
      getRepository () {
        let params = {
          sort: 'updated'
        }
        this.axios.get(api.repo_list, params)
        .then(res => {
          this.$store.commit(types.TITLE, 'Your repository')
          this.list = res.data
          this.isShow = false
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "src/common/style/loader.scss";
  h2 {
    margin: 0;
    padding: 0;
  }
  .repoList {
    padding: 0;
    margin:0;
    width: 600px;
    margin: 0 auto;
    list-style: none;
    .listItem {
      position: relative;
      height: 130px;
      padding: 20px;
      box-shadow: 0 0 4px rgba(0,0,0,0.3);
      margin-bottom: 30px;
      transition: all 0.3s;
      &:hover{
        cursor: pointer;
        box-shadow: 0px 2px 8px 2px rgba(0,0,0,0.2)
      }
    }
    .left{
      float: left;
      width: 80%;
      text-align: left;
      .description{
        color: #888;
      }
      .updatedTime{
        position: absolute;
        bottom: 5px;
      }
    }
    .right{
      float: right;
      width: 20%;
      text-align: right;
      .viewMoreLink{
        display: inline-block;
        width: 100px;
        position: absolute;
        bottom:10px;
        right: 20px;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.5s;
        padding:6px 12px;
        border-radius: 2px;
        text-decoration: none;
        text-align: center;
        color: #000;
        &:hover{
          background-color: hsla(0,0%,60%,.2);
        }
      }
    }
  }
</style>
