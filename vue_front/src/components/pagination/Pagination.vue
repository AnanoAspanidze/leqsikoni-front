<template>
  <div class="columns is-centered mt-6 is-mobile">
    <div class="column is-7-tablet is-6-desktop is-5-widescreen">
      <b-pagination
        v-model="current"
        :total="200"
        :range-before="1"
        :range-after="1"
        :simple="false"
        :rounded="true"
        :per-page="8"
        size="is-small"
        order="is-centered"
        icon-prev="left-chevron"
        icon-next="right-chevron"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Pagination',
    data() {
      return {
        total: 200,
        current: 10,
        perPage: 10,
        rangeBefore: 3,
        rangeAfter: 1,
        order: '',
        size: '',
        isSimple: false,
        isRounded: false,
        prevIcon: 'chevron-left',
        nextIcon: 'chevron-right'
      }
    }
  }
</script>

<style lang="scss" scoped></style>
