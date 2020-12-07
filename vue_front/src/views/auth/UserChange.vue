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
          <div class="columns is-centered is-mobile">
            <div
              class="column is-two-thirds-desktop is-three-fifths-tablet is-four-fifths-mobile"
            >
              <div class="pt-5">
                <b-tabs
                  v-model="activeTab"
                  size="is-medium"
                  position="is-centered"
                  class="block"
                >
                  <!-- მომხმარებლის სექცია -->
                  <b-tab-item label="სახელი" header-class="slesh">
                    <div class="mt-5">
                      <form @submit.prevent="userChange">
                        <!-- username -->
                        <b-field
                          class="pb-1"
                          :type="{ 'is-danger': $v.userInfo.userName.$error }"
                          :message="{
                            'ელ.ფოსტა სავალდებულოა':
                              !$v.userInfo.userName.required &&
                              $v.userInfo.userName.$error,
                            'მინიმუმ 4 სიმპოლო': !$v.userInfo.userName.minLength
                          }"
                        >
                          <b-input
                            v-model="userInfo.userName"
                            placeholder="ელ.ფოსტა"
                            type="text"
                            class="has-text-primary"
                            rounded
                            @blur="$v.userInfo.userName.$touch()"
                            @input="$v.userInfo.userName.$touch()"
                          ></b-input>
                        </b-field>

                        <!-- firstName -->
                        <b-field
                          class="pt-1"
                          :type="{ 'is-danger': $v.userInfo.firstName.$error }"
                          :message="{
                            'პაროლი სავალდებულოა':
                              !$v.userInfo.firstName.required &&
                              $v.userInfo.firstName.$error,
                            'მინიმუმ 2 სიმპოლო': !$v.userInfo.firstName
                              .minLength
                          }"
                        >
                          <b-input
                            v-model="userInfo.firstName"
                            placeholder="სახელი"
                            type="text"
                            rounded
                            @blur="$v.userInfo.firstName.$touch()"
                          ></b-input>
                        </b-field>
                        <!-- lastName -->
                        <b-field
                          class="pt-1"
                          :type="{ 'is-danger': $v.userInfo.lastName.$error }"
                          :message="{
                            'პაროლი სავალდებულოა':
                              !$v.userInfo.lastName.required &&
                              $v.userInfo.lastName.$error
                          }"
                        >
                          <b-input
                            v-model="userInfo.lastName"
                            placeholder="გვარი"
                            type="text"
                            rounded
                            @blur="$v.userInfo.lastName.$touch()"
                          ></b-input>
                        </b-field>
                        <b-field class="pt-5 pb-5">
                          <p class="control is-flex is-justify-content-center">
                            <b-button
                              type="is-warning"
                              class="mr-3"
                              rounded
                              outlined
                              :loading="isLoading"
                              :disabled="$v.userInfo.$invalid"
                              native-type="submit"
                            >
                              შეცვლა
                            </b-button>
                            <b-button
                              type="is-danger"
                              class="ml-3"
                              rounded
                              outlined
                              to="/"
                              tag="router-link"
                            >
                              გაუქმება
                            </b-button>
                          </p>
                        </b-field>
                      </form>
                    </div>
                  </b-tab-item>
                  <!-- პაროლის სექცია -->
                  <b-tab-item label="პაროლი">
                    <div class="mt-5">
                      <form @submit.prevent="passwordChange">
                        <!-- პაროლი -->
                        <b-field
                          class="pt-1 pb-1"
                          :type="{
                            'is-danger': $v.newPassword.oldPassword.$error
                          }"
                          :message="{
                            'სავალდებულო ველი':
                              !$v.newPassword.oldPassword.required &&
                              $v.newPassword.oldPassword.$error
                          }"
                        >
                          <b-input
                            v-model="newPassword.oldPassword"
                            placeholder="ძველი პაროლი"
                            type="password"
                            password-reveal
                            rounded
                            @blur="$v.newPassword.password.$touch()"
                          ></b-input>
                        </b-field>
                        <!-- პაროლი -->
                        <b-field
                          class="pt-1 pb-1"
                          :type="{
                            'is-danger': $v.newPassword.password.$error
                          }"
                          :message="{
                            'სავალდებულო ველი':
                              !$v.newPassword.password.required &&
                              $v.newPassword.password.$error,
                            'მინიმუმ 6 სიმბოლო': !$v.newPassword.password
                              .minLength
                          }"
                        >
                          <b-input
                            v-model="newPassword.password"
                            placeholder="პაროლი"
                            type="password"
                            password-reveal
                            rounded
                            @blur="$v.newPassword.password.$touch()"
                          ></b-input>
                        </b-field>

                        <!-- გაიმეორე პაროლი -->
                        <b-field
                          class="pt-1 pb-1"
                          :type="{
                            'is-danger':
                              $v.newPassword.confirmNewPassword.$error
                          }"
                          :message="{
                            'სავალდებულო ველი':
                              !$v.newPassword.confirmNewPassword.required &&
                              $v.newPassword.confirmNewPassword.$error,
                            'პაროლი არ ემთხვევა':
                              !$v.newPassword.confirmNewPassword
                                .$sameAsPassword &&
                              $v.newPassword.confirmNewPassword.$error
                          }"
                        >
                          <b-input
                            v-model="newPassword.confirmNewPassword"
                            placeholder="გაიმეორეთ პაროლი"
                            type="password"
                            rounded
                            @blur="$v.newPassword.confirmNewPassword.$touch()"
                          ></b-input>
                        </b-field>
                        <b-field class="pt-5 pb-5">
                          <p class="control is-flex is-justify-content-center">
                            <b-button
                              type="is-warning"
                              class="mr-3"
                              rounded
                              outlined
                              :loading="isLoading"
                              :disabled="$v.newPassword.$invalid"
                              native-type="submit"
                            >
                              შეცვლა
                            </b-button>
                            <b-button
                              type="is-danger"
                              class="ml-3"
                              rounded
                              outlined
                              to="/"
                              tag="router-link"
                            >
                              გაუქმება
                            </b-button>
                          </p>
                        </b-field>
                      </form>
                    </div>
                  </b-tab-item>
                </b-tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { required, minLength, sameAs } from 'vuelidate/lib/validators'
  import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
  import gsap from 'gsap'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data() {
      return {
        activeTab: 0,
        title: 'მომხმარებლის შეცვლა',
        userInfo: {
          userName: '',
          firstName: '',
          lastName: ''
        },
        newPassword: {
          oldPassword: '',
          password: '',
          confirmNewPassword: ''
        }
      }
    },
    validations: {
      userInfo: {
        userName: { required, minLength: minLength(4) },
        firstName: { required, minLength: minLength(2) },
        lastName: { required }
      },
      newPassword: {
        oldPassword: { required },
        password: { required, minLength: minLength(7) },
        confirmNewPassword: { required, sameAsPassword: sameAs('password') }
      }
    },
    computed: {
      ...mapGetters(['isLoading', 'user'])
    },
    created() {
      for (const key in this.user) {
        if (this.userInfo[key] !== undefined) {
          this.userInfo[key] = this.user[key]
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
      ...mapActions('auth', ['changeUserInfo', 'changeUserPassword']),
      userChange() {
        this.changeUserInfo(this.userInfo)
      },
      passwordChange() {
        if (this.newPassword.oldPassword === this.newPassword.password) {
          this.$buefy.toast.open({
            duration: 3000,
            message: 'ძველი და ახალი პაროლები არ უნდა ემთხვეოდეს ერთმანეთს',
            position: 'is-bottom-right',
            type: 'is-danger'
          })
        } else {
          this.changeUserPassword(this.newPassword)
        }
      }
    },
    metaInfo: {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: 'მონაცემების შეცვლა',
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
      top: -15px;
      z-index: 99;
    }
  }
</style>
