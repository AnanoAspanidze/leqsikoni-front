import Vue from 'vue'
import Vuex from 'vuex'

import wordData from './wordData/wordsData'
import userList from './users/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    wordData,
    userList
  }
})
