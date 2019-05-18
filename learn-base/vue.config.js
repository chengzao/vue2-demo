const path = require('path')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const API_URL = process.env.API_URL || 'http://localhost'
const OUTPUT_DIR = process.env.VUE_APP_DIR || 'dist'
const PUBLICPATH = process.env.NODE_ENV == 'production' ? OUTPUT_DIR : '/'

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
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'], // 移除console
            },
          },
          sourceMap: false,
          parallel: true,
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
        chunks: 'all',
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
