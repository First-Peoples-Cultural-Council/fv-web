const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

module.exports = {
  plugins: [
    'postcss-preset-env',
    tailwindcss('./tailwind.config.js'),
    autoprefixer,
    process.env.NODE_ENV === 'production'
      ? cssnano({ preset: 'default' })
      : null,
  ],
}
