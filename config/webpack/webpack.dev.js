const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const ADDRESS = 'http://127.0.0.1:8080';
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

module.exports = {
  entry: [
    'babel-polyfill',
    `webpack-dev-server/client?${ADDRESS}`,
    'webpack/hot/only-dev-server',
    path.resolve(process.cwd(), 'src/index.js'),
  ],

  output: {
    path: path.resolve(process.cwd(), 'build'),
    filename: 'app.js',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
    ],
  },

  // from `webpack-dev-server` module
  devServer: {
    contentBase: PUBLIC_DIR,
    inline: true, // embed the webpack-dev-server runtime into the bundle
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BrowserSyncPlugin({
      proxy: ADDRESS,
    }, { // Plugin options
      reload: false,
    }),
  ],
};
