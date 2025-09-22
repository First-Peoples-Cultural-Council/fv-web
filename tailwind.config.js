const defaultTheme = require('tailwindcss/defaultTheme')
const tailwindAspectRatio = require('@tailwindcss/aspect-ratio')
const tailwindForms = require('@tailwindcss/forms')
const customColorsConfig = require('./src/assets/customColorsConfig')

module.exports = {
  content: ['./src/**/*.{html,js}', './public/index.html'],
  safelist: [
    {
      pattern:
        /(bg|border|fill|from|to|text)-(word-color|phrase-color|song-color|story-color)-(100|200|300|400|500|600|700|800|900|950)/,
      variants: ['hover'],
    },
  ],
  theme: {
    fontFamily: {
      sans: ['BCSans', ...defaultTheme.fontFamily.sans],
      serif: [...defaultTheme.fontFamily.serif],
      mono: [...defaultTheme.fontFamily.mono],
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
