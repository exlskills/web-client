/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path')
const webpack = require('webpack')
const atLoader = require('awesome-typescript-loader')
require('dotenv').config() // Initializes environment variables from .env file

module.exports = options => ({
  entry: options.entry,
  output: Object.assign(
    {
      // Compile into js/build.js
      path: path.resolve(process.cwd(), 'build'),
      publicPath: '/learn/'
    },
    options.output
  ), // Merge with env dependent settings
  module: {
    loaders: [
      {
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: options.babelQuery
      },
      {
        // Do not transform vendor's CSS with CSS-modules
        // The point is that they remain in global scope.
        // Since we require these CSS files in our JS or CSS files,
        // they will be a part of our compilation either way.
        // So, no need for ExtractTextPlugin here.
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(jpg|png|gif)$/,
        loaders: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(mp4|webm)$/,
        loader: 'url-loader',
        query: {
          limit: 10000
        }
      },
      {
        test: /\.tsx?$/,
        loaders: ['react-hot-loader', 'awesome-typescript-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: options.plugins.concat([
    new atLoader.CheckerPlugin(),
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      $: 'jquery'
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        CLIENT_URL: JSON.stringify(
          process.env.CLIENT_URL || 'http://localhost:4000'
        ),
        API_BASE_URL: JSON.stringify(
          process.env.API_BASE_URL || 'http://localhost:8080'
        ),
        WS_URL: JSON.stringify(
          process.env.WS_URL || 'ws://localhost:5001/v0/wsenv'
        ),
        WS_USI_URL: JSON.stringify(
          process.env.WS_USI_URL || 'ws://localhost:5002/v0/wsusi'
        ),
        API_PATH: JSON.stringify(process.env.API_PATH || '/api/v0'),
        GRAPHQL_BASE_URL: JSON.stringify(
          process.env.GRAPHQL_BASE_URL || 'http://localhost:8080'
        ),
        GRAPHQL_PATH: JSON.stringify(process.env.GRAPHQL_PATH || '/graphql'),
        EDITOR_BASE_URL: JSON.stringify(
          process.env.EDITOR_BASE_URL || 'http://localhost:8081'
        ),
        AUTH_BASE_URL: JSON.stringify(
          process.env.AUTH_BASE_URL || 'http://localhost:3030'
        ),
        IC_APP_ID: JSON.stringify(process.env.IC_APP_ID || ''),
        ACCOUNTS_URL: JSON.stringify(process.env.ACCOUNTS_URL || ''),
        SUPPORT_CONSOLE_URL: JSON.stringify(
          process.env.SUPPORT_CONSOLE_URL || ''
        ),
        PRIVACY_POLICY_AND_TOS_URL: JSON.stringify(
          process.env.PRIVACY_POLICY_AND_TOS_URL || ''
        ),
        ERASE_MY_DATA_FORM_URL: JSON.stringify(
          process.env.ERASE_MY_DATA_FORM_URL || ''
        ),
        STRIPE_PUB_KEY: JSON.stringify(process.env.STRIPE_PUB_KEY || '')
      }
    }),
    new webpack.NamedModulesPlugin()
  ]),
  resolve: {
    modules: [
      path.resolve(__dirname, '../../app'),
      path.resolve(__dirname, '../../node_modules')
    ],
    alias: {
      moment$: 'moment/moment.js'
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.woff'],
    mainFields: ['browser', 'jsnext:main', 'main']
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  node: {
    fs: 'empty'
  },
  performance: options.performance || {}
})
