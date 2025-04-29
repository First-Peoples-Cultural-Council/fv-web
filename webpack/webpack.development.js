const { merge } = require('webpack-merge')
const common = require('./webpack.common')

/**
 * For testing with external devices (or Dev Tools connected to a physical device):
 * Option 1: Change `localhost` (proxy -> target, output -> publicPath) to your local IP to access from other devices on your network
 * Option 2: Use a service such as ngrok to create a tunnel to localhost
 */

module.exports = (env) => {
  return merge(common(env), {
    mode: 'development',
    devtool: 'inline-source-map',
    target: 'web',
    devServer: {
      client: {
        overlay: {
          warnings: false,
          errors: true,
        },
      },
      server: 'https',
      port: 3000,
      historyApiFallback: true,
      host: '0.0.0.0',
    },
    output: {
      publicPath: 'https://localhost:3000/',
    },
  })
}
