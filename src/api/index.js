import axios from "axios";

const movieAxios = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie/'
})

const searchAxios = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

const personAxios = axios.create({
    baseURL: 'https://api.themoviedb.org/3/person/'
})
export {movieAxios, searchAxios, personAxios}
