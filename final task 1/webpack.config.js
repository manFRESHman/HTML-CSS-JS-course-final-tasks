const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  return {
    devtool: argv.mode === 'production' ? 'none' : 'source-map',
    mode: argv.mode === 'production' ? 'production' : 'development',
    entry: {
      main: './src/app.js'
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: './[name].js',
      library: '[name]',
      libraryTarget: 'var',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(scss|css)$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: [
              {
                loader: 'file-loader',
                options: {
                  esModule: false,
                }
              },
          ],
        },
      ]
    },
    plugins: [
      new CleanWebpackPlugin({
        verbose: true
      }),
      new HtmlWebPackPlugin({
        filename: 'index.html',
        template: './src/views/index.html'
      })
    ]
  }
}