import {createStore} from 'vuex'
import movies from "./modules/movies";
import movie from "./modules/movie";
import user from "./modules/user";

export default createStore({

    modules: {movies, movie, user}
})


// https://api.themoviedb.org/3/movie/now_playing?api_key=b3e942d847688e6b6bd1c089a678e6be
// https://api.themoviedb.org/3/movie/550?api_key=
