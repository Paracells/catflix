<template>
  <div>
    <app-navbar/>
    <app-filter/>
    <app-movies/>
  </div>
</template>

<script>
import AppNavbar from "./AppNavbar.vue";
import AppMovies from "./AppMovies.vue";
import AppFilter from "./AppFilter.vue";

export default {
  name: "AppCatalog",
  components: {AppMovies, AppNavbar, AppFilter},
  data() {
    return {
      messages: [{name: 'notification name', id: Date.now().toLocaleString()}]
    };
  },


};
</script>

<style scoped>

</style>
