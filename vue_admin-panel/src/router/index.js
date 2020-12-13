import Vue from 'vue'
import VueRouter from 'vue-router'

import Statistics from '../views/Statistics.vue'
import Words from '../views/Words.vue'
import Users from '../views/Users.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Statistics
  },
  {
    path: '/words',
    name: 'words',
    component: Words
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
