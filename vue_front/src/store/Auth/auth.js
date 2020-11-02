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
      state.token = token
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
    LoginWithEmail({ commit, rootState }, data) {
      rootState.isLoading = true
      return new Promise(resolve => {
        axios
          .post('Account/Login', data)
          .then(Response => {
            if (Response.data.success) {
              let token = {
                access: Response.data.userWithToken.accessToken,
                refresh: Response.data.userWithToken.refreshToken
              }
              localStorage.setItem('emisToken', Response.data.userWithToken)

              commit('SET_TOKEN', token)
              commit('SET_USER', Response.data.userWithToken, { root: true })

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
    // TODO გასარკვევია რა სახით გაეგზავნოს მონაცემები და რამდენ ხანში ერთხელ
    refreshUserToken({ commit, state }) {
      let data = {
        accessToken: state.token.access,
        refreshToken: state.token.refresh
      }
      axios.post('Account/RefreshToken', data).then(Response => {
        console.log(Response.data)
      })
    },
    logOutUser({ commit, state }) {
      let data = {
        accessToken: state.token.access,
        refreshToken: state.token.refresh
      }
      axios
        .post('Account/Logout', data)
        .then(Response => {
          console.log(Response)
          if (Response.data.success) {
            commit('CLEAR_USER_DATA', null, { root: true })
            commit('CLEAR_TOKEN')
            localStorage.removeItem('emisToken')
            commit('SET_MESSAGE', Response.data)
          } else {
            commit('SET_MESSAGE', Response.data)
          }
        })
        .catch(err => {
          Promise.reject(err)
        })
    }
  }
}

export default auth
