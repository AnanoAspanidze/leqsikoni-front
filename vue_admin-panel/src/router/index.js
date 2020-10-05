import Vue from 'vue'
import VueRouter from 'vue-router'

import Statistics from '../views/Statistics.vue'
import MyWords from '../views/MyWords.vue'
import Words from '../views/Words.vue'
import Users from '../views/Users.vue'
import Administration from '../views/Administration.vue'
import UserDetails from '../views/UserDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'statistics',
    component: Statistics
  },
  {
    path: '/myWords',
    name: 'myWords',
    component: MyWords
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
    path: '/administration',
    name: 'administration',
    component: Administration
  },
  {
    path: '/userDetails',
    name: 'userDetails',
    component: UserDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
