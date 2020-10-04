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
                          <p class="control is-flex is-justify-center">
                            <b-button
                              type="is-warning"
                              rounded
                              outlined
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
                          <p class="control is-flex is-justify-center">
                            <b-button
                              type="is-warning"
                              rounded
                              outlined
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
          <transition name="slide-fade" mode="out-in">
            <div
              v-if="activeTab == 0"
              :key="0"
              class="signing_image-box-2 is-absolute"
              :style="{ top: '90%' }"
            >
              <figure class="image is-256x256">
                <img src="@/assets/img/lighthouse.svg" alt="lighthouse" />
              </figure>
            </div>
            <div
              v-else
              :key="1"
              class="signing_image-box-2 is-absolute"
              :style="{ top: '57%' }"
            >
              <figure class="image is-256x256">
                <img src="@/assets/img/pencile.svg" alt="lighthouse" />
              </figure>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

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
      },
      isLoading: false
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
  methods: {
    restoreUser() {},
    logIn() {},
    registerUser() {}
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
    right: -256px;
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
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
