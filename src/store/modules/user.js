const user = {
  namespaced: true,
  state: {
    favorites: [],
  },
  getters: {
    getFavorites: (state) => state.favorites,
    findById: (state) => (id) => {
      return state.favorites.some((el) => el.id === +id);
    },
  },
  mutations: {
    setFavorite(state, payload) {
      state.favorites.push(payload);
    },
    removeFavorite(state, movie) {
      state.favorites = state.favorites.filter((el) => el.id !== movie.id);
    },
  },
};

export default user;
