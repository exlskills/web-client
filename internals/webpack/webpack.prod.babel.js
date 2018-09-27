// Important modules this config uses
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = require('./webpack.base.babel')({
  // In production, we skip all hot-reloading stuff
  entry: {
    app: [path.join(process.cwd(), 'app/app.tsx')],
    charts: ['recharts'],
    misc_vend: ['jquery', 'immutable', 'remarkable'],
    react: ['react-relay', 'react-intl', 'react-redux', 'relay-runtime'],
    theme: ['@blueprintjs/core'],
    transl: ['moment']

    // lodash: ['lodash'] note - multiple versions of Lodash are being used
  },

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },

  plugins: [
    new BundleAnalyzerPlugin({
      // analyzerMode: 'static'
      analyzerMode: 'disable',
      generateStatsFile: true,
      statsFilename: '../bundle_report/stats.json'
    }),
    // new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['charts', 'misc_vend', 'react', 'theme', 'transl'],
      minChunks: Infinity
      // children: true
      // minChunks: 2,
      // async: true
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),

    // new LodashModuleReplacementPlugin({
    //   paths: true
    // }),

    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),

    // Put it in the end to capture all the HtmlWebpackPlugin's
    // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/learn/',

      // No need to cache .htaccess. See http://mxs.is/googmp,
      // this is applied before any match in `caches` section
      excludes: ['.htaccess'],

      caches: {
        main: [':rest:'],

        // All chunks marked as `additional`, loaded after main section
        // and do not prevent SW to install. Change to `optional` if
        // do not want them to be preloaded at all (cached only when first loaded)
        additional: ['*.chunk.js']
      },

      // Removes warning for about `additional` section usage
      safeToUseOptionalCaches: true,

      AppCache: false
    })
  ],

  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename)
  }
})
