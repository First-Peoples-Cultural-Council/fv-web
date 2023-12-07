// Based on Durstenfeld shuffle
export const arrayShuffle = (array) => {
  const shuffledArray = array.slice()
  for (let current = shuffledArray.length - 1; current > 0; current -= 1) {
    const randomIndex = Math.floor(Math.random() * (current + 1))
    const temp = shuffledArray[current]
    shuffledArray[current] = shuffledArray[randomIndex]
    shuffledArray[randomIndex] = temp
  }
  return shuffledArray
}

/*
importAll - Use with Webpack 'require.context' - see https://webpack.js.org/guides/dependency-management/#require-context
e.g. const images = importAll(require.context('assets/images/games/parachute', false, /\.(png|jpe?g|svg)$/))
*/
export const importAll = (required) => {
  const imports = {}
  required.keys().forEach((item) => {
    imports[item.replace('./', '')] = required(item)
  })
  return imports
}
