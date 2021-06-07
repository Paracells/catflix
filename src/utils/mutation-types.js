export default {
    // authorization
    SET_ERROR: "SET_ERROR", // error for sign in and sign up forms
    SET_USERDATA: "SET_USERDATA", // save user to localstorage
    DELETE_USER: "DELETE_USER", // delete user from localstorage (logout)

    // favorites
    SET_FAVORITE_PAGE: "SET_FAVORITE_PAGE", // set flag and watch when should back to main page
    RESET_FAVORITE_PAGE: "RESET_FAVORITE_PAGE", // reset flag, when back to home page
    SET_FAVORITE_COUNTER: "SET_FAVORITE_COUNTER", // set counter for navbar
    SET_FAVORITES: "SET_FAVORITES", // change movie list to our favorites

    // movie page
    SET_MOVIE: 'SET_MOVIE', // save one movie from api for movie page
    SET_CREDITS: 'SET_CREDITS', // save credits  for movie page
    SET_CREW: 'SET_CREW', // save crew for movie page
    SET_KEYWORDS: 'SET_KEYWORDS', // save keywords for movie page

    // movies page (catalog)
    SET_MOVIES: 'SET_MOVIES', // set movies to our catalog
    SET_FILTER: 'SET_FILTER', // filter for search
    REMOVE_BY_ID: 'REMOVE_BY_ID', // remove from favorites
    SAVE_SEARCH_MOVIES: 'SAVE_SEARCH_MOVIES', // save movies when change page to favorites
};
