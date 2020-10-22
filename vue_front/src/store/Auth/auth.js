const auth = {
  namespaced: true,
  state: {
    token: 'asdasdasdasd'
  },
  getters: {
    token(state) {
      return state.token
    }
  },
  mutations: {
    updateValue(state, payload) {
      state.value = payload
    }
  },
  actions: {
    updateValue({ commit }, payload) {
      commit('updateValue', payload)
    }
  }
}

export default auth
