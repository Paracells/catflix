<template>
  <div>
    <loader v-if="loading"/>
    <div v-else>
      <movie-header/>
      <movie-cast/>
      <movie-about/>
    </div>
  </div>
</template>
<script>

import MovieCast from "../components/movie/MovieCast.vue";
import MovieAbout from "../components/movie/MovieAbout.vue";
import MovieHeader from "../components/movie/MovieHeader.vue";
import {mapActions, mapGetters} from "vuex";
import Loader from "../components/Loader.vue";

export default {
  name: 'TheMovie',
  components: {Loader, MovieHeader, MovieAbout, MovieCast},
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    ...mapActions("movie", ['getFilm', "getCredits", 'getKeywords']),

  },
  computed: {
    ...mapGetters("movie", ['getCurrentMovie'])
  },
  async created() {
    this.loading = true
    await this.getFilm(this.$route.params.id)
    if (!this.getCurrentMovie) {
      await this.$router.push({name: "NotFound"})
    } else {
      await this.getCredits(this.$route.params.id)
      await this.getKeywords(this.$route.params.id)
    }
    this.loading = false
  },

  mounted() {
    const htmlElement = document.documentElement
    const theme = localStorage.getItem('theme')
    theme === 'dark' ?
        htmlElement.classList.add('dark') : htmlElement.classList.remove('dark')
  }

}
</script>


<style scoped>

</style>
