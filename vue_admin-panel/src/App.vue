<template>
  <v-app id="app">
    <app-home v-if="logedUser" />
    <app-login v-else />
  </v-app>
</template>

<script>
import AppHome from '@/views/Home'
import AppLogin from '@/views/Main'
import { mapGetters } from 'vuex'

export default {
  components: {
    AppLogin,
    AppHome
  },
  data() {
    return {
      logedUser: false
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  watch: {
    token(val) {
      this.logedUser = val
    }
  },
  mounted() {
    if (this.token) {
      this.logedUser = this.token
    }
  }
}
</script>
