<template>
  <div class="h-full w-full relative">
    <img class="object-cover h-80 w-full" loading="lazy"
         :src="imageLink"/>
    <div
        class="font-headline tracking-wider text-white absolute bottom-40 left-5 text-7xl font-extrabold text-yellow-400 text-3xl">
      {{
        movie.title
      }}
    </div>
    <div class="flex justify-between items-center -mt-16 flex-row">
      <div
          class="text-white ml-5 bg-gray-700 text-3xl tracking-tight text-white w-2/4 bg-opacity-50">
        {{ overView }}
      </div>
      <div class="inline-flex">
        <div
            class="w-28 h-28 bg-indigo-500 bg-opacity-50 ring-4 mr-4 font-extrabold flex items-center justify-center  rounded-full text-yellow-400 text-5xl">
          {{
            movie.vote_average
          }}
        </div>
        <div
            class="w-28 h-28 bg-green-500 hover:ring-pink-500 cursor-pointer bg-opacity-50 ring-4 mr-4 flex items-center justify-center rounded-full text-pink-600"
            @click="changeFavorite">
          <svg v-if="favorite" xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" viewBox="0 0 20 20"
               fill="currentColor">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
          </svg>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {calcLength, getImage} from "../../utils";
import {mapGetters} from "vuex";

export default {
  name: "MovieHeader",
  data() {
    return {
      favorite: false,
      imageLink: ''
    }
  },
  computed: {
    ...mapGetters("movies", {movie: 'getCurrentMovie'}),

    overView() {
      if (this.movie) {
        return calcLength(this.movie.overview)
      }
    },
  },
  methods: {
    changeFavorite() {
      this.favorite = !this.favorite
    }
  },
  async created() {
    const result = getImage(this.movie, 'backdrop_path')
    this.imageLink = result
  },

}
</script>

<style scoped>

</style>
