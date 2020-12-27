<template>
  <div class="about">
    <div class="container section about">
      <div class="columns is-centered">
        <div ref="parent" class="column is-9 is-relative">
          <div class="about_image-1 is-absolute">
            <figure class="image is-32x32">
              <img src="../assets/img/ladybird.svg" alt="ladybird" />
            </figure>
          </div>
          <div class="card px-5">
            <div class="card-header-title">
              <h1
                class="title has-text-primary is-size-4 has-text-weight-light mt-6"
              >
                პროექტის შესახებ
              </h1>
            </div>
            <div class="card-content pb-6 is-family-secondary">
              <div class="content">
                {{ contact.description }}
              </div>
            </div>
          </div>
          <div class="about_image-2 is-absolute">
            <figure class="image is-256x256 ">
              <img src="../assets/img/lighthouse.svg" class="is-fly" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import gsap from 'gsap'
  import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['contact'])
    },
    mounted() {
      let parent = this.$refs.parent.clientWidth
      gsap.registerPlugin(MotionPathPlugin)
      gsap.to('.about_image-1', {
        duration: 14,
        ease: 'none',
        yoyo: true,
        repeat: -1,
        rotateX: 0,
        xPercent: -50,
        motionPath: {
          curviness: 0,
          path: [
            { x: 0, y: 0 },
            { x: (parent / 100) * 15, y: 0 },
            { x: (parent / 100) * 25, y: 0 },
            { x: (parent / 100) * 29, y: 0 },
            { x: (parent / 100) * 30, y: 0 }
          ]
        }
      })
    },
    created() {
      this.getContactInfo()
    },
    methods: {
      ...mapActions(['getContactInfo'])
    },
    metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'პროექტის შესახებ',
      // all titles will be injected into this template
      titleTemplate: '%s | ტექნოლოგიური ტერმინების ლექსიკონი'
    }
  }
</script>

<style lang="scss" scoped>
  .about {
    margin-top: 5vh;
    min-height: calc(100vh - 16rem);

    &_image-1 {
      left: 6%;
      top: 0;
      z-index: 5;
    }
    &_image-2 {
      right: 0;
      top: 85%;
      transform: translateX(80%);
      z-index: 5;
    }

    .ladybird {
      position: absolute;
      width: 30px;
      height: 25px;
      margin-top: 0;
      margin-left: 6rem;
      z-index: 30;
    }

    .is-fly {
      position: fixed;
      margin-left: 2rem;
      height: 170px;
      width: 220px;
    }

    @media screen and(max-width: 1024px) {
      &_image-2 {
        display: none;
      }
    }
  }
</style>
