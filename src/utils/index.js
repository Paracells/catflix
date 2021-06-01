import noPhoto from "../assets/no-photo.jpg";

export const BASE_URL = 'https://api.themoviedb.org/3/movie/'
export const BASE_URL_SEARCH = 'https://api.themoviedb.org/3/'

export function calcLength(line) {
    return line.split(" ").length > 30
        ? line.split(" ").splice(0, 30).join(" ").concat("...")
        : line;

}

export function getImage(id, key) {
    const image = id[key]
    if (image) {
        return "https://image.tmdb.org/t/p/w500/" + image
    }
    return noPhoto
}
