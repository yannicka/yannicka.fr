const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './public/**/*.html',
  ],
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
