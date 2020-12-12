/* eslint-disable no-unused-vars */
import Axios from '@/plugins/axios'

const userList = {
  namespaced: true,
  state: {
    users: []
  },
  getters: {
    users(state) {
      return state.users
    }
  },
  mutations: {
    // set word list
    SET_USER_LIST(state, users) {
      state.users = users
    }
  },
  actions: {
    // get full word list
    getUserList({ commit }) {
      Axios.get('users')
        .then(result => {
          commit('SET_USER_LIST', result.data.usersList)
        })
        .catch(err => {
          console.log(err.message)
        })
    },
    blockActiveUser({ dispatch }, userId) {
      return new Promise(resolve => {
        Axios.post(`blockuser/${userId}`).then(result => {
          console.log('vuex=>', result)
          if (result.data.success) {
            dispatch('getUserList')
          }
          resolve(result.data)
        })
      })
    },
    unblockUser({ dispatch }, userId) {
      return new Promise(resolve => {
        Axios.post(`unblockuser/${userId}`).then(result => {
          console.log('vuex=>', result)
          if (result.data.success) {
            dispatch('getUserList')
          }
          resolve(result.data)
        })
      })
    }
  }
}

export default userList
