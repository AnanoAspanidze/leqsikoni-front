<template>
  <div class="bee is-fixed is-unselectable">
    <figure class="image is-32x32">
      <img src="@/assets/img/bee.svg" />
    </figure>
  </div>
</template>

<script>
  import { gsap } from 'gsap'
  import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
  export default {
    mounted() {
      gsap.registerPlugin(MotionPathPlugin)
      gsap.to('.bee', {
        transformOrigin: '50% 50%',
        duration: 5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        motionPath: {
          alignOrigin: [0.5, 0.5],
          curviness: 0,
          path: [
            { x: 0, y: 0, scale: 1 },
            { x: 40, y: -20, scale: 1.4 },
            { x: 80, y: 0, scale: 1 }
          ]
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .bee {
    position: fixed;
    right: 30%;
    top: 14%;
    z-index: 40;
  }
</style>
