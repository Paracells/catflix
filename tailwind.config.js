const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    mode: 'jit',
    purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {},
        fontFamily: {
            sans: ['Rubik', ...defaultTheme.fontFamily.sans],
            headline: ['Ubuntu Condensed']
        },

    },
    variants: {
        extend: {
            ringColor: ['hover', 'active'],
            backgroundColor: ['dark']
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
