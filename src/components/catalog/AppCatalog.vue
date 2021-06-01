<template>
  <div v-if="loading" class="flex justify-center items-center h-screen w-full">
    <div id="loading"></div>
  </div>
  <div v-else>
    <app-navbar/>
    <div v-if="getMovies.length!==0">

      <transition-group name="fade" tag="ul" mode="out-in"
                        class="grid mt-8 gap-8 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mr-4 ml-4">
        <li v-for="movie in getMovies" :key="movie.id">
          <app-movie :movie="movie"/>
        </li>
      </transition-group>

    </div>
    <div class="flex items-center justify-center h-screen text-7xl font-medium" v-else>No data</div>
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
    console.log(1)
    this.loading = true
    if (this.getMovies.length === 0) {
      await this.getFilms();
    }
    this.loading = false


  },

};
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
</style>
