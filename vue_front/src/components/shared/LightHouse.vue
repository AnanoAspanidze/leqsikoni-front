<template>
  <div class="lightHouse is-fixed">
    <figure class="image is-156x256">
      <img src="@/assets/img/lighthouse.svg" alt="lightHouse" />
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
    bottom: 2%;
    @media screen and (max-width: 1024px) {
      display: none;
    }
  }
</style>
