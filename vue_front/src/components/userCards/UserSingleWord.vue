<template>
  <div class="columns is-multiline is-centered mt-5">
    <div ref="parent" class="column is-8 is-offset-1 is-relative">
      <div class="card_image-1 is-absolute">
        <figure class="image is-32x32">
          <img src="@/assets/img/yellow-ladybird.svg" alt="ladybird" />
        </figure>
      </div>
      <words-card>
        <template v-slot:edit>
          <div class="card_edit is-flex">
            <div class="is-inline-block ml-a">
              <b-button
                size="is-small"
                type="is-purple"
                icon-right="edit"
                outlined
                rounded
              />
            </div>
          </div>
        </template>
        <template v-slot:buttons>
          <b-button type="is-primary" icon-right="share" outlined rounded />
        </template>
      </words-card>
    </div>
  </div>
</template>

<script>
  import WordsCard from '@/components/shared/WordCard.vue'
  import gsap from 'gsap'
  import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

  export default {
    name: 'WordCard',
    components: {
      WordsCard
    },
    mounted() {
      let parent = this.$refs.parent.clientWidth
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
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    overflow-x: auto;
    &_edit button {
      padding: 0.1rem 0.85rem;
    }
    &-content {
      &_line {
        &-icon {
          border-radius: 100%;
          max-height: 24px;
        }
        &-share button {
          padding: 1rem 1.2rem;
          &:last-child {
            box-shadow: 2px 2px 6px #7fd1d866;
            border: none;
          }
        }
      }
    }
    &_image-1 {
      left: 50px;
      top: 0;
      z-index: 90;
    }
  }
  .card .b-tooltips {
    .b-tooltip {
      margin-bottom: 1.5em;
      &.is-light-passive .tooltip-content {
        background: whitesmoke;
        color: #c5cbcd;
        box-shadow: 0px 3px 6px #7fd1d866;
      }
    }
  }
</style>
