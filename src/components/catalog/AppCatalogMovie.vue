<template>
  <div v-if="loadingSpinner" class="flex justify-center items-center h-screen w-full">
    <div id="loading"></div>
  </div>
  <div class="relative" @mouseover="show = true" @mouseout="show = false" v-else>
    <router-link :to="{ name: 'TheMovie', params: { id: movie.id } }">
      <div class="bg-gray-800 shadow-md rounded-3xl p-2 cursor-pointer">
        <img
            :src="imageLink"
            :alt="movie.original_title"
            class="rounded-2xl w-full transform transition duration-500"
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
import {calcLength, getImage} from "../../utils";

export default {
  name: "AppMovie",
  props: ["movie"],
  data() {
    return {
      show: true,
      imgHover: "",
      linkHover: "",
      titleHover: "",
      loadingSpinner: false,
      imageLink: ''
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
  async created() {
    this.loadingSpinner = true
    const result = getImage(this.movie, 'poster_path')
    this.imageLink = result
  },
  computed: {
    overView() {
      return calcLength(this.movie.overview)
    },
  },
  mounted() {
    this.loadingSpinner = false

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
