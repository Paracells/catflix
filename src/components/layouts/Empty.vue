<template>
  <router-view/>
</template>

<script>
import {toggleTheme} from "../../utils";

export default {
  name: "Empty",
  watch: {
    enabled(value) {
      toggleTheme(value)
    }
  },
  created() {
    const theme = localStorage.getItem('theme')
    toggleTheme(theme === 'dark')
  }


}
</script>

<style scoped>

</style>
