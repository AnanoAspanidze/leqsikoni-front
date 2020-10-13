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
              class="is-flex is-justify-content-center has-text-primary is-family-primary is-size-4 my-5"
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
      </div>
      <div class="columns is-centered">
        <div class="column is-10">
          <div
            class="is-flex is-justify-content-space-around is-align-content-center alphabet-wrapper"
          >
            <div class="lang">
              <div class="lang_icon is-inline-flex">
                <b-icon
                  size="is-large"
                  icon="internet"
                  class="is-size-2 has-text-primary is-clickable"
                  @click.native="isOpen = !isOpen"
                ></b-icon>
              </div>
              <b-collapse
                v-model="isOpen"
                aria-id="contentIdForA11y2"
                class="panel mt-2 px-3"
                animation="slide"
              >
                <div class="is-clickable px-2 py-2" @click="isGeo = !isGeo">
                  ქართული
                  <b-icon
                    size="is-small"
                    :icon="isGeo ? 'up' : 'down'"
                    class=" pl-2"
                  ></b-icon>
                  <b-collapse
                    v-model="isGeo"
                    aria-id="contentIdForA11y2"
                    class=" mt-2 px-3"
                    animation="slide"
                  >
                    <div
                      v-for="item in geoSort"
                      :key="item"
                      class="has-text-text is-sorting"
                    >
                      {{ item }}
                    </div>
                  </b-collapse>
                </div>
                <div class="is-clickable px-2 py-2" @click="isEng = !isEng">
                  English
                  <b-icon
                    size="is-small"
                    :icon="isEng ? 'up' : 'down'"
                    class="pl-2"
                  ></b-icon>
                  <b-collapse
                    v-model="isEng"
                    aria-id="contentIdForA11y2"
                    class=" mt-2 px-3"
                    animation="slide"
                  >
                    <div
                      v-for="item in engSort"
                      :key="item"
                      class="has-text-text is-sorting"
                    >
                      {{ item }}
                    </div>
                  </b-collapse>
                </div>
                <div class="is-clickable px-2 py-2 is-date">თარიღით</div>
              </b-collapse>
            </div>
            <div class="search">
              <div class="card is-flex is-align-items-center">
                <div
                  class="search_icon is-flex is-align-items-center is-justify-content-space-between"
                >
                  <input
                    class="input is-rounded"
                    type="text"
                    placeholder="მოძებნე"
                  />
                  <figure class="image is-64x64 mr-6">
                    <img src="@/assets/img/component-1.svg" />
                  </figure>
                </div>
                <div class="search_add-icon"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { gsap } from 'gsap'
  import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

  export default {
    name: 'Alphabet',
    data() {
      return {
        geo: true,
        selectedLetter: null,
        isOpen: false,
        isGeo: false,
        isEng: false,
        geoSort: ['ა - ჰ', 'ჰ - ა'],
        engSort: ['A-Z', 'Z-A']
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
    mounted() {
      gsap.registerPlugin(MotionPathPlugin)
      gsap.to('.bee', {
        transformOrigin: '50% 50%',
        duration: 5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        motionPath: {
          alignOrigin: [0.5, 0.5],
          curviness: 0,
          path: [
            { x: 0, y: 0, scale: 1 },
            { x: 40, y: -20, scale: 1.4 },
            { x: 80, y: 0, scale: 1 }
          ]
        }
      })
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
      right: 100px;
      top: 50px;
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
    &-wrapper {
      .lang {
        display: flex;
        align-items: center;
        &_icon {
          border-radius: 100%;
          box-shadow: 2px 2px 8px #badfed99;
          &:hover {
            box-shadow: 1px 1px 6px #f7cf43;
          }
        }
        .is {
          &-sorting:hover {
            color: #7fd1d8;
          }
          &-date:hover {
            color: #7fd1d8;
          }
        }
      }
      .search {
        width: 80%;
        .card {
          height: 100px;
          border-radius: 5rem;
        }
        &_icon {
          height: 100%;
          width: 90%;
          background: url('../assets/img/blue-mark.svg') no-repeat;
          background-position: center right;
          background-size: contain;
          input {
            width: 70%;
            border-color: transparent;
            border-radius: 0;
            box-shadow: none;
            padding-inline-start: 2rem;
          }
        }
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
    @media screen and (max-width: 769px) {
      .alphabet {
        &-wrapper {
          flex-direction: column;
          .search {
            width: 100%;
          }
        }
      }
    }
  }
</style>
