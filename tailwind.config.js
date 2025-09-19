const defaultTheme = require('tailwindcss/defaultTheme')
const tailwindAspectRatio = require('@tailwindcss/aspect-ratio')
const tailwindForms = require('@tailwindcss/forms')
const languageColorsConfig = require('./src/assets/languageColorsConfig')
const customColorsConfig = require('./src/assets/customColorsConfig')

module.exports = {
  content: ['./src/**/*.{html,js}', './public/index.html'],
  safelist: [
    'ql-video',
    'wysiwyg',
    {
      pattern:
        /(bg|border|fill|from|to|text)-(scarlet|blumine|jade|ochre|charcoal)-(100|200|300|400|500|600|700|800|900|950)/,
      variants: ['hover'],
    },
    {
      pattern:
        /(bg|border|fill|from|to|text)-(word-color|phrase-color|song-color|story-color)-(100|200|300|400|500|600|700|800|900|950)/,
      variants: ['hover'],
    },
    {
      pattern:
        /(bg|border|fill|from|to|text)-(kids-dictionary|kids-categories|kids-songs|kids-stories|kids-games|kids-alphabet)-(500|600|700|800|900)/,
      variants: ['hover'],
    },
    ...languageColorsConfig.colors,
  ],
  theme: {
    fontFamily: {
      sans: ['BCSans', ...defaultTheme.fontFamily.sans],
      serif: [...defaultTheme.fontFamily.serif],
      mono: [...defaultTheme.fontFamily.mono],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      print: { raw: 'print' },
    },
    extend: {
      animation: {
        'pulse-blur': 'pulse-blur 2.5s linear infinite',
      },
      keyframes: {
        'pulse-blur': {
          '0%, 50%, 100%': {
            transform: 'scale(1)',
            filter: 'blur(0px)',
          },
          '25%': {
            transform: 'scale(0.6)',
            filter: 'blur(2px)',
          },
          '75%': {
            transform: 'scale(1.4)',
            filter: 'blur(2px)',
          },
        },
      },
      colors: {
        // Core Colors
        blumine: customColorsConfig.blumine, // 400, 500, 600, 700, 800, 900
        scarlet: customColorsConfig.scarlet, // 400, 500, 600, 700, 800, 900
        jade: customColorsConfig.jade, // 300, 400, 500, 700, 800
        ochre: customColorsConfig.ochre, // 200, 400, 500, 600, 700, 800
        charcoal: customColorsConfig.charcoal, // 100, 200, 300, 500, 700, 900
        // Type Color Aliases
        'phrase-color': customColorsConfig.ochre,
        'song-color': customColorsConfig.scarlet,
        'story-color': customColorsConfig.blumine,
        'word-color': customColorsConfig.jade,
        // Kids Colors and Aliases - NB These will be replaced when we get a new Kids palette
        'kids-alphabet': customColorsConfig.blumine,
        'kids-categories': customColorsConfig.ochre,
        'kids-dictionary': customColorsConfig.jade,
        'kids-games': {
          500: '#513B56',
          900: '#39293c',
        },
        'kids-songs': {
          500: '#830042',
          900: '#5c002e',
        },
        'kids-stories': {
          500: '#E9C46A',
          900: '#a3894a',
        },
        // Misc aliases
        'wordsy-correct': {
          DEFAULT: customColorsConfig.jade[500],
        },
        'wordsy-present': {
          DEFAULT: customColorsConfig.ochre[600],
        },
      },
    },
  },
  plugins: [tailwindAspectRatio, tailwindForms],
}
