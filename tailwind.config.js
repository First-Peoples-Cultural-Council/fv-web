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
        'wordsy-correct': {
          DEFAULT: customColorsConfig.jade[500],
        },
        'wordsy-present': {
          DEFAULT: customColorsConfig.ochre[600],
        },
        gray: colors.stone,
      },
    },
  },
  plugins: [tailwindAspectRatio, tailwindForms],
}
