const colors = require('tailwindcss/colors')
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
        /(bg|border|from|to|text)-(word|phrase|song|story|tertiaryA|tertiaryB|tertiaryC|wordText|phraseText|songText|storyText)-(light|dark)/,
      variants: ['hover'],
    },
    {
      pattern:
        /(bg|border|from|to|text)-(word|phrase|song|story|tertiaryA|tertiaryB|tertiaryC|wordText|phraseText|songText|storyText)/,
      variants: ['hover'],
    },
    {
      pattern:
        /(bg|border|from|to|text)-(scarlet|blumine|jade|ochre|charcoal)-(100|200|300|400|500|600|700|800|900|950)/,
      variants: ['hover'],
    },
    {
      pattern:
        /(bg|border|from|to|text)-(kids-dictionary|kids-categories|kids-songs|kids-stories|kids-games|kids-alphabet)-(500|600|700|800|900)/,
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
    flex: {
      1: '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none',
      basis: '0 0 19.7%',
    },
    extend: {
      animation: {
        'pulse-blur': 'pulse-blur 2.5s linear infinite',
      },
      borderWidth: {
        thin: '0.5px',
        12: '12px',
      },
      fontSize: {
        xxs: '.5rem',
      },
      maxHeight: {
        '1/2-screen': '50vh',
        '3/4-screen': '75vh',
      },
      maxWidth: {
        '1/2': '50%',
      },
      height: {
        '1/4-screen': '25vh',
        '1/3-screen': '33vh',
        '2/5-screen': '40vh',
        '1/2-screen': '50vh',
        '2/3-screen': '66vh',
        '3/4-screen': '75vh',
        '4/5-screen': '80vh',
        '9/10-screen': '90vh',
      },
      width: {
        '1/4-screen': '25vw',
        '1/3-screen': '33vw',
        '2/5-screen': '40vw',
        '1/2-screen': '50vw',
        '2/3-screen': '66vw',
        '3/4-screen': '75vw',
        '4/5-screen': '80vw',
        '9/10-screen': '90vw',
      },
      spacing: {
        104: '26rem',
        112: '28rem',
        120: '30rem',
        videoAspect: '56.25%',
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
      translate: {
        '1/8': '12.5%',
      },
      colors: {
        scarlet: customColorsConfig.scarlet,
        blumine: customColorsConfig.blumine,
        jade: customColorsConfig.jade,
        ochre: customColorsConfig.ochre,
        charcoal: customColorsConfig.charcoal,
        'word-color': customColorsConfig.jade,
        'phrase-color': customColorsConfig.ochre,
        'song-color': customColorsConfig.scarlet,
        'story-color': customColorsConfig.blumine,
        'kids-dictionary': customColorsConfig.jade,
        'kids-categories': customColorsConfig.ochre,
        'kids-songs': {
          500: '#830042',
          900: '#5c002e',
        },
        'kids-stories': {
          500: '#E9C46A',
          900: '#a3894a',
        },
        'kids-games': {
          500: '#513B56',
          900: '#39293c',
        },
        'kids-alphabet': customColorsConfig.blumine,
        // Dark Blue
        primary: {
          light: '#44677E',
          DEFAULT: '#264653',
          dark: '#1b313a',
        },
        // Dark Orange
        secondary: {
          light: '#b07363',
          DEFAULT: '#8E3720',
          dark: '#632716',
        },
        // Purple
        tertiaryA: {
          light: '#857689',
          DEFAULT: '#513B56',
          dark: '#39293c',
        },
        // Green/Grey
        tertiaryB: {
          light: '#878a80',
          DEFAULT: '#54584A',
          dark: '#3b3e34',
        },
        // Yellow/Orange Accent - e.g. Stats WIdget
        tertiaryC: {
          DEFAULT: '#EFAD1A',
        },
        word: {
          DEFAULT: '#2A9D8F',
        },
        phrase: {
          DEFAULT: '#C37829',
        },
        song: {
          DEFAULT: '#830042',
        },
        story: {
          DEFAULT: '#E9C46A',
        },
        'fv-charcoal': {
          xlight: '#979799',
          light: '#54584A',
          DEFAULT: '#313133',
          dark: '#0f0f10',
        },
        'wordsy-correct': {
          DEFAULT: '#2C876D', // as bgGreen
        },
        'wordsy-present': {
          DEFAULT: '#C37829', // as phrase
        },
        gray: colors.stone,
      },
    },
  },
  plugins: [tailwindAspectRatio, tailwindForms],
}
