import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://terms.emis.ge/test/api/'
})

instance.interceptors.request.use(config => {
  const token = JSON.parse(localStorage.getItem('emisToken'))
  if (token) {
    config.headers.authorization = 'Bearer ' + token
  }
  return config
})

export default instance
