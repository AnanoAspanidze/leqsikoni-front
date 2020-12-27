<template>
  <div class="wordlist">
    <v-card>
      <v-card-title>
        სიტყვები
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="ძებნა"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="wordList"
        :search="search"
        calculate-widths
      >
        <!-- geo -->
        <template v-slot:[`item.geoWord`]="{ value }">
          <v-chip v-if="value !== ''">
            <v-avatar left>
              <v-img src="@/assets/georgia.png"></v-img>
            </v-avatar>
            {{ value }}
          </v-chip>
        </template>
        <!-- eng -->
        <template v-slot:[`item.engWord`]="{ value }">
          <v-chip v-if="value !== ''">
            <v-avatar left>
              <v-img src="@/assets/united-kingdom.png"></v-img>
            </v-avatar>
            {{ value }}
          </v-chip>
        </template>
        <!-- def -->
        <template v-slot:[`item.defWord`]="{ value }" widths>
          <v-chip v-if="value !== ''">
            <v-avatar left>
              <v-img src="@/assets/notes.png"></v-img>
            </v-avatar>
            {{ value | shorten(25) }}
          </v-chip>
        </template>
        <!-- full -->
        <template v-slot:[`item.itemId`]="{ value }">
          <v-btn
            class="ma-2"
            dark
            color="primary"
            dense
            small
            @click="getFullInfo(value)"
          >
            <v-icon dark>
              read_more
            </v-icon>
          </v-btn>
        </template>
        <!-- condition -->
        <template v-slot:[`item.conditionWidthId`]="{ item }">
          <v-btn
            class="mx-1"
            fab
            dark
            x-small
            :color="getBlockColor(item.isContainerActive)"
            @click="wordConditionChange(item)"
          >
            <v-icon v-if="item.isContainerActive" dark>
              check_circle
            </v-icon>
            <v-icon v-else dark>
              remove_circle
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
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

export default {
  data() {
    return {
      search: '',
      dialog: false,
      valid: true,
      wordRules: [
        v => !!v || 'ველი სავალდებულოა',
        v => (v && v.length >= 2) || 'მინიმუმ 2 სიმბოლო'
      ],
      form: {
        geoWords: [
          {
            wordName: '',
            wordType: 'geo',
            sourceText: '',
            sourceLink: '',
            wordId: 0
          }
        ],
        engWords: [
          {
            wordName: '',
            wordType: 'eng',
            sourceText: '',
            sourceLink: '',
            wordId: 0
          }
        ],
        defination: [
          {
            wordName: '',
            wordType: 'def',
            sourceText: '',
            sourceLink: '',
            wordId: 0
          }
        ]
      },
      geoActive: 0,
      engActive: {
        value: 0,
        index: 0
      },
      defActive: 0,
      headers: [
        {
          text: 'ქართული სიტყვები',
          align: 'start',
          value: 'geoWord'
        },
        { text: 'ინგლისური სიტყვები', value: 'engWord' },
        { text: 'განმარტება', value: 'defWord' },
        { text: 'სრულად', value: 'itemId', sortable: false },
        { text: 'აქტიური', value: 'conditionWidthId', sortable: false }
      ],
      snackbar: {
        success: false,
        message: '',
        type: ''
      },
      timeout: 1500
    }
  },
  computed: {
    ...mapGetters('wordData', ['wordList']),
    engWordLength() {
      return this.form.engWords.length - 1
    },
    geoWordLength() {
      return this.form.geoWords.length - 1
    },
    defWordLength() {
      return this.form.defination.length - 1
    },
    geoFab() {
      switch (this.geoActive) {
        case 0:
          return { color: 'success', icon: 'add' }
        case 1:
          return { color: 'red', icon: 'remove' }
        default:
          return {}
      }
    },
    engFab() {
      switch (this.engActive.value) {
        case 0:
          return { color: 'success', icon: 'add' }
        case 1:
          return { color: 'red', icon: 'remove' }
        default:
          return {}
      }
    },
    defFab() {
      switch (this.defActive) {
        case 0:
          return { color: 'success', icon: 'add' }
        case 1:
          return { color: 'red', icon: 'remove' }
        default:
          return {}
      }
    }
  },
  created() {
    this.getWordList()
  },
  methods: {
    ...mapActions('wordData', ['getWordList', 'blockWord', 'unBlockWord']),
    resetValidation() {
      this.$refs.form.resetValidation()
      this.dialog = false
    },
    getFullInfo(val) {
      this.$router.push({ name: 'wordInfo', params: { itemId: val } })
    },
    getBlockColor(item) {
      if (item) {
        return 'success'
      }
      return 'error'
    },
    wordConditionChange(item) {
      console.log(item)
      if (item.isContainerActive) {
        this.blockWord(item.itemId)
          .then(result => {
            this.snackbar.type = 'success'
            Object.assign(this.snackbar, result)
            this.getWordList()
          })
          .catch(err => {
            this.snackbar.type = 'error'
            Object.assign(this.snackbar, err)
          })
      } else {
        this.unBlockWord(item.itemId)
          .then(result => {
            this.snackbar.type = 'success'
            Object.assign(this.snackbar, result)
            this.getWordList()
          })
          .catch(err => {
            this.snackbar.type = 'error'
            Object.assign(this.snackbar, err)
          })
      }
    },
    engIcon(i) {
      switch (this.engActive.value) {
        case 0:
          this.engActive.value = 1
          this.engActive.index = i
          break

        case 1:
          this.engActive.value = 0
          this.engActive.index = i
          break
        default:
          break
      }
    },
    geoIcon() {
      switch (this.geoActive) {
        case 0:
          this.geoActive = 1
          break

        case 1:
          this.geoActive = 0
          break

        default:
          break
      }
    },
    defIcon() {
      switch (this.defActive) {
        case 0:
          this.defActive = 1
          break

        case 1:
          this.defActive = 0
          break

        default:
          break
      }
    },
    addEngWord() {
      this.form.engWords.push({
        wordName: '',
        wordType: 'eng',
        sourceText: '',
        sourceLink: '',
        wordId: 0
      })
    },
    addGeoWord() {
      this.form.geoWords.push({
        wordName: '',
        wordType: 'geo',
        sourceText: '',
        sourceLink: '',
        wordId: 0
      })
    },
    addDefWord() {
      this.form.defination.push({
        wordName: '',
        wordType: 'def',
        sourceText: '',
        sourceLink: '',
        wordId: 0
      })
    }
  }
}
</script>

<style lang="scss">
.float-icon {
  position: relative;
  &_btn {
    top: 22px;
  }
  &_btn-def {
    bottom: 12px !important;
  }
}
.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense
  .v-input__prepend-outer {
  margin-top: 2px !important;
}
</style>
