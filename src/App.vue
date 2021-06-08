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
  created() {
    /*const theme = localStorage.getItem('theme')
    if (theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('prefers-color-scheme').matches)) {
      localStorage.setItem('theme', 'light')
    } else {
      localStorage.setItem('theme', 'dark')

    }*/
  }
};
</script>

<style scoped>
</style>
