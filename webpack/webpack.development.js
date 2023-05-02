const { merge } = require('webpack-merge')
const common = require('./webpack.common')

/**
 * For testing with external devices (or Dev Tools connected to a physical device):
 * Option 1: Change `localhost` (proxy -> target, output -> publicPath) to your local IP to access from other devices on your network
 * Option 2: Use a service such as ngrok to create a tunnel to localhost, and Nuxeo (update URLs to ngrok URLs)
 */

module.exports = (env) => {
  const definitions = {
    CONFIGURATION_SOURCE: JSON.stringify('Webpack'),
    ENV_V1_URL:
      env && env.V1_URL ? JSON.stringify(env.V1_URL) : JSON.stringify(''),
    ENV_V1_API_URL:
      env && env.V1_API_URL
        ? JSON.stringify(env.V1_API_URL)
        : JSON.stringify('/nuxeo/api/v1/'),
  }

  return merge(common(env, definitions), {
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
      port: 3000,
      historyApiFallback: true,
      host: '0.0.0.0',
      proxy: [
        {
          context: ['/nuxeo/**', '!/nuxeo/app/**'],
          target:
            env && env.NUXEO_URL ? env.NUXEO_URL : 'http://localhost:8080',
        },
      ],
    },
    output: {
      publicPath: 'http://localhost:3000/',
    },
  })
}
