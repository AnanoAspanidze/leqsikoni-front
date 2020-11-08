<template>
  <div class="columns is-centered mt-6 is-mobile">
    <div class="column is-7-tablet is-6-desktop is-5-widescreen">
      <b-pagination
        v-model="current"
        :total="total"
        :range-before="rangeBefore"
        :range-after="rangeAfter"
        :simple="false"
        :rounded="true"
        :per-page="perPage"
        size="is-small"
        order="is-centered"
        icon-prev="left-chevron"
        icon-next="right-chevron"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        @change="$emit('currentPage', current)"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Pagination',
    props: {
      total: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        current: 1,
        perPage: 5,
        rangeBefore: 3,
        rangeAfter: 1
      }
    }
  }
</script>

<style lang="scss" scoped></style>
