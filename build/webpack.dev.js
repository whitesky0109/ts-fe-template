const path = require('path');
const baseWebpackConfig = require('./webpack.base');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = Object.assign(baseWebpackConfig, {
  mode: 'development',

  entry: {
    app: ['webpack-dev-server/client?http://localhost:4444', './app.ts',],
    style: './sass/index.scss',
  },

  devtool: 'eval-source-map',

  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },

  output: {
    path: path.resolve(__dirname, '..' ,'public/public'),
    filename: '[name].[hash].js',
    publicPath: '/',
    pathinfo: false,
  },

  devServer: {
    publicPath: '/',
    hot: true,
    port: 4444,
    proxy: {
      '!/public/': 'http://localhost:3000',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              plugins: [
                [require('@rtsao/plugin-proposal-class-properties'), { loose: true }],
                '@babel/plugin-syntax-dynamic-import', // needed for `() => import()` in routes.ts
              ],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: { browsers: 'last 3 versions' },
                    useBuiltIns: 'entry',
                  },
                ],
                '@babel/preset-typescript',
              ],
            },
          },
        ],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          {
            loader: 'postcss-loader',
            options: {
              config: { path: __dirname + '/postcss.config.js' },
            },
          },
          {
            loader: 'sass-loader'
          }
        ],
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: [{
          loader: 'file-loader',
        }]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../views/user.html'),
      template: path.resolve(__dirname, '../src/user.template.html'),
      inject: 'body',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  
});
