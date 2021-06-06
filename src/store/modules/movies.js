import {movieAxios, searchAxios} from "../../api";

const movies = {
    namespaced: true,
    state: {
        movies: [],
        filteredClass: 'now_playing',
        savedFromFavorites: ''

    },
    getters: {
        getMovies: (state) => state.movies,
        getFilter: (state) => state.filteredClass,
        getSavedFromFavorites: (state) => state.savedFromFavorites


    },
    mutations: {
        setMovies(state, payload) {
            state.movies = payload;
        },
        setFilter(state, payload) {
            state.filteredClass = payload
        },


        removeById(state, id) {
            state.movies = state.movies.filter(el => el.id !== +id)
        },
        saveSearchMovies(state, payload) {
            state.savedFromFavorites = payload
        },


    },
    actions: {
        async getFilms({commit}, filter) {
            const result = await movieAxios.get(
                `${filter}?api_key=${
                    import.meta.env.VITE_APP_MOVIE_API_KEY
                }`
            );
            commit("setMovies", result.data.results);
        },


        // search films
        async searchFilms({commit}, searchString) {
            const result = await searchAxios.get(
                `search/movie?api_key=${
                    import.meta.env.VITE_APP_MOVIE_API_KEY
                }&language=en-US&query=${searchString}&page=1&include_adult=false`
            );
            commit("setMovies", result.data.results);
        },
        async resetFilter({commit, dispatch, state}) {
            const filter = state.filteredClass ? state.filteredClass : "now_playing"
            commit('setFilter', filter)
            await dispatch('getFilms', this.getFilter ? this.getFilter : filter)
        },

    },
};

export default movies;
