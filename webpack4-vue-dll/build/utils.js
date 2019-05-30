'use strict'

const path = require('path')

module.exports = {
  resolve: function (dir) {
    return path.join(__dirname, '..', dir)
  },

  assetsPath: function (_path) {
    const assetsSubDirectory = 'static'
    return path.join(assetsSubDirectory, _path)
  },
  host: '0.0.0.0',
  port: 8080
}
