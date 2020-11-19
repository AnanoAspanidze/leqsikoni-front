import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
  ConfigProgrammatic,
  Input,
  Tabs,
  Button,
  Collapse,
  Icon,
  Dropdown,
  Pagination,
  Tooltip,
  Toast,
  Field
} from 'buefy'

import './assets/Sass/style.scss'
Vue.use(Input)
Vue.use(Button)
Vue.use(Collapse)
Vue.use(Icon)
Vue.use(Dropdown)
Vue.use(Pagination)
Vue.use(Tooltip)
Vue.use(Toast)
Vue.use(Tabs)
Vue.use(Field)
ConfigProgrammatic.setOptions({
  defaultIconPack: 'fi'
  // ...
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
