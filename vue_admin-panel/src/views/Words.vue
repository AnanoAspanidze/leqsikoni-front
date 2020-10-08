<template>
  <div class="words">
    <v-container>
      <v-data-table
        :headers="headers"
        :items="words"
        :search="search"
        :items-per-page="5"
        sort-by="geoWord"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-card-title>
            სიტყვები
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-toolbar flat>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  დამატება
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.engWord"
                          label="ინგლისური სიტყვა"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.geoWord"
                          label="ქართული შესატყვისი"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.definition"
                          label="განმარტება"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    გაუქმება
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    შენახვა
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline">
                  ნამდვილად გსურთ წაშლა?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">
                    გაუქმება
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                    დიახ
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small color="orange" class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small color="primary" class="mr-2" @click="deleteItem(item)">
            mdi-delete
          </v-icon>
          <v-icon small color="indigo darken-3">
            remove_red_eye
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">
            Reset
          </v-btn>
        </template>
        <template v-slot:[`item.details`]="{ value }">
          <router-link :to="value">
            <v-btn small color="primary">
              დეტალურად
            </v-btn>
          </router-link>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'ინგლისური სიტყვა', align: 'start', value: 'engWord' },
      { text: 'ქართული შესატყვისი', value: 'geoWord' },
      { text: 'განმარტება', value: 'definition' },
      { text: 'Actions', value: 'actions', sortable: false },
      { text: '', value: 'details' }
    ],
    words: [],
    editedIndex: -1,
    editedItem: {
      engWord: '',
      geoWord: '',
      definition: ''
    },
    defaultItem: {
      engWord: '',
      geoWord: '',
      definition: ''
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'ახალი სიტყვა' : 'რედაქტირება'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.words = [
        {
          engWord: 'bug',
          geoWord: 'შეცდომა',
          definition:
            'პროგრამული შეცდომა (კომპიუტერული პროგრამის ან სისტემის შეცდომა / ხარვეზი)',
          details: '/userDetails'
        },
        {
          engWord: 'hardware',
          geoWord: 'აპარატული უზრუნველყოფა ',
          definition: 'კომპიუტერული სისტემის ელექტრონული მოწყობილობა',
          details: '/userDetails'
        },
        {
          engWord: 'software',
          geoWord: 'პროგრამული უზრუნველყოფა',
          definition: 'კომპიუტერული პროგრამა ',
          details: '/userDetails'
        },
        {
          engWord: 'mouse',
          geoWord: 'მაუსი',
          definition: 'მონიტორის ეკრანზე კურსორის / ისრის მართვის მოწყობილობა',
          details: '/userDetails'
        },
        {
          engWord: 'desktop',
          geoWord: 'სამუშაო მაგიდა',
          definition: 'ინტერაქციული სივრცე მონიტორის ეკრანზე',
          details: '/userDetails'
        },
        {
          engWord: 'keyboard',
          geoWord: 'კომპიუტერის კლავიატურა',
          definition: 'კომპიუტერის კლავიატურა',
          details: '/userDetails'
        }
      ]
    },

    editItem(item) {
      this.editedIndex = this.words.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.words.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.words.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.words[this.editedIndex], this.editedItem)
      } else {
        this.words.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped></style>
