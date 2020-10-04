<template>
  <div id="app">
    <nav-bar />
    <router-view class="container" :style="{ minHeight: calcHeight }" />
    <app-footer />
  </div>
</template>

<script>
import NavBar from '@/components/shared/NavBar.vue'
import AppFooter from '@/components/shared/Footer.vue'
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
  }
}
</script>

<style lang="scss"></style>
