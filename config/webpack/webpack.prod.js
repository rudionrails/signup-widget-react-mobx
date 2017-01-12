const path = require('path');
/**
* Extract text files
*/
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractStyles = new ExtractTextPlugin('[name].css');

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve(process.cwd(), 'src/index.js'),
  ],

  output: {
    path: path.resolve(process.cwd(), 'build'),
    filename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        test: /\.scss$/,
        loader: extractStyles.extract('style-loader', 'css-loader!sass-loader'),
      },
    ],
  },

  plugins: [
    extractStyles,
  ],
};
