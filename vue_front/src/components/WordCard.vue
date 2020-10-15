<template>
  <div class="columns is-centered">
    <div class="column is-10">
      <div class="card">
        <div class="card-content">
          <!-- fist content -->
          <div class="card-content_line is-flex">
            <div
              class="card-content_line-icon has-background-warning is-inline-flex is-justify-content-center px-1 py-1"
            >
              <b-icon size="is-small" icon="user" type="is-white"></b-icon>
            </div>
            <div
              class="card-content_line-icon has-background-primary is-inline-flex is-justify-content-center px-1 py-1 ml-2"
            >
              <b-icon size="is-small" icon="info" type="is-white"></b-icon>
            </div>
            <p class="has-text-primary ml-3">asasasasasas</p>
          </div>
          <!-- second content -->
          <div class="card-content_line is-flex mt-3">
            <div
              class="card-content_line-icon has-background-warning is-inline-flex is-justify-content-center px-1 py-1"
            >
              <b-icon size="is-small" icon="user" type="is-white"></b-icon>
            </div>
            <div
              class="card-content_line-icon has-background-primary is-inline-flex is-justify-content-center px-1 py-1 ml-2"
            >
              <b-icon size="is-small" icon="info" type="is-white"></b-icon>
            </div>
            <p class="has-text-text ml-3">asasasasasas</p>
          </div>
          <!-- share content -->
          <div class="card-content-line">
            <div class="card-content_line-share">
              <b-button type="is-primary" icon-right="edit" rounded outlined />
            </div>
            <div class="card-content_line-share">
              <b-button type="is-primary" rounded outlined>სრულად</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WordCard'
  }
</script>

<style lang="scss" scoped>
  .card-content {
    &_line {
      &-icon {
        border-radius: 100%;
      }
    }
  }
</style>
