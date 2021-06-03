<template>
  <div>
    <app-navbar/>
    <app-filter/>
    <app-movies/>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import AppNavbar from "./AppNavbar.vue";
import AppFilter from "./AppFilter.vue";
import Notification from '../Notification.vue'
import AppMovies from "./AppMovies.vue";

export default {
  name: "AppCatalog",
  components: {AppMovies, Notification, AppNavbar, AppFilter},
  data() {
    return {
      messages: [{name: 'notification name', id: Date.now().toLocaleString()}]
    };
  },

  computed: {
    ...mapState('user', ['favoritePage']),
    ...mapGetters("movies", ["getMovies"]),


  },


};
</script>

<style scoped>

</style>
