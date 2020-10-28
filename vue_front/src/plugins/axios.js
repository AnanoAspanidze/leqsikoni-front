import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://terms.emis.ge/test/api/'
})

export default instance
