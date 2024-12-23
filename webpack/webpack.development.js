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
    ENV_API_URL: env?.API_URL
      ? JSON.stringify(env.API_URL)
      : JSON.stringify('/api/1.0/'),
    ENV_APP_ENV: env?.APP_ENV
      ? JSON.stringify(env.APP_ENV)
      : JSON.stringify(''),
    ENV_UNDER_MAINTENANCE: env?.UNDER_MAINTENANCE
      ? JSON.stringify(env.UNDER_MAINTENANCE)
      : JSON.stringify(''),
    ENV_AWS_CLIENT_ID: process.env.AWS_CLIENT_ID
      ? JSON.stringify(process.env.AWS_CLIENT_ID)
      : JSON.stringify(''),
    ENV_BUILD_STRING: env?.BUILD_STRING
      ? JSON.stringify(env.BUILD_STRING)
      : JSON.stringify(''),
    ENV_OIDC_AUTHORITY_URL: process.env.OIDC_AUTHORITY_URL
      ? JSON.stringify(process.env.OIDC_AUTHORITY_URL)
      : JSON.stringify(''),
    ENV_OAUTH2_REDIRECT_URL: process.env.OAUTH2_REDIRECT_URL
      ? JSON.stringify(process.env.OAUTH2_REDIRECT_URL)
      : JSON.stringify(''),
    ENV_END_SESSION_URL: process.env.END_SESSION_URL
      ? JSON.stringify(process.env.END_SESSION_URL)
      : JSON.stringify(''),
    ENV_SENTRY_DSN: process.env.SENTRY_DSN
      ? JSON.stringify(process.env.SENTRY_DSN)
      : JSON.stringify(''),
    ENV_SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT
      ? JSON.stringify(process.env.SENTRY_ENVIRONMENT)
      : JSON.stringify(''),
    ENV_SENTRY_RELEASE: process.env.SENTRY_RELEASE
      ? JSON.stringify(process.env.SENTRY_RELEASE)
      : JSON.stringify(''),
    ENV_SENTRY_TRACES_SAMPLE_RATE: process.env.SENTRY_TRACES_SAMPLE_RATE
      ? JSON.stringify(process.env.SENTRY_TRACES_SAMPLE_RATE)
      : JSON.stringify(1.0),
    ENV_SENTRY_ERROR_SAMPLE_RATE: process.env.SENTRY_ERROR_SAMPLE_RATE
      ? JSON.stringify(process.env.SENTRY_ERROR_SAMPLE_RATE)
      : JSON.stringify(1.0),
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
