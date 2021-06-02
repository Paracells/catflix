<template>
  <div>
    <ul class="mt-4 uppercase mr-4 space-x-4 flex justify-end">
      <li class="button__filter" @click="filterPath('now_playing')"
          :class="{'bg-green-500 hover:bg-green-800':filter==='now_playing'}">NOW PLAYING
      </li>
      <li class="button__filter" @click="filterPath('popular')"
          :class="{'bg-green-500 hover:bg-green-800':filter==='popular'}">POPULAR
      </li>
      <li class="button__filter" @click="filterPath('top_rated')"
          :class="{'bg-green-500 hover:bg-green-800':filter==='top_rated'}">TOP RATED
      </li>
      <li class="button__filter" @click="filterPath('upcoming')"
          :class="{'bg-green-500 hover:bg-green-800':filter==='upcoming'}">UPCOMING
      </li>

    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";


export default {
  name: "AppFilter",
  data() {
    return {
      filteredArray: [
        {name: "now_playing", filter: "NOW PLAYING"},
        {name: "popular", filter: "POPULAR"},
        {name: "top_rated", filter: "TOP RATED"},
        {name: "upcoming", filter: "UPCOMING"},
      ],
    }
  },

  computed: {
    ...mapGetters({filter: 'movies/getFilter'}),

  },
  methods: {
    filterPath(filter) {
      this.$store.commit('movies/setFilter', filter)
      this.$store.dispatch("movies/getFilms", filter)
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
