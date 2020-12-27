import axios from 'axios'
// create axios instance with base Url
const instance = axios.create({
  baseURL: 'https://terms.emis.ge/test/api/admin/'
})

// intersept all requests
instance.interceptors.request.use(config => {
  const token = JSON.parse(localStorage.getItem('adminInfo')).value.accessToken
  if (token) {
    config.headers.authorization = 'Bearer ' + token
  }
  return config
})

export default instance
