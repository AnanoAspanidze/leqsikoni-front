<template>
  <nav
    class="navbar is-transparent "
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <div class="navbar-end is-mobile">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link is-arrowless is-relative">
            <div
              class="fi user has-text-warning is-flex is-justify-content-center is-align-items-flex-end"
              @click="redirectUser"
            ></div>
          </a>
          <div v-if="token" class="navbar-dropdown">
            <router-link to="" class="navbar-item">
              რედაქტირება
            </router-link>
            <router-link :to="{ name: 'UserWords' }" class="navbar-item">
              ჩემი სიტყვები
            </router-link>
            <a class="navbar-item" @click="logOut">
              გამოსვლა
            </a>
          </div>
        </div>
      </div>
      <router-link
        class="navbar-item"
        :to="{ path: '/', query: { PageNumber: 1 } }"
      >
        <img src="../../assets/img/logo.svg" width="112" height="28" />
      </router-link>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="isActive = !isActive"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      :class="{ 'is-active': isActive }"
    >
      <div class="navbar-start">
        <router-link
          :to="{ name: 'AlphabetActive' }"
          class="navbar-item hover-link px-6"
          @click.native="queryCheck"
        >
          <span class="is-relative">ანბანი</span>
        </router-link>
        <router-link
          :to="{ name: 'About' }"
          class="navbar-item hover-link px-6 "
        >
          <span class="is-relative">პროექტის შესახებ</span>
        </router-link>
        <router-link
          :to="{ name: 'Contact' }"
          class="navbar-item hover-link px-6"
        >
          <span class="is-relative">კონტაქტი</span>
        </router-link>
      </div>

      <div class="navbar-end is-flex is-justify-content-center is-desktop">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link is-arrowless is-relative">
            <div
              class="fi user has-text-warning is-flex is-justify-content-center is-align-items-flex-end"
              @click="redirectUser"
            ></div>
          </a>
          <div v-if="token" class="navbar-dropdown">
            <router-link to="" class="navbar-item">
              რედაქტირება
            </router-link>
            <router-link class="navbar-item" :to="{ name: 'UserWords' }">
              ჩემი სიტყვები
            </router-link>
            <a class="navbar-item" @click="logOut">
              გამოსვლა
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data() {
      return {
        isActive: false
      }
    },
    computed: {
      ...mapGetters('auth', ['token'])
    },
    methods: {
      ...mapActions('auth', ['logOutUser']),
      redirectUser() {
        if (!this.token) {
          // eslint-disable-next-line no-unused-vars
          this.$router.push({ name: 'Signing' }).catch(err => {})
        }
      },
      queryCheck() {
        let query = Object.keys(this.$route.query)[0]
        if (!query) {
          this.$router.push({ query: { PageNumber: 1 } }).catch(() => {})
        }
      },
      logOut() {
        this.logOutUser()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    .is-mobile {
      display: none;
    }
    &-start {
      margin: 0 auto;
      .hover-link {
        span::after {
          content: '';
          display: inline-block;
          height: 2px;
          width: xxxx0px;
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          transition: all 1s;
        }
        &:hover span::after {
          content: '';
          display: inline-block;
          background: #f7cf43;
          height: 2px;
          width: 60px;
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          transition: all 1s;
        }
      }
      .router-link-active span:after {
        content: '';
        display: inline-block;
        background: #f7cf43;
        height: 2px;
        width: 60px;
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        transition: all 1s;
      }
    }
    &-end {
      margin: 0;
      min-width: 112px;
      .user {
        height: 48px;
        width: 48px;
        border-radius: 100%;
        padding-left: 0;
        padding-right: 0;
        border-color: #fff;
        box-shadow: 2px -1px 12px -4px rgba(247, 207, 67, 1);
        font-size: 32px;
      }
      .navbar-dropdown {
        left: -140%;
        top: 80%;
        box-shadow: 2px 2px 8px rgba(127, 209, 216, 0.4);
        border-radius: 8px;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    .navbar {
      .is-desktop {
        display: none !important;
      }
      &-item img {
        max-height: 2.375rem;
      }
      &-burger:hover {
        background-color: rgba(0, 0, 0, 0);
        color: #7fd1d8;
      }

      .navbar-brand {
        flex-direction: row-reverse;
        justify-content: space-between;
        .burger {
          margin: 0;
        }
      }
      &-start {
        .is-active span:after {
          display: none;
        }
        .hover-link:hover span {
          &::after {
            left: 0;
            transform: translateX(0);
          }
        }
        .hover-link span::after {
          left: 0;
          transform: translateX(0);
        }
        .router-link-exact-active span {
          &::after {
            left: 0;
            transform: translateX(0);
          }
        }
      }
      &-end {
        display: none;
        min-width: 136px;
        .user {
          width: 32px;
          height: 32px;
          font-size: 22px;
        }
        .navbar-item {
          position: relative;
          display: flex;
          flex-shrink: 0;
          flex-grow: 0;
          &.is-hoverable:hover .navbar-dropdown {
            display: block;
          }
        }
      }
      .is-mobile {
        display: flex;
        min-width: 100px;
        align-items: stretch;
        justify-content: center;
      }

      &-dropdown {
        position: absolute;
        display: none;
        background: #fff;
      }
      &-link:hover {
        background-color: #fff;
      }
      &-menu.is-active {
        position: absolute;
        left: 5%;
        top: 80%;
      }
    }
  }
</style>
