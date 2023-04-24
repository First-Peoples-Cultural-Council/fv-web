const path = require('path')

// Sources
const app = path.resolve(__dirname, '..')
const src = path.resolve(app, 'src')

const common = path.resolve(src, 'common')
const components = path.resolve(src, 'components')
const context = path.resolve(src, 'context')
const qa = path.resolve(src, 'qa')
const services = path.resolve(src, 'services')

const assets = path.resolve(src, 'assets')
const favicons = path.join(assets, 'favicons')
const fonts = path.join(assets, 'fonts')
const images = path.join(assets, 'images')

// Build/Deploy
const dist = path.resolve(app, 'dist')
const distAssets = path.resolve(dist, 'assets')
const distServer = path.resolve(dist, 'server.js')
const distFonts = path.join(distAssets, 'fonts')
const distScripts = path.join(distAssets, 'js')
const distImages = path.join(distAssets, 'images')
const distFavicons = path.join(distAssets, 'favicons')

module.exports = {
  distServer,
  assets,
  common,
  components,
  context,
  dist,
  distFavicons,
  distFonts,
  distImages,
  distScripts,
  favicons,
  fonts,
  images,
  qa,
  services,
  src,
}
