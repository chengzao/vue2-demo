export default {
  getUrlParam(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    // var r = window.location.search.substr(1).match(reg);
    // 用decodeURI解决url中文问题
    var url = decodeURI(window.location.search)
    var r = url.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
  },
  isMobile() {
    var isMobile = false
    // 判断是pc还是移动端
    var system = {
      win: false,
      mac: false,
      x11: false,
    }
    // 检测平台
    var p = navigator.platform
    system.win = p.indexOf('Win') === 0
    system.mac = p.indexOf('Mac') === 0
    system.x11 = p === 'X11'

    system.ipad = p === 'iPad'

    // 跳转语句
    if (!system.win && !system.mac && !system.x11 && !system.ipad) {
      isMobile = true
    }
    return isMobile
  },
  serilizeUrl(url) {
    var urlObject = {}
    if (/\?/.test(url)) {
      var urlString = url.substring(url.indexOf('?') + 1)
      var urlArray = urlString.split('&')
      for (var i = 0, len = urlArray.length; i < len; i++) {
        var urlItem = urlArray[i]
        var item = urlItem.split('=')
        if (
          item.length == 2 &&
          item[0] != '' &&
          item[0] != '""' &&
          item[0] != '"'
        ) {
          urlObject[item[0]] = encodeURIComponent(item[1])
        }
      }
      return urlObject
    }
    return {}
  },
  // 判断是否是移动端
  checkPlatform() {
    var utils = {}
    var isBudge = (function() {
      // 手持设备：ipad、iphone、android、ipod
      return /mobile/i.test(navigator.userAgent)
    })()
    var isMac = (function() {
      return /macintosh/i.test(navigator.userAgent)
    })()
    var isWindows = (function() {
      return /windows nt/i.test(navigator.userAgent)
    })()
    var isLinux = (function() {
      return /linux/i.test(navigator.userAgent)
    })()
    var isIpad = (function() {
      return /ipad/i.test(navigator.userAgent)
    })()
    utils.isWeiXin = function() {
      var ua = navigator.userAgent.toLowerCase()
      return (
        /micromessenger/i.test(ua) ||
        typeof navigator.wxuserAgent !== 'undefined'
      )
    }
    utils.isMobile = !(isWindows || isMac || (isLinux && !isBudge) || isIpad)
    return utils
  },
  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  formateCn(y) {
    let cnArr = [
      '零',
      '一',
      '二',
      '三',
      '四',
      '五',
      '六',
      '七',
      '八',
      '九',
      '十',
    ]
    let result = ''
    let str = String(y)
    for (let i = 0; i < str.length; i++) {
      result += cnArr[str[i]]
    }
    return result
  },
  // 格式化时间: '2019/4/22 14:40:00' || 时间戳
  formateDate(date) {
    let dateTime = new Date(date)
    let weeks = ['日', '一', '二', '三', '四', '五', '六']

    let o = {
      timeStamp: date,
      year: dateTime.getFullYear(), // 年
      yearStr: this.formateCn(dateTime.getFullYear()), // 年
      month: dateTime.getMonth() + 1, // 月份
      monthStr: this.formatNumber(dateTime.getMonth() + 1), // 月份
      day: dateTime.getDate(), // 日
      dayStr: this.formatNumber(dateTime.getDate()), // 日
      hour: dateTime.getHours(), // 小时
      hourStr: this.formatNumber(dateTime.getHours()), // 小时
      minute: dateTime.getMinutes(), // 分
      minuteStr: this.formatNumber(dateTime.getMinutes()), // 分
      second: dateTime.getSeconds(), // 秒
      secondStr: this.formatNumber(dateTime.getSeconds()), // 秒
      quarter: Math.floor((dateTime.getMonth() + 3) / 3), // 季度
      week: dateTime.getDay(), // 星期
      weekStr: weeks[dateTime.getDay()],
      millisecond: dateTime.getMilliseconds(), // 毫秒
    }
    let days = new Date(o.year, o.month, 0).getDate()
    o['days'] = days
    return o
  },
  deepClone(obj) {
    if (typeof obj !== 'object') return obj
    if (typeof window !== 'undefined' && window.JSON) {
      // 浏览器环境下 并支持window.JSON 则使用 JSON
      return JSON.parse(JSON.stringify(obj))
    } else {
      var newObj = obj.constructor === Array ? [] : {}
      for (var key in obj) {
        newObj[key] =
          typeof obj[key] === 'object' ? this.deepClone(obj[key]) : obj[key]
      }
      return newObj
    }
  },
}
