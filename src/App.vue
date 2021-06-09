<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>

<script>
import Empty from "./components/layouts/Empty.vue";
import Navbar from "./components/layouts/Navbar.vue";

export default {
  components: {Empty, Navbar},
  computed: {

    layout() {
      return this.$route.meta.layout || 'empty'
    }
  },

};
</script>

<style scoped>
</style>
