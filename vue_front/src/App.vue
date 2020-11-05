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
    </div>
    <app-footer />
  </div>
</template>

<script>
  import NavBar from '@/components/shared/NavBar.vue'
  import AppFooter from '@/components/shared/Footer.vue'
  import { gsap } from 'gsap'
  import { mapGetters, mapActions } from 'vuex'

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
    computed: {
      ...mapGetters('auth', ['message'])
    },
    // get message to user
    watch: {
      message(data) {
        let type = data.success ? 'is-success' : 'is-danger'
        this.$buefy.toast.open({
          duration: 3000,
          message: data.message,
          position: 'is-bottom-right',
          type: type
        })
      }
    },
    created() {
      this.setUserData()
    },
    mounted() {
      if (this.message) {
        let type = this.message.success ? 'is-success' : 'is-danger'
        this.$buefy.toast.open({
          duration: 3000,
          message: this.message.message,
          position: 'is-bottom-right',
          type: type
        })
      }
    },
    methods: {
      ...mapActions('auth', ['setUserData']),
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
