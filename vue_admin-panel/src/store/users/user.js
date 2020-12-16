/* eslint-disable no-unused-vars */
import Axios from '@/plugins/axios'

const userList = {
  namespaced: true,
  state: {
    logdUser: '',
    users: [],
    userStats: [],
    singeUser: null
  },
  getters: {
    users(state) {
      return state.users
    },
    userStates(state) {
      return state.userStats
    },
    singeUser(state) {
      return state.singeUser
    }
  },
  mutations: {
    // set word list
    SET_USER_LIST(state, users) {
      state.users = users
    },
    SET_USER_STATS(state, data) {
      state.userStats = data
    },
    SET_SINGLE_USER_INFO(state, info) {
      state.singeUser = info
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
          if (result.data.success) {
            dispatch('getUserList')
          }
          resolve(result.data)
        })
      })
    },
    getUserStats({ commit }) {
      Axios.get('statistics').then(result => {
        console.log(result.data)
        commit('SET_USER_STATS', result.data.statistics)
      })
    },
    getUserDetailed({ commit }, userId) {
      Axios.get(`userseditdetails/${userId}`).then(result => {
        commit('SET_SINGLE_USER_INFO', result.data)
      })
    }
  }
}

export default userList
