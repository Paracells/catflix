const movies = {
  namespaced: true,
  state: {
    movies: [],
    movie: "",
  },
  getters: {
    getMovies: (state) => state.movies,
    /* getById: (state) => (id) => {
             return state.movies.find((movie) => movie.id === +id);
         },*/
    getById: (state) => {
      return state.movie;
    },
  },
  mutations: {
    setMovies(state, payload) {
      state.movies = payload;
    },
    setMovie(state, payload) {
      state.movie = payload;
    },
  },
  //todo добавить анимацию на загрузку и проверку ошибок
  // todo вынести переменные
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
    async getFilm({ commit }, id) {
      const result = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${
          import.meta.env.VITE_APP_MOVIE_API_KEY
        }`
      ).then((data) => data.json());
      console.log(result.results);
      commit("setMovie", result.results);
    },
  },
};

export default movies;

// https://api.themoviedb.org/3/movie/now_playing?api_key=b3e942d847688e6b6bd1c089a678e6be
// https://api.themoviedb.org/3/movie/550?api_key=

// https://api.themoviedb.org/3/movie/615457?api_key=b3e942d847688e6b6bd1c089a678e6be&language=en-US
