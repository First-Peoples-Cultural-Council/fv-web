// Based on Fisher–Yates shuffle
export const arrayShuffle = (array) => {
  if (array?.length < 1) return
  let m = array.length
  let t = 0
  let i = 0
  while (m) {
    m -= 1
    i = Math.floor(Math.random() * m)
    t = array[m]
    // eslint-disable-next-line no-param-reassign
    array[m] = array[i]
    // eslint-disable-next-line no-param-reassign
    array[i] = t
  }
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
