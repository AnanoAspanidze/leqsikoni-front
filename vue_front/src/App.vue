<template>
  <div id="app">
    <div class="container">
      <nav-bar />
    </div>
    <transition
      :css="false"
      mode="out-in"
      @enter="routerEnter"
      @leave="routerLeave"
    >
      <router-view class="container" :style="{ minHeight: calcHeight }" />
    </transition>
    <app-footer />
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
          translateX: 600,
          duration: 0.6,
          onComplete: done
        })
      },
      routerLeave(el, done) {
        gsap.to(el, {
          opacity: 0,
          translateX: -600,
          duration: 0.6,
          onComplete: done
        })
      }
    }
  }
</script>

<style lang="scss"></style>
