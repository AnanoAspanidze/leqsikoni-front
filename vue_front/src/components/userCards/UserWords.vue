<template>
  <div class="userWords">
    <div v-if="!isLoading" class="columns is-multiline is-centered mt-5">
      <div
        v-for="item in userWords"
        ref="parent"
        :key="item.id"
        class="column is-8 is-offset-1 is-relative"
      >
        <div class="card_image-1 is-absolute">
          <figure class="image is-32x32">
            <img src="@/assets/img/yellow-ladybird.svg" alt="ladybird" />
          </figure>
        </div>
        <!-- card component -->
        <words-card :words="item">
          <template v-slot:buttons>
            <ShareNetwork
              tag="div"
              network="facebook"
              :url="`https://terms.emis.ge/word/${item.id}`"
              title="აქ უნდა იყოს სათაური"
              description="აღწერის ველი"
              quote="ციტირების ველი"
              hashtags="ჰეშტეგები"
            >
              <b-button
                class="mr-5"
                type="is-primary"
                icon-right="share"
                outlined
                rounded
              />
            </ShareNetwork>
            <b-button
              tag="router-link"
              :to="{
                name: 'SingleWord',
                params: { wordId: item.itemId },
                query: { word: item.itemsList[0].wordName }
              }"
              type="is-primary"
              outlined
              rounded
              class="fullInfo"
            >
              სრულად
            </b-button>
          </template>
        </words-card>
      </div>
      <div
        v-if="userWords !== null && !userWords.length"
        ref="parent"
        class="column is-8 is-offset-1 is-relative"
      >
        <div class="card_image-1 is-absolute">
          <figure class="image is-32x32">
            <img src="@/assets/img/yellow-ladybird.svg" alt="ladybird" />
          </figure>
        </div>

        <!-- card component -->

        <words-card :words="0">
          <template v-slot:buttons>
            <b-button type="is-primary" icon-right="share" outlined rounded />
            <b-button
              v-if="item"
              tag="router-link"
              :to="{ name: 'UserSingleWord', params: { wordId: item } }"
              type="is-primary"
              outlined
              rounded
            >
              სრულად
            </b-button>
          </template>
        </words-card>
      </div>
      <div v-if="totalWords === 0" class="column is-8 is-offset-1 is-relative">
        <empty-word />
      </div>
    </div>

    <b-loading
      style="height: 450px"
      :active="isLoading"
      :is-full-page="false"
      :can-cancel="false"
    >
      <loading-spiner />
    </b-loading>
    <!-- pagination -->
    <pagination
      v-if="!isLoading"
      :total="totalWords"
      :current-page="current"
      :page.sync="current"
    />
  </div>
</template>

<script>
  import Pagination from '@/components/pagination/Pagination.vue'
  import WordsCard from '@/components/shared/WordCard.vue'
  import EmptyWord from '@/components/shared/EmptyWord.vue'
  import LoadingSpiner from '@/components/shared/LoadingSpiner.vue'
  import gsap from 'gsap'
  import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'UserWord',
    components: {
      Pagination,
      WordsCard,
      LoadingSpiner,
      EmptyWord
    },
    data() {
      return {
        current: 1
      }
    },
    computed: {
      ...mapGetters(['totalWords', 'userWords', 'isLoading'])
    },
    watch: {
      // route ცვლილებისას გაეშვას შესაბამისი სიტყვების ჩატვირთვის მოთხოვნა
      $route(to) {
        //გვერდის პაგინაციის შექმნა რადგან ციფრი უნდა იყოს
        let page = parseInt(to.query.PageNumber)
        let key = Object.keys(to.query)[0]
        // ავტ. query-ს მონიშნვა გარდა page
        let queryData = to.query[key]

        //პაგინასიის query-ს შექმნა
        if (page) {
          this.current = page
          this.getUserWordList(page)
        }
        //სხვა დანარჩენი query-ს შექმნა
        else if (queryData) {
          this.getUserWordList(queryData)
        }
      },
      current() {
        this.$router
          .push({ query: { PageNumber: this.current } })
          .catch(() => {})
      }
    },
    created() {
      let queryKey = Object.keys(this.$route.query)[0]
      if (!queryKey) {
        this.$router
          .push({ query: { PageNumber: this.current } })
          .catch(() => {})
      } else {
        this.getUserWordList(this.current)
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
          ]
        }
      })
    },
    methods: {
      ...mapActions(['getUserWordList'])
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    overflow-x: auto;

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
