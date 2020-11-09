<template>
  <div class="card">
    <div class="card-content mx-6 my-5">
      <slot name="edit"></slot>
      <!-- fist content -->
      <div class="card-content_line is-flex">
        <div
          class="card-content_line-icon has-background-warning is-flex is-justify-content-center px-1 py-1"
        >
          <b-tooltip
            label="this is user data"
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
          class="has-text-primary is-family-secondary has-text-weight-bold is-capitalized ml-3"
        >
          {{ word.engWord }}
        </p>
      </div>
      <!-- second content -->
      <div class="card-content_line is-flex mt-3">
        <div
          class="card-content_line-icon has-background-warning is-flex is-justify-content-center px-1 py-1"
        >
          <b-tooltip
            label="this is user data"
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
          class="has-text-text is-family-secondary has-text-weight-light is-capitalized ml-3"
        >
          {{ word.geoWord }}
        </p>
      </div>
      <!-- third content -->
      <div class="card-content_line is-flex mt-3">
        <div
          class="card-content_line-icon has-background-warning is-flex is-justify-content-center px-1 py-1"
        >
          <b-tooltip
            label="this is user data"
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
          class="has-text-text is-family-secondary has-text-weight-light is-capitalized ml-3"
        >
          {{ word.wordDefinition }}
        </p>
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
      word: {
        type: Object,
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
