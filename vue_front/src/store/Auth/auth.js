/* eslint-disable no-unused-vars */
import axios from '@/plugins/axios'

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
    }
  },
  actions: {
    registerUserWithEmail({ commit, rootState }, data) {
      rootState.isLoading = true
      axios
        .post('Account/SignUp', data)
        .then(Response => {
          commit('SET_MESSAGE', Response.data)
          rootState.isLoading = false
        })
        .catch(error => {
          Promise.reject(error)
        })
    },
    // TODO წარმატებისას უნდა გამოყვეს success
    LoginWithEmail({ commit, rootState }, data) {
      rootState.isLoading = true
      axios
        .post('Account/Login', data)
        .then(Response => {
          commit('SET_MESSAGE', Response.data)

          if (Response.data.success) {
            let token = {
              access: Response.data.accessToken,
              refresh: Response.data.refreshToken
            }
            let userData = {
              firstName: Response.data.firstname,
              lastName: Response.data.surname,
              userId: Response.data.userId,
              userName: Response.data.username,
              email: Response.data.email,
              userType: Response.data.userRole.userRoleId
            }

            localStorage.setItem('emisToken', token)

            commit('SET_TOKEN', token)
            commit('SET_USER', userData, { root: true })

            rootState.isLoading = false
          } else {
            rootState.isLoading = false
            // გადამისამართება მთავარ გვერდზე
            this.router.push('/')
          }
        })
        .catch(err => {
          Promise.reject(err)
        })
    },
    // TODO გასარკვევია რა სახით გაეგზავნოს მონაცემები და რამდენ ხანში ერთხელ
    refreshUserToken({ commit, state }) {
      axios.post('Account/RefreshToken')
    },
    // REVIEW მონაცემების ფორმა არის გასარკვევი აბრუნებს შეცდომას
    logOutUser({ commit, state }) {
      console.log('action')
      let data = {
        accessToken: state.token.accessToken,
        refreshToken: state.token.refreshToken
      }
      axios
        .post('Account/Logout', data)
        .then(Response => {
          commit('CLEAR_USER_DATA', { root: true })
          commit('SET_MESSAGE', Response.data)
        })
        .catch(err => {
          Promise.reject(err)
        })
    }
  }
}

export default auth
