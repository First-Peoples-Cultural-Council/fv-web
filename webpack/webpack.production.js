const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = (env) => {
  return merge(common(env), {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
      minimize: true,
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
                    corejs: '3.39',
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
}
