import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    LOADING: false,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',

  },
  mutations: {
    set_token(state, token) {
      localStorage.removeItem('token')
      state.token = token;
      localStorage.setItem('token', token)
    },
    // 全屏加载
    showLoading(state) {
      state.LOADING = true
    },
    hideLoading(state) {
      state.LOADING = false
    },
  },
  actions: {
  },
  modules: {
  }
})
