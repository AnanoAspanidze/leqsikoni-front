<template>
  <div class="wordInfo">
    <v-container>
      <v-timeline dense>
        <transition-group name="flip-list">
          <v-timeline-item
            v-for="item in wordList"
            :key="item.wordId"
            color="primary"
            fill-dot
            right
            small
          >
            <div v-if="item.isMainWord">
              <single-word
                v-if="item.wordType === 'Eng'"
                :item="item"
                :get-mein-geo="getMeinGeo"
                :get-mein-eng="getMeinEng"
                :get-mein-def="getMeinDef"
                @wordSelect="setMainWord($event)"
              />
              <single-word
                v-if="item.wordType === 'Geo'"
                :item="item"
                :get-mein-geo="getMeinGeo"
                :get-mein-eng="getMeinEng"
                :get-mein-def="getMeinDef"
                @wordSelect="setMainWord($event)"
              />
              <single-word
                v-if="item.wordType === 'Def'"
                :item="item"
                :get-mein-geo="getMeinGeo"
                :get-mein-eng="getMeinEng"
                :get-mein-def="getMeinDef"
                @wordSelect="setMainWord($event)"
              />
            </div>
            <div v-else>
              <single-word
                v-if="item.wordType === 'Eng'"
                :item="item"
                :get-mein-geo="getMeinGeo"
                :get-mein-eng="getMeinEng"
                :get-mein-def="getMeinDef"
                @wordSelect="setMainWord($event)"
              />
              <single-word
                v-if="item.wordType === 'Geo'"
                :item="item"
                :get-mein-geo="getMeinGeo"
                :get-mein-eng="getMeinEng"
                :get-mein-def="getMeinDef"
                @wordSelect="setMainWord($event)"
              />
              <single-word
                v-if="item.wordType === 'Def'"
                :item="item"
                :get-mein-geo="getMeinGeo"
                :get-mein-eng="getMeinEng"
                :get-mein-def="getMeinDef"
                @wordSelect="setMainWord($event)"
              />
            </div>
          </v-timeline-item>
        </transition-group>
      </v-timeline>
    </v-container>
    <v-snackbar
      v-model="snackbar.success"
      :timeout="timeout"
      :color="snackbar.type"
      bottom
      text
      content-class="text-center"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SingleWord from '@/components/SingleWord.vue'

export default {
  name: 'Details',
  components: {
    SingleWord
  },
  data() {
    return {
      wordList: [],
      snackbar: {
        success: false,
        message: '',
        type: ''
      },
      timeout: 1500
    }
  },
  computed: {
    ...mapGetters('wordData', ['WordsById', 'containerId']),
    getMeinGeo() {
      let geoWord = this.wordList.filter(
        x => x.wordType === 'Geo' && x.isMainWord
      )
      return geoWord
    },
    getMeinEng() {
      let engWord = this.wordList.filter(
        x => x.wordType === 'Eng' && x.isMainWord
      )
      return engWord
    },
    getMeinDef() {
      let defWord = this.wordList.filter(
        x => x.wordType === 'Def' && x.isMainWord
      )
      return defWord
    }
  },
  watch: {
    WordsById(newValue) {
      this.wordList = newValue
    }
  },
  created() {
    const id = this.$route.params.itemId
    this.getWordById(id)
  },
  methods: {
    ...mapActions('wordData', ['getWordById', 'changeSelectedWord']),
    setMainWord(id) {
      let word = this.wordList.find(x => x.wordId === id)
      let data = {
        itemId: this.containerId,
        itemsList: [{ ...word }]
      }
      this.changeSelectedWord(data)
        .then(result => {
          console.log(result)
          this.snackbar.type = 'success'
          Object.assign(this.snackbar, result)
          this.getWordById(this.$route.params.itemId)
        })
        .catch(err => {
          this.snackbar.type = 'error'
          Object.assign(this.snackbar, err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 1s;
}
</style>
