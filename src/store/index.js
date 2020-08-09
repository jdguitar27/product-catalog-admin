import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: null
  },
  getters: {
  },
  mutations: {
    toggleDrawer: state => state.drawer = !state.drawer,
  },
  actions: {
    toggleDrawer({ commit }) {
      commit('toggleDrawer');
    }
  },
  modules: {
    auth
  }
})
