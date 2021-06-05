<template>

  <div
      class="border-b grid grid-cols-3 justify-items-center p-4  md:pb-4 bg-gray-700 bg-opacity-80"
  >
    <nav class="justify-self-start">
      <ul class="list-reset flex items-center">
        <li class="mr-4">
          <router-link
              @click="backToNowPlaying"
              class="text-white block py-2 text-grey-darkest hover:text-indigo-500"
              :class="{'text-yellow-500':homeActive}"
              :to="{name:'AppCatalog'}"
          >
            Catalog
          </router-link>
        </li>
        <template v-if="logInApp">
          <li class="mr-1">
            <router-link @click="gotoFavorites"
                         class="text-white block py-2 text-grey-darkest hover:text-indigo-500"
                         :class="{'text-yellow-500':!homeActive}"
                         :to="{name:'AppCatalog'}"

            >
              My Favorites
            </router-link>
          </li>
          <li
              class="bg-red-500 h-5 w-5 mb-4 text-white text-center flex items-center justify-center rounded-full"
          >
            {{ favorites.length }}
          </li>
        </template>
      </ul>
    </nav>

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
      <app-auth class="justify-self-end" @loggedStatus="logged"/>
    </transition>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import AppAuth from "../auth/AppAuth.vue";
import AppNotification from "../AppNotification.vue";
import {WARNING} from "../../utils/color";

export default {
  components: {AppNotification, AppAuth},
  data() {
    return {
      searchText: "",
      favoritePage: false,
      homeActive: true,
      logInApp: false,
      WARNING

    };
  },
  computed: {
    ...mapGetters("movies", ["getMovies", "getFilter", 'getSavedFromFavorites']),
    ...mapGetters("fav", {favorites: "getFavorites", status: "getPageStatus"}),
  },
  methods: {
    ...mapActions("movies", ["searchFilms", "getFilms"]),
    logged(value) {
      this.logInApp = value
    },

    async loadFilms() {
      if (this.searchText) {
        this.homeActive = true
        this.$store.commit("movies/setFilter", "");
        await this.searchFilms(this.searchText);
        this.searchText = ''

      } else {
        this.backToNowPlaying();
      }
    },
    backToNowPlaying() {
      this.homeActive = true
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
      this.homeActive = false
      this.$store.commit('fav/setFavoritePage')

      this.$store.commit('movies/saveSearchMovies', this.getMovies)
      this.$store.commit('movies/setMovies', this.favorites)
      if (this.$store.getters['auth/getUser']) {

      }
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
