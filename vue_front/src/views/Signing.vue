<template>
  <div class="signing pt-5">
    <div class="container section">
      <div class="columns is-mobile is-centered">
        <div
          class="column is-half-desktop is-four-fifths-tablet is-full-mobile is-relative"
        >
          <div class="signing_image-box-1 is-absolute">
            <figure class="image is-64x64">
              <img src="@/assets/img/fly.svg" alt="fly" />
            </figure>
          </div>
          <div class="card mt-5">
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
                    <!-- შესვლის სექცია -->
                    <b-tab-item label="შესვლა" header-class="slesh">
                      <div class="mt-5">
                        <!-- მეილი -->
                        <b-field
                          class="pb-1"
                          :type="{ 'is-danger': $v.login.email.$error }"
                          :message="{
                            'ელ.ფოსტა სავალდებულოა':
                              !$v.login.email.required && $v.login.email.$error,
                            'ელ.ფოსტა არასწორია': !$v.login.email.email
                          }"
                        >
                          <b-input
                            v-model="login.email"
                            placeholder="ელ.ფოსტა"
                            type="email"
                            rounded
                            required
                            @blur="$v.login.email.$touch()"
                            @input="$v.login.email.$touch()"
                          ></b-input>
                        </b-field>

                        <!-- პაროლი -->
                        <b-field
                          class="pt-1"
                          :type="{ 'is-danger': $v.login.password.$error }"
                          :message="{
                            'პაროლი სავალდებულოა':
                              !$v.login.password.required &&
                              $v.login.password.$error
                          }"
                        >
                          <b-input
                            v-model="login.password"
                            placeholder="ელ.ფოსტა"
                            type="password"
                            rounded
                            required
                            @blur="$v.login.password.$touch()"
                          ></b-input>
                        </b-field>
                        <a
                          class="has-text-primary is-size-7 pb-2"
                          @click="restoreUser"
                        >
                          დაგავიწყდა პაროლი?
                        </a>
                        <b-field class="pt-5 pb-5">
                          <p class="control is-flex is-justify-content-center">
                            <b-button
                              type="is-warning"
                              rounded
                              outlined
                              :loading="isLoading"
                              :disabled="$v.login.$invalid"
                              @click="logIn"
                            >
                              შესვლა
                            </b-button>
                          </p>
                        </b-field>
                      </div>
                    </b-tab-item>
                    <!-- რეგისტრაციის სექცია -->
                    <b-tab-item label="რეგისტრაცია">
                      <div class="mt-5">
                        <!-- მაილი -->
                        <b-field
                          class="pb-1 pt-1"
                          :type="{ 'is-danger': $v.register.email.$error }"
                          :message="{
                            'ელ.ფოსტა სავალდებულოა':
                              !$v.register.email.required &&
                              $v.register.email.$error,
                            'ელ.ფოსტა არასწორია': !$v.register.email.email
                          }"
                        >
                          <b-input
                            v-model="register.email"
                            placeholder="ელ.ფოსტა"
                            type="email"
                            rounded
                            required
                            @blur="$v.register.email.$touch()"
                            @input="$v.register.email.$touch()"
                          ></b-input>
                        </b-field>

                        <!-- მომხმარებელი -->
                        <b-field
                          class="pb-1 pt-1"
                          :type="{ 'is-danger': $v.register.user.$error }"
                          :message="{
                            'ეს ველი სავალდებულოა':
                              !$v.register.user.required &&
                              $v.register.user.$error,
                            'მინიმუმ 4 სიმბოლო': !$v.register.user.minLength
                          }"
                        >
                          <b-input
                            v-model="register.user"
                            placeholder="მომხმარებლის სახელი"
                            type="text"
                            rounded
                            required
                            @blur="$v.register.user.$touch()"
                            @input="$v.register.user.$touch()"
                          ></b-input>
                        </b-field>

                        <!-- სახელი -->
                        <b-field
                          class="pb-1 pt-1"
                          :type="{ 'is-danger': $v.register.first_name.$error }"
                          :message="{
                            'ეს ველი სავალდებულოა':
                              !$v.register.first_name.required &&
                              $v.register.first_name.$error,
                            'მინიმუმ 2 სიმბოლო': !$v.register.first_name
                              .minLength
                          }"
                        >
                          <b-input
                            v-model="register.first_name"
                            placeholder="სახელი"
                            type="text"
                            rounded
                            required
                            @blur="$v.register.first_name.$touch()"
                            @input="$v.register.first_name.$touch()"
                          ></b-input>
                        </b-field>

                        <!-- გვარი -->
                        <b-field
                          class="pb-1 pt-1"
                          :type="{ 'is-danger': $v.register.last_name.$error }"
                          :message="{
                            'ეს ველი სავალდებულოა':
                              !$v.register.last_name.required &&
                              $v.register.last_name.$error
                          }"
                        >
                          <b-input
                            v-model="register.last_name"
                            placeholder="გვარი"
                            type="text"
                            rounded
                            required
                            @blur="$v.register.last_name.$touch()"
                            @input="$v.register.last_name.$touch()"
                          ></b-input>
                        </b-field>

                        <!-- პაროლი -->
                        <b-field
                          class="pt-1 pb-1"
                          :type="{ 'is-danger': $v.register.password.$error }"
                          :message="{
                            'სავალდებულო ველი':
                              !$v.register.password.required &&
                              $v.register.password.$error,
                            'მინიმუმ 6 სიმბოლო': !$v.register.password.minLength
                          }"
                        >
                          <b-input
                            v-model="register.password"
                            placeholder="პაროლი"
                            type="password"
                            rounded
                            required
                            @blur="$v.register.password.$touch()"
                          ></b-input>
                        </b-field>

                        <!-- გაიმეორე პაროლი -->
                        <b-field
                          class="pt-1 pb-1"
                          :type="{
                            'is-danger': $v.register.rePassword.$error
                          }"
                          :message="{
                            'სავალდებულო ველი':
                              !$v.register.rePassword.required &&
                              $v.register.rePassword.$error,
                            'პაროლი არ ემთხვევა':
                              !$v.register.rePassword.$sameAsPassword &&
                              $v.register.rePassword.$error
                          }"
                        >
                          <b-input
                            v-model="register.rePassword"
                            placeholder="გაიმეორეთ პაროლი"
                            type="password"
                            rounded
                            required
                            @blur="$v.register.rePassword.$touch()"
                          ></b-input>
                        </b-field>
                        <b-field class="pt-5 pb-5">
                          <p class="control is-flex is-justify-content-center">
                            <b-button
                              type="is-warning"
                              rounded
                              outlined
                              :loading="isLoading"
                              :disabled="$v.register.$invalid"
                              @click="registerUser"
                            >
                              რეგისტრაცია
                            </b-button>
                          </p>
                        </b-field>
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
    <transition mode="out-in" @enter="enter" @leave="leave">
      <div
        v-if="activeTab == 0"
        :key="0"
        class="signing_image-box-2 is-fixed"
        :style="{ top: '60%' }"
      >
        <figure class="image is-256x256">
          <img src="@/assets/img/lighthouse.svg" alt="lighthouse" />
        </figure>
      </div>
      <div
        v-else
        :key="1"
        class="signing_image-box-2 is-fixed"
        :style="{ top: '57%' }"
      >
        <figure class="image is-256x256">
          <img src="@/assets/img/pencile.svg" alt="lighthouse" />
        </figure>
      </div>
    </transition>
  </div>
