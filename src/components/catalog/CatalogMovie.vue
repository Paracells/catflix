<template>
  <div class="relative" @mouseover="show = true" @mouseout="show = false">
    <router-link :to="{ name: 'TheMovie', params: { id: movie.id } }">
      <div
          class="dark:bg-gray-800 bg-green-800 rounded-3xl p-2 cursor-pointer ring-2">
        <img
            :src="imageLink"
            :alt="movie.original_title"
            class="rounded-2xl w-full transform transition duration-500 object-cover h-[500px]"
            :class="imgHover"
        />
      </div>
    </router-link>
    <div
        class="title__hover"
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
  name: "CatalogMovie",
  props: ["movie"],
  data() {
    return {
      show: true,
      imgHover: "",
      linkHover: "",
      titleHover: "",
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
    this.imageLink = getImage(this.movie, 'poster_path')
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
