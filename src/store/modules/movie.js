import {movieAxios} from "../../api";
import mutations from '../../utils/mutation-types'

const {SET_MOVIE, SET_CREDITS, SET_CREW, SET_KEYWORDS} = mutations
const movie = {
    namespaced: true,
    state: {
        movie: "",
        credits: '',
        crew: [],
        keywords: []
    },
    getters: {
        getCurrentMovie: (state) => {
            return state.movie;
        },
        getCast: (state) => {
            return state.credits;
        },
        getCrew: (state) => {
            return {
                director: state.crew.filter(el => el.known_for_department === 'Directing').map(el => el.name).join(', '),
                writing: state.crew.filter(el => el.known_for_department === 'Writing').map(el => el.name).join(', ')

            }
        },
        getKeywords: (state) => {
            return state.keywords.map(el => el.name)
        }
    },
    mutations: {

        [SET_MOVIE](state, payload) {
            state.movie = payload;
        },
        [SET_CREDITS](state, payload) {
            state.credits = payload
        },
        [SET_CREW](state, payload) {
            state.crew = payload
        },
        [SET_KEYWORDS](state, payload) {
            state.keywords = payload
        }
    },
    actions: {

        async getFilm({commit}, id) {
            const result = await movieAxios.get(`${id}?api_key=${
                import.meta.env.VITE_APP_MOVIE_API_KEY
            }&language=en-US`).catch(() => null)
            if (result) {
                commit(SET_MOVIE, result.data);
            }
        },

        async getCredits({commit}, id) {
            const result = await movieAxios.get(`${id}/credits?api_key=${
                import.meta.env.VITE_APP_MOVIE_API_KEY
            }&language=en-US`)
            commit(SET_CREW, result.data.crew);
            commit(SET_CREDITS, result.data.cast.splice(0, 8));
        },
        async getKeywords({commit}, id) {
            const result = await movieAxios.get(`${id}/keywords?api_key=${
                import.meta.env.VITE_APP_MOVIE_API_KEY
            }&language=en-US`)
            commit(SET_KEYWORDS, result.data.keywords);
        },


    },
}

export default movie
