<template>
  <div class="">
    <div class="header__card">About</div>
    <div class="flex flex-col ml-5 text-white mt-5">
      <div class="grid grid-cols-2 grid-rows-5 gap-4">
        <div class="col-start-1">Release</div>
        <div class="col-start-2">{{ movie.release_date }}</div>
        <div class="col-start-1">Homepage</div>
        <div class="col-start-2"><a :href="movie.homepage" target="_blank">{{ movie.title }}</a></div>
        <div class="col-start-1">Genres</div>
        <div class="space-x-4">
          <p class="inline-block" v-for="g in movie.genres"><span
              class="py-2 px-2 text-center rounded-lg bg-indigo-600">{{
              g.name
            }}</span>
          </p>
        </div>
        <div class="col-start-1">Director</div>
        <div class="col-start-2">{{ crew.director }}</div>
        <div class="col-start-1">Writing</div>
        <div class="col-start-2">{{ crew.writing }}</div>
      </div>
    </div>
  </div>

</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "AboutFilm",
  computed: {
    ...mapGetters("movies", {movie: 'getCurrentMovie', crew: 'getCrew'}),

  }
}
</script>

<style scoped>

</style>
