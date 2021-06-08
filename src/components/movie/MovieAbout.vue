<template>
  <div>
    <div class="header__card">About</div>
    <div class="flex flex-col  ml-5 dark:text-white text-black mt-5">
      <div class="grid grid-flow-col gap-4">
        <div class="col-start-1">Release</div>
        <div class="col-start-2">{{ convertDate(movie.release_date) }}</div>
        <div class="col-start-1">Homepage</div>
        <div class="col-start-2">
          <p v-if="!movie.homepage">no data</p>
          <a v-else class="dark:text-green-500 dark:hover:text-blue-500 text-indigo-500 hover:text-indigo-800"
             :href="movie.homepage"
             target="_blank">{{ movie.title }}</a>
        </div>
        <div class="col-start-1">Genres</div>
        <div class=" col-start-2 space-x-4">
          <p class="inline-block" v-if="movie.genres.length===0">no data</p>
          <p v-else class="inline-block" v-for="g in movie.genres"><span
              class="chips text-white">{{
              g.name
            }}</span>
          </p>
        </div>
        <div class="col-start-1">Director</div>
        <div class="col-start-2">{{ crew.director ? crew.director : 'no data' }}</div>
        <div class="col-start-1">Writing</div>
        <div class="col-start-2">{{ crew.writing ? crew.writing : 'no data' }}</div>
        <div class="col-start-1">Keywords</div>
        <div class="col-start-2 flex flex-wrap md:mr-4 justify-start md:space-x-4">
          <p class="inline-block" v-if="keywords.length===0">no data</p>
          <div v-else class="m-4 lg:m-0" v-for="keyword in keywords"><span
              class="chips dark:bg-green-900 bg-yellow-300 text-blue-800 dark:text-black">{{
              keyword
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import {mapGetters} from "vuex";
import {convertDate} from "../../utils";

export default {
  name: "AboutFilm",
  computed: {
    ...mapGetters("movie", {movie: 'getCurrentMovie', crew: 'getCrew', keywords: 'getKeywords'}),

  },
  methods: {
    convertDate
  }
}
</script>

<style scoped>

</style>
