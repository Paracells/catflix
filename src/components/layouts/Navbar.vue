<template>
  <div class="navbar__layout">
    <nav class="justify-self-start">
      <ul class="flex items-center">
        <li class="mr-4">
          <router-link
              @click="backToNowPlaying"
              class="text-white block py-2 text-grey-darkest hover:text-indigo-500"
              :class="{ 'text-yellow-500': !status }"
              :to="{ name: 'AppCatalog' }"
          >
            Catalog
          </router-link>
        </li>
        <template v-if="logInApp">
          <li class="mr-1">
            <router-link
                @click="gotoFavorites"
                class="text-white block py-2 text-grey-darkest hover:text-indigo-500
                "
                :class="{ 'text-yellow-500': status }"
                :to="{ name: 'AppCatalog' }"
            >
              My Favorites
            </router-link>
          </li>
          <li class="navbar__counter">
            {{ counter }}
          </li>
        </template>
      </ul>
    </nav>

    <div class="mb-4 md:mb-0 lg:justify-self-center md:justify-self-start">
      <input
          class="input__search"
          placeholder="Search a movie..."
          type="text"
          size="50"
          v-model="searchText"
          @keyup.enter="loadFilms"
      />
    </div>
    <transition name="fade">
      <auth-main
          class="lg:justify-self-end md:justify-self-center"
          @loggedStatus="logged"
      />
    </transition>
  </div>
  <router-view/>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AuthMain from "../auth/AuthMain.vue";
import AppNotification from "../AppNotification.vue";
import {WARNING} from "../../utils/color";

export default {
  components: {AppNotification, AuthMain},
  name: "Navbar",
  data() {
    return {
      searchText: "",
      logInApp: false,
      WARNING,
    };
  },
  computed: {
    ...mapGetters("movies", [
      "getMovies",
      "getFilter",
      "getSavedFromFavorites",
    ]),
    ...mapGetters("fav", {
      favorites: "getFavorites",
      status: "getPageStatus",
      counter: "getFavoriteLength",
    }),
  },
  methods: {
    ...mapActions("movies", ["searchFilms", "getFilms", "resetFilter"]),

    logged(value) {
      this.logInApp = value;
    },

    async loadFilms() {
      if (this.searchText) {
        this.$store.commit("movies/SET_FILTER", "");
        await this.searchFilms(this.searchText);
        this.searchText = "";
        this.$store.commit("fav/RESET_FAVORITE_PAGE");
      } else {
        this.backToNowPlaying();
      }
    },
    async backToNowPlaying() {
      if (this.status) {
        this.$store.commit("fav/RESET_FAVORITE_PAGE");
        if (this.getSavedFromFavorites.length === 0) {
          await this.resetFilter();
        } else {
          this.$store.commit("movies/SET_MOVIES", this.getSavedFromFavorites);
        }
      }
    },
    gotoFavorites() {
      this.$store.commit("fav/SET_FAVORITE_PAGE");
      this.$store.commit("movies/SAVE_SEARCH_MOVIES", this.getMovies);
      this.$store.commit("movies/SET_MOVIES", this.favorites);
    },
  },
  async created() {
    await this.$store.dispatch("fav/getFavorites");
  },
  mounted() {
    const htmlElement = document.documentElement
    const theme = localStorage.getItem('theme')
    theme === 'dark' ?
        htmlElement.classList.add('dark') : htmlElement.classList.remove('dark')


  }
};
</script>
