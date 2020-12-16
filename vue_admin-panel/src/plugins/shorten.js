import Vue from 'vue'

Vue.filter('shorten', (text, maxLength = 300) => {
  if (text && typeof text === 'string') {
    const ending = text.length > maxLength ? '...' : ''
    return text.substr(0, maxLength) + ending
  }
  return ''
})
