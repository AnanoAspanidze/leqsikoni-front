import axios from 'axios'
// create axios instance with base Url
const instance = axios.create({
  baseURL: 'https://terms.emis.ge/test/api/admin/'
})

export default instance
