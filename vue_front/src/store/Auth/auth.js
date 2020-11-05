/* eslint-disable no-unused-vars */
import axios from '@/plugins/axios'
import router from '@/router'

const auth = {
  namespaced: true,
  state: {
    token: null,
    authMessage: null
  },
  getters: {
    token(state) {
      return state.token
    },
    message(state) {
      return state.authMessage
    }
  },
  mutations: {
    SET_MESSAGE(state, message) {
      state.authMessage = message
    },
    SET_TOKEN(state, token) {
      if (localStorage.getItem('emisToken')) {
        state.token = JSON.parse(localStorage.getItem('emisToken'))
      } else {
        state.token = token
        localStorage.setItem('emisToken', JSON.stringify(token))
      }
    },
    CLEAR_TOKEN(state) {
      state.token = null
    }
  },
  actions: {
    registerUserWithEmail({ commit, rootState }, data) {
      rootState.isLoading = true
      return new Promise(resolve => {
        axios
          .post('Account/SignUp', data)
          .then(Response => {
            commit('SET_MESSAGE', Response.data)
            rootState.isLoading = false
            // გაეშვას then ბლოცკი Singing რეგისტრაციის გვერდზე
            resolve(true)
          })
          .catch(error => {
            Promise.reject(error)
          })
      })
    },
    LoginWithEmail({ commit, dispatch, rootState }, data) {
      rootState.isLoading = true
      return new Promise(resolve => {
        axios
          .post('Account/Login', data)
          .then(Response => {
            if (Response.data.success) {
              let userData = Response.data.userWithToken
              let token = Response.data.userWithToken.accessToken

              commit('SET_USER', userData, { root: true })
              commit('SET_TOKEN', token)
              rootState.isLoading = false
              // გადამისამართება მთავარ გვერდზე
              router.push({ path: '/' })
            } else {
              rootState.isLoading = false
              commit('SET_MESSAGE', Response.data)
              // გაეშვას then ბლოცკი Singing ლოგინის გვერდზე
              resolve(true)
            }
          })
          .catch(err => {
            Promise.reject(err)
          })
      })
    },
    // მომხმარებლის მონაცმების შენახვა
    setUserData({ commit }) {
      let token = localStorage.getItem('emisToken') || null
      let user = localStorage.getItem('emisUser') || null
      if (token && user) {
        commit('SET_USER', user, { root: true })
        commit('SET_TOKEN', token)
      }
    },

    logOutUser({ commit, state }) {
      let data = {
        accessToken: state.token.access,
        refreshToken: state.token.refresh
      }
      axios
        .post('Account/Logout', data)
        .then(Response => {
          if (Response.data.success) {
            commit('CLEAR_USER_DATA', null, { root: true })
            commit('CLEAR_TOKEN')
            localStorage.removeItem('emisToken')
            localStorage.removeItem('emisUser')
            commit('SET_MESSAGE', Response.data)
          } else {
            commit('SET_MESSAGE', Response.data)
          }
        })
        .catch(err => {
          Promise.reject(err)
        })
    },
    resetEmail({ commit }, data) {
      axios.post('Account/SendResetPasswordMail', data).then(Response => {
        commit('SET_MESSAGE', Response.data)
      })
    },
    resetPassword({ commit }, data) {
      new Promise((resolve, reject) => {
        axios
          .post('Account/UpdateResetPassword', data)
          .then(Response => {
            commit('SET_MESSAGE', Response.data)
            resolve(true)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default auth
