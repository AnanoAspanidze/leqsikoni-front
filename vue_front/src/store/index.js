/* eslint-disable no-unused-vars */

import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../plugins/axios'
import auth from './Auth/auth'
import words from './Words/AddEditDelete'

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
    wordCount: 0,
    searchCount: null,
    userWords: null,
    singleWord: {},
    contact: ''
  },
  getters: {
    isLoading(state) {
      return state.isLoading
    },
    user(state) {
      return state.user
    },
    langAlph(state) {
      return state.alphabet
    },
    wordList(state) {
      return state.wordList
    },
    totalWords(state) {
      return state.wordCount
    },
    searchCount(state) {
      return state.searchCount
    },
    userWords(state) {
      return state.userWords
    },
    singleWord(state) {
      return state.singleWord
    },
    contact(state) {
      return state.contact
    }
  },
  mutations: {
    SET_USER(state, userData) {
      if (localStorage.getItem('emisUser')) {
        state.user = JSON.parse(localStorage.getItem('emisUser'))
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
      state.isLoading = false
    },
    SET_WORDS_COUNT(state, count) {
      state.wordCount = count
    },
    SET_WORD_BY_QUERY(state, words) {
      state.wordList = words
      state.isLoading = false
    },
    CLEAR_USER_DATA(state) {
      state.user = null
    },
    SEARCH_COUNT(state, number) {
      state.searchCount = number
    },
    SET_USER_WORDS(state, words) {
      state.userWords = words
      state.isLoading = false
    },
    SET_SINGLE_WORD(state, word) {
      state.singleWord = word
    },
    SET_CONTACT_INFO(state, contactInfo) {
      state.contact = contactInfo
    }
  },
  actions: {
    getWordByQuery({ commit, state }, param) {
      state.isLoading = true
      // get all keys and values from query
      const keys = Object.keys(param)
      const values = Object.values(param)
      // save all elements in single array and join on send
      let result = []
      for (var i = 0; i < keys.length; i++) {
        result[i] = keys[i] + '=' + values[i]
      }

      Axios.get(`words/wordslist?${result.join('&')}`).then(Response => {
        commit('SET_WORD_BY_QUERY', Response.data.wordsList)
        commit('SET_WORDS_COUNT', Response.data.wordsQuantity)
        if (Object.keys(param)[0] === 'SearchQuery') {
          commit('SEARCH_COUNT', Response.data.wordsQuantity)
        } else {
          commit('SEARCH_COUNT', null)
        }
      })
    },
    getUserWordList({ commit, state }, page) {
      state.isLoading = true
      Axios.get(`words/userwordslist/?PageNumber=${page}`).then(Response => {
        commit('SET_WORDS_COUNT', Response.data.wordsQuantity)
        commit('SET_USER_WORDS', Response.data.wordsList)
      })
    },
    getSingleWord({ commit }, wordId) {
      Axios.get(`words/wordsdetails/${wordId}`).then(Response => {
        commit('SET_SINGLE_WORD', Response.data)
      })
    },
    getContactInfo({ commit }) {
      Axios.get('words/info').then(result => {
        commit('SET_CONTACT_INFO', result.data)
      })
    }
  },
  modules: {
    auth,
    words
  }
})
