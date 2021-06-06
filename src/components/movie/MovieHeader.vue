<template>
  <div class="h-full w-full relative">

    <div>
      <svg
          @click="$router.back()"
          class="h-16 w-16 text-gray-100 cursor-pointer bg-indigo-500 bg-opacity-90 rounded-full z-0 absolute top-6 left-6 hover:ring-yellow-500 ring-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 8 8 12 12 16"/>
        <line x1="16" y1="12" x2="8" y2="12"/>
      </svg>
    </div>
    <transition name="fade" mode="out-in">
      <app-notification v-if="showNotify" :message="message" :color="color" @closeNotification="showNotify=false"/>
    </transition>

    <img class="object-cover h-80 w-full" loading="lazy" :src="imageLink" alt="img"/>
    <div
        class="font-headline tracking-wider absolute bottom-40 left-5 text-7xl font-extrabold text-yellow-400"
    >
      {{ movie.title }}
    </div>
    <div class="flex justify-between items-center -mt-16 flex-row">
      <div
          class="text-white ml-5 bg-gray-700 text-3xl tracking-tight w-2/4 bg-opacity-50"
      >
        {{ overView }}
      </div>
      <div class="inline-flex">
        <div
            class="w-28 h-28 bg-indigo-500 bg-opacity-50 ring-4 mr-4 font-extrabold flex items-center justify-center rounded-full text-yellow-400 text-5xl"
        >
          {{ movie.vote_average }}
        </div>
        <div
            class="w-28 h-28 bg-green-500 hover:ring-pink-500 cursor-pointer bg-opacity-50 ring-4 mr-4 flex items-center justify-center rounded-full text-pink-600"
            @click="toggleFavorite"
        >
          <svg
              v-if="favorite"
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16"
              viewBox="0 0 20 20"
              fill="currentColor"
          >
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
          </svg>
          <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {calcLength, getImage} from "../../utils";
import {mapGetters} from "vuex";
import AppNotification from "../AppNotification.vue";
import {ALERT, SUCCESS, WARNING} from "../../utils/color";

export default {
  name: "MovieHeader",
  components: {AppNotification},
  data() {
    return {
      favorite: false,
      imageLink: '',
      message: '',
      color: '',
      showNotify: false,

    }
  },
  computed: {
    ...mapGetters("movie", {movie: "getCurrentMovie"}),
    ...mapGetters("fav", {favorites: "getFavorites", byId: "findById", page: 'getPageStatus'}),

    overView() {
      if (this.movie) {
        return calcLength(this.movie.overview);
      }
    }
  },
  methods: {
    toggleFavorite() {
      if (this.$store.getters['auth/getUser']) {
        if (this.favorite) {
          this.setNotification("Removed from favorites", ALERT)
          this.$store.dispatch("fav/removeFavorite", this.movie);
          if (this.page) {
            this.$store.commit('movies/removeById', this.movie.id)
          }
        } else {
          this.setNotification("Added to favorites", SUCCESS)
          this.$store.dispatch("fav/addToFavorite", this.movie);
        }
        this.favorite = !this.favorite;
      } else {
        this.setNotification('Sorry. You must be logged in to use this feature.', WARNING)
      }
    },
    setNotification(message, color) {
      this.message = message
      this.color = color
      this.showNotify = true

    }
  },
  async created() {
    this.imageLink = getImage(this.movie, "backdrop_path");
    this.favorite = this.byId(this.movie.id);
  }
}
</script>

