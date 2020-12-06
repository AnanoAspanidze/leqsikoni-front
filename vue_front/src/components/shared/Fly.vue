<template>
  <div class="fly is-fixed">
    <figure class="image is-156x256">
      <img src="@/assets/img/pencile.svg" alt="fly" />
    </figure>
  </div>
</template>

<script>
  //import gsap from 'gsap'

  export default {
    mounted() {}
  }
</script>

<style lang="scss" scoped>
  .fly {
    right: 5%;
    top: 25%;
    z-index: 9999;
    @media screen and (max-width: 1024px) {
      display: none;
    }
  }
</style>
