<template>
  <div v-if="!loading">
    <div v-if="!logged">
      <button @click="showSignIn = true" class="btn-header">Login</button>
      <button @click="showSignup = true" class="btn-header hover:bg-blue-400">
        Signup
      </button>
      <transition name="fade">
        <app-login v-if="showSignIn" @close="getUserData"/>
      </transition>
      <transition name="fade">
        <app-signup v-if="showSignup" @close="getUserData"/>
      </transition>
    </div>
    <div v-else>
      <span class="mr-6">Hello, <span class="text-green-500">{{ username }}</span> </span>
      <button class="btn-header" @click="logout">LOGOUT</button>

    </div>
  </div>

</template>

<script>
import AppLogin from "@/components/auth/AppLogin.vue";
import AppSignup from "@/components/auth/AppSignup.vue";
import {mapGetters} from "vuex";

export default {
  name: "AppAuth",
  components: {AppLogin, AppSignup},
  data() {
    return {
      showSignIn: false,
      showSignup: false,
      logged: false,
      username: '',
      loading: false,
      loggedStatus: false
    }
  },
  computed: {
    ...mapGetters('auth', ['getError', 'getUserName'])
  },
  methods: {
    async getUserData(name) {
      this.showSignup = false
      this.showSignIn = false
      if (name) {
        this.username = name
        await this.$store.dispatch('fav/getFavorites')
        this.logged = true
      }
    },
    async logout() {
      this.$store.dispatch('auth/logout')
      this.$store.commit('fav/setFavorites', [])
      await this.$store.dispatch('movies/resetFilter')
      if (!this.getError.status) {
        this.logged = false
      }
    }
  },
  async created() {
    this.loading = true
    await this.$store.dispatch('auth/navBarLoad')
    if (this.getUserName) {
      this.username = this.getUserName
      this.logged = true
    } else {
      this.logged = false
    }
    this.loading = false
  },

  updated() {
    this.$emit('loggedStatus', this.logged)
  }

}
</script>

<style scoped>

</style>
