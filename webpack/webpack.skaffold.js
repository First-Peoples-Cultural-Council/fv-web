const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const definitions = {
  CONFIGURATION_SOURCE: JSON.stringify('Webpack'),
  ENV_V1_URL: '',
  ENV_V1_API_URL: '/nuxeo/api/v1/',
  ENV_AWS_USER_POOL_ID: '',
  ENV_AWS_CLIENT_ID: '',
}

module.exports = (env) =>
  merge(common(env, definitions), {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      hot: false,
      injectClient: false,
      port: 8080,
      host: '0.0.0.0',
      historyApiFallback: true,
    },
  })
