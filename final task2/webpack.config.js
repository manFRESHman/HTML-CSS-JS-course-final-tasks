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
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader'],
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
      }),
      new HtmlWebPackPlugin({
        filename: 'weather.html',
        template: './src/views/weather.html'
      }),
      new HtmlWebPackPlugin({
        filename: 'comparison.html',
        template: './src/views/comparison.html'
      }),
      new HtmlWebPackPlugin({
        filename: 'calendar.html',
        template: './src/views/calendar.html'
      }),
      new HtmlWebPackPlugin({
        filename: 'tree.html',
        template: './src/views/tree.html'
      }),
      new HtmlWebPackPlugin({
        filename: 'WYSIWYG.html',
        template: './src/views/WYSIWYG.html'
      }),
      new HtmlWebPackPlugin({
        filename: 'test.html',
        template: './src/views/test.html'
      }),
    ]
  }
}