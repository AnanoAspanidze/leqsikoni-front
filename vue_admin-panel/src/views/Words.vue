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
        ></v-data-table>
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
          value: 'name'
        },
        { text: 'ინგლისური სიტყვები', value: 'calories' },
        { text: 'განმარტება', value: 'fat' },
        { text: 'სრულად', value: 'fat', sortable: false }
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
    ...mapActions('wordData', ['getWordList'])
  }
}
</script>

<style lang="scss" scoped></style>
