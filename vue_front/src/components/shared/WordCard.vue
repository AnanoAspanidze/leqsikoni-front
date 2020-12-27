<template>
  <div class="card word">
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
              <!-- eng tooltip -->
              <b-tooltip
                :triggers="['click']"
                position="is-bottom"
                type="is-info"
                :auto-close="['outside', 'escape']"
              >
                <template v-slot:content>
                  <div class="is-flex is-flex-direction-column tooltip-icons">
                    <div class="pb-1">
                      <b-icon
                        size="is-medium"
                        icon="sticky-notes"
                        type="is-text"
                      />
                      <span class="px-4">{{ word.sourceText || '-' }}</span>
                    </div>
                    <div class="pt-1" @click="openLink(word.sourceLink)">
                      <b-icon size="is-medium" icon="link" type="is-text" />
                      <span class="px-4 is-clickable">
                        {{ word.sourceLink || '-' }}
                      </span>
                    </div>
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
              class="has-text-primary is-family-secondary is-capitalized ml-3"
              :class="[
                word.isAuthor ? 'has-text-weight-bold' : 'has-text-weight-light'
              ]"
            >
              {{ word.wordName }}
            </p>
            <p
              v-if="word.wordType.toLowerCase() === 'geo'"
              class="has-text-text is-family-secondary is-capitalized ml-3 mt"
            >
              {{ word.wordName }}
            </p>
            <p
              v-if="word.wordType.toLowerCase() === 'def'"
              class="has-text-text is-family-secondary is-capitalized ml-3"
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
                  <div class="is-flex is-flex-direction-column tooltip-icons">
                    <div class="pb-1">
                      <b-icon
                        size="is-medium"
                        icon="sticky-notes"
                        type="is-text"
                      />
                      <span class="px-4">
                        {{ word.sourceText || '-' }}
                      </span>
                    </div>
                    <div class="pt-1" @click="openLink(word.sourceLink)">
                      <b-icon size="is-medium" icon="link" type="is-text" />
                      <span class="px-4 is-clickable">
                        {{ word.sourceLink || '-' }}
                      </span>
                    </div>
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
              class="has-text-primary is-family-secondary is-capitalized ml-3"
              :class="[
                word.isAuthor ? 'has-text-weight-bold' : 'has-text-weight-light'
              ]"
            >
              {{ word.wordName }}
            </p>
            <p
              v-if="word.wordType.toLowerCase() === 'geo'"
              class="has-text-text is-family-secondary is-capitalized ml-3 mt"
              :class="[
                word.isAuthor ? 'has-text-weight-bold' : 'has-text-weight-light'
              ]"
            >
              {{ word.wordName }}
            </p>
            <p
              v-if="word.wordType.toLowerCase() === 'def'"
              class="has-text-text is-family-secondary is-capitalized ml-3"
              :class="[
                word.isAuthor ? 'has-text-weight-bold' : 'has-text-weight-light'
              ]"
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
                  <div class="is-flex is-flex-direction-column tooltip-icons">
                    <div class="pb-1">
                      <b-icon
                        size="is-medium"
                        icon="sticky-notes"
                        type="is-text"
                      />
                      <span class="px-4">
                        {{ word.sourceText || '-' }}
                      </span>
                    </div>
                    <div class="pt-1" @click="openLink(word.sourceLink)">
                      <b-icon size="is-medium" icon="link" type="is-text" />
                      <span class="px-4 is-clickable">
                        {{ word.sourceLink || '-' }}
                      </span>
                    </div>
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
              :class="[
                word.isAuthor ? 'has-text-weight-bold' : 'has-text-weight-light'
              ]"
              class="has-text-primary is-family-secondary is-capitalized ml-3"
            >
              {{ word.wordName }}
            </p>
            <p
              v-if="word.wordType.toLowerCase() === 'geo'"
              :class="[
                word.isAuthor ? 'has-text-weight-bold' : 'has-text-weight-light'
              ]"
              class="has-text-text is-family-secondary is-capitalized ml-3 mt"
            >
              {{ word.wordName }}
            </p>
            <p
              v-if="word.wordType.toLowerCase() === 'def'"
              :class="[
                word.isAuthor ? 'has-text-weight-bold' : 'has-text-weight-light'
              ]"
              class="has-text-text is-family-secondary is-capitalized ml-3"
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
        if (this.words.itemsList !== undefined) {
          return this.words.itemsList.filter(
            x => x.wordType.toLowerCase() === 'eng'
          )
        }
        return null
      },
      geoWords() {
        if (this.words.itemsList !== undefined) {
          return this.words.itemsList.filter(
            x => x.wordType.toLowerCase() === 'geo'
          )
        }
        return null
      },
      defWords() {
        if (this.words.itemsList !== undefined) {
          return this.words.itemsList.filter(
            x => x.wordType.toLowerCase() === 'def'
          )
        }
        return null
      }
    },
    methods: {
      openLink(val) {
        if (val !== '') {
          window.open(val, '_blank')
        }
      }
    }
  }
</script>

<style lang="scss">
  .card {
    &.word {
      z-index: 20;
    }
    &-content {
      &_line {
        &-icon {
          border-radius: 100%;
          height: 26px;
          width: 26px;
        }
        &-share {
          background: #fff;
          position: relative;
          z-index: 50;
          border-radius: 20px;
          .buttons button {
            padding: 1rem 1.2rem !important;
          }
        }
      }
    }
    .tooltip-icons i {
      font-size: 1.2rem;
    }
  }
</style>
