const movies = {
  namespaced: true,
  state: {
    movies: [],
  },
  getters: {
    getMovies: (state) => state.movies,
    getById: (state) => (id) => {
      return state.movies.find((movie) => movie.id === +id);
    },
  },
  mutations: {
    setMovies(state, payload) {
      state.movies = payload;
    },
  },
  //todo добавить анимацию на загрузку и проверку ошибок
  actions: {
    async getFilms({ commit }) {
      const result = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${
          import.meta.env.VITE_APP_MOVIE_API_KEY
        }`
      ).then((data) => data.json());
      console.log(result.results);
      commit("setMovies", result.results);
    },
  },
};

export default movies;

// https://api.themoviedb.org/3/movie/now_playing?api_key=b3e942d847688e6b6bd1c089a678e6be
// https://api.themoviedb.org/3/movie/550?api_key=
