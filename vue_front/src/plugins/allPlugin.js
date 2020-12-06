import Vue from 'vue'
// vuealidate
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
// vue screen
import VueScreen from 'vue-screen'
Vue.use(VueScreen, 'bulma')

// import Buefy components
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
  Field,
  Loading
} from 'buefy'
// use Buefy components
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
Vue.use(Loading)
// set programc. options
ConfigProgrammatic.setOptions({
  defaultIconPack: 'fi'
})

// social share
import VueSocialSharing from 'vue-social-sharing'
Vue.use(VueSocialSharing)

// meta tags

import VueMeta from 'vue-meta'
Vue.use(VueMeta)
