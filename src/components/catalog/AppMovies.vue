<template>
  <div>
    <loader v-if="loading"/>
    <div v-else-if="getMovies.length!==0">
      <transition-group name="fade" tag="ul" mode="out-in"
                        class="grid mt-8 gap-8 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mr-4 ml-4">
        <li v-for="movie in getMovies" :key="movie.id">
          <app-movie :movie="movie"/>
        </li>
      </transition-group>
    </div>
    <div v-else class="flex items-center justify-center h-screen text-7xl font-medium">No data</div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

import AppMovie from "./AppMovie.vue";
import Loader from "../Loader.vue";


export default {
  components: {Loader, AppMovie,},
  name: "AppMovies",
  computed: {
    ...mapGetters("movies", ["getMovies", 'getFilter']),

  },
  data() {
    return {
      loading: false,

    }
  },
  methods: {
    ...mapActions("movies", ["getFilms"]),

  },

  async created() {
    this.loading = true
    if (this.getMovies.length === 0) {
      await this.getFilms(this.getFilter ? this.getFilter : 'now_playing');
    }
    this.loading = false

  },

}
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
