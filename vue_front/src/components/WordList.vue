<template>
  <div>
    <div class="columns is-multiline is-centered mt-5">
      <div
        v-for="item in 10"
        ref="parent"
        :key="item"
        class="column is-8 is-offset-1 is-relative"
      >
        <div v-if="item === 1" class="card_image-1 is-absolute">
          <figure class="image is-32x32">
            <img src="@/assets/img/yellow-ladybird.svg" alt="ladybird" />
          </figure>
        </div>
        <!-- card component -->
        <words-card>
          <template v-slot:buttons>
            <b-button type="is-primary" icon-right="share" outlined rounded />
            <b-button
              tag="router-link"
              :to="{ name: 'SingleWord', params: { wordId: item } }"
              type="is-primary"
              outlined
              rounded
            >
              სრულად
            </b-button>
          </template>
        </words-card>
      </div>
    </div>
    <!-- paginations -->
    <pagination />
  </div>
</template>

<script>
  import Pagination from '@/components/pagination/Pagination.vue'
  import WordsCard from '@/components/shared/WordCard.vue'
  import gsap from 'gsap'
  import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
  import { mapActions } from 'vuex'

  export default {
    name: 'WordCard',
    components: {
      Pagination,
      WordsCard
    },
    created() {
      this.getWordLIst()
    },
    mounted() {
      let parent = this.$refs.parent[0].clientWidth
      gsap.registerPlugin(MotionPathPlugin)
      gsap.to('.card_image-1', {
        duration: 12,
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
          ],
          autoRotate: true
        }
      })
    },
    methods: {
      ...mapActions(['getWordLIst'])
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    &_image-1 {
      left: 50px;
      top: 0;
      z-index: 90;
    }
    .b-tooltips {
      .b-tooltip {
        margin-bottom: 1.5em;
        &.is-light-passive .tooltip-content {
          background: whitesmoke;
          color: #c5cbcd;
          box-shadow: 0px 3px 6px #7fd1d866;
        }
      }
    }
  }
</style>
