<template>
  <div>
    <ul class="mt-4 uppercase mr-4 space-x-4 flex justify-end sm:flex-col lg:flex-row">
      <li v-for="f in filteredArray" :key="f.name" class="button__filter" @click="filterPath(f)"
          :class="{'bg-green-500 hover:bg-green-800':f.name===filter}">{{
          f.filter
        }}
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
      this.$store.commit('movies/SET_FILTER', filter.name)
      this.$store.dispatch("movies/getFilms", filter.name)
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
