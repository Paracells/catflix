<template>
  <div v-if="loading" class="flex justify-center items-center h-screen w-full">
    <div id="loading"></div>
  </div>
  <div v-else>
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
    <div class="text-white text-4xl ml-5 mt-5 font-semibold text-purple-400">Actors</div>
    <div class="mt-6 ml-5 p-10 inline-block bg-gray-800 rounded-lg bg-opacity-50">
      <ul class="flex justify-start items-start space-x-6">
        <li v-for="i in getCast" :key="i.id">
          <template
              class="flex flex-col bg-purple-50-500 p-1 bg-opacity-20 ring-1 ring-purple-600 relative ">
            <img class="w-48 h-48 object-cover" :src="'https://image.tmdb.org/t/p/original/'+i.profile_path"
                 :alt="i.original_name">
            <p class="text-white text-center mt-4 absolute -bottom-2 -right-2 uppercase ring-4 ring-gray-800 p-2 bg-red-600">
              {{ i.original_name }}</p>
          </template>

        </li>
      </ul>
    </div>
  </div>

</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import {calcLength, BASE_IMAGE_URL} from "../utils";

export default {
  name: 'TheMovie',
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters("movies", ['getCurrentMovie', 'getMovies', 'getCast']),
    movie() {
      return this.getCurrentMovie;
    },
    overView() {
      const movie = this.getCurrentMovie
      if (movie) {
        return calcLength(movie.overview)
      }
    },
  },
  methods: {
    ...mapActions("movies", ['getFilm', "getCredits"])
  },
  async created() {
    this.loading = true
    await this.getFilm(this.$route.params.id)
    await this.getCredits(this.$route.params.id)
    this.loading = false
  }
}
</script>


<style scoped>


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
