const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
const tailwindAspectRatio = require('@tailwindcss/aspect-ratio')
const tailwindForms = require('@tailwindcss/forms')
const languageColorsConfig = require('./src/assets/languageColorsConfig')

module.exports = {
  content: ['./src/**/*.{html,js}', './public/index.html'],
  safelist: [
    'ql-video',
    'wysiwyg',
    {
      pattern:
        /(bg|border|from|to|text)-(word|phrase|song|story|tertiaryA|tertiaryB|tertiaryC|wordText|phraseText|songText|storyText|bgGreen)-(light|dark)/,
      variants: ['hover'],
    },
    {
      pattern:
        /(bg|border|from|to|text)-(word|phrase|song|story|tertiaryA|tertiaryB|tertiaryC|wordText|phraseText|songText|storyText|bgGreen)/,
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
        // Grey/Blue background - eg. landing banner
        tertiaryD: {
          DEFAULT: '#2D5B72',
        },
        word: {
          light: '#6ABAB1',
          DEFAULT: '#2A9D8F',
          dark: '#1D6E64',
        },
        phrase: {
          light: '#D5A169',
          DEFAULT: '#C37829',
          dark: '#89541D',
        },
        song: {
          light: '#a84d7b',
          DEFAULT: '#830042',
          dark: '#5c002e',
        },
        story: {
          light: '#f0d697',
          DEFAULT: '#E9C46A',
          dark: '#a3894a',
        },
        wordText: {
          DEFAULT: '#264653',
        },
        phraseText: {
          DEFAULT: '#9A270A',
        },
        songText: {
          DEFAULT: '#830042',
        },
        storyText: {
          DEFAULT: '#8C5822',
        },
        bgGreen: {
          DEFAULT: '#2C876D',
        },
        bgRed: {
          DEFAULT: '#B40212',
        },
        buttonOrange: {
          DEFAULT: 'C4572D',
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
