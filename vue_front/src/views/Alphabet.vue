<template>
  <div class="alphabet">
    <app-bee />
    <app-fly />
    <app-light-house />
    <div class="container section pt-0">
      <div class="columns is-centered is-multiline">
        <div v-if="userPath" class="column is-7">
          <div class="is-flex is-align-items-center alphabet_words">
            <figure class="image is-32x32">
              <img src="@/assets/img/yellow-ladybird.svg" />
            </figure>
            <h3 class="ml-4">ჩემი სიტყვები</h3>
          </div>
        </div>
        <div class="column is-12">
          <!-- ანბანის ველის -->
          <div ref="searchWrap" class="is-flex is-justify-content-center">
            <transition
              mode="out-in"
              :css="false"
              @enter="cardEnter"
              @leave="cardLeave"
            >
              <div
                v-if="alphabet.active || $route.name === 'AlphabetActive'"
                class="card is-alphabet py-3"
              >
                <div
                  class="is-flex is-justify-content-center has-text-primary is-family-primary is-size-4  is-relative"
                  :class="[$screen.tablet ? 'my-5' : 'my-6']"
                >
                  <div class="search-wrap">
                    <transition
                      :css="false"
                      mode="out-in"
                      @enter="letterEnter"
                      @enter-after="letterEnterAfter"
                      @leave="letterLeave"
                    >
                      <ul
                        :key="alphabet.index"
                        class="is-flex alphabet_list is-absolute"
                        :class="{
                          'is-justify-content-space-around': $screen.widescreen
                        }"
                      >
                        <li
                          v-for="letter in langAlph[alphabet.index]"
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
                    </transition>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <!-- ანბანის ველის - დასასრული  -->
        </div>
      </div>
      <div
        class="columns is-centered mt-5"
        :class="[
          { 'is-mobile-mt': isOpen && !isEng && !isGeo && !isDate },
          { 'is-mobile-mt-lg': isOpen && isEng && isGeo && isDate },
          { 'is-lang-mt': isEng },
          { 'is-lang-mt': isGeo },
          { 'is-lang-mt': isDate }
        ]"
      >
        <div class="column is-10">
          <div
            class="is-flex is-justify-content-center is-align-content-center alphabet-wrapper"
          >
            <div v-if="!userPath" class="lang is-relative mr-5">
              <div class="lang_icon is-inline-flex">
                <b-icon
                  size="is-large"
                  icon="internet"
                  class="is-size-2 has-text-primary is-clickable"
                  @click.native="showSorting"
                ></b-icon>
              </div>
              <div class="is-absolute is-panel_wrapper">
                <b-collapse
                  v-model="isOpen"
                  aria-id="contentIdForA11y1"
                  class="panel mt-2 px-3 "
                  animation="slide"
                >
                  <!-- ქართ. ანბანის ფილტრი -->
                  <div class="is-clickable px-2 py-2">
                    <div @click="isGeo = !isGeo">
                      ქართული
                      <b-icon
                        size="is-small"
                        :icon="isGeo ? 'up' : 'down'"
                        class=" pl-2"
                      ></b-icon>
                    </div>
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
                        @click="getAlphabet('ka', item)"
                      >
                        {{ item }}
                      </div>
                    </b-collapse>
                  </div>
                  <!-- ინგ ანბანის ფილტრი -->
                  <div class="is-clickable px-2 py-2">
                    <div @click="isEng = !isEng">
                      English
                      <b-icon
                        size="is-small"
                        :icon="isEng ? 'up' : 'down'"
                        class="pl-2"
                      ></b-icon>
                    </div>
                    <b-collapse
                      v-model="isEng"
                      aria-id="contentIdForA11y3"
                      class=" mt-2 px-3"
                      animation="slide"
                    >
                      <div
                        v-for="item in engSort"
                        :key="item"
                        class="has-text-text is-sorting"
                        @click="getAlphabet('en', item)"
                      >
                        {{ item }}
                      </div>
                    </b-collapse>
                  </div>
                  <!-- თარიღით ფილტრი -->
                  <div class="is-clickable px-2 py-2">
                    <div @click="isDate = !isDate">
                      თარიღით
                      <b-icon
                        size="is-small"
                        :icon="isDate ? 'up' : 'down'"
                        class="pl-2"
                      ></b-icon>
                    </div>
                    <b-collapse
                      v-model="isDate"
                      aria-id="contentIdForA11y3"
                      class=" mt-2 px-3"
                      animation="slide"
                    >
                      <div
                        v-for="item in dateSort"
                        :key="item"
                        class="has-text-text is-sorting"
                        @click="getAlphabet('date', item)"
                      >
                        {{ item }}
                      </div>
                    </b-collapse>
                  </div>
                </b-collapse>
              </div>
            </div>
            <div class="search" :class="[userPath ? 'ml-10' : 'ml-5']">
              <div class="card is-flex is-align-items-center">
                <div class="search is-flex is-align-items-center">
                  <form @submit.prevent="getSearch">
                    <input
                      v-model="search"
                      class="input is-rounded"
                      type="text"
                      placeholder="მოძებნე"
                    />
                  </form>
                </div>
                <div class="search_icon is-flex is-relative">
                  <div
                    class="find is-flex is-align-items-center is-justify-content-center mr-4"
                  >
                    <figure
                      class="image"
                      :class="[$screen.width > 769 ? 'is-64x64' : 'is-48x48']"
                    >
                      <img :src="shearchIcon" />
                    </figure>
                  </div>
                  <div
                    class="add is-flex is-align-items-center is-justify-content-center is-absolute"
                  >
                    <div
                      class="image"
                      :class="[$screen.width > 769 ? 'is-64x64' : 'is-48x48']"
                    >
                      <svg viewBox="0 0 79.238 79.6">
                        <defs>
                          <filter id="shadow2">
                            <feDropShadow
                              dx="1"
                              dy="3"
                              stdDeviation="4"
                              flood-color="#f7cf43"
                            />
                          </filter>
                        </defs>
                        <g
                          transform="translate(10 10)"
                          @click="$router.push({ name: 'AddWords' })"
                        >
                          <g transform="translate(55.238 0) rotate(90)">
                            <g transform="translate(0 0)">
                              <g
                                class="c"
                                transform="matrix(0, -1, 1, 0, -10, 65.24)"
                                r="4"
                                style="filter:url(#shadow2);"
                              >
                                <path
                                  class="a"
                                  d="M.4,27.291s5.065,27.947,28.7,27.947,31.321-25.321,23.632-39.95S22.9-4.03,9.963,3.659.4,27.291.4,27.291Z"
                                  transform="translate(65.24 10) rotate(90)"
                                />
                              </g>
                            </g>
                          </g>
                          <g transform="translate(-894.947 -318.641)">
                            <line
                              class="b"
                              y2="10.952"
                              transform="translate(922.976 340.5)"
                            />
                            <line
                              class="b"
                              x1="10.952"
                              transform="translate(917.5 345.976)"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <p v-if="searchCount" class="has-text-left mt-4 ml-6">
                მოიძებნა {{ searchCount }} სიტყვა
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- cards nested routes--->

      <transition
        :css="false"
        mode="out-in"
        @enter="routerEnter"
        @leave="routerLeave"
      >
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
  import AppBee from '@/components/shared/Bee.vue'
  import AppFly from '@/components/shared/Fly'
  import AppLightHouse from '@/components/shared/LightHouse'
  import { mapGetters, mapActions } from 'vuex'
  import { gsap } from 'gsap'

  export default {
    name: 'Alphabet',
    components: {
      AppBee,
      AppFly,
      AppLightHouse
    },
    data() {
      return {
        alphabet: {
          active: false,
          index: 0
        },
        selectedLetter: null,
        isOpen: false,
        isGeo: false,
        isEng: false,
        isDate: false,
        geoSort: ['ა - ჰ', 'ჰ - ა'],
        engSort: ['A-Z', 'Z-A'],
        dateSort: ['ახალი', 'ძველი'],
        search: ''
      }
    },
    computed: {
      ...mapGetters(['langAlph', 'searchCount']),
      userPath() {
        return this.$route.fullPath.includes('user')
      },
      shearchIcon() {
        if (!this.userPath) {
          return require('@/assets/img/component-1.svg')
        }
        return require('@/assets/img/edit.svg')
      }
    },
    methods: {
      ...mapActions(['getWordByQuery']),
      selectLetter(val) {
        this.selectedLetter = val
        this.$router.push({ query: { FilterChar: val } }).catch(() => {})
      },
      getSearch() {
        this.$router
          .push({ query: { SearchQuery: this.search } })
          .catch(() => {})
      },
      // globe show/hide
      showSorting() {
        this.isOpen = !this.isOpen
        this.isEng = false
        this.isGeo = false
        this.alphabet.active = false
      },
      // get lnag change
      getAlphabet(val, data) {
        // სორტირება ქარტ, ინგ და თარიღის მიზედვით
        switch (data) {
          case this.geoSort[0]:
            this.$router
              .push({ query: { SortOrder: 'geo_name_asc' } })
              .catch(() => {})
            break
          case this.geoSort[1]:
            this.$router
              .push({ query: { SortOrder: 'geo_name_desc' } })
              .catch(() => {})
            break
          case this.engSort[0]:
            this.$router
              .push({ query: { SortOrder: 'eng_name_asc' } })
              .catch(() => {})
            break
          case this.engSort[1]:
            this.$router
              .push({ query: { SortOrder: 'eng_name_desc' } })
              .catch(() => {})
            break
          case this.dateSort[0]:
            this.$router
              .push({ query: { SortOrder: 'date_asc' } })
              .catch(() => {})
            break
          case this.dateSort[1]:
            this.$router
              .push({ query: { SortOrder: 'date_desc' } })
              .catch(() => {})
            break
          default:
            break
        }
        if (val === 'ka') {
          this.alphabet.active = true
          this.alphabet.index = 0
        } else {
          this.alphabet.active = true
          this.alphabet.index = 1
        }
      },
      //animation
      cardEnter(el, done) {
        let width = this.$refs.searchWrap.clientWidth
        gsap.to(el, {
          opacity: 1,
          width: width,
          duration: 0.5,
          onComplete: done
        })
      },
      cardLeave(el, done) {
        gsap.to(el, {
          opacity: 0,
          width: 0,
          duration: 0.5,
          onComplete: done
        })
      },

      //letters
      letterEnter(el, done) {
        gsap.from(el, {
          opacity: 0,
          duration: 0.6,
          rotateX: 90,
          onComplete: done
        })
      },
      letterEnterAfter(el, done) {
        gsap.set(el, {
          translate: '(-50%, -50%)',
          onComplete: done
        })
      },
      letterLeave(el, done) {
        gsap.to(el, {
          opacity: 0,
          rotateX: 90,
          duration: 0.6,
          onComplete: done
        })
      },
      // router animation
      routerEnter(el, done) {
        gsap.from(el, {
          opacity: 0,
          scale: 0.7,
          duration: 0.6,
          onComplete: done
        })
      },
      routerLeave(el, done) {
        gsap.to(el, {
          opacity: 0,
          scale: 0.7,
          duration: 0.6,
          onComplete: done
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .alphabet {
    .is-alphabet {
      width: 100%;
    }
    &_words {
      margin-bottom: -5rem;
    }
    .search-wrap {
      min-height: 40px;
    }
    &_list {
      width: 80%;
      min-width: 80%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      li {
        border-radius: 100%;
        height: 30px;
        width: 30px;
        min-width: 30px;
      }
    }
    &-wrapper {
      .lang {
        margin-top: 2rem;
        &_icon {
          border-radius: 100%;
          box-shadow: 2px 2px 8px #badfed99;
          &:hover {
            box-shadow: 1px 1px 6px #f7cf43;
          }
        }
        .is-panel_wrapper {
          right: 0;
          z-index: 5;
          min-width: 160px;
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
          height: 94px;
          border-radius: 5rem;
        }

        input {
          border-color: transparent;
          border-radius: 0;
          box-shadow: none;
          padding-inline-start: 2rem;
        }
        &_icon {
          height: 100%;
          width: 170px;
          margin-right: 2rem;
          .find {
            height: 100%;
            width: 100%;
            background: url('../assets/img/blue-mark.svg') no-repeat;
            background-position: center bottom;
            margin-right: 0;
          }
          .add {
            right: -20px;
            top: 50%;
            transform: translateY(-50%);
            div {
              cursor: pointer;
              &:hover {
                .a {
                  fill: #f7cf43;
                }
                .b {
                  fill: none;
                  stroke: #fff;
                  stroke-width: 2px;
                }
              }
              .a {
                fill: #fff;
              }
              .b {
                fill: none;
                stroke: #f7cf43;
                stroke-width: 2px;
              }
              .c {
                filter: drop-shadow(2px 2px 4px #f7cf43);
              }
            }
          }
        }
      }
    }
    @media screen and (max-width: 1216px) {
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
          .lang {
            margin-top: 0.75rem;
            margin-right: 1rem !important;
            .is-panel_wrapper {
              transform: translate(80%, 6%);
            }
          }
          .search {
            margin-left: 0 !important;
            .card {
              height: 64px;
              border-radius: 5rem;
            }
            &_icon {
              width: 162px;
              margin-right: 0;
              .find {
                background-size: contain;
              }
              .add {
                right: 6px;
              }
            }
          }
        }
      }

      .is-mobile-mt {
        margin-bottom: 10rem !important;
      }
      .is-mobile-mt-lg {
        margin-bottom: 20rem !important;
      }
      .is-lang-mt {
        margin-bottom: 15rem;
      }
    }
    @media screen and (max-width: 500px) {
      .alphabet-wrapper .search_icon {
        width: 262px;
      }
    }
  }
</style>
