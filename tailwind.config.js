const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        fontFamily: {
            sans: ['Rubik', ...defaultTheme.fontFamily.sans],
        },
    },
    variants: {
        extend: {
            ringWidth: ['hover', 'active'],
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
