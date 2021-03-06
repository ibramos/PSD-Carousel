/* eslint global-require:0 */
/* eslint import/no-extraneous-dependencies:0 */

const { resolve } = require('path');
const webpack = require('webpack');

const { DefinePlugin } = webpack;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: resolve(__dirname, 'client'),
  entry: ['./main.js'],
  output: {
    filename: 'main.js',
    path: resolve(__dirname, 'dist'),
  },
  devtool: false,
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
        use: ExtractTextPlugin.extract({
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
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        use: 'url-loader',
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new UglifyJsPlugin({
      sourceMap: false,
    }),
    new ExtractTextPlugin({ filename: 'styles.css', allChunks: true }),
  ],
};
