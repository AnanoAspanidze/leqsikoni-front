import Vue from 'vue'
import VueRouter from 'vue-router'

import panelOne from '../views/Panel-1.vue'
import panelTwo from '../views/Panel-2.vue'
import panelThree from '../views/Panel-3.vue'
import panelFour from '../views/Panel-4.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'panelOne',
    component: panelOne
  },
  {
    path: '/panel-2',
    name: 'panelTwo',
    component: panelTwo
  },
  {
    path: '/panel-3',
    name: 'panelThree',
    component: panelThree
  },
  {
    path: '/panel-4',
    name: 'panelFour',
    component: panelFour
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
