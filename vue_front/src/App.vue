<template>
  <div id="app">
    <div class="container">
      <nav-bar />
    </div>
    <div class="wraper" :style="{ minHeight: calcHeight }">
      <transition
        :css="false"
        mode="out-in"
        @enter="routerEnter"
        @leave="routerLeave"
      >
        <router-view class="container" />
      </transition>
      <app-footer />
    </div>
  </div>
</template>

<script>
  import NavBar from '@/components/shared/NavBar.vue'
  import AppFooter from '@/components/shared/Footer.vue'
  import { gsap } from 'gsap'

  export default {
    name: 'App',
    components: {
      NavBar,
      AppFooter
    },
    data() {
      return {
        calcHeight: `calc(${this.$screen.height}px - 15.3rem)`
      }
    },
    methods: {
      routerEnter(el, done) {
        gsap.from(el, {
          opacity: 0,
          duration: 0.4,
          onComplete: done
        })
      },
      routerLeave(el, done) {
        gsap.to(el, {
          opacity: 0,
          duration: 0.4,
          onComplete: done
        })
      }
    }
  }
</script>

<style lang="scss">
  #app {
    .wraper {
      min-height: calc(100vh - 15.3rem);
    }
  }
</style>
