<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" dark app>
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Application</v-list-item-title>
            <v-list-item-subtitle>Subtext</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="item in items" :key="item.title" link>
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

      <v-toolbar-title>Admin Panel</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat depressed>
          <v-icon left>mdi-logout</v-icon>
          Log Out
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <!--  -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      // { title: 'panel-1' },
      // { title: 'panel-2' },
      // { title: 'panel-3' },
      // { title: 'panel-4' }
      { icon: 'dashboard', title: 'Dashboard', route: '/' },
      { icon: 'folder', title: 'my words', route: '/panel-2' },
      { icon: 'folder', title: 'words', route: '/panel-3' }
    ]
  })
}
</script>
