const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'js/[name].[hash:8].js',
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
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: false,
            pure_funcs: ['console.log']
          }
        },
        extractComments: /@extract/i,
        parallel: true
      })
    ],
    // chunkIds: 'named',
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
      minify: isProd ? {
        // 删除多余的属性
        removeRedundantAttributes: true,
        // 折叠空白区域
        collapseWhitespace: true,
        // 移除属性的引号
        removeAttributeQuotes: true,
        // 移除注释
        removeComments: true,
        // 省略只有 boolean 值的属性值 例如：readonly checked
        collapseBooleanAttributes: true
      } : {}
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/img/icons', to: 'img/icons' },
        // { from: 'src/assets/fonts/*', to: 'fonts/[name].[hash:8].[ext]', toType: 'template' },
        'src/logo.png', 'src/manifest.json', 'robots.txt'
      ],
      options: {
        concurrency: 100,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
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
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: isProd,
              // removeComments: false,
              // collapseWhitespace: false
            }
          }
        ]
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
