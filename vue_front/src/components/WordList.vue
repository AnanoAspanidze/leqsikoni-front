<template>
  <div class="wordList">
    <div ref="parent" class="columns is-multiline is-centered mt-5">
      <div
        v-for="(item, i) in wordList"
        :key="item.wordId"
        class="column is-8 is-offset-1 is-relative"
      >
        <div v-if="i === 0" class="card_image-1 is-absolute">
          <figure class="image is-32x32">
            <img src="@/assets/img/yellow-ladybird.svg" alt="ladybird" />
          </figure>
        </div>
        <!-- card component -->
        <words-card :word="item">
          <template v-slot:buttons>
            <b-button
              class="mr-5"
              type="is-primary"
              icon-right="share"
              outlined
              rounded
            />
            <b-button
              tag="router-link"
              :to="{ name: 'SingleWord', params: { wordId: item.wordId } }"
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
    </div>
    <!-- paginations -->
    <pagination
      :total="totalWords"
      :current-page="current"
      :page.sync="current"
    />
  </div>
</template>

<script>
  import Pagination from '@/components/pagination/Pagination.vue'
  import WordsCard from '@/components/shared/WordCard.vue'
  import gsap from 'gsap'
  import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'WordList',
    components: {
      Pagination,
      WordsCard
    },
    data() {
      return {
        current: 1
      }
    },
    computed: {
      ...mapGetters(['totalWords', 'wordList'])
    },
    watch: {
      // route ცვლილებისას გაეშვას შესაბამისი სიტყვების ჩატვირთვის მოთხოვნა
      $route(to) {
        let page = parseInt(to.query.PageNumber)
        let search = to.query.SearchQuery
        let char = to.query.FilterChar
        let key = Object.keys(to.query)[0]

        if (page) {
          this.current = page
          this.getWordByQuery({ info: page, key })
        } else if (search) {
          this.getWordByQuery({ info: search, key })
        } else if (char) {
          this.getWordByQuery({ info: char, key })
        }
      },
      // route ცვლილება current პაგინაციის ცვლილებისას
      current() {
        this.$router
          .push({ query: { PageNumber: this.current } })
          .catch(() => {})
      }
    },
    created() {
      let key = Object.keys(this.$route.query)[0]
      if (!key) {
        this.$router
          .push({ query: { PageNumber: this.current } })
          .catch(() => {})
      } else if (key === 'PageNumber') {
        let page = parseInt(this.$route.query.PageNumber)
        this.current = page
        this.getWordByQuery({ info: page, key })
      } else {
        let data = this.$route.query[key]
        this.getWordByQuery({ info: data, key })
      }
    },
    mounted() {
      // შეამოწმოს route და შექმას შესაბამისი ქვერი თუ არ არესებობს
      // თუ არსებობს აქტიური გვერდი გაუტოლოს აქტიურ პაგინაცი
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
      ...mapActions(['getWordLIst', 'getWordByQuery'])
    }
  }
</script>

<style lang="scss" scoped>
  .wordList {
    .fullInfo {
      border-color: transparent;
      box-shadow: 2px 2px 8px #7fd1d899;
    }
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
  }
</style>
