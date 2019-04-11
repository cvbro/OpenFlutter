const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
//  devtool: 'cheap-module-inline-source-map',
  entry: ["@babel/polyfill", "./src/index.js"],
  plugins: [new HtmlWebpackPlugin({template: './src/index.html'}), new Dotenv()],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|mp4)(\?.*$|$)/, use: ['file-loader'] },
      { test: /\.(css|scss)$/, use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: false,
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('autoprefixer')({ }),
            ]
          }
        },
        {
          loader: 'sass-loader'
        }
      ]},
    ],
  },
}
