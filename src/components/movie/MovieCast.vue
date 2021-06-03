<template>
  <div>
    <div class="header__card">
      Cast
    </div>
    <div class="mt-6 ml-5 p-12 inline-block bg-gray-800 rounded-lg bg-opacity-50">
      <ul class="flex justify-start items-center space-x-6">
        <li v-for="i in cast" :key="i.id">
          <template
              class="flex flex-col bg-purple-50-500  bg-opacity-20 ring-4 rounded-md ring-gray-900 relative hover:ring-gray-700 w-[192px] h-[287px]">
            <img class="object-cover rounded-md h-full"
                 :src="getImage(i, 'profile_path')"
                 :alt=" i.original_name">
            <p class="text-white text-center mt-4 absolute bottom-4 -right-4 uppercase ring-4 ring-gray-800 p-2 bg-red-600">
              {{ i.original_name }}</p>
            <p class="text-white m-4 text-center mt-3 p-2 bg-indigo-600 bg-opacity-20">
              {{ i.character ? i.character : 'no data' }}</p>
          </template>

        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {calcLength} from "../../utils";
import {getImage} from "../../utils";


export default {
  name: "MovieCast",
  data() {
    return {
      photo: ''

    }
  },
  computed: {
    ...mapGetters("movie", {movie: 'getCurrentMovie', cast: 'getCast'}),

    overView() {
      if (this.movie) {
        return calcLength(this.movie.overview)
      }
    },
  },
  methods: {
    getImage
  },

}
</script>

<style scoped>

</style>
