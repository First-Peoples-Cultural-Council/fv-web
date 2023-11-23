const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const definitions = {
  CONFIGURATION_SOURCE: JSON.stringify('Webpack'),
  ENV_API_URL: '/api/1.0/',
  ENV_AWS_CLIENT_ID: '',
  ENV_OIDC_AUTHORITY_URL: '',
  ENV_OAUTH2_REDIRECT_URL: '',
  ENV_END_SESSION_URL: '',
  ENV_SENTRY_FE_DSN: '',
  ENV_SENTRY_ENVIRONMENT: '',
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
