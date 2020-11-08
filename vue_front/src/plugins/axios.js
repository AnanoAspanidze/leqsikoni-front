import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://terms.emis.ge/test/api/'
})

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('emisToken')
  if (token) {
    config.headers.authorization = token
  }
  return config
})

export default instance
