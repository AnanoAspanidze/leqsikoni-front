<template>
  <div class="texts">
    <h2 class="pl-15 pt-10 title">ტექსტები</h2>
    <v-container fluid class="pt-15">
      <v-row class="justify-center">
        <v-col col="12" sm="9" md="8" lg="5">
          <v-form ref="form">
            <v-text-field
              v-model="form.email"
              outlined
              :rules="email"
              rounded
              height="40"
              label="საკონტაქტო ელ.ფოსტა"
              class="mb-4"
              prepend-inner-icon="email"
            ></v-text-field>
            <v-text-field
              v-model="form.facebook"
              outlined
              rounded
              :rules="[value => !!value || 'სავალდებულო ველი.']"
              height="40"
              label="facebook ლინკი"
              class="mb-4"
              prepend-inner-icon="facebook"
            ></v-text-field>
            <v-textarea
              v-model="form.about"
              outlined
              rounded
              prepend-inner-icon="description"
              :rules="[value => !!value || 'სავალდებულო ველი.']"
              label="პორიექტის შესახებ ტექსტი"
              auto-grow
            ></v-textarea>
            <div class="d-flex justify-center">
              <v-btn color="primary" @click="submit">
                შენახვა
              </v-btn>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
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
  name: 'Text',
  data() {
    return {
      form: {
        facebook: '',
        email: '',
        about: '',
        id: null
      },
      snackbar: {
        success: false,
        message: '',
        type: ''
      },
      timeout: 1500,
      email: [
        value => !!value || 'Required.',
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'ელ. ფოსტის ფორმატი არასწორია'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['pageInfo'])
  },
  watch: {
    pageInfo(val) {
      this.form = {
        facebook: val.facebookLink,
        email: val.email,
        about: val.description,
        id: val.contactId
      }
    }
  },
  created() {
    this.getAboutInfo()
  },
  methods: {
    ...mapActions(['getAboutInfo', 'editAboutInfo']),
    submit() {
      if (this.$refs.form.validate()) {
        let data = {
          facebookLink: this.form.facebook,
          email: this.form.email,
          description: this.form.about,
          contactId: this.form.id
        }
        this.editAboutInfo(data)
          .then(result => {
            this.snackbar = {
              success: true,
              message: result,
              type: 'success'
            }
          })
          .catch(err => {
            this.snackbar = {
              success: true,
              message: err,
              type: 'danger'
            }
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
