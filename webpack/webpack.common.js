const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const path = require('path')
const alias = require('./webpack.alias')
const Dotenv = require('dotenv-webpack')

module.exports = (env) => {
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
      new Dotenv({
        path: path.resolve(__dirname, '../.env'),
      }),
      new webpack.DefinePlugin({
        'process.env.API_URL_OVERRIDE': JSON.stringify(env.API_URL || ''),
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        minify: {
          collapseWhitespace: true,
        },
      }),
    ],
  }
}
