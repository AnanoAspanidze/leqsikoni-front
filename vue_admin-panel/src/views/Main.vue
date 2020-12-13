<template>
  <div class="login">
    <div class="login-box_wrapper d-flex justify-center align-center">
      <div class="login-box">
        <v-card elevation="5" outlined shaped min-width="400" class="px-5 py-4">
          <form>
            <v-text-field
              v-model="user.email"
              class="mb-1"
              prepend-inner-icon="alternate_email"
              label="ელ. მეილი"
              :error-messages="emailErrors"
              required
              clearable
              @input="$v.user.email.$touch()"
              @blur="$v.user.email.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="user.password"
              label="პაროლი"
              prepend-inner-icon="vpn_key"
              :error-messages="passwordErrors"
              required
              clearable
              @change="$v.user.password.$touch()"
              @blur="$v.user.password.$touch()"
            ></v-text-field>
            <div class="d-flex justify-center mt-3">
              <v-btn class="mr-4" color="success" outlined @click="submit">
                დადასტურება
              </v-btn>
              <v-btn color="error" outlined @click="clear">
                გაუქმება
              </v-btn>
            </div>
          </form>
        </v-card>
      </div>
    </div>
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
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  mixins: [validationMixin],
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      snackbar: false,
      messageData: ''
    }
  },
  validations: {
    user: {
      email: { required, email },
      password: {
        required
      }
    }
  },
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.user.email.$dirty) return errors
      !this.$v.user.email && errors.push('სწორად შეავსოთ ველი')
      !this.$v.user.email.required && errors.push('ეს ველი სავალდებულოა!')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.user.password.$dirty) return errors
      !this.$v.user.password.required && errors.push('ეს ველი სავალდებულოა!')
      return errors
    },
    getColor() {
      if (this.messageData.success) {
        return 'green lighten-2'
      }
      return 'red lighten-2'
    }
  },
  methods: {
    ...mapActions(['LoginWithEmail']),
    submit() {
      this.$v.$touch()
      this.LoginWithEmail(this.user).then(result => {
        this.snackbar = true
        this.messageData = result
      })
    },
    clear() {
      this.$v.$reset()
      this.user.email = ''
      this.user.password = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  min-height: 100vh;
  width: 100%;
  font-size: 16px;
  background: url('../assets/bg.png') no-repeat center;
  background-size: cover;
  &-box {
    display: flex;
    width: 400px;
    &_wrapper {
      width: 400px;
      min-height: 100vh;
      width: 100%;
      background-color: rgba(25, 118, 210, 0.95);
    }
  }
}
</style>
