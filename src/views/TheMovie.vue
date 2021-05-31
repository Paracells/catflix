<template>
  <div></div>
  <!--  <div class="container is-max-widescreen mt-4">
    <div class="card">
      <div class="card-image">
        <figure class="image is-3by5">
          <img
              class="posterImage"
              :src="
'https://image.tmdb.org/t/p/w500'+ movie.poster_path"
              :alt="movie.original_title"
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">John Smith</p>
            <p class="subtitle is-6">@johnsmith</p>
          </div>
        </div>

        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus nec iaculis mauris. <a>@bulmaio</a>.
          <a href="#">#css</a> <a href="#">#responsive</a>
          <br>
          <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  name: "TheMovie",
  props: ["movie"],

  computed: {
    movie() {
      console.log(this.$store);
      console.log(this.$store.getters.movies.getById(this.$route.params.id));
      return this.$store.getters.movies.getById(this.$route.params.id);
    },
  },
};
</script>

<style scoped>
</style>
