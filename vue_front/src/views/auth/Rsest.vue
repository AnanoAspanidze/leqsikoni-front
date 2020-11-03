<template>
  <div class="reset section">
    <div class="columns is-centered is-mobile">
      <div ref="parent" class="column is-7-tablet is-6-desktop is-relative">
        <div class="reset_image-1 is-absolute">
          <figure class="image is-32x32">
            <img src="@/assets/img/ladybird.svg" alt="ladybird" />
          </figure>
        </div>
        <div class="card px-5">
          <div class="card-header-title">
            <h1
              class="title has-text-primary is-size-5 has-text-weight-light mt-5 has-text-centered is-relative"
            >
              რედაქტირება
            </h1>
          </div>
          <div class="card-content pb-6 is-family-secondary">
            <div class="content">
              <form @submit.prevent="reset">
                <b-field
                  class="pb-1"
                  :type="{ 'is-danger': $v.form.email.$error }"
                  :message="{
                    'ელ.ფოსტა სავალდებულოა':
                      !$v.form.email.required && $v.form.email.$error,
                    'ელ.ფოსტა არასწორია': !$v.form.email.email
                  }"
                >
                  <b-input
                    v-model="form.email"
                    placeholder="ელ.ფოსტა"
                    type="email"
                    rounded
                    required
                    @blur="$v.form.email.$touch()"
                    @input="$v.form.email.$touch()"
                  ></b-input>
                </b-field>
                <!-- new password -->
                <b-field
                  class="pb-1"
                  :type="{ 'is-danger': $v.form.newPassword.$error }"
                  :message="{
                    'სავალდებულო ველი':
                      !$v.form.newPassword.required &&
                      $v.form.newPassword.$error,
                    'მინიმუმ 6 სიმბოლო': !$v.form.newPassword.minLength
                  }"
                >
                  <b-input
                    v-model="form.newPassword"
                    placeholder="ახალი პაროლი"
                    type="password"
                    password-reveal
                    rounded
                    required
                    @blur="$v.form.newPassword.$touch()"
                    @input="$v.form.newPassword.$touch()"
                  ></b-input>
                </b-field>
                <!-- confirm password -->
                <b-field
                  class="pb-1"
                  :type="{ 'is-danger': $v.form.confirmNewPassword.$error }"
                  :message="{
                    'მიმდინარე ველი სავალდებულოა':
                      !$v.form.confirmNewPassword.required &&
                      $v.form.confirmNewPassword.$error,
                    'პაროლი არ ემთხვევა':
                      !$v.form.confirmNewPassword.$sameAsPassword &&
                      $v.form.confirmNewPassword.$error
                  }"
                >
                  <b-input
                    v-model="form.confirmNewPassword"
                    placeholder="მიმდინარე პაროლი"
                    type="password"
                    password-reveal
                    rounded
                    required
                    @blur="$v.form.confirmNewPassword.$touch()"
                    @input="$v.form.confirmNewPassword.$touch()"
                  ></b-input>
                </b-field>
                <div class="is-flex is-justify-content-space-around">
                  <b-field class="pt-5 pb-5 mr-1">
                    <b-button
                      type="is-warning"
                      rounded
                      outlined
                      :loading="isLoading"
                      :disabled="$v.form.$invalid"
                      native-type="submit"
                      @click="reset"
                    >
                      შენახვა
                    </b-button>
                  </b-field>
                  <b-field class="pt-5 pb-5 ml-1">
                    <b-button
                      type="is-danger"
                      rounded
                      outlined
                      @click="$router.push('/')"
                    >
                      გაუქმება
                    </b-button>
                  </b-field>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
  import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
  import gsap from 'gsap'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    data() {
      return {
        form: {
          email: null,
          confirmNewPassword: null,
          newPassword: null
        }
      }
    },
    validations: {
      form: {
        email: {
          required,
          email
        },
        newPassword: {
          required,
          minLength: minLength(6)
        },
        confirmNewPassword: {
          required,
          sameAsPassword: sameAs('newPassword')
        }
      }
    },
    computed: {
      ...mapGetters(['isLoading'])
    },
    mounted() {
      let parent = this.$refs.parent.clientWidth
      gsap.registerPlugin(MotionPathPlugin)
      gsap.to('.reset_image-1', {
        duration: 14,
        ease: 'none',
        yoyo: true,
        repeat: -1,
        rotateX: 0,
        xPercent: -50,
        motionPath: {
          curviness: 0,
          path: [
            { x: 0, y: 0 },
            { x: (parent / 100) * 15, y: 0 },
            { x: (parent / 100) * 25, y: 0 },
            { x: (parent / 100) * 29, y: 0 },
            { x: (parent / 100) * 30, y: 0 }
          ]
        }
      })
    },
    methods: {
      ...mapActions('auth', ['resetPassword']),
      reset() {
        this.resetPassword(this.form)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .reset {
    h1 {
      width: 100%;
      &::after {
        content: '';
        display: inline-block;
        background: #f7cf43;
        height: 2px;
        width: 60px;
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        transition: all 1s;
      }
    }
    &_image-1 {
      z-index: 5;
      top: 0;
    }
  }
</style>
