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
              const now = new Date()
              const item = {
                value: Response.data.userWithToken,
                expiry: now.getTime() + 7 * 24 * 60 * 60 * 1000
              }
              localStorage.setItem('adminInfo', JSON.stringify(item))

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
      const itemStr = localStorage.getItem('adminInfo')
      if (!itemStr) return null

      const user = JSON.parse(itemStr)
      const now = new Date()
      if (now.getTime() > user.expiry) {
        localStorage.removeItem('adminInfo')
      } else {
        commit('SET_USER', user.value)
      }
    }
  },
  modules: {
    wordData,
    userList
  }
})
