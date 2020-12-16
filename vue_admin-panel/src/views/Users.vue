<template>
  <div class="users">
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
      :items-per-page="10"
      sort-by="user"
      class="elevation-1 px-5"
    >
      <!-- მომხმარებელი -->
      <template v-slot:[`item.username`]="{ item }">
        <div class="d-flex align-center">
          <v-icon color="orange" medium>account_circle</v-icon>
          <span class="pl-3 text-capitalize">{{ item.username }}</span>
        </div>
      </template>
      <!-- სტატუსი -->
      <template v-slot:[`item.isActive`]="{ item }">
        <div v-if="item.isActive" class="green--text darken-2--text">
          აქტიური
        </div>
        <div v-else class="red--text darken-2--text">დაბლოკილი</div>
      </template>
      <!-- დადასტურებული -->
      <template v-slot:[`item.isConfirmed`]="{ item }">
        <div v-if="item.isConfirmed" class="green--text darken-2--text">
          დადასტურებული
        </div>
        <div v-else class="amber--text darken-1--text">დაუდასტურებული</div>
      </template>

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
          <v-dialog v-model="dialogeActive" max-width="500px">
            <v-card>
              <v-card-title class="headline justify-center">
                <span class="inline-block ">
                  ნამდვილად გსურთ
                  <span class="amber--text text--darken-1 text-center">
                    {{ editedItem.username }}
                  </span>
                  {{ dialogMesage }}?
                </span>
              </v-card-title>
              <v-card-actions class="py-5">
                <v-spacer></v-spacer>
                <v-btn
                  v-if="!dialogType"
                  color="green darken-1"
                  outlined
                  @click="blockUserConfirm"
                >
                  დიახ
                </v-btn>
                <v-btn
                  v-else
                  color="green darken-1"
                  outlined
                  @click="activateBlockeduser"
                >
                  დიახ
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" outlined @click="closeBlock">
                  გაუქმება
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <!-- block/active icons -->
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          v-if="item.isActive"
          medium
          color="red"
          @click="blockUser(item)"
        >
          block
        </v-icon>
        <v-icon v-else medium color="green" @click="activeUser(item)">
          check_circle
        </v-icon>
      </template>
    </v-data-table>
    <!-- message toast -->
    <v-snackbar
      v-model="snackbar"
      absolute
      bottom
      :color="getColor"
      :timeout="3000"
      transition="slide-y-reverse-transition"
    >
      <v-icon v-if="messageData.success" text>done</v-icon>
      <v-icon v-else text>priority_high</v-icon>
      {{ messageData.message }}
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Users',
  data: () => ({
    search: '',
    dialog: false,
    dialogType: false,
    dialogDelete: false,
    dialogMesage: '',
    editedIndex: -1,
    dialogeActive: false,
    editedItem: {},
    snackbar: false,
    messageData: '',
    defaultItem: {
      user: ''
    }
  }),

  computed: {
    ...mapGetters('userList', ['users']),
    formTitle() {
      return this.editedIndex === -1 ? 'ახალი სიტყვა' : 'რედაქტირება'
    },
    headers() {
      return [
        { text: 'მომხმარებელი', align: 'start', value: 'username' },
        { text: 'ელ.მეილი', align: 'start', value: 'email' },
        { text: 'სტატუსი', align: 'start', value: 'isActive' },
        { text: 'დადასტურებული', align: 'center', value: 'isConfirmed' },
        {
          text: 'ქმედებები',
          align: 'center',
          value: 'actions',
          sortable: false
        }
      ]
    },
    getColor() {
      if (this.messageData.success) {
        return 'green lighten-2'
      }
      return 'red lighten-2'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogeActive(val) {
      val || this.closeBlock()
    }
  },

  created() {
    this.getUserList()
  },

  methods: {
    ...mapActions('userList', [
      'getUserList',
      'blockActiveUser',
      'unblockUser',
      'getUserDetailed'
    ]),
    blockUser(item) {
      this.dialogType = false
      this.editedIndex = item.userId
      this.editedItem = Object.assign({}, item)
      this.dialogMesage = 'დაბლოკვა'
      this.dialogeActive = true
    },
    activeUser(item) {
      this.dialogType = true
      this.editedIndex = item.userId
      this.editedItem = Object.assign({}, item)
      this.dialogMesage = 'განბლოკვა'
      this.dialogeActive = true
    },
    blockUserConfirm() {
      this.blockActiveUser(this.editedIndex).then(result => {
        console.log('component=>', result)
        this.messageData = result
        this.snackbar = true
        this.dialogeActive = false
      })
    },
    activateBlockeduser() {
      this.unblockUser(this.editedIndex).then(result => {
        console.log('component=>', result)
        this.messageData = result
        this.snackbar = true
        this.dialogeActive = false
      })
    },
    closeBlock() {
      this.dialogeActive = false
    }
  }
}
</script>
