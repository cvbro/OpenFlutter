const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'inline-source-map',
  plugins: [new HtmlWebpackPlugin()]
}
