import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../plugins/axios'

import auth from './Auth/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alphabet: [
      [
        'ა',
        'ბ',
        'გ',
        'დ',
        'ე',
        'ვ',
        'ზ',
        'თ',
        'ი',
        'კ',
        'ლ',
        'მ',
        'ნ',
        'ო',
        'პ',
        'ჟ',
        'რ',
        'ს',
        'ტ',
        'უ',
        'ფ',
        'ქ',
        'ღ',
        'ყ',
        'შ',
        'ჩ',
        'ც',
        'ძ',
        'წ',
        'ჭ',
        'ხ',
        'ჯ',
        'ჰ'
      ],
      [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ]
    ],
    isLoading: false,
    user: null,
    wordList: [],
    wordCount: 0
  },
  getters: {
    isLoading(state) {
      return state.isLoading
    },
    langAlph(state) {
      return state.alphabet
    },
    wordList(state) {
      return state.wordList
    },
    totalWords(state) {
      return state.wordCount
    }
  },
  mutations: {
    SET_USER(state, userData) {
      if (localStorage.getItem('emisUser')) {
        state.useer = JSON.parse(localStorage.getItem('emisUser'))
      } else {
        let data = {
          firstName: userData.firstname,
          lastName: userData.surname,
          userId: userData.userId,
          userName: userData.username,
          email: userData.email,
          userType: userData.userRole.userRoleId
        }
        localStorage.setItem('emisUser', JSON.stringify(data))
        state.user = data
      }
    },
    SET_WORD_LIST(state, wordList) {
      state.wordList = wordList
    },
    SET_WORDS_COUNT(state, count) {
      state.wordCount = count
    },
    SET_WORD_BY_PAGE(state, words) {
      state.wordList = words
    },
    CLEAR_USER_DATA(state) {
      state.user = null
    }
  },
  actions: {
    getWordLIst({ commit }) {
      Axios.get('words/wordslist').then(Response => {
        commit('SET_WORD_LIST', Response.data.wordsList)
        commit('SET_WORDS_COUNT', Response.data.wordsQuantity)
      })
    },
    geWordsByPage({ commit }, pageNumber) {
      Axios.get(`words/wordslist?PageNumber=${pageNumber}`).then(Response => {
        commit('SET_WORD_BY_PAGE', Response.data.wordsList)
        commit('SET_WORDS_COUNT', Response.data.wordsQuantity)
      })
    }
  },
  modules: {
    auth
  }
})
