import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import axios from '../plugins/axios'
import wordData from './wordData/wordsData'
import userList from './users/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    token: null,
    pageInfo: {}
  },
  getters: {
    user(state) {
      return state.user
    },
    token(state) {
      return state.token
    },
    pageInfo(state) {
      return state.pageInfo
    }
  },
  mutations: {
    SET_USER(state, info) {
      if (info.userRole.userRoleId === 2) {
        state.user = info
        state.token = info.accessToken
      }
    },
    SET_INFO(state, info) {
      state.pageInfo = info
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
    },
    getAboutInfo({ commit }) {
      axios.get(`editcontactdetails/1`).then(result => {
        commit('SET_INFO', result.data)
      })
    },
    editAboutInfo(_, info) {
      return new Promise((resolve, reject) => {
        axios.post(`editcontact`, info).then(result => {
          if (result.data.success) {
            resolve(result.data.message)
          } else {
            reject(result.data.message)
          }
        })
      })
    }
  },
  modules: {
    wordData,
    userList
  }
})
