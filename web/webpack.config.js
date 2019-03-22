const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'inline-source-map',
  entry: ["@babel/polyfill", "./src/index.js"],
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ],
  },
}
