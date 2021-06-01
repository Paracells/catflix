import {BASE_URL} from "../../utils";

const movies = {
    namespaced: true,
    state: {
        movies: [],
        movie: "",
        credits: ''
    },
    getters: {
        getMovies: (state) => state.movies,
        getById: (state) => (id) => {
            const result = state.movies.find((movie) => movie.id === +id);
            console.log(id)
            console.log(state.movies)
            return result
        },
        getCurrentMovie: (state) => {
            return state.movie;
        },
        getCast: (state) => {
            return state.credits;
        },
    },
    mutations: {
        setMovies(state, payload) {
            state.movies = payload;
        },
        setMovie(state, payload) {
            state.movie = payload;
        },
        setCredits(state, payload) {
            state.credits = payload;
        },
    },
    //todo добавить анимацию на загрузку и проверку ошибок
    // todo вынести переменные
    actions: {
        async getFilms({commit}) {
            const result = await fetch(
                `${BASE_URL}now_playing?api_key=${
                    import.meta.env.VITE_APP_MOVIE_API_KEY
                }`
            ).then((data) => data.json());
            commit("setMovies", result.results);
        },
        async getFilm({commit}, id) {
            const result = await fetch(
                `${BASE_URL}${id}?api_key=${
                    import.meta.env.VITE_APP_MOVIE_API_KEY
                }&language=en-US`
            ).then((data) => data.json());
            commit("setMovie", result);
        },

        async getCredits({commit}, id) {
            const result = await fetch(
                `${BASE_URL}${id}/credits?api_key=${
                    import.meta.env.VITE_APP_MOVIE_API_KEY
                }&language=en-US`
            ).then((data) => data.json());

            commit("setCredits", result.cast.splice(0, 5));
        },
    },
};

export default movies;

// https://api.themoviedb.org/3/movie/now_playing?api_key=b3e942d847688e6b6bd1c089a678e6be
// https://api.themoviedb.org/3/movie/550?api_key=

// https://api.themoviedb.org/3/movie/615457?api_key=b3e942d847688e6b6bd1c089a678e6be&language=en-US

// https://api.themoviedb.org/3/movie/503736/credits?api_key=b3e942d847688e6b6bd1c089a678e6be&language=en-US\ get details
