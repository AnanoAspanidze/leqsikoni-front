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
          Promise.resolve(error)
        })
    },
    LoginWithEmail({ commit, rootState }, data) {
      rootState.isLoading = true
      axios.post('Account/Login', data).then(Response => {
        console.log(Response)
        rootState.isLoading = false
      })
    }
  }
}

export default auth
