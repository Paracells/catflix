<template>
  <div class="relative" @mouseover="show = true" @mouseout="show = false">
    <router-link :to="{ name: 'TheMovie', params: { id: movie.id } }">
      <div class="bg-gray-800 shadow-md rounded-3xl p-2 cursor-pointer">
        <img loading="lazy"
             :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
             :alt="movie.original_title"
             class="h-auto rounded-2xl object-fit w-full transform transition duration-500"
             :class="imgHover"
        />
      </div>
    </router-link>
    <div
        class="text-white bg-indigo-400 bg-opacity-50 text-opacity-80 w-5/6 text-center absolute top-5 left-7 text-xl font-semibold rounded-lg transform transition duration-500"
        :class="titleHover"
    >
      {{ movie.original_title }}
    </div>
    <div
        class="text-green-100 w-5/6 text-center absolute bottom-5 left-7 transform transition duration-1000"
        :class="linkHover"
    >
      {{ overView }}
    </div>
  </div>
</template>

<script>
import {calcLength} from "../utils";

export default {
  name: "AppMovie",
  props: ["movie"],
  data() {
    return {
      show: true,
      imgHover: "",
      linkHover: "",
      titleHover: "",
    };
  },

  methods: {
    hoverAnimation() {
      if (this.show) {
        this.imgHover = "hover:scale-110";
        this.linkHover = "opacity-0";
        this.titleHover = "-translate-y-12 opacity-0";
      } else {
        this.imgHover = "";
        this.linkHover = "";
        this.titleHover = "";
      }
    },
  },
  computed: {
    overView() {
      return calcLength(this.movie.overview)
    },
  },
  watch: {
    show() {
      this.hoverAnimation();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
