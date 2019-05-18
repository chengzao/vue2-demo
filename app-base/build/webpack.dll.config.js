const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    vue: ['vue', 'vue-router', 'vuex'],
    ui: ['element-ui'],
    axios: ['axios']
  },
  output: {
    path: path.join(__dirname, '../static/dll'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../static/dll/', '[name]-manifest.json'),
      name: '[name]'
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
