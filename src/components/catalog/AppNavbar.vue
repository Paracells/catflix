<template>

  <div
      class="border-b grid lg:grid-cols-3 justify-items-center p-4 bg-gray-700 bg-opacity-80 md:grid-cols-1"
  >
    <nav class="justify-self-start">
      <ul class="flex items-center">
        <li class="mr-4">
          <router-link
              @click="backToNowPlaying"
              class="text-white block py-2 text-grey-darkest hover:text-indigo-500"
              :class="{'text-yellow-500':!status}"
              :to="{name:'AppCatalog'}"
          >
            Catalog
          </router-link>
        </li>
        <template v-if="logInApp">
          <li class="mr-1">
            <router-link @click="gotoFavorites"
                         class="text-white block py-2 text-grey-darkest hover:text-indigo-500"
                         :class="{'text-yellow-500':status}"
                         :to="{name:'AppCatalog'}"

            >
              My Favorites
            </router-link>
          </li>
          <li
              class="bg-red-500 h-5 w-5 mb-4 text-white text-center flex items-center justify-center rounded-full"
          >
            {{ counter }}
          </li>
        </template>
      </ul>
    </nav>

    <div class="mb-4 md:mb-0 lg:justify-self-center md:justify-self-start">
      <input
          class="bg-grey-lightest border-2 focus:border-orange p-2 rounded-lg shadow-inner w-full bg-gray-700 placeholder-white text-white"
          placeholder="Search a movie..."
          type="text"
          size="50"
          v-model="searchText"
          @keyup.enter="loadFilms"
      />
    </div>
    <transition name="fade">
      <app-auth class="lg:justify-self-end md:justify-self-center" @loggedStatus="logged"/>
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
      logInApp: false,
      WARNING

    };
  },
  computed: {
    ...mapGetters("movies", ["getMovies", "getFilter", 'getSavedFromFavorites']),
    ...mapGetters("fav", {favorites: 'getFavorites', status: "getPageStatus", counter: "getFavoriteLength"}),
  },
  methods: {
    ...mapActions("movies", ["searchFilms", "getFilms", 'resetFilter']),

    logged(value) {
      this.logInApp = value
    },

    async loadFilms() {
      if (this.searchText) {
        this.$store.commit("movies/setFilter", "");
        await this.searchFilms(this.searchText);
        this.searchText = ''
        this.$store.commit('fav/resetFavoritePage')

      } else {
        this.backToNowPlaying();
      }
    },
    async backToNowPlaying() {
      if (this.status) {
        this.$store.commit('fav/resetFavoritePage')
        if (this.getSavedFromFavorites.length === 0) {
          await this.resetFilter()
        } else {
          this.$store.commit('movies/setMovies', this.getSavedFromFavorites)
        }
      } else {
        await this.resetFilter()
      }
    },
    gotoFavorites() {
      this.$store.commit('fav/setFavoritePage')
      this.$store.commit('movies/saveSearchMovies', this.getMovies)
      this.$store.commit('movies/setMovies', this.favorites)
    },

  },
  async created() {
    await this.$store.dispatch('fav/getFavorites')
  }

}
</script>
