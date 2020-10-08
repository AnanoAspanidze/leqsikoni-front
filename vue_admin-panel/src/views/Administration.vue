<template>
  <div class="administration">
    <v-container>
      <v-card class="overflow-hidden" color="blue-grey darken-1" dark>
        <v-toolbar flat color="blue-grey darken-2">
          <v-icon class="mr-2">mdi-account</v-icon>
          <v-toolbar-title class="font-weight-light">
            ადმინისტრატორის გვერდი
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-grey darken-1"
            fab
            small
            @click="isEditing = !isEditing"
          >
            <v-icon v-if="isEditing">
              mdi-close
            </v-icon>
            <v-icon v-else>
              mdi-pencil
            </v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            v-model="name"
            :disabled="!isEditing"
            color="white"
            label="სახელი"
            :error-messages="nameErrors"
            :counter="10"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="surname"
            :disabled="!isEditing"
            color="white"
            label="გვარი"
            :error-messages="surnameErrors"
            :counter="15"
            required
            @input="$v.surname.$touch()"
            @blur="$v.surname.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :disabled="!isEditing"
            :error-messages="passwordErrors"
            color="white"
            label="პაროლი"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!isEditing" color="success" @click="save">
            Save
          </v-btn>
        </v-card-actions>
        <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>
          Your profile has been updated
        </v-snackbar>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    surname: { required, maxLength: maxLength(15) },
    password: { required, minLength: minLength(8) }
  },

  data() {
    return {
      name: 'მეგი',
      surname: 'ახალკაცი',
      password: 'password12',
      hasSaved: false,
      isEditing: false,
      model: null,
      show1: false
    }
  },

  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength &&
        errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    surnameErrors() {
      const errors = []
      if (!this.$v.surname.$dirty) return errors
      !this.$v.surname.maxLength &&
        errors.push('Surname must be at most 15 characters long')
      !this.$v.surname.required && errors.push('Surname is required.')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength &&
        errors.push('Password must be at least 8 characters long')
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    }
  },

  methods: {
    save() {
      // this.isEditing = !this.isEditing
      this.hasSaved = true
      this.$v.$touch()
    }
  }
}
</script>

<style lang="scss" scoped></style>
