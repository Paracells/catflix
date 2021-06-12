<template>
  <div>
    <div v-if="!loading">
      <div v-if="!logged" class="md:flex">
        <button @click="showSignIn = true" class="btn-header">Login</button>
        <button @click="showSignup = true" class="btn-header hover:bg-blue-400">
          Signup
        </button>
        <transition-group name="fade">
          <auth-login v-if="showSignIn" @close="getUserData" :key="1"/>
          <auth-signup v-if="showSignup" @close="getUserData" :key="2"/>
        </transition-group>
      </div>
      <div v-else class="md:flex lg:block">
        <span class="mr-6"><span class="text-white">Hello, </span><span class="dark:text-green-500 text-yellow-500">{{
            username
          }}</span> </span>
        <button class="btn-header" @click="logout">LOGOUT</button>

      </div>
    </div>
  </div>

</template>

<script>
import AuthLogin from "@/components/auth/AuthLogin.vue";
import AuthSignup from "@/components/auth/AuthSignup.vue";
import {mapGetters} from "vuex";

export default {
  name: "AuthMain",
  components: {AuthLogin, AuthSignup},
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
      this.$store.commit('fav/RESET_FAVORITE_PAGE')
      this.$store.commit('fav/SET_FAVORITES', [])
      await this.$store.dispatch('movies/resetFilter')
      this.logged = false
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

