<template>
  <div class="">
    <ul
      class="grid mt-8 gap-8 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mr-4 ml-4"
    >
      <li class="" v-for="movie in getMovies" :key="movie.id">
        <app-movie :movie="movie" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AppMovie from "./AppMovie.vue";

export default {
  name: "TheCatalog",
  components: { AppMovie },
  data() {
    return {
      key: import.meta.env.VITE_APP_MOVIE_API_KEY,
    };
  },
  methods: {
    ...mapActions("movies", ["getFilms"]),
  },
  computed: {
    ...mapGetters("movies", ["getMovies"]),
  },
  async created() {
    // console.log(process.env);
    await this.getFilms();
  },
};
</script> 

<style scoped>
</style>
