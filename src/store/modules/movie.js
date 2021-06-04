import axios from "../../api";

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
            state.crew = payload
        },
        setKeywords(state, payload) {
            state.keywords = payload
        }
    },
    actions: {

        async getFilm({commit}, id) {
            const result = await axios.get(`${id}?api_key=${
                import.meta.env.VITE_APP_MOVIE_API_KEY
            }&language=en-US`).catch(() => null)
            if (result) {
                commit("setMovie", result.data);
            }
        },

        async getCredits({commit}, id) {
            const result = await axios.get(`${id}/credits?api_key=${
                import.meta.env.VITE_APP_MOVIE_API_KEY
            }&language=en-US`)
            commit("setCrew", result.data.crew);
            commit("setCredits", result.data.cast.splice(0, 5));
        },
        async getKeywords({commit}, id) {
            const result = await axios.get(`${id}/keywords?api_key=${
                import.meta.env.VITE_APP_MOVIE_API_KEY
            }&language=en-US`)
            commit("setKeywords", result.data.keywords);
        },


    },
}

export default movie
