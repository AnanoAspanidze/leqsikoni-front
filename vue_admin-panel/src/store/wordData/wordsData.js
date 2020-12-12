/* eslint-disable no-unused-vars */
import Axios from '@/plugins/axios'

const wordData = {
  namespaced: true,
  state: {
    fullWords: []
  },
  getters: {
    wordList(state) {
      return state.fullWords
    }
  },
  mutations: {
    // set word list
    SET_WORD_LIST(state, words) {
      state.fullWords = words
    }
  },
  actions: {
    // get full word list
    getWordList({ commit }) {
      Axios.get('wordslist')
        .then(result => {
          commit('SET_WORD_LIST', result.data.wordsList)
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }
}

export default wordData
