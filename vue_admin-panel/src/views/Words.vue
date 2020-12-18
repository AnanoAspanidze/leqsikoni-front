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
              {{ value | shorten(25) }}
            </v-chip>
          </template>
          <!-- full -->
          <template v-slot:[`item.itemId`]="{ value }">
            <v-btn
              class="ma-2"
              dark
              color="primary"
              dense
              small
              @click="getFullInfo(value)"
            >
              <v-icon dark>
                read_more
              </v-icon>
            </v-btn>
          </template>
          <!-- condition -->
          <template v-slot:[`item.conditionWidthId`]="{ item }">
            <v-btn
              class="mx-1"
              fab
              dark
              x-small
              :color="getBlockColor(item.isContainerActive)"
              @click="wordConditionChange(item)"
            >
              <v-icon v-if="item.isContainerActive" dark>
                check_circle
              </v-icon>
              <v-icon v-else dark>
                remove_circle
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </template>
    <v-snackbar
      v-model="snackbar.success"
      :timeout="timeout"
      :color="snackbar.type"
      bottom
      text
      content-class="text-center"
    >
      {{ snackbar.message }}
    </v-snackbar>
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
        { text: 'სრულად', value: 'itemId', sortable: false },
        { text: 'აქტიური', value: 'conditionWidthId', sortable: false }
      ],
      snackbar: {
        success: false,
        message: '',
        type: ''
      },
      timeout: 1500
    }
  },
  computed: {
    ...mapGetters('wordData', ['wordList'])
  },
  created() {
    this.getWordList()
  },
  methods: {
    ...mapActions('wordData', ['getWordList', 'blockWord', 'unBlockWord']),
    getFullInfo(val) {
      this.$router.push({ name: 'wordInfo', params: { itemId: val } })
    },
    getBlockColor(item) {
      if (item) {
        return 'success'
      }
      return 'error'
    },
    wordConditionChange(item) {
      console.log(item)
      if (item.isContainerActive) {
        this.blockWord(item.itemId)
          .then(result => {
            this.snackbar.type = 'success'
            Object.assign(this.snackbar, result)
            this.getWordList()
          })
          .catch(err => {
            this.snackbar.type = 'error'
            Object.assign(this.snackbar, err)
          })
      } else {
        this.unBlockWord(item.itemId)
          .then(result => {
            this.snackbar.type = 'success'
            Object.assign(this.snackbar, result)
            this.getWordList()
          })
          .catch(err => {
            this.snackbar.type = 'error'
            Object.assign(this.snackbar, err)
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
