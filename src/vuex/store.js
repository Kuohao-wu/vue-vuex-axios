import Vuex from 'vuex'
import Vue from 'vue'
import * as types from '@/vuex/types'

Vue.use(Vuex)

const state = {
  title: '',
  token: '',
  isBottom: false
}

const mutations = {
  [types.TITLE] (state, data) {
    state.title = data
  },
  [types.LOGIN] (state, data) {
    localStorage.token = data
    state.token = data
  },
  [types.LOGOUT] (state, data) {
    localStorage.removeItem('token')
    state.token = ''
  },
  [types.ISBOTTOM] (state, data) {
    state.isBottom = data
  }
}

export default new Vuex.Store({
  state,
  mutations
})
