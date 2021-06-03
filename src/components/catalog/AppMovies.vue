<template>
  <div v-if="loading" class="flex justify-center items-center h-screen w-full">
    <div id="loading"></div>
  </div>
  <div v-if="getMovies.length!==0">
    <transition-group name="fade" tag="ul" mode="out-in"
                      class="grid mt-8 gap-8 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mr-4 ml-4">
      <li v-for="movie in getMovies" :key="movie.id">
        <app-movie :movie="movie"/>
      </li>
    </transition-group>

  </div>
  <div class="flex items-center justify-center h-screen text-7xl font-medium" v-else>No data</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

import AppMovie from "./AppMovie.vue";


export default {
  components: {AppMovie,},
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
      await this.getFilms(this.getFilter);
    }
  },
  mounted() {
    this.loading = false
  }
}
</script>

<style scoped>
#loading {
  display: inline-block;
  width: 300px;
  height: 300px;
  border: 3px solid rgba(255, 255, 255, .3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

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
