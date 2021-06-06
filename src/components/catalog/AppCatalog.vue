<template>
  <div class="w-screen">
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
};
</script>

