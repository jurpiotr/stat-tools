const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  mode: "development",
  entry: {
    index: './src/index.js'
  },
  output:{
    filename: '[name].js',
    path: path.resolve(__dirname, '../', 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../', 'public')
  },
  module: {
    rules: [{
      test: /\.(jpg|jpeg|png|gif|svg)$/,
      loader: 'file-loader',
      options: {
           name: '[name]-[contenthash:6].[ext]',
           outputPath: 'images'
      },
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(sass|scss)$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
         title: "Stat Tools",
         template: './src/templates/index.html'
    }),
    new CleanWebpackPlugin()
  ]
}