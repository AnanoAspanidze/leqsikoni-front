<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('userList', ['singeUser'])
  }
}
</script>

<style lang="scss" scoped></style>
