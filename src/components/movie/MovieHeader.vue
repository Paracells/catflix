<template>
  <div class="h-full w-full relative">
    <img class="object-cover h-80 w-full" loading="lazy"
         :src="'https://image.tmdb.org/t/p/original' + movie.backdrop_path"/>
    <div class="text-white absolute bottom-40 left-5 text-7xl font-extrabold text-yellow-400 text-3xl">{{
        movie.title
      }}
    </div>
    <div class="flex justify-between items-center -mt-16">
      <div
          class="text-white ml-5 bg-gray-700 text-3xl tracking-tight text-white w-2/4 bg-opacity-50">
        {{ overView }}
      </div>
      <div
          class="w-28 h-28 bg-indigo-500 bg-opacity-50 ring-4 mr-4 font-extrabold flex items-center justify-center  rounded-full text-yellow-400 text-5xl">
        {{
          movie.vote_average
        }}
      </div>
    </div>

  </div>
</template>

<script>
import {calcLength} from "../../utils";
import {mapGetters} from "vuex";

export default {
  name: "MovieHeader",
  computed: {
    ...mapGetters("movies", {movie: 'getCurrentMovie'}),

    overView() {
      if (this.movie) {
        return calcLength(this.movie.overview)
      }
    },
  }
}
</script>

<style scoped>

</style>
