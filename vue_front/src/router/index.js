import Vue from 'vue'
import VueRouter from 'vue-router'
import Alphabet from '../views/Alphabet.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Signing from '../views/Signing.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Alphabet',
    component: Alphabet
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/signing',
    name: 'Signing',
    component: Signing
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
