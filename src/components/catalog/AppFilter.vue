<template>
  <div class="flex md:justify-between lg:items-start lg:flex-row flex-col md:flex-row ">
    <div class="mt-8 ml-4">
      <switch-theme/>
    </div>
    <div>
      <ul class="app__filter">
        <li
            v-for="f in filteredArray"
            :key="f.name"
            class="button__filter"
            @click="filterPath(f)"
            :class="{ 'dark:bg-green-500 bg-green-200 dark:hover:bg-green-800 hover:bg-green-500 text-gray-900 dark:text-white': f.name === filter }"
        >
          {{ f.filter }}
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import {mapGetters} from "vuex";
import SwitchTheme from "../SwitchTheme.vue";

export default {
  name: "AppFilter",
  components: {SwitchTheme},
  data() {
    return {
      filteredArray: [
        {name: "now_playing", filter: "NOW PLAYING"},
        {name: "popular", filter: "POPULAR"},
        {name: "top_rated", filter: "TOP RATED"},
        {name: "upcoming", filter: "UPCOMING"},
      ],
    };
  },

  computed: {
    ...mapGetters({filter: "movies/getFilter"}),
  },

  methods: {
    filterPath(filter) {
      this.$store.commit("movies/SET_FILTER", filter.name);
      this.$store.dispatch("movies/getFilms", filter.name);
    },
  },
  mounted() {
  },
};
</script>

<style scoped>
</style>
