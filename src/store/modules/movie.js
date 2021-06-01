import {BASE_URL, BASE_URL_SEARCH} from "../../utils";

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

        setMovie(state, payload) {
            state.movie = payload;
        },
        setCredits(state, payload) {
            state.credits = payload
        },
        setCrew(state, payload) {
            // state.crew = payload.length === 0 ? ['no data'] : payload
            state.crew = payload
        },
        setKeywords(state, payload) {
            state.keywords = payload
        }
    },
    actions: {

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
            commit("setCrew", result.crew);
            commit("setCredits", result.cast.splice(0, 5));
        },
        async getKeywords({commit}, id) {
            const result = await fetch(
                `${BASE_URL}${id}/keywords?api_key=${
                    import.meta.env.VITE_APP_MOVIE_API_KEY
                }&language=en-US`
            ).then((data) => data.json());
            commit("setKeywords", result.keywords);
        },


    },
}

export default movie
