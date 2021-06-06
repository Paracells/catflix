<template>
  <div>
    <div class="header__card">
      Cast
    </div>
    <div class="mt-6 ml-5 p-12 xl:inline-block bg-gray-800 rounded-lg bg-opacity-50 lg:block">
      <ul class="flex xl:justify-start xl:flex xl:flex-row xl:items-center xl:space-x-6 ">
        <li v-for="i in cast" :key="i.id" @click="showMovieModal(i.id)">
          <template
              class="cursor-pointer flex flex-col bg-purple-50-500  bg-opacity-20 ring-4 rounded-md ring-gray-900 relative hover:ring-gray-700 w-[192px] h-[287px]">
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
    <transition name="fade">
      <movie-actor-modal v-if="modalActor" :actor="actorId" @close="modalActor=false"/>
    </transition>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {calcLength} from "../../utils";
import {getImage} from "../../utils";
import MovieActorModal from "./MovieActorModal.vue";


export default {
  name: "MovieCast",
  components: {MovieActorModal},
  data() {
    return {
      photo: '',
      modalActor: false,
      actorId: ''

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
    getImage,
    showMovieModal(id) {
      this.actorId = id
      this.modalActor = true
    }
  },

}
</script>

<style scoped>

</style>
