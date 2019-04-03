const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
//  devtool: 'cheap-module-inline-source-map',
  entry: ["@babel/polyfill", "./src/index.js"],
  plugins: [new HtmlWebpackPlugin(), new Dotenv()],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/, use: ['file-loader'] },
      { test: /\.(css|scss)$/, use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: false,
          }
        },
        {
          loader: 'sass-loader'
        }
      ]},
    ],
  },
}
