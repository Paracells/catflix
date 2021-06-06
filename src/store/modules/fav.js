import {db} from "../../config";
import {database} from "../../utils";
import firebase from "firebase/app";

const fav = {
    namespaced: true,
    state: {
        favorites: [],
        favoritePage: false,
        favoritesCount: null
    },
    getters: {
        getFavorites: (state) => state.favorites,
        findById: (state) => (id) => {
            return state.favorites.some((el) => el.id === +id);
        },
        getFavoriteLength: (state) => state.favoritesCount,
        getPageStatus: (state) => state.favoritePage
    },
    mutations: {
        setFavoritePage(state) {
            state.favoritePage = true
        },
        resetFavoritePage(state) {
            state.favoritePage = false
        },
        setFavoriteCounter(state, payload) {
            state.favoritesCount = payload
        },
        setFavorites(state, payload) {
            state.favorites = payload
        }

    },
    actions: {
        async addToFavorite({rootGetters}, payload) {
            const user = rootGetters["auth/getUser"].email
            await db.collection(database).doc(user)
                .update({
                    favorites: firebase.firestore.FieldValue.arrayUnion(payload)
                }).then(dispatch('getFavorites'))

        },
        async removeFavorite({dispatch, rootGetters}, payload) {
            const user = rootGetters["auth/getUser"].email
            const common = db.collection(database).doc(user)
            await common.update({
                favorites: firebase.firestore.FieldValue.arrayRemove(payload)
            }).then(dispatch('getFavorites'))


        },
        async getFavorites({commit, rootGetters,}) {
            const user = rootGetters["auth/getUser"].email
            db.collection(database).doc(user)
                .get()
                .then(doc => {
                    if (doc.exists) {
                        commit('setFavoriteCounter', doc.data().favorites.length)
                        commit('setFavorites', doc.data().favorites)

                    } else {
                        console.log('No such document')
                    }

                })
                .catch(err => {
                    console.log('Error getting document: ', err)
                })
        }
    }


};

export default fav;
