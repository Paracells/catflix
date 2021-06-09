<template>
  <router-view/>
</template>

<script>
export default {
  name: "Empty",
  watch: {
    enabled(value) {
      if (value) {
        localStorage.setItem('theme', 'dark')
        document.documentElement.classList.add('dark')
        document.body.classList.add('bg-gray-900', 'text-white')
      } else {

        localStorage.setItem('theme', 'light')
        document.documentElement.classList.remove('dark')
        document.body.classList.remove('bg-gray-900', 'text-white')

      }
    }
  },
  created() {
    this.enabled = localStorage.getItem('theme') === 'dark'
  },
  mounted() {
    const htmlElement = document.documentElement
    const theme = localStorage.getItem('theme')
    theme === 'dark' ?
        htmlElement.classList.add('dark') : htmlElement.classList.remove('dark')
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.body.classList.add('bg-gray-900', 'text-white')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('bg-gray-900', 'text-white')
    }
  }


}
</script>

<style scoped>

</style>
