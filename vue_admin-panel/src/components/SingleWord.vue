<template>
  <v-card class="elevation-2">
    <v-card-title class="blue-grey lighten-4">
      <v-avatar v-if="item.wordType === 'Eng'" size="30">
        <img src="@/assets/united-kingdom.png" alt="" />
      </v-avatar>
      <v-avatar v-if="item.wordType === 'Geo'" size="30">
        <img src="@/assets/georgia.png" alt="" />
      </v-avatar>
      <v-avatar v-if="item.wordType === 'Def'" size="30">
        <img src="@/assets/notes.png" alt="" />
      </v-avatar>
      <h3 class="subtitle-3 text-capitalize pl-6 black--text font-weight-light">
        {{ item.user.userName }}
      </h3>
      <v-spacer></v-spacer>
      <v-checkbox
        v-if="item.wordType === 'Geo'"
        v-model="item.isMainWord"
        color="red"
        hide-details
        label="მთავარი"
        class="mt-0"
        :disabled="
          item.wordType === 'Geo' && getMeinGeo.length > 0 && !item.isMainWord
        "
        @click="$emit('wordSelect', item.wordId)"
      ></v-checkbox>
      <v-checkbox
        v-if="item.wordType === 'Eng'"
        v-model="item.isMainWord"
        color="red"
        hide-details
        label="მთავარი"
        class="mt-0"
        :disabled="
          item.wordType === 'Geo' && getMeinEng.length > 0 && !item.isMainWord
        "
        @click="$emit('wordSelect', item.wordId)"
      ></v-checkbox>
      <v-checkbox
        v-if="item.wordType === 'Def'"
        v-model="item.isMainWord"
        color="red"
        hide-details
        label="მთავარი"
        class="mt-0"
        :disabled="
          item.wordType === 'Geo' && getMeinDef.length > 0 && !item.isMainWord
        "
        @click="$emit('wordSelect', item.wordId)"
      ></v-checkbox>
    </v-card-title>
    <v-container>
      <h2 class="text-capitalize">{{ item.wordName }}</h2>
      <div class="mt-2">
        <v-icon medium color="blue darken-2">
          mdi-link
        </v-icon>
        <a
          class="pl-1 text-decoration-none"
          :href="item.sourceLink"
          target="_blank"
        >
          ლინკი
        </a>
      </div>
      <div class="mt-2">
        <v-icon medium color="blue darken-2">
          mdi-bookmark
        </v-icon>
        <a
          class="pl-1 text-decoration-none"
          :href="item.sourceLink"
          target="_blank"
        >
          წყარო
        </a>
      </div>
      <v-row>
        <v-col class="text-right">
          <v-btn color="primary" class="mr-3">შეცვლა</v-btn>
          <v-btn
            class="mx-1"
            fab
            dark
            small
            :color="getBlockColor(item)"
            @click="wordConditionChange()"
          >
            <v-icon v-if="item.isActive" dark>
              remove_circle
            </v-icon>
            <v-icon v-else dark>
              check_circle
            </v-icon>
          </v-btn>
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
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SingleWord',
  props: {
    item: {
      type: Object,
      required: true
    },
    getMeinEng: {
      type: Array,
      required: true
    },
    getMeinGeo: {
      type: Array,
      required: true
    },
    getMeinDef: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      snackbar: {
        success: false,
        message: '',
        type: ''
      },
      timeout: 1500
    }
  },
  computed: {
    ...mapGetters('wordData', ['containerId'])
  },
  methods: {
    ...mapActions('wordData', [
      'changeSelectedWord',
      'blockWord',
      'getWordById'
    ]),
    wordConditionChange() {
      console.log(this.containerId)
      this.blockWord(this.containerId)
        .then(result => {
          this.snackbar.type = 'success'
          Object.assign(this.snackbar, result)
          this.getWordById(this.$route.params.itemId)
        })
        .catch(err => {
          this.snackbar.type = 'error'
          Object.assign(this.snackbar, err)
        })
    },
    getBlockColor(item) {
      if (item.isActive) {
        return 'error'
      }
      return 'success'
    }
  }
}
</script>

<style lang="scss" scoped></style>
