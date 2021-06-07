import {movieAxios, searchAxios} from "../../api";
import mutations from '../../utils/mutation-types'

const {SET_MOVIES, SET_FILTER, REMOVE_BY_ID, SAVE_SEARCH_MOVIES} = mutations

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
        [SET_MOVIES](state, payload) {
            state.movies = payload;
        },
        [SET_FILTER](state, payload) {
            state.filteredClass = payload
        },
        [REMOVE_BY_ID](state, id) {
            state.movies = state.movies.filter(el => el.id !== +id)
        },
        [SAVE_SEARCH_MOVIES](state, payload) {
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
            commit(SET_MOVIES, result.data.results);
        },


        // search films
        async searchFilms({commit}, searchString) {
            const result = await searchAxios.get(
                `search/movie?api_key=${
                    import.meta.env.VITE_APP_MOVIE_API_KEY
                }&language=en-US&query=${searchString}&page=1&include_adult=false`
            );
            commit(SET_MOVIES, result.data.results);
        },
        async resetFilter({commit, dispatch, state}) {
            const filter = state.filteredClass ? state.filteredClass : "now_playing"
            commit(SET_FILTER, filter)
            await dispatch('getFilms', this.getFilter ? this.getFilter : filter)
        },

    },
};

export default movies;
