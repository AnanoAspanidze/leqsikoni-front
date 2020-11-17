<template>
  <div class="card">
    <div
      v-if="words != 0"
      class="card-content my-5"
      :class="[!$screen.tablet ? 'mx-3' : 'mx-6']"
    >
      <slot name="edit"></slot>
      <!-- fist content -->
      <div class="card-content_line is-flex is-flex-direction-column">
        <div
          v-for="word in words.itemsList"
          :key="word.itemId"
          class="is-flex mb-3"
        >
          <div
            class="card-content_line-icon has-background-warning is-flex is-justify-content-center px-1 py-1"
          >
            <b-tooltip
              :label="word.user.userName"
              :triggers="['click']"
              position="is-bottom"
              type="is-info"
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
              label="this is info data"
              :triggers="['click']"
              position="is-bottom"
              type="is-info"
            >
              <b-icon
                size="is-small"
                icon="info"
                type="is-white"
                class="is-clickable"
              ></b-icon>
            </b-tooltip>
          </div>
          <p
            class="has-text-text is-family-secondary has-text-weight-bold is-capitalized ml-3"
            :class="{
              'has-text-primary': word.wordType.toLowerCase() === 'eng'
            }"
          >
            {{ word.wordName }}
          </p>
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
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    overflow-x: auto;

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
