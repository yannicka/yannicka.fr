const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/assets/js/main.js',

  output: {
    path: path.resolve(__dirname, 'public/assets'),
    filename: 'main.js',
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: {
                  'postcss-import': {},
                  tailwindcss: {},
                  autoprefixer: {},
                  ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
                },
              },
            },
          },
        ],
      },
    ],
  },
}
