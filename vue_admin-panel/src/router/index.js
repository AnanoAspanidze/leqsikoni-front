import Vue from 'vue'
import VueRouter from 'vue-router'

import Statistics from '../views/Statistics.vue'
import Words from '../views/Words.vue'
import WordByid from '../views/WordsById.vue'
import Users from '../views/Users.vue'
import Texts from '../views/Texts.vue'

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
  },
  {
    path: '/words/:itemId',
    name: 'wordInfo',
    component: WordByid
  },
  {
    path: '/texts',
    name: 'texts',
    component: Texts
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
