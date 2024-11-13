const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const definitions = {
  CONFIGURATION_SOURCE: JSON.stringify('Caddy'),
}

module.exports = (env) =>
  merge(common(env, definitions), {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          minify: TerserPlugin.uglifyJsMinify,
        }),
        new CssMinimizerPlugin(),
      ],
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react',
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    useBuiltIns: 'usage',
                    corejs: '3.6.5',
                    // debug: true,
                    forceAllTransforms: true,
                    targets: {
                      browsers: [
                        'Chrome >= 45',
                        'Safari >= 10',
                        'iOS >= 10',
                        'Firefox >= 22',
                        'Edge >= 12',
                      ],
                    },
                  },
                ],
              ],
            },
          },
        },
      ],
    },
  })
