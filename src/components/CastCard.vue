<template>
  <div>
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
    <div class="text-white text-4xl ml-5 mt-5 font-semibold text-purple-400">
      Cast
    </div>
    <div class="mt-6 ml-5 p-10 inline-block bg-gray-800 rounded-lg bg-opacity-50">
      <ul class="flex justify-start items-start space-x-6">
        <li v-for="i in getCast" :key="i.id">
          <template
              class="flex flex-col bg-purple-50-500 p-1 bg-opacity-20 ring-4 rounded-md ring-gray-900 relative hover:ring-gray-700">
            <img class="w-48 h-48 object-cover rounded-md "
                 :src="getProfilePhoto(i)"
                 :alt="i.original_name">
            <p class="text-white text-center mt-4 absolute bottom-16 -right-2 uppercase ring-4 ring-gray-800 p-2 bg-red-600">
              {{ i.original_name }}</p>
            <p class="text-white m-4 text-center p-2 bg-indigo-600 bg-opacity-20">
              {{ i.character ? i.character : 'no data' }}</p>
          </template>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import noPhoto from '../assets/no-photo.jpg'
import {calcLength} from "../utils";

export default {
  name: "CastCard.vue",
  data() {
    return {
      noImage: noPhoto

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
    ...mapActions("movies", ['getFilm', "getCredits"]),
    getProfilePhoto(id) {
      const profilePhoto = id.profile_path
      if (profilePhoto) {
        return "https://image.tmdb.org/t/p/original/" + profilePhoto
      } else {
        return noPhoto
      }
    }
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

</style>
