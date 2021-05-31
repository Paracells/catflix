<template>

  <div class="h-full w-full relative">
    <img class="object-cover h-80 w-full"
         :src="'https://image.tmdb.org/t/p/original' + movie.backdrop_path"/>
    <div class="text-white absolute bottom-20 left-1 text-xl text-gray-400">{{ movie.title }}</div>
    <div class="text-white absolute bottom-10 left-1 text-xl text-gray-400">{{ movie.overview }}</div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'TheMovie',
  data() {
    return {}
  },
  computed: {
    ...mapGetters("movies", ['getById', 'getMovies']),
    movie() {
      return this.getById();
    },
  },
  methods: {
    ...mapActions("movies", ['getFilm'])
  },
  async created() {
    await this.getFilm(this.$route.params.id)
  }
}
</script>
