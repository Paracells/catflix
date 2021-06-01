<template>
  <div v-if="loading" class="flex justify-center items-center h-screen w-full">
    <div id="loading"></div>
  </div>
  <div v-else>
    <movie-header/>
    <movie-cast/>
    <movie-about/>
  </div>
</template>
<script>

import MovieCast from "../components/movie/MovieCast.vue";
import MovieAbout from "../components/movie/MovieAbout.vue";
import MovieHeader from "../components/movie/MovieHeader.vue";
import {mapActions} from "vuex";

export default {
  name: 'TheMovie',
  components: {MovieHeader, MovieAbout, MovieCast},
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    ...mapActions("movie", ['getFilm', "getCredits", 'getKeywords']),

  },
  async created() {
    this.loading = true
    await this.getFilm(this.$route.params.id)
    await this.getCredits(this.$route.params.id)
    await this.getKeywords(this.$route.params.id)
    this.loading = false
  }

}
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

</style>
