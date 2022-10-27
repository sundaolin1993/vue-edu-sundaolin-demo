import Vue from 'vue'
import Vuex from 'vuex'
import localStorage from '@/utils/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: localStorage.userInfo
  },
  getters: {
  },
  mutations: {
    setUserInfo (state, payload) {
      localStorage.userInfo = payload
      state.userInfo = JSON.parse(payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
