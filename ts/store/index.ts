import Vue from 'vue'
import Vuex from 'vuex'
import chord_store from './chord';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    chord: chord_store
  }
})
