<template>
  <div class="users">
    <v-container>
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        :items-per-page="5"
        sort-by="user"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-card-title>
            მომხარებლები
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
            <v-dialog v-model="userBlock" max-width="500px">
              <v-card>
                <v-card-title class="headline">
                  ნამდვილად გსურთ დაბლოკოთ მომხმარებელი: {{editedItem.user}} ?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeBlock">
                    გაუქმება
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="blockUserConfirm">
                    დიახ
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small color="primary" class="mr-2" @click="deleteItem(item)">
            mdi-delete
          </v-icon>
          <v-icon small color="red" @click="blockUser(item)"> 
            block
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
    userBlock: false,
    headers: [
      { text: 'მომხმარებელი', align: 'start', value: 'user' },
      { text: 'Actions', value: 'actions', sortable: false },
      { text: '', value: 'details' }
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      user: ''
    },
    defaultItem: {
      user: ''
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
    },
    userBlock(val) {
      val || this.closeBlock()
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.users = [
        {
          user: 'user0001@gmail.com',
          details: '/userDetails'
        },
        {
          user: 'testUser@gmail.com',
          details: '/userDetails'
        },
        {
          user: 'user1234@gmail.com',
          details: '/userDetails'
        },
        {
          user: 'megi.akhalkatsi@gmail.com',
          details: '/userDetails'
        },
        {
          user: 'ikalekishvili@gmail.com',
          details: '/userDetails'
        },
        {
          user: 'romeo.khazalia@gmail.com',
          details: '/userDetails'
        }
      ]
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    blockUser(item){
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.userBlock = true
    },
    blockUserConfirm() {
      this.users.splice(this.editedIndex, 1)
      this.closeBlock()
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

    closeBlock() {
      this.userBlock = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem)
      } else {
        this.users.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.v-toolbar--flat{
  display: none;
}

</style>
