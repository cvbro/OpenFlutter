const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
//  devtool: 'cheap-module-inline-source-map',
  entry: ["@babel/polyfill", "./src/index.js"],
  plugins: [new HtmlWebpackPlugin()],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/, use: ['file-loader'] },
      { test: /\.scss$/, use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            includePaths: [
              path.resolve(__dirname, 'node_modules/@fortawesome/fontawesome-free/scss')
            ]
          }
        }
      ]},
    ],
  },
}
