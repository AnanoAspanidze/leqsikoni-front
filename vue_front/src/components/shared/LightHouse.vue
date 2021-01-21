<template>
  <div class="lightHouse is-absolute">
    <figure class="image is-156x256">
      <img src="@/assets/img/lighthouse.png" alt="lightHouse" />
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
  .lightHouse {
    left: 5%;
    bottom: 30%;
    z-index: 10;
    @media screen and (max-width: 1024px) {
      display: none;
    }
  }
</style>
