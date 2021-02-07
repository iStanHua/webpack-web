const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { GenerateSW } = require('workbox-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
  entry: './src/app.js',
  output: {
    filename: '[name].[hash:8].js',
    path: resolve('dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.html', '.json'],
    alias: {
      '@': resolve('src'),
    }
  },
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
        },
        styles: {
          name: 'main',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        }
      }
    }
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/img/icons', to: 'img/icons' },
        // { from: 'src/assets/fonts/*', to: 'fonts/[name].[hash:8].[ext]', toType: 'template' },
        'src/logo.png', 'src/manifest.json'
      ],
      options: {
        concurrency: 100,
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[id].[hash:8].css',
    }),
    // new GenerateSW({
    //   clientsClaim: true,
    //   skipWaiting: true
    // })
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
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
              resources: resolve('src/styles/variables.scss')
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext]',
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:8][ext]',
        }
      },
    ]
  },
  devServer: {
    open: true,
    port: 9095,
    hot: true,
    historyApiFallback: true,
    contentBase: __dirname + '/src'
  }
}
