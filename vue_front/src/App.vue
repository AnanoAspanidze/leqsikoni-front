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
        BASE_URL: 'https://terms.emis.ge',
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
    },
    metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'მთავარი',
      // all titles will be injected into this template
      titleTemplate: '%s | Term.emis.ge',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      meta: [
        // Google / Schema.org markup:
        {
          itemprop: 'name',
          content: 'Terms.emis.ge'
        },
        {
          itemprop: 'descritpin',
          content: ''
        },
        {
          itemprop: 'image',
          content: '/logo.svg'
        },
        // Twitter card
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: '' },
        { name: 'twitter:site', content: 'https://terms.emis.ge' },
        { name: 'twitter:description', content: '' },
        // -- Twitter summary card with large image must be at least 280x150px --
        {
          name: 'twitter:image:src',
          content: 'https://terms.emis.ge/logo.svg'
        },

        // OpenGraph data (Most widely used)
        { property: 'og:title', content: '' },
        { property: 'og:site_name', content: '' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://terms.emis.ge' },
        { property: 'og:image', content: 'https://terms.emis.ge/logo.png' },
        {
          property: 'og:description',
          content: 'ეს არის terms.emis.ge სატესტო SEO აღწერა'
        },
        { property: 'og:locale', content: 'ka-GE' }
      ]
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
