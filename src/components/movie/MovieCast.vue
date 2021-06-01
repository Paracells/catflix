<template>
  <div>
    <div class="header__card">
      Cast
    </div>
    <div class="mt-6 ml-5 p-10 inline-block bg-gray-800 rounded-lg bg-opacity-50">
      <ul class="flex justify-start items-start space-x-6">
        <li v-for="i in cast" :key="i.id">
          <template
              class="flex flex-col bg-purple-50-500 p-1 bg-opacity-20 ring-4 rounded-md ring-gray-900 relative hover:ring-gray-700">
            <img class="w-48 h-48 object-cover rounded-md"
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
import noPhoto from '../../assets/no-photo.jpg'
import {calcLength} from "../../utils";

export default {
  name: "CastCard.vue",
  data() {
    return {
      photo: ''

    }
  },
  computed: {
    ...mapGetters("movies", {movie: 'getCurrentMovie', cast: 'getCast'}),

    overView() {
      if (this.movie) {
        return calcLength(this.movie.overview)
      }
    },
  },
  methods: {

    getProfilePhoto(id) {
      const profilePhoto = id.profile_path
      if (profilePhoto) {
        this.photo = "https://image.tmdb.org/t/p/original/" + profilePhoto
        return "https://image.tmdb.org/t/p/original/" + profilePhoto
      } else {
        return noPhoto
      }
    }
  },

}
</script>

<style scoped>

</style>
