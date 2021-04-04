import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activePath: '',
  },
  mutations: {
    saveMenuStatusVuex(state ,activePath) {
      state.activePath = activePath
    }
  },
  actions: {
  },
  modules: {
  }
})
