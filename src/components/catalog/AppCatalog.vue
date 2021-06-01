<template>
  <div v-if="loading" class="flex justify-center items-center h-screen w-full">
    <div id="loading"></div>
  </div>
  <div v-else>
    <app-navbar/>
    <div>
      <ul
          class="grid mt-8 gap-8 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mr-4 ml-4"
      >
        <li class="" v-for="movie in getMovies" :key="movie.id">
          <app-movie :movie="movie"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import AppMovie from "./AppCatalogMovie.vue";
import AppNavbar from "./AppNavbar.vue";

export default {
  name: "AppCatalog",
  components: {AppNavbar, AppMovie},
  data() {
    return {
      key: import.meta.env.VITE_APP_MOVIE_API_KEY,
      loading: false
    };
  },
  methods: {
    ...mapActions("movies", ["getFilms"]),
  },
  computed: {
    ...mapGetters("movies", ["getMovies"]),
  },
  async created() {
    this.loading = true
    await this.getFilms();
    this.loading = false
  },
};
</script>

<style scoped>
</style>
