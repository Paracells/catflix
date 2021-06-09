<template>
  <div>
    <catalog-filter/>
    <catalog-movies/>
  </div>
</template>

<script>
import CatalogMovies from "./CatalogMovies.vue";
import CatalogFilter from "./CatalogFilter.vue";

export default {
  name: "CatalogMain",
  components: {CatalogMovies, CatalogFilter},
};
</script>

