import axios from 'axios'
//import store from '../store/index'

const instance = axios.create({
  baseURL: 'https://terms.emis.ge/test/api/'
})

/* instance.interceptors.request.use(
  async config => {
    const tokens = JSON.parse(localStorage.getItem('emisToken'))
    if (tokens) {
      let data = {
        AccessToken: tokens.access,
        RefreshToken: tokens.refresh
      }
      await axios
        .post('https://terms.emis.ge/test/api/Account/RefreshToken', data)
        .then(Response => {
          console.log(Response.data)
          if (Response.data.success) {
            store.dispatch('auth/refreshUserToken', Response.data.userWithToken)
          }
        })
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
) */

export default instance
