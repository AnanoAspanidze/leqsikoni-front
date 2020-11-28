/* eslint-disable no-unused-vars */
import Axios from '@/plugins/axios'

const words = {
  namespaced: true,
  state: {
    words: null
  },

  getters: {
    wordsToEdit(state) {
      return state.words
    }
  },

  mutations: {
    SET_EDITING_WORDS(state, words) {
      state.words = words
    }
  },

  actions: {
    // add words
    addWord(_, newWord) {
      return new Promise(res => {
        Axios.post('words/addword', newWord).then(Response => {
          res(Response.data)
        })
      })
    },
    // get edditable words
    getEditWord({ commit }, wordId) {
      Axios.get(`words/editwordsdetails/${wordId}`).then(Response => {
        commit('SET_EDITING_WORDS', Response.data)
      })
    },
    // get edditable words
    editWord(_, newWord) {
      return new Promise(res => {
        Axios.post('words/editword', newWord).then(Response => {
          res(Response.data)
        })
      })
    }
  }
}

export default words
