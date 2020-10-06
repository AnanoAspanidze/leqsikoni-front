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
          :items="statistics"
          :items-per-page="5"
          :search="search"
        >
          <template v-slot:[`item.details`]="{ value }">
            <router-link :to="value">
              <v-btn small color="primary">
                დეტალურად
              </v-btn>
            </router-link>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'მომხმარებელი',
          align: 'start',
          // filterable: false,
          value: 'user'
        },
        { text: 'ინგლისური სიტყვა', value: 'engWord' },
        { text: 'ქართული შესატყვისი', value: 'geoWord' },
        { text: 'განმარტება', value: 'definition' },
        { text: '', value: 'details' }
      ],
      statistics: [
        {
          user: 'user0001@gmail.com',
          engWord: 5,
          geoWord: 8,
          definition: 4,
          details: '/userDetails'
        },
        {
          user: 'testUser@gmail.com',
          engWord: 12,
          geoWord: 12,
          definition: 12,
          details: '/userDetails'
        },
        {
          user: 'user1234@gmail.com',
          engWord: 2,
          geoWord: 0,
          definition: 3,
          details: '/userDetails'
        },
        {
          user: 'megi.akhalkatsi@gmail.com',
          engWord: 7,
          geoWord: 3,
          definition: 3,
          details: '/userDetails'
        },
        {
          user: 'ikalekishvili@gmail.com',
          engWord: 4,
          geoWord: 4,
          definition: 4,
          details: '/userDetails'
        },
        {
          user: 'romeo.khazalia@gmail.com',
          engWord: 3,
          geoWord: 4,
          definition: 4,
          details: '/userDetails'
        },
        {
          user: 'userTest123@gmail.com',
          engWord: 7,
          geoWord: 5,
          definition: 5,
          details: '/userDetails'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

