import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/Sass/style.scss'
import '@/plugins/allPlugin'

Vue.config.productionTip = false

// remove fb query params
router.beforeEach((to, from, next) => {
  if (to.query.fbclid) {
    delete to.query.fbclid
    next()
  } else next()
})

new Vue({
  router,
  store,
  // RenderAfterDocument Event:'render-event'name must correspond to vue-config.js
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  },
  render: h => h(App)
}).$mount('#app')
