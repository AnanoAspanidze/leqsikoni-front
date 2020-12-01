<template>
  <div class="card">
    <div class="card-content my-5" :class="[!$screen.tablet ? 'mx-3' : 'mx-6']">
      <h2 class="has-text-primary has-text-centered mb-4">
        ეს სექცია ცარიელია
      </h2>
      <router-link
        :to="{ name: 'addWord' }"
        tag="h3"
        class="has-text-warning has-text-centered is-clickable"
      >
        დაამატე სიტყვა
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" scoped></style>
