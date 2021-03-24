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
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['group-focus'],
    }
  },
  plugins: [],
}
