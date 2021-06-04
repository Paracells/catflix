import {createStore} from 'vuex'
import movies from "./modules/movies";
import movie from "./modules/movie";
import fav from "./modules/fav";
import user from "./modules/user";
import {appAuth} from "../config";

export default createStore({

    modules: {movies, movie, fav, user},
    actions: {
        navBarLoad({commit}) {
            appAuth.onAuthStateChanged((user) => {
                if (user) {
                    console.log(user)
                    commit('user/setUserData', user)
                    commit('user/setError', {status: false, text: ''})
                }
            })
        }
    }
})


// https://api.themoviedb.org/3/movie/now_playing?api_key=b3e942d847688e6b6bd1c089a678e6be
// https://api.themoviedb.org/3/movie/550?api_key=
