<template>
  <div class="alphabet">
    <div class="columns is-centered">
      <div class="column is-8 is-relative">
        <div class="bee is-absolute">
          <figure class="image is-32x32">
            <img src="../assets/img/bee.svg" />
          </figure>
        </div>
      </div>
    </div>
    <div class="container section">
      <div class="columns">
        <div class="column is-12">
          <!-- ანბანის ველის -->
          <div class="card">
            <div
              class="is-flex is-justify-center has-text-primary is-family-primary is-size-4 my-5"
            >
              <ul
                class="is-flex alphabet_list"
                :class="{
                  'is-justify-content-space-around': $screen.desktop
                }"
              >
                <li
                  v-for="letter in alphabetToDisplay"
                  :key="letter"
                  class="is-clickable is-flex is-justify-content-center is-align-content-center"
                  :class="
                    selectedLetter === letter
                      ? 'has-background-warning has-text-white'
                      : ''
                  "
                  @click="selectLetter(letter)"
                >
                  {{ letter }}
                </li>
              </ul>
            </div>
          </div>
          <!-- ანბანის ველის - დასასრული  -->
        </div>
        <div class="column"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Alphabet',
    data() {
      return {
        geo: true,
        selectedLetter: null
      }
    },
    computed: {
      ...mapGetters(['geoAlphabet', 'engAlphabet']),
      alphabetToDisplay() {
        if (this.geo) {
          return this.geoAlphabet
        }
        return this.engAlphabet
      }
    },
    methods: {
      selectLetter(val) {
        this.selectedLetter = val
      }
    }
  }
</script>

<style lang="scss" scoped>
  .alphabet {
    .bee {
      right: 30px;
      top: 0;
      z-index: 100;
    }
    &_list {
      width: 80%;
      li {
        border-radius: 100%;
        height: 40px;
        width: 40px;
      }
    }
    @media screen and (max-width: 1024px) {
      .alphabet {
        &_list {
          flex-direction: row;
          flex-wrap: wrap;
        }
      }
    }
  }
</style>