</template>

<script>
  import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
  import { gsap } from 'gsap'
  import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Signing',
    data() {
      return {
        activeTab: 0,
        login: {
          email: '',
          password: ''
        },
        register: {
          email: '',
          user: '',
          first_name: '',
          last_name: '',
          password: '',
          rePassword: ''
        }
      }
    },
    validations: {
      login: {
        email: {
          required,
          email
        },
        password: {
          required
        }
      },
      register: {
        email: {
          required,
          email
        },
        user: {
          required,
          minLength: minLength(4)
        },
        first_name: {
          required,
          minLength: minLength(2)
        },
        last_name: {
          required
        },
        password: {
          required,
          minLength: minLength(6)
        },
        rePassword: {
          required,
          sameAsPassword: sameAs('password')
        }
      }
    },
    computed: {
      ...mapGetters('auth', ['message']),
      ...mapGetters(['isLoading'])
    },
    // get message to user
    watch: {
      message(data) {
        let type = data.success ? 'is-success' : 'is-danger'
        this.$buefy.toast.open({
          duration: 3000,
          message: data.message,
          position: 'is-bottom-right',
          type: type
        })
        // reset inputs & vulidate
        // ველების გასუფთავება და vulidate საჭყის მდგომარეობაში გადაყვანა
        setTimeout(() => {
          this.register = {
            email: '',
            user: '',
            first_name: '',
            last_name: '',
            password: '',
            rePassword: ''
          }
          this.$v.register.$reset()
        }, 3100)
      }
    },
    mounted() {
      if (this.message) {
        let type = this.message.success ? 'is-success' : 'is-danger'
        this.$buefy.toast.open({
          duration: 3000,
          message: this.message.message,
          position: 'is-bottom-right',
          type: type
        })
      }
      gsap.registerPlugin(MotionPathPlugin)
      const r = 25
      gsap.to('.signing_image-box-1', {
        motionPath: {
          path: `M ${-r}, 0
                 a ${r},${r} 0 1,0 ${r * 2},0
                 a ${r},${r} 0 1,0 -${r * 2},0z`,
          autoRotate: true
        },
        duration: 10,
        repeat: -1,
        ease: 'none'
      })
    },
    methods: {
      ...mapActions('auth', ['registerUserWithEmail', 'LoginWithEmail']),
      restoreUser() {},
      logIn() {
        if (!this.$v.login.$invalid) {
          this.LoginWithEmail(this.login)
        }
      },
      registerUser() {
        let data = {
          Email: this.register.email,
          Username: this.register.user,
          Firstname: this.register.first_name,
          Surname: this.register.last_name,
          Password: this.register.password
        }
        if (!this.$v.register.$invalid) {
          this.registerUserWithEmail(data)
        }
      },
      enter(el, done) {
        gsap.from(el, {
          x: 150,
          duration: 2,
          opacity: 0,
          motionPath: {
            path: [
              { x: 150, y: 0 },
              { x: 60, y: -80 },
              { x: 0, y: 0 }
            ],
            start: 1,
            end: 0.3
          },
          ease: 'power1.inOut',
          onComplete: done
        })
      },
      leave(el, done) {
        gsap.to(el, {
          motionPath: {
            path: [
              { x: 0, y: 0 },
              { x: 60, y: 80 },
              { x: 150, y: 0 }
            ],
            start: 0.3,
            end: 1
          },
          duration: 1,
          opacity: 0,
          ease: 'power1.inOut',
          onComplete: done
        })
      }
    }
  }
</script>

<style lang="scss">
  .signing {
    &_image-box-1 {
      left: -60px;
      top: 10px;
    }
    &_image-box-2 {
      right: 10%;
    }
    .field {
      font-family: 'HelveticaNeue';
      .input {
        font-family: 'HelveticaNeue';
      }
      p {
        font-size: 10px;
      }
    }
    @media screen and(max-width: 1024px) {
      &_image-box-2 {
        display: none;
      }
    }
    @media screen and(max-width: 768px) {
      &_image-box-1 {
        display: none;
        z-index: 999990;
      }
    }
  }

  .slide-fade-enter-active {
    transition: all 0.8s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
