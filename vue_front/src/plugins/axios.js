import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://terms.emis.ge/test/api/'
})

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('emisToken')
  if (token) {
    config.headers.authorization = token
    console.log(token, config.headers.authorization)
  }
  return config
})

export default instance
