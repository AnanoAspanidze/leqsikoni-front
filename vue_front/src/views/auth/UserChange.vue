<template>
  <div class="userChange">
    <div class="columns is-centered is-mobile">
      <div ref="parent" class="column is-7-tablet is-6-desktop is-relative">
        <div class="change_image-1 is-absolute">
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
              <form @submit.prevent="userChange">
                <!-- usetname field -->
                <b-field
                  class="pb-1"
                  :type="{ 'is-danger': $v.form.userName.$error }"
                  :message="{
                    'ეს ველი სავალდებულოა':
                      !$v.form.userName.required && $v.form.userName.$error,
                    'მინიმუმ 4 სიმბოლო': !$v.form.userName.minLength
                  }"
                >
                  <b-input
                    v-model="form.userName"
                    placeholder="მომხმარებლის სახელი"
                    type="text"
                    rounded
                    @blur="$v.form.userName.$touch()"
                    @input="$v.form.userName.$touch()"
                  ></b-input>
                </b-field>
                <!-- Name field -->
                <b-field
                  class="pb-1"
                  :type="{ 'is-danger': $v.form.name.$error }"
                  :message="{
                    'სავალდებულო ველი':
                      !$v.form.name.required && $v.form.name.$error,
                    'მინიმუმ 4 სიმბოლო': !$v.form.name.minLength
                  }"
                >
                  <b-input
                    v-model="form.firstName"
                    placeholder="სახელი"
                    type="text"
                    rounded
                    @blur="$v.form.firstName.$touch()"
                    @input="$v.form.firstName.$touch()"
                  ></b-input>
                </b-field>
                <!-- lastName field -->
                <b-field
                  class="pb-1"
                  :type="{ 'is-danger': $v.form.lastName.$error }"
                  :message="{
                    'სავალდებულო ველი':
                      !$v.form.lastName.required && $v.form.lastName.$error
                  }"
                >
                  <b-input
                    v-model="form.lastName"
                    placeholder="გვარი"
                    type="text"
                    rounded
                    @blur="$v.form.lastName.$touch()"
                    @input="$v.form.lastName.$touch()"
                  ></b-input>
                </b-field>

                <!-- new password -->
                <b-field
                  class="pb-1"
                  :type="{ 'is-danger': $v.form.newPassword.$error }"
                  :message="{
                    'პაროლის ველი სავალდებულოა':
                      !$v.form.newPassword.required &&
                      $v.form.newPassword.$error,
                    'მინიმუმ 7 სიმბოლო': !$v.form.newPassword.minLength
                  }"
                >
                  <b-input
                    v-model="form.newPassword"
                    placeholder="ახალი პაროლი"
                    type="password"
                    password-reveal
                    rounded
                    @blur="$v.form.newPassword.$touch()"
                    @input="$v.form.newPassword.$touch()"
                  ></b-input>
                </b-field>
                <!-- conf. password -->
                <b-field
                  class="pb-1"
                  :type="{ 'is-danger': $v.form.oldPassword.$error }"
                  :message="{
                    'პაროლის ველი სავალდებულოა':
                      !$v.form.oldPassword.required &&
                      $v.form.oldPassword.$error
                  }"
                >
                  <b-input
                    v-model="form.oldPassword"
                    placeholder="გაიმეორეთ პაროლი"
                    type="password"
                    rounded
                    @blur="$v.form.oldPassword.$touch()"
                    @input="$v.form.oldPassword.$touch()"
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
  import { required, minLength } from 'vuelidate/lib/validators'
  import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
  import gsap from 'gsap'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data() {
      return {
        form: {
          userName: '',
          firstName: '',
          lastName: '',
          oldPassword: '',
          newPassword: ''
        }
      }
    },
    validations: {
      form: {
        userName: { required, minLength: minLength(4) },
        name: { required, minLength: minLength(2) },
        lastName: { required },
        oldPassword: { required },
        newPassword: { required, minLength: minLength(7) }
      }
    },
    computed: {
      ...mapGetters(['isLoading', 'user'])
    },
    created() {
      for (const key in this.user) {
        //console.log(key)
        if (this.form[key] !== undefined) {
          console.log(this.form[key])
          this.form[key] = this.user[key]
        }
      }
    },
    mounted() {
      let parent = this.$refs.parent.clientWidth
      gsap.registerPlugin(MotionPathPlugin)
      gsap.to('.change_image-1', {
        duration: 12,
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
          ],
          autoRotate: true
        }
      })
    },
    methods: {
      ...mapActions('auth', ['changeUserInfo']),
      userChange() {
        console.log(this.form)
        this.changeUserInfo(this.form)
      }
    },
    metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'რექდაქტირება',
      // all titles will be injected into this template
      titleTemplate: '%s | Term.emis.ge'
    }
  }
</script>

<style lang="scss" scoped>
  .userChange {
    width: 100%;
    padding-top: 6rem;
    h1 {
      width: 100%;
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 2px;
        background-color: #f7cf43;
        bottom: -8px;
      }
    }
    .change_image-1 {
      top: 0;
      z-index: 99;
    }
  }
</style>
