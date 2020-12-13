import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import wordData from './wordData/wordsData'
import userList from './users/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, info) {
      state.user = info
    }
  },
  actions: {
    LoginWithEmail({ commit }, form) {
      console.log('fire')
      return new Promise((resolve, reject) => {
        Axios.post('https://terms.emis.ge/test/api/Account/Login', form)
          .then(Response => {
            if (Response.data.success) {
              let userData = Response.data.userWithToken
              localStorage.setItem('adminInfo', userData)

              commit('SET_USER', Response.data.userWithToken)
            }
            resolve(Response.data)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    }
  },
  modules: {
    wordData,
    userList
  }
})
