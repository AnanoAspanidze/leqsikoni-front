import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Buefy from 'buefy'
import './assets/Sass/style.scss'
Vue.use(Buefy, {
  defaultIconPack: 'fi'
})

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import VueScreen from 'vue-screen'
Vue.use(VueScreen, 'bulma')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
