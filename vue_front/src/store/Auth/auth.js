/* eslint-disable no-unused-vars */
import Axios from '@/plugins/axios'
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
        Axios.post('Account/SignUp', data)
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
        Axios.post('Account/Login', data)
          .then(Response => {
            if (Response.data.success) {
              let userData = Response.data.userWithToken
              let token = Response.data.userWithToken.accessToken

              commit('SET_USER', userData, { root: true })
              commit('SET_TOKEN', token)
              const message = {
                success: true,
                message: 'თქვენ წარმატებით გაიარეთ ავტორიზაცია'
              }
              commit('SET_MESSAGE', message)
              rootState.isLoading = false
              // გადამისამართება მთავარ გვერდზე
              router.push({ path: '/' }).catch(err => {})
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

    logOutUser({ commit }) {
      const token = localStorage.getItem('emisToken')
      Axios.post('Account/Logout', { accessToken: token })
        .then(Response => {
          if (Response.data.success) {
            localStorage.removeItem('emisToken')
            localStorage.removeItem('emisUser')
            commit('CLEAR_USER_DATA', null, { root: true })
            commit('CLEAR_TOKEN')
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
      Axios.post('Account/SendResetPasswordMail', data).then(Response => {
        commit('SET_MESSAGE', Response.data)
      })
    },
    resetPassword({ commit }, form) {
      let confirmToken = localStorage.getItem('emisReset')
      form.ResetPasswordToken = confirmToken
      return new Promise(resolve => {
        Axios.post('Account/UpdateResetPassword', form)
          .then(Response => {
            commit('SET_MESSAGE', Response.data)
            localStorage.removeItem('emisReset')
            resolve(true)
          })
          .catch(err => {
            Promise.reject(err)
          })
      })
    },
    changeUserInfo({ commit }, userData) {
      const newInfo = {
        username: userData.userName,
        firstname: userData.firstName,
        surname: userData.lastName
      }
      Axios.post('Account/edituser', newInfo).then(Response => {
        commit('SET_MESSAGE', Response.data)
      })
    },
    changeUserPassword({ commit }, userData) {
      const newPass = {
        OldPassword: userData.oldPassword,
        NewPassword: userData.password,
        ConfirmNewPassword: userData.confirmNewPassword
      }
      Axios.post('Account/edituserpassword', newPass).then(Response => {
        commit('SET_MESSAGE', Response.data)
      })
    }
  }
}

export default auth
