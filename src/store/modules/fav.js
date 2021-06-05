import {db} from "../../config";
import {database} from "../../utils";
import firebase from "firebase/app";

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
        /*addToFavorite(state, payload) {
            state.favorites.push(payload);
            const id = Date.now().toLocaleString()
        },
        removeFavorite(state, movie) {
            state.favorites = state.favorites.filter((el) => el.id !== movie.id);
        },*/
        setFavoritePage(state) {
            state.favoritePage = true
        },
        resetFavoritePage(state) {
            state.favoritePage = false
        },

    },
    actions: {
        async addToFavorite({rootGetters}, payload) {
            const user = rootGetters["auth/getUser"].email
            console.log(user)
            await db.collection(database).doc(user)
                .update({
                    favorites: firebase.firestore.FieldValue.arrayUnion(payload)
                })

        },
        async removeFavorite({rootGetters}, payload) {
            const user = rootGetters["auth/getUser"].email
            await db.collection(database).doc(user)
                .update({
                    favorites: firebase.firestore.FieldValue.arrayRemove(payload)
                })

        }
    }
};

export default fav;
