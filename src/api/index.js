import axios from "axios";

const movieAxios = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie/'
})

const searchAxios = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})
export {movieAxios, searchAxios}
