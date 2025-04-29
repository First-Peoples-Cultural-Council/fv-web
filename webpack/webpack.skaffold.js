const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const definitions = {
  ENV_API_URL: '/api/1.0/',
  ENV_APP_ENV: '',
  ENV_UNDER_MAINTENANCE: '',
  ENV_AWS_CLIENT_ID: '',
  ENV_BUILD_STRING: '',
  ENV_OIDC_AUTHORITY_URL: '',
  ENV_OAUTH2_REDIRECT_URL: '',
  ENV_END_SESSION_URL: '',
  ENV_SENTRY_DSN: '',
  ENV_SENTRY_ENVIRONMENT: '',
  ENV_SENTRY_RELEASE: '',
  ENV_SENTRY_TRACES_SAMPLE_RATE: '',
  ENV_SENTRY_ERROR_SAMPLE_RATE: '',
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
