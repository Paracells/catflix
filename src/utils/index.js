export const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original/"

export const BASE_URL = 'https://api.themoviedb.org/3/movie/'

export function calcLength(line) {
    return line.split(" ").length > 30
        ? line.split(" ").splice(0, 30).join(" ").concat("...")
        : line;

}
