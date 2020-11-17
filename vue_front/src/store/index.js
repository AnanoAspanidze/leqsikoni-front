/* eslint-disable no-unused-vars */

import Vue from 'vue'
import Vuex from 'vuex'
import Axios from '../plugins/axios'
import router from '@/router'
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
    wordCount: 0,
    searchCount: null,
    userWords: null
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
    },
    searchCount(state) {
      return state.searchCount
    },
    userWords(state) {
      return state.userWords
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
    },
    SET_WORDS_COUNT(state, count) {
      state.wordCount = count
    },
    SET_WORD_BY_QUERY(state, words) {
      state.wordList = words
    },
    CLEAR_USER_DATA(state) {
      state.user = null
    },
    SEARCH_COUNT(state, number) {
      state.searchCount = number
    },
    SET_USER_WORDS(state, words) {
      state.userWords = words
    }
  },
  actions: {
    getWordLIst({ commit }) {
      Axios.get('words/wordslist').then(Response => {
        console.log(Response)
        commit('SET_WORD_LIST', Response.data.wordsList)
        commit('SET_WORDS_COUNT', Response.data.wordsQuantity)
      })
    },
    getWordByQuery({ commit }, param) {
      Axios.get(`words/wordslist?${param.key}=${param.info}`).then(Response => {
        commit('SET_WORD_BY_QUERY', Response.data.wordsList)
        commit('SET_WORDS_COUNT', Response.data.wordsQuantity)
        if (param.key === 'SearchQuery') {
          commit('SEARCH_COUNT', Response.data.wordsQuantity)
        } else {
          commit('SEARCH_COUNT', null)
        }
      })
    },
    getUserWordList({ commit, state }, page) {
      let userId = state.user.userId
      console.log(userId, page)
      if (userId) {
        Axios.get(`words/wordslist/${userId}?PageNumber=${page}`).then(
          Response => {
            console.log(Response.data)
            commit('SET_WORDS_COUNT', Response.data.wordsQuantity)
            commit('SET_USER_WORDS', Response.data.wordsList)
          }
        )
      } else {
        // გადამისამართება მთავარ გვერდზე
        router.push({ name: 'Signing' }).catch(err => {})
      }
    }
  },
  modules: {
    auth
  }
})
