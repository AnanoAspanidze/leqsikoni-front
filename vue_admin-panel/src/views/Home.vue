<template>
  <div>
    <v-navigation-drawer v-model="drawer" dark app>
      <v-list dense nav class="py-0">
        <v-list-item two-line class="px-0">
          <v-list-item-avatar>
            <img src="@/assets/user.png" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user.userRole.title }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ user.firstname }} {{ user.surname }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          router
          :to="item.route"
          class="my-5"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>ადმინისტრატორის პანელი</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text depressed @click="logOutUser">
          <v-icon left>mdi-logout</v-icon>
          გასვლა
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    drawer: null,
    items: [
      { icon: 'equalizer', title: 'სტატისტიკა', route: '/' },
      { icon: 'library_books', title: 'სიტყვები', route: '/words' },
      {
        icon: 'supervisor_account',
        title: 'მომხმარებელთა სია',
        route: '/users'
      },
      {
        icon: 'read_more',
        title: 'ტექსტები',
        route: '/texts'
      }
    ]
  }),
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['logOutUser'])
  }
}
</script>

<style lang="scss" scoped></style>
