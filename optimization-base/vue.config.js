const webpack = require('webpack')
const path = require('path')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const TerserPlugin = require('terser-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const API_URL = process.env.API_URL || 'http://localhost'
const OUTPUT_DIR = process.env.VUE_APP_DIR || 'dist'
const PUBLICPATH = process.env.NODE_ENV == 'production' ? OUTPUT_DIR : '/'
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  publicPath: PUBLICPATH,
  productionSourceMap: false, // 生产环境的 source map
  outputDir: OUTPUT_DIR,
  parallel: require('os').cpus().length > 1,
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
    overlay: true,
    proxy: {
      '/api': {
        target: API_URL,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  css: {
    modules: false,
    extract: process.env.NODE_ENV === 'production',
    sourceMap: false,
    loaderOptions: {
      sass: {
        // 向全局sass样式传入共享的全局变量
        data: `@import "@assets/css/lib/_varible.scss";`,
      },
    },
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      const plugins = []
      plugins.push(
        new PurgecssPlugin({
          paths: glob.sync([
            path.join(__dirname, './src/index.html'),
            path.join(__dirname, './**/*.vue'),
            path.join(__dirname, './src/**/*.js'),
          ]),
        }),
      )
      plugins.push(
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true, // Must be set to true if using source-maps in production
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
          },
        }),
      )
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false,
        }),
      )
      plugins.push(
        new webpack.DllReferencePlugin({
          context: process.cwd(),
          manifest: require('./public/vendor/vendor-manifest.json'),
        }),
        // 将 dll 注入到 生成的 html 模板中
        new AddAssetHtmlPlugin({
          // dll文件位置
          filepath: path.resolve(__dirname, './public/vendor/*.js'),
          // dll 引用路径
          publicPath: `/${OUTPUT_DIR}/vendor`,
          // dll最终输出的目录
          outputPath: './vendor',
        }),
      )
      config.plugins = [...config.plugins, ...plugins]
    }
    if (process.env.NODE_ENV === 'development') {
      /**
       * 关闭host check
       */
      config.devServer = {
        disableHostCheck: true,
      }
      config.devtool = 'source-map'
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@api', resolve('src/api'))
      .set('@store', resolve('src/store'))
    config.resolve.symlinks(true)

    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimize(true)
      config.optimization.splitChunks({
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            test: /node_modules/,
            name: 'vendor',
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100,
          },
          common: {
            chunks: 'initial',
            name: 'common',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60,
          },
          styles: {
            name: 'styles',
            test: /\.(sa|sc|c)ss$/,
            chunks: 'initial',
            enforce: true,
          },
          runtimeChunk: {
            name: 'manifest',
          },
        },
      })
      // config.module
      //   .rule('images')
      //   .use('image-webpack-loader')
      //   .loader('image-webpack-loader')
      //   .options({
      //     mozjpeg: { progressive: true, quality: 65 },
      //     optipng: { enabled: false },
      //     pngquant: { quality: '65-90', speed: 4 },
      //     gifsicle: { interlaced: false },
      //     webp: { quality: 75 },
      //   })
      // 删除预加载
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
    }
    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
}
