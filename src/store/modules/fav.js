const fav = {
    namespaced: true,
    state: {
        favorites: [],
        favoritePage: false
    },
    getters: {
        getFavorites: (state) => state.favorites,
        findById: (state) => (id) => {
            return state.favorites.some((el) => el.id === +id);
        },
        getPageStatus: (state) => state.favoritePage
    },
    mutations: {
        addToFavorite(state, payload) {
            state.favorites.push(payload);
            const id = Date.now().toLocaleString()
        },
        removeFavorite(state, movie) {
            state.favorites = state.favorites.filter((el) => el.id !== movie.id);
        },
        setFavoritePage(state) {
            state.favoritePage = true
        },
        resetFavoritePage(state) {
            state.favoritePage = false
        },

    },
};

export default fav;
