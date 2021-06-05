import {createStore} from 'vuex'
import movies from "./modules/movies";
import movie from "./modules/movie";
import fav from "./modules/fav";
import auth from "./modules/auth";

export default createStore({

    modules: {movies, movie, fav, auth},

})

