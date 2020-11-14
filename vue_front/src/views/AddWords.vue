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
              პირველი სამი ველიდან ერთერთის შევსება სავალდებულოა.
            </p>
            <div
              class="is-flex is-flex-direction-column is-justify-content-center"
            >
              <div
                v-for="(input, i) in wordList.engWords"
                :key="i + 'eng'"
                class="adding_word-english is-inline-flex is-justify-content-center mb-3"
              >
                <add-input
                  :placeholder="'ინგლისური სიტყვა'"
                  type="eng"
                  :more="addInput"
                  :word="input.word"
                  :new-word.sync="input.word"
                />
              </div>
              <div
                v-for="(input, i) in wordList.geoWords"
                :key="i + 'geo'"
                class="adding_word-gerigian is-inline-flex is-justify-content-center mb-3"
              >
                <add-input
                  :placeholder="'ქართული სიტყვა'"
                  type="geo"
                  :more="addInput"
                  :word="input.word"
                  :new-word.sync="input.word"
                />
              </div>
              <div
                v-for="(input, i) in wordList.description"
                :key="i + 'disc'"
                class="adding_word-textarea is-inline-flex is-justify-content-center mb-3"
              >
                <add-textarea
                  :placeholder="'განმარტება'"
                  type="disc"
                  :more="addInput"
                  :discription="input.discription"
                  :new-discriptin.sync="input.discription"
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
                  @click="sublitWords"
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
        test: '',
        wordList: {
          userToken: 'asdasd323esda',
          geoWords: [
            {
              word: ''
            }
          ],
          engWords: [
            {
              word: ''
            }
          ],
          description: [
            {
              discription: ''
            }
          ]
        }
      }
    },
    methods: {
      addInput(type) {
        switch (type) {
          case 'eng':
            this.wordList.engWords.push({ word: '' })
            break
          case 'geo':
            this.wordList.geoWords.push({ word: '' })
            break
          case 'disc':
            this.wordList.description.push({ discription: '' })
            break
          default:
            break
        }
      },
      sublitWords() {
        //let checkObj = {}
        let eng = this.wordList.engWords.filter(x => x.word !== '')
        let geo = this.wordList.geoWords.filter(x => x.word !== '')
        let disc = this.wordList.description.filter(x => x.word !== '')

        console.log('eng =>', eng, 'geo =>', geo, 'disc =>', disc)
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
    &-english {
    }
    &-georgian {
    }
  }
</style>
