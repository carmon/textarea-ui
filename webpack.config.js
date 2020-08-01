const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './index.js',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  mode: 'development',
  module: {
    rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader',
              options: {
                  presets: ['@babel/preset-env', '@babel/preset-react']
              }
          }
        },
        {
          test: /\.css$/,
          use: [
              'style-loader',
              'css-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader'],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader'],
        }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    publicPath: '/dist/js',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};