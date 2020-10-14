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
          <div ref="searchWrap" class="is-flex is-justify-content-center">
            <transition
              mode="out-in"
              :css="false"
              @enter="cardEnter"
              @leave="cardLeave"
            >
              <div v-if="alphabet.active" class="card">
                <div
                  class="is-flex is-justify-content-center has-text-primary is-family-primary is-size-4 my-5 is-relative"
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
                          'is-justify-content-space-around': $screen.desktop
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
      <div class="columns is-centered">
        <div class="column is-10">
          <div
            class="is-flex is-justify-content-center is-align-content-center alphabet-wrapper"
          >
            <div class="lang is-relative mr-5">
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
                        @click="getAlphabet('ka')"
                      >
                        {{ item }}
                      </div>
                    </b-collapse>
                  </div>
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
                        @click="getAlphabet('en')"
                      >
                        {{ item }}
                      </div>
                    </b-collapse>
                  </div>
                  <div class="is-clickable px-2 py-2 is-date">თარიღით</div>
                </b-collapse>
              </div>
            </div>
            <div class="search ml-5">
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
                <div class="search_add-icon">
                  <div>
                    <svg viewBox="0 0 79.238 79.6">
                      <!--  <defs>
                        <filter
                          id="a"
                          x="0"
                          y="0"
                          width="79.238"
                          height="79.6"
                          filterUnits="userSpaceOnUse"
                        >
                          <feOffset dx="2" dy="2" input="SourceAlpha" />
                          <feGaussianBlur stdDeviation="4" result="b" />
                          <feFlood flood-color="#f7cf43" flood-opacity="0.4" />
                          <feComposite operator="in" in2="b" />
                          <feComposite in="SourceGraphic" />
                        </filter>
                      </defs> -->
                      <g transform="translate(10 10)">
                        <g transform="translate(55.238 0) rotate(90)">
                          <g transform="translate(0 0)">
                            <g
                              class="c"
                              transform="matrix(0, -1, 1, 0, -10, 65.24)"
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
        alphabet: {
          active: false,
          index: 0
        },
        selectedLetter: null,
        isOpen: false,
        isGeo: false,
        isEng: false,
        geoSort: ['ა - ჰ', 'ჰ - ა'],
        engSort: ['A-Z', 'Z-A']
      }
    },
    computed: {
      ...mapGetters(['langAlph'])
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
      },
      // globe show/hide
      showSorting() {
        this.isOpen = !this.isOpen
        this.isEng = false
        this.isGeo = false
        this.alphabet.active = false
      },
      // get lnag change
      getAlphabet(val) {
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .alphabet {
    .test {
      height: 40px;
    }
    .bee {
      right: 100px;
      top: 50px;
      z-index: 100;
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
        height: 40px;
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
          height: 100px;
          border-radius: 5rem;
        }
        &_icon {
          height: 100%;
          width: 94%;
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
        &_add-icon div {
          margin-left: -2rem;
          height: 64px;
          width: 64px;
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
