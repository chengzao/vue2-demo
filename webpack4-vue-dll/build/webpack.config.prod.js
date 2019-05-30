'use strict'

const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const path = require('path')

console.log('process.cwd() : ',process.cwd());

module.exports = merge(baseConfig, {
  mode: 'production',
  // devtool: 'cheap-module-source-map',
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },
    minimizer: [
      new TerserPlugin({
        exclude: /\/node_modules/,
        cache: true,
        parallel: true,
        sourceMap: false, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      }),
    ],
    // splitChunks: {
    //   cacheGroups: {
    //     commons: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: "vendor",
    //       chunks: "all",
    //     },
    //   },
    // },
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'css-loader'
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'css-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require('../static/vendor/vendor-manifest.json'),
    }),
    // 将 dll 注入到 生成的 html 模板中
    new AddAssetHtmlPlugin({
      // dll文件位置
      filepath: path.resolve(__dirname, '../static/vendor/*.js'),
      // dll 引用路径
      publicPath: `vendor`,
      // dll最终输出的目录
      outputPath: './vendor',
    }),
  ]
})
