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
              class="fi user has-text-warning is-flex is-justify-center is-align-end"
            ></div>
          </a>
          <div class="navbar-dropdown">
            <router-link to="" class="navbar-item">
              რედაქტირება
            </router-link>
            <router-link to="" class="navbar-item">
              ჩემი სიტყვები
            </router-link>
            <router-link to="" class="navbar-item">
              გამოსვლა
            </router-link>
          </div>
        </div>
      </div>
      <router-link class="navbar-item" to="/">
        <img src="../../assets/img/logo.svg" width="112" height="28" />
      </router-link>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link :to="{ name: 'Alphabet' }" class="navbar-item px-6">
          <span class="is-relative">ანბანი</span>
        </router-link>
        <router-link :to="{ name: 'About' }" class="navbar-item px-6 ">
          <span class="is-relative">პროექტის შესახებ</span>
        </router-link>
        <router-link :to="{ name: 'Contact' }" class="navbar-item px-6">
          <span class="is-relative">კონტაქტი</span>
        </router-link>
      </div>

      <div class="navbar-end is-flex is-justify-center">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link is-arrowless is-relative">
            <div
              class="fi user has-text-warning is-flex is-justify-center is-align-end"
            ></div>
          </a>
          <div class="navbar-dropdown">
            <a class="navbar-item">
              რედაქტირება
            </a>
            <a class="navbar-item">
              ჩემი სიტყვები
            </a>
            <a class="navbar-item">
              გამოსვლა
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.navbar {
  .is-mobile {
    display: none;
  }
  &-start {
    margin: 0 auto;
    .router-link-exact-active span:after {
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
