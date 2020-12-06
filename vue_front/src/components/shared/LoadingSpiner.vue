<template>
  <div class="atom-spinner">
    <div ref="orbit" class="atom">
      <div class="orbit">
        <div class="path"></div>
      </div>
      <div class="orbit">
        <div class="path"></div>
      </div>
      <div class="orbit">
        <div class="path"></div>
      </div>
      <div class="nucleus"></div>
    </div>
  </div>
</template>

<script>
  import { TimelineLite, gsap } from 'gsap'
  export default {
    mounted() {
      const tl = new TimelineLite()
      // select elements
      const atom = this.$refs.orbite,
        dur = 1.5,
        del = 0

      tl.to(
        '.path',
        {
          rotationZ: 360,
          ease: 'none',
          duration: dur,
          stagger: {
            each: -del,
            repeat: -1
          }
        },
        0
      )

      // Add a rotation to the whole atom
      gsap.set(atom, { transformOrigin: 'center center' })
      gsap.to(atom, {
        rotation: 360,
        ease: 'none',
        repeat: -1,
        duration: 300
      })

      // Skip the loading
      tl.progress(0.9999)
    }
  }
</script>

<style lang="scss" scoped>
  .atom-spinner {
    height: 100px;
    width: 100px;
    overflow: hidden;
    .atom {
      transform-style: preserve-3d;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100px;
      height: 100px;
      perspective: 1000;
      margin-left: -50px;
      margin-top: -50px;
      transform-style: preserve-3d;

      .nucleus {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -6px 0 0 -5px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #60b5b6;
      }

      .orbit {
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 100px;
        transform-style: preserve-3d;
        transform: rotateZ(120deg) rotateY(66deg);

        &:nth-child(2) {
          transform: rotateZ(240deg) rotateY(66deg);
        }
        &:nth-child(3) {
          transform: rotateZ(360deg) rotateY(66deg);
        }
        .path {
          width: 100px;
          height: 100px;
          position: relative;
          transform-style: preserve-3d;
          border-radius: 50%;
          border-left-width: calc(100px / 25);
          border-top-width: calc(100px / 25);
          border-left-color: #60b5b6;
          border-top-color: transparent;
          border-left-style: solid;
          border-top-style: solid;
        }
      }
    }
  }
</style>
