<template>
  <div ref="parent" class="wordList is-relative">
    <div v-if="!isLoading" class="columns is-multiline is-centered mt-5">
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
        <words-card :words="item">
          <template v-slot:buttons>
            <ShareNetwork
              tag="div"
              network="facebook"
              :url="`https://terms.emis.ge/word/${item.id}`"
              title=""
              :quote="text"
            >
              <b-button
                class="mr-5"
                type="is-primary"
                icon-right="share"
                outlined
                rounded
                @click="getFacebookWord(item)"
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
    <!-- paginations -->
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
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'WordList',
    components: {
      Pagination,
      WordsCard,
      EmptyWord,
      LoadingSpiner
    },
    data() {
      return {
        current: 1,
        text: ''
      }
    },
    computed: {
      ...mapGetters(['totalWords', 'wordList', 'isLoading'])
    },
    watch: {
      // route ცვლილებისას გაეშვას შესაბამისი სიტყვების ჩატვირთვის მოთხოვნა
      $route(to) {
        //გვერდის პაგინაციის შექმნა რადგან ციფრი უნდა იყოს
        let page = parseInt(to.query.PageNumber)
        //პაგინასიის query-ს შექმნა
        if (page) {
          this.current = page
          this.getWordByQuery(to.query)
        }
        //სხვა დანარჩენი query-ს შექმნა
        else {
          this.getWordByQuery(to.query)
        }
      },
      // route ცვლილება current პაგინაციის ცვლილებისას
      current() {
        this.$router
          .push({
            query: Object.assign({}, this.$route.query, {
              PageNumber: this.current
            })
          })
          .catch(() => {})
      }
    },
    created() {
      let key = Object.keys(this.$route.query)[0]
      //დომეინზე შესვლისას პაგინაციის query-ს ჩატვირთვა
      if (key == undefined) {
        this.$router
          .push({ query: { PageNumber: this.current } })
          .catch(() => {})
      }
      //დომეინზე შესვლისას query-ს არსებობისას vuex action გაშვება
      else {
        if (this.$route.query.PageNumber) {
          this.current = parseInt(this.$route.query.PageNumber)
        }
        this.getWordByQuery(this.$route.query)
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
            { x: (parent / 100) * 15, y: 0 },
            { x: 0, y: 0 }
          ]
        }
      })
    },
    methods: {
      ...mapActions(['getWordByQuery']),
      getFacebookWord(item) {
        if (item.itemsList) {
          let engWord = item.itemsList.find(x => x.wordType === 'Eng') || {}
          let geoWord = item.itemsList.find(x => x.wordType === 'Geo') || {}
          let defWord = item.itemsList.find(x => x.wordType === 'Def') || {}

          if (engWord.wordName === undefined) {
            engWord.wordName = ''
          }
          if (geoWord.wordName === undefined) {
            geoWord.wordName = ''
          }
          if (defWord.wordName === undefined) {
            defWord.wordName = ''
          }
          this.text =
            engWord.wordName + ' ' + geoWord.wordName + ' ' + defWord.wordName
        }
      }
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
