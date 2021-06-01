<template>
  <div v-if="loading" class="flex justify-center items-center h-screen w-full">
    <div id="loading"></div>
  </div>
  <cast-card v-else/>
  <about-film/>
</template>
<script>

import CastCard from "../components/CastCard.vue";
import AboutFilm from "../components/AboutFilm.vue";

export default {
  name: 'TheMovie',
  components: {AboutFilm, CastCard},
  data() {
    return {
      loading: false,
    }
  },


}
</script>


<style scoped>


</style>
