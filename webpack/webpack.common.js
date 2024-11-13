const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const alias = require('./webpack.alias')

module.exports = (env, definitions) => ({
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
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
    new CleanWebpackPlugin(),
    new CompressionPlugin(),
    new webpack.DefinePlugin({
      BUILD_DATE: JSON.stringify(
        new Date().toLocaleString('en-CA', { timeZone: 'America/Vancouver' }),
      ),
      ...definitions,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      templateParameters: {
        BUILD_DATE: env.BUILD_DATE,
        CONFIGURATION_SOURCE: definitions.CONFIGURATION_SOURCE,
      },
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
})
