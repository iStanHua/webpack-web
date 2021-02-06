const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SitemapPlugin = require('sitemap-webpack-plugin').default
const WorkboxPlugin = require('workbox-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/app.js',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        // test: /\.scss$/,
        test: /\.s[ac]ss$/i,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: path.resolve(__dirname, 'src/styles/variables.scss')
            }
          }
        ]
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    // new ExtractTextPlugin({
    //   filename: '[name].[contenthash].css',
    //   allChunks: false
    // }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/img/', to: 'img' },
        { from: 'src/assets/fonts/', to: 'fonts' },
        'src/logo.png', 'src/manifest.json'
      ]
    }),
    // // 防止重复
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common'
    // }),
    // new WorkboxPlugin.GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true,
    //   runtimeCaching: [{ urlPattern: new RegExp('/'), handler: 'staleWhileRevalidate' }]
    // }),
    // new SitemapPlugin('https://stanyuan.com', ['/'])
  ],
  optimization: {
    chunkIds: 'named',
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    }
  },
  devServer: {
    open: true,
    port: 9095,
    hot: true,
    contentBase: __dirname + '/src'
  }
}
