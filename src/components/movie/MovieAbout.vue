<template>
  <div>
    <div class="header__card">About</div>
    <div class="flex flex-col  ml-5 text-white mt-5">
      <div class="grid grid-flow-col gap-4">
        <div class="col-start-1">Release</div>
        <div class="col-start-2">{{ new Date(movie.release_date).toLocaleDateString() }}</div>
        <div class="col-start-1">Homepage</div>
        <div class="col-start-2">
          <p v-if="!movie.homepage">no data</p>
          <a v-else class="text-green-500 hover:text-blue-500" :href="movie.homepage"
             target="_blank">{{ movie.title }}</a>
        </div>
        <div class="col-start-1">Genres</div>
        <div class=" col-start-2 space-x-4">
          <p class="inline-block" v-if="movie.genres.length===0">no data</p>
          <p v-else class="inline-block" v-for="g in movie.genres"><span
              class="chips">{{
              g.name
            }}</span>
          </p>
        </div>
        <div class="col-start-1">Director</div>
        <div class="col-start-2">{{ crew.director ? crew.director : 'no data' }}</div>
        <div class="col-start-1">Writing</div>
        <div class="col-start-2">{{ crew.writing ? crew.writing : 'no data' }}</div>
        <div class="col-start-1">Keywords</div>
        <div class="col-start-2 space-x-4 space-y-2">
          <p class="inline-block" v-if="keywords.length===0">no data</p>
          <p v-else class="inline-block" v-for="keyword in keywords"><span
              class="chips bg-green-900">{{
              keyword
            }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "AboutFilm",
  computed: {
    ...mapGetters("movie", {movie: 'getCurrentMovie', crew: 'getCrew', keywords: 'getKeywords'}),

  }
}
</script>

<style scoped>

</style>
