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
  },
  variants: {
    extend: {
      backgroundColor: ['group-focus'],
    }
  },
  plugins: [],
}
