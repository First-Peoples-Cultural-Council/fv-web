const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

/**
 * For testing with external devices (or Dev Tools connected to a physical device):
 * Option 1: Change `localhost` (proxy -> target, output -> publicPath) to your local IP to access from other devices on your network
 * Option 2: Use a service such as ngrok to create a tunnel to localhost, and Nuxeo (update URLs to ngrok URLs)
 */

module.exports = (env) => {
  const definitions = {
    CONFIGURATION_SOURCE: JSON.stringify('Webpack'),
    ENV_API_URL:
      env && env.API_URL
        ? JSON.stringify(env.API_URL)
        : JSON.stringify('/api/1.0/'),
    ENV_V1_API_URL:
      env && env.V1_API_URL
        ? JSON.stringify(env.V1_API_URL)
        : JSON.stringify('/nuxeo/api/v1/'),
    ENV_AWS_CLIENT_ID: process.env.AWS_CLIENT_ID
      ? JSON.stringify(process.env.AWS_CLIENT_ID)
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
      proxy: [
        {
          context: ['/nuxeo/**', '!/nuxeo/app/**'],
          target: 'https://preprod.firstvoices.com',
          changeOrigin: true,
          secure: false,
          cookieDomainRewrite: {
            '*': 'localhost',
          },
          auth: `${process.env.NUXEO_V2_USER}:${process.env.NUXEO_V2_PASSWORD}`,
        },
      ],
    },
    output: {
      publicPath: 'https://localhost:3000/',
    },
  })
}
