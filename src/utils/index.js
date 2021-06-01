import noPhoto from "../assets/no-photo.jpg";

export const BASE_URL = 'https://api.themoviedb.org/3/movie/'
export const BASE_URL_SEARCH = 'https://api.themoviedb.org/3/'

/**
 *
 * splice line more than 30 words
 * @param line - line for splice
 * @returns {string}
 */
export function calcLength(line) {
    return line.split(" ").length > 30
        ? line.split(" ").splice(0, 30).join(" ").concat("...")
        : line;

}


/**
 *  string with url image or empty image
 * @param id - id movie
 * @param key - path for find
 * @returns {string}
 */
export function getImage(id, key) {
    const image = id[key]
    console.log(image)
    if (image) {
        return "https://image.tmdb.org/t/p/w500/" + image
    }
    return noPhoto
}
