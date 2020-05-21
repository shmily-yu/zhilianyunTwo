import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    LOADING: false,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    mobile_phone: sessionStorage.getItem('mobile_phone') ? sessionStorage.getItem('mobile_phone') : '',
    mobile_code: sessionStorage.getItem('mobile_code') ? sessionStorage.getItem('mobile_code') : '',
    code: sessionStorage.getItem('code') ? sessionStorage.getItem('code') : '',
  },

  mutations: {
    // 存储token
    set_token(state, token) {
      localStorage.removeItem('token')
      state.token = token;
      localStorage.setItem('token', token)
    },
    // 存储手机号
    set_mobile_phone(state, mobile_phone) {
      sessionStorage.removeItem('mobile_phone')
      state.mobile_phone = mobile_phone;
      sessionStorage.setItem('mobile_phone', mobile_phone)
    },
    // 存储手机验证码
    set_mobile_code(state, mobile_code) {
      sessionStorage.removeItem('mobile_code')
      state.mobile_code = mobile_code;
      sessionStorage.setItem('mobile_code', mobile_code)
    },
    // 存储邀请码
    set_code(state, code) {
      sessionStorage.removeItem('code')
      state.code = code;
      sessionStorage.setItem('code', code)
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
