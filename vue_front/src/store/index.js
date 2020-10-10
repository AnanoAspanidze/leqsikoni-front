import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    geo_alphabet: [
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
    eng_alphabet: [
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
  },
  getters: {
    token(state) {
      return state.token
    },
    geoAlphabet(state) {
      return state.geo_alphabet
    },
    engAlphabet(state) {
      return state.eng_alphabet
    }
  },
  mutations: {},
  actions: {}
})
