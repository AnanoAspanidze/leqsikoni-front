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
    component: Alphabet,
    children: [
      {
        path: '',
        name: 'Alphabet',
        component: () => import('@/components/WordCard.vue')
      },
      {
        path: '/:wordId',
        name: 'SingleWord',
        component: () => import('@/components/SingleWord.vue')
      },
      {
        path: '/user/words/list',
        name: 'UserWord',
        component: () => import('@/components/UserWords.vue'),
        // თუ მომხმარებელი არ არსებობს გადაამისამართოს მთავარ გვერდზე
        // if no user redirect to main
        beforeEnter: (to, from, next) => {
          let user = localStorage.getItem('User')
          if (user) {
            next()
          } else {
            next({ path: '/' })
          }
        }
      }
    ]
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
