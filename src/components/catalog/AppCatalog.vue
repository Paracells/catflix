<template>
  <div>
    <app-filter/>
    <app-movies/>
  </div>
</template>

<script>
import AppMovies from "./AppMovies.vue";
import AppFilter from "./AppFilter.vue";

export default {
  name: "AppCatalog",
  components: {AppMovies, AppFilter},
};
</script>

