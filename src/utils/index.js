import noPhoto from "../assets/no-photo.jpg";

// database name in firebase
export const database = 'USERS'

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
    if (image) {
        return "https://image.tmdb.org/t/p/w500/" + image
    }
    return noPhoto
}
