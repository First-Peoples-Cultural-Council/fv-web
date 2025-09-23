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
        // Type Color Aliases
        'phrase-color': customColorsConfig.ochre,
        'song-color': customColorsConfig.scarlet,
        'story-color': customColorsConfig.blumine,
        'word-color': customColorsConfig.jade,
      },
    },
  },
}
