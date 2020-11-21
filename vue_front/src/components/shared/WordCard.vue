<template>
  <div class="card">
    <div
      v-if="words != 0"
      class="card-content py-6"
      :class="[!$screen.tablet ? 'mx-3' : 'mx-6']"
    >
      <slot name="edit"></slot>
      <div class="card-content_line is-flex is-flex-direction-column">
        <!-- English content -->
        <div :class="{ 'mb-3': $route.name === 'SingleWord' }">
          <div v-for="word in engWords" :key="word.itemId" class="is-flex mt-3">
            <div
              class="card-content_line-icon has-background-warning is-flex is-justify-content-center px-1 py-1"
            >
              <b-tooltip
                :label="word.user.userName"
                :triggers="['click']"
                position="is-bottom"
                type="is-info"
                :auto-close="['outside', 'escape']"
              >
                <b-icon
                  size="is-small"
                  icon="user"
                  type="is-white"
                  class="is-clickable"
                ></b-icon>
              </b-tooltip>
            </div>
            <div
              class="card-content_line-icon has-background-primary is-inline-flex is-justify-content-center px-1 py-1 ml-2"
            >
              <b-tooltip
                :triggers="['click']"
                position="is-bottom"
                type="is-info"
                :auto-close="['outside', 'escape']"
              >
                <template v-slot:content>
                  <div class="is-flex is-flex-direction-column">
                    <p class="pb-1">წყარო: {{ word.sourceText }}</p>
                    <a class="pt-1" href="word.sourceLink">ლინკი</a>
                  </div>
                </template>
                <b-icon
                  size="is-small"
                  icon="info"
                  type="is-white"
                  class="is-clickable"
                ></b-icon>
              </b-tooltip>
            </div>
            <slot name="icon"></slot>
            <p
              v-if="word.wordType.toLowerCase() === 'eng'"
              class="has-text-primary is-family-secondary has-text-weight-bold is-capitalized ml-3"
            >
              {{ word.wordName }}
            </p>
            <p
              v-if="word.wordType.toLowerCase() === 'geo'"
              class="has-text-text is-family-secondary has-text-weight-bold is-capitalized ml-3 mt"
            >
              {{ word.wordName }}
            </p>
            <p
              v-if="word.wordType.toLowerCase() === 'def'"
              class="has-text-text is-family-secondary has-text-weight-bold is-capitalized ml-3"
            >
              {{ word.wordName }}
            </p>
          </div>
        </div>
        <!-- Georgian content -->
        <div :class="{ 'my-3': $route.name === 'SingleWord' }">
          <div v-for="word in geoWords" :key="word.itemId" class="is-flex mt-3">
            <div
              class="card-content_line-icon has-background-warning is-flex is-justify-content-center px-1 py-1"
            >
              <b-tooltip
                :label="word.user.userName"
                :triggers="['click']"
                position="is-bottom"
                type="is-info"
                :auto-close="['outside', 'escape']"
              >
                <b-icon
                  size="is-small"
                  icon="user"
                  type="is-white"
                  class="is-clickable"
                ></b-icon>
              </b-tooltip>
            </div>
            <div
              class="card-content_line-icon has-background-primary is-inline-flex is-justify-content-center px-1 py-1 ml-2"
            >
              <b-tooltip
                :triggers="['click']"
                position="is-bottom"
                type="is-info"
                :auto-close="['outside', 'escape']"
              >
                <template v-slot:content>
                  <div class="is-flex is-flex-direction-column">
                    <p class="pb-1">წყარო: {{ word.sourceText }}</p>
                    <a class="pt-1" href="word.sourceLink">ლინკი</a>
                  </div>
                </template>
                <b-icon
                  size="is-small"
                  icon="info"
                  type="is-white"
                  class="is-clickable"
                ></b-icon>
              </b-tooltip>
            </div>
            <slot name="icon"></slot>
            <p
              v-if="word.wordType.toLowerCase() === 'eng'"
              class="has-text-primary is-family-secondary has-text-weight-bold is-capitalized ml-3"
            >
              {{ word.wordName }}
            </p>
            <p
              v-if="word.wordType.toLowerCase() === 'geo'"
              class="has-text-text is-family-secondary has-text-weight-bold is-capitalized ml-3 mt"
            >
              {{ word.wordName }}
            </p>
            <p
              v-if="word.wordType.toLowerCase() === 'def'"
              class="has-text-text is-family-secondary has-text-weight-bold is-capitalized ml-3"
            >
              {{ word.wordName }}
            </p>
          </div>
        </div>
        <!-- Definition content -->
        <div :class="{ 'mt-3': $route.name === 'SingleWord' }">
          <div v-for="word in defWords" :key="word.itemId" class="is-flex mt-3">
            <div
              class="card-content_line-icon has-background-warning is-flex is-justify-content-center px-1 py-1"
            >
              <b-tooltip
                :label="word.user.userName"
                :triggers="['click']"
                position="is-bottom"
                type="is-info"
                :auto-close="['outside', 'escape']"
              >
                <b-icon
                  size="is-small"
                  icon="user"
                  type="is-white"
                  class="is-clickable"
                ></b-icon>
              </b-tooltip>
            </div>
            <div
              class="card-content_line-icon has-background-primary is-inline-flex is-justify-content-center px-1 py-1 ml-2"
            >
              <b-tooltip
                :triggers="['click']"
                position="is-bottom"
                type="is-info"
                :auto-close="['outside', 'escape']"
              >
                <template v-slot:content>
                  <div class="is-flex is-flex-direction-column">
                    <p class="pb-1">წყარო: {{ word.sourceText }}</p>
                    <a class="pt-1" href="word.sourceLink">ლინკი</a>
                  </div>
                </template>
                <b-icon
                  size="is-small"
                  icon="info"
                  type="is-white"
                  class="is-clickable"
                ></b-icon>
              </b-tooltip>
            </div>
            <slot name="icon"></slot>
            <p
              v-if="word.wordType.toLowerCase() === 'eng'"
              class="has-text-primary is-family-secondary has-text-weight-bold is-capitalized ml-3"
            >
              {{ word.wordName }}
            </p>
            <p
              v-if="word.wordType.toLowerCase() === 'geo'"
              class="has-text-text is-family-secondary has-text-weight-bold is-capitalized ml-3 mt"
            >
              {{ word.wordName }}
            </p>
            <p
              v-if="word.wordType.toLowerCase() === 'def'"
              class="has-text-text is-family-secondary has-text-weight-bold is-capitalized ml-3"
            >
              {{ word.wordName }}
            </p>
          </div>
        </div>
      </div>

      <!-- share content -->
      <div class="card-content-line is-flex mt-5">
        <div class="card-content_line-share ml-a">
          <div class="buttons">
            <slot name="buttons"></slot>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="card-content my-5"
      :class="[!$screen.tablet ? 'mx-3' : 'mx-6']"
    >
      <h2 class="has-text-primary has-text-centered">ეს სექცია ცარიელია</h2>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      words: {
        type: [Object, Number],
        required: true
      }
    },
    computed: {
      engWords() {
        return this.words.itemsList.filter(
          x => x.wordType.toLowerCase() === 'eng'
        )
      },
      geoWords() {
        return this.words.itemsList.filter(
          x => x.wordType.toLowerCase() === 'geo'
        )
      },
      defWords() {
        return this.words.itemsList.filter(
          x => x.wordType.toLowerCase() === 'def'
        )
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    &-content {
      &_line {
        &-icon {
          border-radius: 100%;
          height: 24px;
          width: 24px;
        }
        &-share button {
          padding: 1rem 1.2rem;
          &:last-child {
            box-shadow: 2px 2px 6px #7fd1d866;
            border: none;
          }
        }
      }
    }
  }
</style>
