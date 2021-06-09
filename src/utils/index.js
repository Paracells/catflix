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

/**
 * convert ISO date to current locale
 * @param date
 * @returns {string}
 */
export function convertDate(date) {
    return new Date(date).toLocaleDateString()
}

/**
 * calc number of years between two dates
 * @param date
 * @returns {number}
 */

export function birthDate(date) {
    const currentTime = new Date().getTime();
    const birthDateTime = new Date(date).getTime();
    const difference = (currentTime - birthDateTime)
    return Math.trunc(difference / (1000 * 60 * 60 * 24 * 365))
}

/**
 * toggle dark/light theme
 * @param theme
 */
export function toggleTheme(theme) {
    if (theme) {
        localStorage.setItem('theme', 'dark')
        document.documentElement.classList.add('dark')
        document.body.classList.add('bg-gray-900', 'text-white')
    } else {
        localStorage.setItem('theme', 'light')
        document.documentElement.classList.remove('dark')
        document.body.classList.remove('bg-gray-900', 'text-white')

    }
}
