<template>
  <div class="adding_word container section">
    <div class="columns is-centered">
      <div class="column is-6-desktop is-8-tablet is-12-mobile">
        <div class="card">
          <div class="card-header-title is-centered mt-5">
            <h1
              class="title has-text-primary is-size-6 has-text-weight-light is-relative"
            >
              სიტყვის დამატება
            </h1>
          </div>
          <div class="card-content">
            <p
              class="subtitle has-text-weight-light is-size-7 has-text-centered"
            >
              აუცილებელია ერთი ინგლისური ან ქართული სიტყვის ჩაწერა მაინც.
            </p>
            <div
              class="is-flex is-flex-direction-column is-justify-content-center"
            >
              <div
                v-for="(input, i) in wordList.engWords.slice().reverse()"
                :key="i + 'eng'"
                class="adding_word-english is-inline-flex is-justify-content-center mb-3"
              >
                <add-input
                  placeholder="ინგლისური სიტყვა"
                  type="eng"
                  :index="i"
                  :more="addInput"
                  :word="input"
                  :new-word.sync="input.wordName"
                  :new-source.sync="input.sourceText"
                  :new-link.sync="input.sourceLink"
                />
              </div>
              <div
                v-for="(input, i) in wordList.geoWords.slice().reverse()"
                :key="i + 'geo'"
                class="adding_word-gerigian is-inline-flex is-justify-content-center mb-3"
              >
                <add-input
                  placeholder="ქართული სიტყვა"
                  type="geo"
                  :index="i"
                  :more="addInput"
                  :word="input"
                  :new-word.sync="input.wordName"
                  :new-source.sync="input.sourceText"
                  :new-link.sync="input.sourceLink"
                />
              </div>
              <div
                v-for="(input, i) in wordList.defination.slice().reverse()"
                :key="i + 'disc'"
                class="adding_word-textarea is-inline-flex is-justify-content-center mb-3"
              >
                <add-textarea
                  placeholder="განმარტება"
                  type="def"
                  :index="i"
                  :more="addInput"
                  :defination="input"
                  :new-defination.sync="input.wordName"
                  :new-source.sync="input.sourceText"
                  :new-link.sync="input.sourceLink"
                />
              </div>
            </div>
            <div class="is-flex is-justify-content-center">
              <b-field class="pt-5 pb-5 mr-3">
                <b-button
                  type="is-warning"
                  rounded
                  outlined
                  native-type="submit"
                  :disabled="getSubmitCondition"
                  @click="submitWords"
                >
                  შენახვა
                </b-button>
              </b-field>
              <b-field class="pt-5 pb-5 ml-3">
                <b-button
                  type="is-danger"
                  rounded
                  outlined
                  @click="$router.push('/')"
                >
                  გაუქმება
                </b-button>
              </b-field>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-fly />
    <app-light-house />
  </div>
</template>

<script>
  //import AppBee from '@/components/shared/Bee.vue'
  import AppFly from '@/components/shared/Fly'
  import AppLightHouse from '@/components/shared/LightHouse'
  import AddInput from '@/components/AddInput.vue'
  import AddTextarea from '@/components/AddTextarea.vue'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'AddWords',
    components: {
      //AppBee,
      AppFly,
      AppLightHouse,
      AddInput,
      AddTextarea
    },
    data() {
      return {
        wordList: {
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
        }
      }
    },
    computed: {
      ...mapGetters('words', ['wordsToEdit']),
      // ing/ქარ რომელიმე ერთი უნდა იყოს შევსებული
      getSubmitCondition() {
        const geo = this.wordList.geoWords
        const eng = this.wordList.engWords
        const geoElem = geo[geo.length - 1]
        const engElem = eng[eng.length - 1]
        if (geoElem.wordName.length > 1 || engElem.wordName.length > 1) {
          return false
        }
        return true
      }
    },
    // შესაცვლელი სიტყვების ცვლილებაზე დაკვირვება და მიღებულის დამატება
    watch: {
      wordsToEdit(val) {
        val.itemsList.forEach(elm => {
          switch (elm.wordType.toLowerCase()) {
            case 'geo':
              this.wordList.geoWords.push(elm)
              break
            case 'eng':
              this.wordList.engWords.push(elm)
              break
            case 'def':
              this.wordList.defination.push(elm)
              break
            default:
              break
          }
        })
      }
    },
    created() {
      let wordId = parseInt(this.$route.params.wordId)
      if (wordId) {
        this.getEditWord(wordId)
      }
    },
    methods: {
      ...mapActions('words', ['getEditWord', 'addWord', 'editWord']),
      // add object to each input
      addInput(type) {
        let obj = {
          wordName: '',
          wordType: type,
          sourceText: '',
          sourceLink: '',
          wordId: 0
        }
        switch (type) {
          case 'eng':
            this.wordList.engWords.push(obj)
            break
          case 'geo':
            this.wordList.geoWords.push(obj)
            break
          case 'def':
            this.wordList.defination.push(obj)
            break
          default:
            break
        }
      },
      // შეტყობინების გამოტანა სიტყვის დამატება/შეცვლის წარმატება/წარუმატებლობისას
      getMessage(val, message) {
        if (val) {
          this.$buefy.toast.open({
            duration: 3000,
            message: message,
            position: 'is-bottom-right',
            type: 'is-success'
          })
          // reset word
          this.wordList = {
            geoWords: [
              {
                wordName: '',
                wordType: 'geo',
                sourceText: '',
                sourceLink: ''
              }
            ],
            engWords: [
              {
                wordName: '',
                wordType: 'eng',
                sourceText: '',
                sourceLink: ''
              }
            ],
            defination: [
              {
                wordName: '',
                wordType: 'def',
                sourceText: '',
                sourceLink: ''
              }
            ]
          }
        }
      },
      removeEmptyObjects() {
        // ცარიელ სიტყვებზე შემოწმება
        let eng = this.wordList.engWords.filter(x => x.wordName !== '')
        let geo = this.wordList.geoWords.filter(x => x.wordName !== '')
        let def = this.wordList.defination.filter(x => x.wordName !== '')

        if (eng.length > 0 || geo.length > 0) {
          // BE გასაგზავნი ფორმატი
          return {
            itemsList: [...eng, ...geo, ...def]
          }
        }
      },
      submitWords() {
        let wordList = this.removeEmptyObjects()
        // ახალი სიტყვის/სიტყვების დამატება
        if (!this.$route.params.wordId) {
          // შეტყობინების გამოტანის ფუნქციის გამოძახება წარმატება/წარუმატებლობისას
          this.addWord(wordList).then(result => {
            this.getMessage(result.success, result.message)
          })
        } else {
          // სიტყვების წვლილება
          wordList = this.removeEmptyObjects()
          wordList.itemId = this.wordsToEdit.itemId
          // შეტყობინების გამოტანის ფუნქციის გამოძახება წარმატება/წარუმატებლობისას
          this.editWord(wordList).then(result => {
            this.getMessage(result.success, result.message)

            // გადავამისამართოთ სიტყვის გვერდზე
            this.$router.push({
              name: 'SingleWord',
              params: { wordId: this.wordsToEdit.itemId }
            })
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .adding_word {
    h1::after {
      content: '';
      bottom: -10px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      border-bottom: 2px solid #f7cf43;
    }
  }
</style>
