module.exports = {
  content: [
    'public/**/*.html'
  ],
  theme: {
    fontFamily: {
      'source-serif-pro': ['Source Serif Pro', 'serif'],
    },
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.inherit'),
            '--tw-prose-bullets': theme('colors.inherit'),
            '--tw-prose-counters': theme('colors.inherit'),
            '--tw-prose-invert-body': theme('colors.inherit'),
            '--tw-prose-invert-bullets': theme('colors.inherit'),
            '--tw-prose-invert-counters': theme('colors.inherit'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
