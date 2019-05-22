const fallback = require('express-history-api-fallback')
const proxy = require('http-proxy-middleware')
const express = require('express')
const path = require('path')
const open = require('open')
const { networkInterfaces } = require('os')
const compression = require('compression')
// 获取.env 的环境变量
const dotenv = require('dotenv')
dotenv.config()

// 获取本机ip
let getIPAdress = function() {
  let interfaces = networkInterfaces()
  for (let devName in interfaces) {
    let iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i]
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address
      }
    }
  }
}

const app = express()

// eslint-disable-next-line no-path-concat
const root = path.join(__dirname + '/')
const OUPUTDIR = process.env.VUE_APP_DIR || 'dist'

// static
app.use(compression())
app.use(express.static(root))
const PROXY_URL = process.env.API_URL || 'http://localhost'

// 将服务器代理到localhost:8080端口上
const apiProxy = proxy('/api', {
  target: PROXY_URL,
  secure: false,
  pathRewrite: {
    '^/api': '',
  },
  changeOrigin: true,
})

// api子目录下的都是用代理
app.use('/api/*', apiProxy)

// html5 history
// eslint-disable-next-line no-path-concat
app.use(fallback('index.html', { root: __dirname + '/' + OUPUTDIR }))

// server
app.listen(80, function() {
  const ip = getIPAdress()
  const openUrl = `http://${ip}`
  open(openUrl) // 打开本机默认浏览器
  console.log(`server start: ${openUrl}`)
})
