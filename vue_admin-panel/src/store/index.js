import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import wordData from './wordData/wordsData'
import userList from './users/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: null
  },
  getters: {
    user(state) {
      return state.user
    },
    token(state) {
      return state.token
    }
  },
  mutations: {
    SET_USER(state, info) {
      if (info.userRole.userRoleId === 2) {
        state.user = info
        state.token = info.accessToken
      }
    }
  },
  actions: {
    LoginWithEmail({ commit }, form) {
      return new Promise((resolve, reject) => {
        Axios.post('https://terms.emis.ge/test/api/Account/Login', form)
          .then(Response => {
            if (Response.data.success) {
              let userData = JSON.stringify(Response.data.userWithToken)
              localStorage.setItem('adminInfo', userData)

              commit('SET_USER', Response.data.userWithToken)
            }
            resolve(Response.data)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },
    logOutUser({ commit }) {
      localStorage.removeItem('adminInfo')
      commit('SET_USER', null)
    },
    logUser({ commit }) {
      let user = JSON.parse(localStorage.getItem('adminInfo'))
      if (user) {
        commit('SET_USER', user)
      }
    }
  },
  modules: {
    wordData,
    userList
  }
})
