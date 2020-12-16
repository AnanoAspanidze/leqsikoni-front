<template>
  <div class="wordlist">
    <template>
      <v-card>
        <v-card-title>
          Nutrition
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
          :items="wordList"
          :search="search"
          calculate-widths
        >
          <!-- geo -->
          <template v-slot:[`item.geoWord`]="{ value }">
            <v-chip v-if="value !== ''">
              <v-avatar left>
                <v-img src="@/assets/georgia.png"></v-img>
              </v-avatar>
              {{ value }}
            </v-chip>
          </template>
          <!-- eng -->
          <template v-slot:[`item.engWord`]="{ value }">
            <v-chip v-if="value !== ''">
              <v-avatar left>
                <v-img src="@/assets/united-kingdom.png"></v-img>
              </v-avatar>
              {{ value }}
            </v-chip>
          </template>
          <!-- def -->
          <template v-slot:[`item.defWord`]="{ value }" widths>
            <v-chip v-if="value !== ''">
              <v-avatar left>
                <v-img src="@/assets/notes.png"></v-img>
              </v-avatar>
              {{ value | shorten(30) }}
            </v-chip>
          </template>
          <!-- full -->
          <template v-slot:[`item.itemId`]="{ value }">
            <v-btn color="primary" medium @click="getFullInfo(value)">
              დეტალურად
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'ქართული სიტყვები',
          align: 'start',
          value: 'geoWord'
        },
        { text: 'ინგლისური სიტყვები', value: 'engWord' },
        { text: 'განმარტება', value: 'defWord' },
        { text: 'სრულად', value: 'itemId', sortable: false }
      ]
    }
  },
  computed: {
    ...mapGetters('wordData', ['wordList'])
  },
  created() {
    this.getWordList()
  },
  methods: {
    ...mapActions('wordData', ['getWordList']),
    getFullInfo(val) {
      this.$router.push({ name: 'wordInfo', params: { itemId: val } })
    }
  }
}
</script>

<style lang="scss" scoped></style>
