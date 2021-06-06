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
        async addToFavorite({rootGetters, dispatch}, payload) {
            const user = rootGetters["auth/getUser"]
            if (user) {
                await db.collection(database).doc(user.email)
                    .update({
                        favorites: firebase.firestore.FieldValue.arrayUnion(payload)
                    }).then(dispatch('getFavorites'))
            }

        },
        async removeFavorite({dispatch, rootGetters}, payload) {
            const user = rootGetters["auth/getUser"]
            if (user) {
                const common = db.collection(database).doc(user.email)
                await common.update({
                    favorites: firebase.firestore.FieldValue.arrayRemove(payload)
                }).then(dispatch('getFavorites'))
            }

        },
        async getFavorites({commit, rootGetters}) {
            const user = rootGetters["auth/getUser"]
            if (user) {
                db.collection(database).doc(user.email)
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
                        console.log('Error getting document: ', err.message)
                    })
            }
        }
    }


};

export default fav;
