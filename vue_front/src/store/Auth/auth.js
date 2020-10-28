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
    registerUserWithEmail({ commit }, data) {
      axios
        .post('Account/SignUp', data)
        .then(Response => {
          console.log('response =>', Response)
          commit('SET_MESSAGE', { success: true, message: Response.data })
        })
        .catch(error => {
          console.log('error =>', error.response)
          commit('SET_MESSAGE', {
            success: false,
            message: error.response.data
          })
          Promise.resolve()
        })
    }
  }
}

export default auth
