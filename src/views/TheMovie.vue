<template>
  <div v-if="loading" class="flex justify-center items-center h-screen w-full">
    <div id="loading"></div>
  </div>
  <cast-card v-else/>

</template>
<script>

import CastCard from "../components/CastCard.vue";

export default {
  name: 'TheMovie',
  components: {CastCard},
  data() {
    return {
      loading: false,
    }
  },


}
</script>


<style scoped>


</style>
