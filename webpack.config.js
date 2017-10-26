const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: resolve(__dirname, 'client'),
  entry: ['./main.js'],
  output: {
    filename: 'main.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(
          ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
              },
              {
                loader: 'sass-loader',
              },
            ],
            fallback: 'style-loader',
          }),
        ),
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|mp4)$/,
        use: 'url-loader',
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new ExtractTextPlugin({ filename: 'styles.css', allChunks: true }),
  ],
};
