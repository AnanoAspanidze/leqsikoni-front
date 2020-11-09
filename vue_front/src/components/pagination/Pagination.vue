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
      },
      currentPage: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        perPage: 5,
        rangeBefore: 3,
        rangeAfter: 1
      }
    },
    computed: {
      current: {
        get() {
          return this.currentPage
        },
        set(newValue) {
          this.$emit('update:page', newValue)
        }
      }
    }
  }
</script>

<style lang="scss" scoped></style>
