const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const utils = require('./utils.js')
// dll文件存放的目录
const dllPath = 'static/vendor'

module.exports = {
  mode:'production',
  entry: {
    // 需要提取的库文件
    vendor: ['vue', 'vue-router', 'vuex'],
  },
  output: {
    path: utils.resolve(dllPath),
    filename: '[name].dll.js',
    // vendor.dll.js中暴露出的全局变量名
    // 保持与 webpack.DllPlugin 中名称一致
    library: '[name]_[hash]',
  },
  plugins: [
    // 清除之前的dll文件
    new CleanWebpackPlugin({
      root: path.resolve(utils.resolve(dllPath), '*.*'),
      exclude: [],
      verbose: true,
      dry: false,
    }),
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      path: path.join(utils.resolve(dllPath), '[name]-manifest.json'),
      // 保持与 output.library 中名称一致
      name: '[name]_[hash]',
      context: process.cwd(),
    }),
  ],
}
