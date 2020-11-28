<template>
  <div class="is-inline-flex is-flex-direction-column">
    <div class="is-flex is-align-content-flex-start">
      <div class="add is-flex">
        <div
          class="image"
          :class="[$screen.width > 769 ? 'is-48x48' : 'is-32x32']"
        >
          <svg v-if="index == 0" viewBox="0 0 79.238 79.6">
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
            <g transform="translate(10 10)" @click="more(type)">
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
        <div
          class="icon-box has-background-primary is-flex is-justify-content-center is-align-items-center ml-2 mr-5 mt-3"
        >
          <b-icon
            size="is-small"
            icon="info"
            type="is-white"
            class="is-clickable"
            @click.native="toggle = !toggle"
          ></b-icon>
        </div>
      </div>
      <div class="control">
        <textarea
          v-model="syncDiscription"
          class="textarea has-fixed-size is-rounded"
          :placeholder="placeholder"
          :disabled="isDisabled"
        ></textarea>
      </div>
    </div>
    <section v-if="toggle">
      <b-field grouped>
        <b-input
          v-model="syncSource"
          :disabled="isDisabled"
          placeholder="წყარო"
          expanded
          rounded
          class="mt-2"
        ></b-input>
      </b-field>
      <b-field grouped>
        <b-input
          v-model="syncLinks"
          :disabled="isDisabled"
          placeholder="www"
          expanded
          rounded
          icon="link"
          class="mb-2"
        ></b-input>
      </b-field>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'AddInput',
    props: {
      placeholder: {
        type: String,
        default: ''
      },
      index: {
        type: Number,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      more: {
        type: Function,
        required: true
      },
      defination: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        toggle: false
      }
    },
    computed: {
      isDisabled() {
        if (this.defination) {
          if (!('isAuthor' in this.defination) || this.defination.isAuthor) {
            return false
          }
        }
        return true
      },
      // prop ტექსტის სინტქრონი
      syncDiscription: {
        get() {
          return this.defination.wordName
        },
        set(newValue) {
          this.$emit('update:newDefination', newValue)
        }
      },
      syncSource: {
        get() {
          return this.defination.sourceText
        },
        set(newValue) {
          this.$emit('update:newSource', newValue)
        }
      },
      syncLinks: {
        get() {
          return this.defination.sourceLink
        },
        set(newValue) {
          this.$emit('update:newLink', newValue)
        }
      }
    },
    methods: {
      // დამატებითი წყაროები
    }
  }
</script>

<style lang="scss" scoped>
  .add {
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
  .icon-box {
    border-radius: 100%;
    height: 22px;
    width: 22px;
  }
  textarea {
    border-radius: 20px;
    padding-top: 14px;
  }
</style>
