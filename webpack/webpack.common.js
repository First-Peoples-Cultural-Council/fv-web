const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')
const alias = require('./webpack.alias')

const getEnvVariables = (env) => ({
  ENV_API_URL: env?.API_URL
    ? JSON.stringify(env.API_URL)
    : JSON.stringify('/api/1.0/'),
  ENV_APP_ENV: env?.APP_ENV ? JSON.stringify(env.APP_ENV) : JSON.stringify(''),
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
})

module.exports = (env) => {
  const envVariables = getEnvVariables(env)

  return {
    cache: {
      compression: 'gzip',
      type: 'filesystem',
      cacheDirectory: path.resolve(__dirname, '.node-cache'),
      name: 'build-cache',
      maxAge: 43200000,
    },
    entry: './src/index',
    resolve: {
      alias,
      extensions: ['.jsx', '.js', '.json'],
    },
    // https://webpack.js.org/configuration/performance/
    performance: {
      hints: 'warning',
    },
    output: {
      filename: '[name].[contenthash].js',
      path: alias.dist,
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
              plugins: [['@babel/plugin-transform-runtime', { corejs: 3 }]],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new CompressionPlugin(),
      new webpack.DefinePlugin({
        BUILD_DATE: JSON.stringify(
          new Date().toLocaleString('en-CA', { timeZone: 'America/Vancouver' }),
        ),
        ...envVariables,
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        templateParameters: {
          BUILD_DATE: env.BUILD_DATE,
        },
        minify: {
          collapseWhitespace: true,
        },
      }),
    ],
  }
}
