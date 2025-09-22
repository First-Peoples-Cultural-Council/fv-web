const customColorsConfig = require('./src/assets/customColorsConfig')

module.exports = {
  safelist: [
    {
      pattern:
        /(bg|border|fill|from|to|text)-(word-color|phrase-color|song-color|story-color)-(100|200|300|400|500|600|700|800|900|950)/,
      variants: ['hover'],
    },
  ],
  theme: {
    extend: {
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
}
