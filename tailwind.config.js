const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './public/**/*.html',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        gray: colors.trueGray,
        orange: colors.orange,
      },
    },
    fontFamily: {
      'source-serif-pro': ['Source Serif Pro', 'serif'],
    },
  },
  variants: {
    extend: {
      backgroundColor: ['group-focus'],
      borderWidth: ['dark'],
    },
  },
  plugins: [],
}
