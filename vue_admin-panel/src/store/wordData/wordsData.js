/* eslint-disable no-unused-vars */
import Axios from '@/plugins/axios'

const wordData = {
  namespaced: true,
  state: {
    fullWords: [],
    WordByid: [],
    containerId: null
  },
  getters: {
    wordList(state) {
      return state.fullWords
    },
    WordsById(state) {
      return state.WordByid
    },
    containerId(state) {
      return state.containerId
    }
  },
  mutations: {
    // set word list
    SET_WORD_LIST(state, words) {
      state.fullWords = words
    },
    SET_WORD_CONTAINER_ID(state, id) {
      state.containerId = id
    },
    SET_WORD_BY_ID(state, data) {
      let newArray = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].isMainWord) {
          data.unshift(data.splice(i, 1)[0])
        }
      }
      state.WordByid = data
    }
  },
  actions: {
    // get full word list
    getWordList({ commit }) {
      Axios.get('wordslist')
        .then(result => {
          commit('SET_WORD_LIST', result.data)
        })
        .catch(err => {
          console.log(err.message)
        })
    },
    getWordById({ commit }, id) {
      Axios.get(`/editworddetails/${id}`).then(result => {
        commit('SET_WORD_CONTAINER_ID', result.data.itemId)
        commit('SET_WORD_BY_ID', result.data.itemsList)
      })
    },
    changeSelectedWord(_, data) {
      return new Promise((resolve, reject) => {
        Axios.post(`editword`, data).then(result => {
          if (result.data.success) {
            resolve(result.data)
          } else {
            reject(resolve.data)
          }
        })
      })
    },
    blockWord(_, id) {
      return new Promise((resolve, reject) => {
        Axios.post(`blockword/${id}`).then(result => {
          if (result.data.success) {
            resolve(result.data)
          } else {
            reject(resolve.data)
          }
        })
      })
    },
    unBlockWord(_, id) {
      return new Promise((resolve, reject) => {
        Axios.post(`unblockword/${id}`).then(result => {
          if (result.data.success) {
            resolve(result.data)
          } else {
            reject(resolve.data)
          }
        })
      })
    },
    addSingleWord(_, word) {
      const token = JSON.parse(localStorage.getItem('adminInfo')).value
        .accessToken
      console.log(word)
      return new Promise((resolve, reject) => {
        Axios.post('addnewword', word, {
          headers: {
            authorization: 'Bearer ' + token
          }
        })
          .then(result => {
            resolve(result.data)
          })
          .catch(err => {
            reject(err.message)
          })
      })
    },
    editSingleWord(_, word) {
      console.log(word)
      return new Promise((resolve, reject) => {
        Axios.post('editword', word, {})
          .then(result => {
            resolve(result.data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
}

export default wordData
