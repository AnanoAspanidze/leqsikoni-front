<template>
  <div class="wordInfo">
    <v-container fluid>
      <v-row>
        <v-col :cols="12">
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                სიტყვის დამატება
              </v-btn>
            </template>
            <v-card>
              <v-toolbar dark color="primary">
                <v-toolbar-items>
                  <v-btn dark text @click="resetValidation">
                    გაუქმება
                    <v-icon right dark>close</v-icon>
                  </v-btn>
                </v-toolbar-items>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn dark text @click="dialog = false">
                    <v-icon left dark>save_alt</v-icon>
                    შენახვა
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <v-row justify="center">
                <v-col :cols="6">
                  <h3 class="mt-10 text-center">ახალი სიტყვის დამატება</h3>
                  <v-form
                    ref="form"
                    v-model="valid"
                    class="mt-15"
                    lazy-validation
                  >
                    <v-textarea
                      v-model="form.wordName"
                      :rules="wordRules"
                      label="სიტყვა"
                      rows="1"
                      auto-grow
                      dense
                      required
                      clearable
                      outlined
                    ></v-textarea>
                    <div v-if="sourseActive">
                      <v-text-field
                        v-model="form.sourseText"
                        label="წყარო"
                        dense
                        prepend-icon="note"
                        clearable
                        outlined
                      ></v-text-field>
                      <v-text-field
                        v-model="form.sourceLink"
                        label="ლინკი"
                        prepend-icon="link"
                        dense
                        clearable
                        outlined
                      ></v-text-field>
                    </div>

                    <div class="float-icon">
                      <v-fab-transition>
                        <v-btn
                          :key="activeFab.icon"
                          :color="activeFab.color"
                          fab
                          small
                          dark
                          absolute
                          bottom
                          right
                          class="v-btn--example"
                          @click="getIcon"
                        >
                          <v-icon>{{ activeFab.icon }}</v-icon>
                        </v-btn>
                      </v-fab-transition>
                    </div>
                    <div class="d-flex">
                      <v-checkbox
                        v-model="form.wordType"
                        label="ინგლისური"
                        :rules="[v => !!v || 'მონიშნეთ სიტყვის ტიპი']"
                        class="mr-4"
                        value="Eng"
                        required
                      ></v-checkbox>
                      <v-checkbox
                        v-model="form.wordType"
                        label="ქართული"
                        :rules="[v => !!v || 'მონიშნეთ სიტყვის ტიპი']"
                        class="mr-4"
                        value="Geo"
                        required
                      ></v-checkbox>
                      <v-checkbox
                        v-model="form.wordType"
                        label="აღწერა"
                        :rules="[v => !!v || 'მონიშნეთ სიტყვის ტიპი']"
                        value="Def"
                        required
                      ></v-checkbox>
                    </div>
                    <v-checkbox
                      v-model="form.isMainWord"
                      class="mt-0 mb-4"
                      label="მთავაი სიტყვად მონიშვნა"
                      required
                    ></v-checkbox>

                    <div class="d-flex justify-center">
                      <v-btn color="success" @click="addWord">
                        დამატება
                      </v-btn>
                      <v-btn color="warning" class="mx-5" @click="reset">
                        გასუფთავება
                      </v-btn>
                      <v-btn color="error" @click="resetValidation">
                        გაუქმება
                      </v-btn>
                    </div>
                  </v-form>
                </v-col>
              </v-row>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>

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
                @editSingleWord="getEditDialog($event)"
              />
              <single-word
                v-if="item.wordType === 'Geo'"
                :item="item"
                :get-mein-geo="getMeinGeo"
                :get-mein-eng="getMeinEng"
                :get-mein-def="getMeinDef"
                @wordSelect="setMainWord($event)"
                @editSingleWord="getEditDialog($event)"
              />
              <single-word
                v-if="item.wordType === 'Def'"
                :item="item"
                :get-mein-geo="getMeinGeo"
                :get-mein-eng="getMeinEng"
                :get-mein-def="getMeinDef"
                @wordSelect="setMainWord($event)"
                @editSingleWord="getEditDialog($event)"
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
                @editSingleWord="getEditDialog($event)"
              />
              <single-word
                v-if="item.wordType === 'Geo'"
                :item="item"
                :get-mein-geo="getMeinGeo"
                :get-mein-eng="getMeinEng"
                :get-mein-def="getMeinDef"
                @wordSelect="setMainWord($event)"
                @editSingleWord="getEditDialog($event)"
              />
              <single-word
                v-if="item.wordType === 'Def'"
                :item="item"
                :get-mein-geo="getMeinGeo"
                :get-mein-eng="getMeinEng"
                :get-mein-def="getMeinDef"
                @wordSelect="setMainWord($event)"
                @editSingleWord="getEditDialog($event)"
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
  data: () => ({
    wordList: [],
    snackbar: {
      success: false,
      message: '',
      type: ''
    },
    timeout: 1500,
    dialog: false,
    valid: true,
    sourseActive: 0,
    form: {
      wordId: null,
      wordName: '',
      wordType: '',
      sourseText: '',
      sourceLink: '',
      mainWord: false,
      isActive: false,
      isAuthor: false,
      user: null
    },
    wordRules: [
      v => !!v || 'ველი სავალდებულოა',
      v => (v && v.length >= 2) || 'მინიმუმ 2 სიმბოლო'
    ]
  }),
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
    },
    activeFab() {
      switch (this.sourseActive) {
        case 0:
          return { color: 'success', icon: 'add' }
        case 1:
          return { color: 'red', icon: 'remove' }
        default:
          return {}
      }
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
    ...mapActions('wordData', [
      'getWordById',
      'changeSelectedWord',
      'addSingleWord',
      'editSingleWord'
    ]),
    getEditDialog(item) {
      this.form = item
      this.dialog = true
    },
    setMainWord(item) {
      this.changeSelectedWord(item)
        .then(result => {
          this.snackbar.type = 'success'
          Object.assign(this.snackbar, result)
          this.getWordById(this.$route.params.itemId)
        })
        .catch(err => {
          this.snackbar.type = 'error'
          Object.assign(this.snackbar, err)
        })
    },
    getIcon() {
      switch (this.sourseActive) {
        case 0:
          this.sourseActive = 1
          break

        case 1:
          this.sourseActive = 0
          break

        default:
          break
      }
    },
    addWord() {
      console.log(this.form.wordId)
      if (this.$refs.form.validate()) {
        if (this.wordId) {
          const data = {
            wordId: this.form.wordId,
            wordName: this.form.wordName,
            wordType: this.form.wordType,
            sourceLink: this.form.sourceLink,
            sourceText: this.form.sourseText
          }
          this.editSingleWord(data)
        } else {
          const word = {
            ContainerId: this.containerId,
            isActive: true,
            isAuthor: false,
            ...this.form
          }
          this.addSingleWord(word)
        }
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
      this.form = {
        wordId: null,
        wordName: '',
        wordType: '',
        sourseText: '',
        sourceLink: '',
        mainWord: false,
        isActive: false,
        isAuthor: false,
        user: null
      }
      this.dialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
.float-icon {
  position: relative;
}
.flip-list-move {
  transition: transform 1s;
}
</style>
