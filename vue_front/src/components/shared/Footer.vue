<template>
  <footer class="footer">
    <div class="content has-text-centered ">
      <div class="columns is-centered is-mobile">
        <div
          class="column is-one-fifth-desktop is-one-quarter-tablet is-three-fifths-mobile"
        >
          <div class="is-flex is-justify-content-space-around">
            <a class="button is-rounded has-text-primary">
              <i class="fi fb"></i>
            </a>
            <a class="button is-rounded has-text-primary">
              <i class="fi tw"></i>
            </a>
            <a class="button is-rounded has-text-primary">
              <i class="fi in"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'Footer',
    computed: {
      ...mapGetters(['contact'])
    },
    created() {
      this.getContactInfo()
    },
    methods: {
      ...mapActions(['getContactInfo'])
    }
  }
</script>

<style lang="scss" scoped>
  .footer {
    .button {
      padding: 10px;
      border: 2px solid #7fd1d8;
      //margin-left: 5vh;
      i {
        font-size: 16px;
      }
    }
  }
</style>
