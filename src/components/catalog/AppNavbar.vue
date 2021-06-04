<template>
  <header
      class="border-b md:flex md:items-center md:justify-between p-4 pb-0 md:pb-4 bg-gray-700 bg-opacity-80"
  >
    <nav>
      <ul class="list-reset flex items-center">
        <li class="mr-4">
          <a
              @click="backToNowPlaying"
              class="text-white block no-underline py-2 text-grey-darkest hover:text-indigo-500 md:border-none md:p-0"
              href="#"
          >
            Home
          </a>
        </li>
        <li class="mr-1">
          <a @click="gotoFavorites"
             class="text-white border-t block no-underline py-2 text-grey-darkest hover:text-indigo-500 md:border-none md:p-0"
             href="#"
          >
            My Favorites
          </a>
        </li>
        <li
            class="bg-red-500 h-5 w-5 mb-4 text-white text-center flex items-center justify-center rounded-full"
        >
          {{ favorites.length }}
        </li>
      </ul>
    </nav>

    <!-- Search field -->
    <div class="mb-4 w-full md:mb-0 md:w-1/4">
      <input
          class="bg-grey-lightest border-2 focus:border-orange p-2 rounded-lg shadow-inner w-full bg-gray-700 placeholder-white text-white"
          placeholder="Search a movie..."
          type="text"
          v-model="searchText"
          @keyup.enter="loadFilms"
      />
    </div>

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
  </header>
</template>

<script>
import AppLogin from "@/components/auth/AppLogin.vue";
import AppSignup from "@/components/auth/AppSignup.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  components: {AppLogin, AppSignup},
  data() {
    return {
      showSignIn: false,
      showSignup: false,
      searchText: "",
      favoritePage: false,
      logged: false,
      username: ''
    };
  },
  computed: {
    ...mapGetters("movies", ["getMovies", "getFilter", 'getSavedFromFavorites']),
    ...mapGetters("fav", {favorites: "getFavorites", status: "getPageStatus"}),
    ...mapGetters('user', ['getError', 'getUserName'])
  },
  methods: {
    ...mapActions("movies", ["searchFilms", "getFilms"]),

    async loadFilms() {
      if (this.searchText) {
        this.$store.commit("movies/setFilter", "");
        await this.searchFilms(this.searchText);
        this.searchText = ''

      } else {
        this.backToNowPlaying();
      }
    },
    backToNowPlaying() {
      if (this.status) {
        this.$store.commit('fav/resetFavoritePage')
        if (this.getSavedFromFavorites.length === 0) {
          this.resetFilter()
        } else {
          this.$store.commit('movies/setMovies', this.getSavedFromFavorites)
        }
      } else {
        this.resetFilter()
      }
    },
    resetFilter() {
      const filter = this.getFilter ? this.getFilter : "now_playing"
      this.$store.commit('movies/setFilter', filter)
      this.getFilms(this.getFilter ? this.getFilter : filter);
    },
    gotoFavorites() {

      this.$store.commit('fav/setFavoritePage')

      this.$store.commit('movies/saveSearchMovies', this.getMovies)
      this.$store.commit('movies/setMovies', this.favorites)
    },
    getUserData(name) {
      this.showSignup = false
      this.showSignIn = false
      if (name) {
        this.username = this.getUserName
        this.logged = true
      }
    },
    logout() {
      this.$store.dispatch('user/logout')
      if (!this.getError.status) {
        this.logged = false
      }

    }
  },
  created() {
    this.$store.dispatch('navBarLoad')
    console.log('this.getUserName', this.getUserName)
    if (this.getUserName) {
      this.username = this.getUserName
      this.logged = true
    }

  },

}
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
