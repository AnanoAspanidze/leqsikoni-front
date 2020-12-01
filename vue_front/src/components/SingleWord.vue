<template>
  <div class="columns is-multiline is-centered mt-5">
    <div
      v-if="singleWord"
      ref="parent"
      class="column is-8 is-offset-1 is-relative"
    >
      <div class="card_image-1 is-absolute">
        <figure class="image is-32x32">
          <img src="@/assets/img/yellow-ladybird.svg" alt="ladybird" />
        </figure>
      </div>
      <!-- card component -->
      <words-card :words="singleWord">
        <template v-slot:edit>
          <div class="card-content_line-edit is-flex">
            <div class="is-inline-block ml-a mb-3">
              <b-button
                size="is-small"
                type="is-purple"
                icon-right="edit"
                outlined
                rounded
                @click="
                  $router.push({
                    name: 'Editing',
                    params: { wordId: singleWord.itemId }
                  })
                "
              />
            </div>
          </div>
        </template>
        <template v-slot:icon>
          <div
            class="card-content_line-icon has-background-primary is-inline-flex is-justify-content-center px-1 py-1 ml-2"
          >
            <b-tooltip
              :label="getDateFormat"
              :triggers="['click']"
              position="is-bottom"
              type="is-info"
              :auto-close="['outside', 'escape']"
            >
              <b-icon
                size="is-small"
                icon="clock"
                type="is-white"
                class="is-clickable"
                custom-class="time-size"
              ></b-icon>
            </b-tooltip>
          </div>
        </template>
        <template v-slot:buttons>
          <ShareNetwork
            tag="div"
            network="facebook"
            :url="`https://terms.emis.ge${$route.fullPath}`"
            title=""
            :quote="`terms.emis.ge - ${getFacebookWord}`"
          >
            <b-button type="is-primary" icon-right="share" outlined rounded />
          </ShareNetwork>
        </template>
      </words-card>
    </div>
  </div>
</template>

<script>
  import WordsCard from '@/components/shared/WordCard.vue'
  import gsap from 'gsap'
  import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'SingleWord',
    components: {
      WordsCard
    },
    computed: {
      ...mapGetters(['singleWord', 'user']),
      getDateFormat() {
        if (this.singleWord) {
          const date = new Date(this.singleWord.date)
          const dateTimeFormat = new Intl.DateTimeFormat('ka', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          })
          return dateTimeFormat.format(date)
        }
        return ''
      },
      getFacebookWord() {
        let data = ''
        if (this.singleWord.itemsList) {
          data = this.singleWord.itemsList[0].wordName
        }
        return data
      }
    },
    created() {
      let id = this.$route.params.wordId
      if (id) {
        this.getSingleWord(id)
      }
    },
    updated() {
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
    },
    methods: {
      ...mapActions(['getSingleWord'])
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    &-content {
      &_line {
        &-icon {
          border-radius: 100%;
          max-height: 26px;
        }
        &-share button {
          padding: 1rem 1.2rem;
          &:last-child {
            box-shadow: 2px 2px 6px #7fd1d866;
            border: none;
          }
        }
        &-edit button {
          padding: 1rem 1rem;
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
