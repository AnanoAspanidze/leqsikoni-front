<template>
  <div class="Statistics">
    <v-container>
      <v-card>
        <v-card-title>
          სტატისტიკა
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="userStates"
          :items-per-page="5"
          :search="search"
        >
          <!-- users -->
          <template v-slot:[`item.email`]="{ value }">
            <div class="d-flex align-center">
              <v-icon color="orange" text medium>account_circle</v-icon>
              <span class="pl-3">{{ value }}</span>
            </div>
          </template>
          <!-- eng words -->
          <template v-slot:[`item.engWords`]="{ value }">
            <v-chip>
              <v-avatar left>
                <v-img src="@/assets/united-kingdom.png"></v-img>
              </v-avatar>
              {{ value }}
            </v-chip>
          </template>
          <!-- geo words -->
          <template v-slot:[`item.geoWords`]="{ value }">
            <v-chip class="pl-3">
              <v-avatar left>
                <v-img src="@/assets/georgia.png"></v-img>
              </v-avatar>
              {{ value }}
            </v-chip>
          </template>
          <!-- def words -->
          <template v-slot:[`item.defWords`]="{ value }">
            <v-chip class="pl-3">
              <v-avatar left>
                <v-img src="@/assets/description.png"></v-img>
              </v-avatar>
              {{ value }}
            </v-chip>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Statistic',
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'მომხმარებელი',
          align: 'start',
          value: 'email'
        },
        { text: 'ინგლისური სიტყვა', align: 'start', value: 'engWords' },
        { text: 'ქართული შესატყვისი', align: 'start', value: 'geoWords' },
        { text: 'განმარტება', align: 'start', value: 'defWords' }
      ]
    }
  },
  computed: {
    ...mapGetters('userList', ['userStates'])
  },
  created() {
    this.getUserStats()
  },
  methods: {
    ...mapActions('userList', ['getUserStats'])
  }
}
</script>

<style lang="scss" scoped></style>
