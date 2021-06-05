<template>
  <div
      class="border-b grid grid-cols-3 justify-items-center p-4  md:pb-4 bg-gray-700 bg-opacity-80"
  >
    <nav class="justify-self-start">
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
    <div class="mb-4 md:mb-0 justify-self-center">
      <input
          class="bg-grey-lightest border-2 focus:border-orange p-2 rounded-lg shadow-inner w-full  bg-gray-700 placeholder-white text-white"
          placeholder="Search a movie..."
          type="text"
          size="50"
          v-model="searchText"
          @keyup.enter="loadFilms"
      />
    </div>
    <transition name="fade">
      <app-auth class="justify-self-end"/>
    </transition>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import AppAuth from "../auth/AppAuth.vue";
import Notification from "../AppNotification.vue";

export default {
  components: {Notification, AppAuth},
  data() {
    return {
      searchText: "",
      favoritePage: false,

    };
  },
  computed: {
    ...mapGetters("movies", ["getMovies", "getFilter", 'getSavedFromFavorites']),
    ...mapGetters("fav", {favorites: "getFavorites", status: "getPageStatus"}),
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
