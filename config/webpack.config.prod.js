const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "production",
  entry: {
    index: './src/index.js'
  },
  output:{
    filename: '[name]-[contenthash:6].js',
    path: path.resolve(__dirname, '../', 'dist'),
    publicPath: './'
  },
  module: {
    rules: [{
      test: /\.(jpg|jpeg|png|gif|svg)$/,
      use: 'file-loader',
    },
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader']
    },
    {
      test: /\.(sass|scss)$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
         title: "Stat Tools",
         template: './src/templates/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:6].css'
    })
  ]
}