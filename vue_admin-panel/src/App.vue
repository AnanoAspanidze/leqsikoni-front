<template>
  <v-app id="app">
    <app-home v-if="logedUser" />
    <app-login v-else />
  </v-app>
</template>

<script>
import AppHome from '@/views/Home'
import AppLogin from '@/views/Main'

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
  created() {
    this.logedUser = JSON.parse(localStorage.getItem('adminInfo')) || false
  }
}
</script>
