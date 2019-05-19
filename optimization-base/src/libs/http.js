import 'babel-polyfill'
import axios from 'axios'
import { baseURL } from '@@/config'
import store from '@store/index'
import { ISLOADING } from '@store/constant/types'
import vm from '@@/libs/vm'

// axios-retry
// 创建axios实例 axiso的一些基础参数配置,
const instance = axios.create({
  baseURL,
  timeout: 10000, // 超时时间
})

// 请求次数
instance.defaults.retry = 4
// 请求的间隙
instance.defaults.retryDelay = 100

instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

let queue = {}

let distroy = function(url) {
  delete queue[url]
  if (!Object.keys(queue).length) {
    // loading hide
    vm.$MyLoading(false)
    store.commit(ISLOADING, false)
  }
}

// 传参拦截器
instance.interceptors.request.use(
  function(config) {
    //  打开loadding
    store.commit(ISLOADING, true)
    vm.$MyLoading(true)
    queue[config.url] = true
    return config
  },
  function(error) {
    // 处理错误信息
    store.commit(ISLOADING, false)
    vm.$MyLoading(false)
    return Promise.reject(error)
  },
)

/* 添加响应拦截器 */
instance.interceptors.response.use(
  function(response) {
    /* 对响应数据做些事 */
    distroy(response.config.url)
    return Promise.resolve(response)
  },
  function(error) {
    /* 请求错误时做些事 */
    // 请求超时的之后，抛出 error.code = ECONNABORTED的错误..错误信息是 timeout of  xxx ms exceeded
    if (
      error.code == 'ECONNABORTED' &&
      error.message.indexOf('timeout') != -1
    ) {
      var config = error.config
      config.__retryCount = config.__retryCount || 0

      if (config.__retryCount >= config.retry) {
        // Reject with the error
        // window.location.reload();
        distroy(error.config.url)
        return Promise.reject(error)
      }

      // Increase the retry count
      config.__retryCount += 1

      // Create new promise to handle exponential backoff
      var backoff = new Promise(function(resolve) {
        setTimeout(function() {
          // console.log('resolve');
          resolve()
        }, config.retryDelay || 1)
      })

      return backoff.then(function() {
        return instance(config)
      })
    } else {
      distroy(error.config.url)
      return Promise.reject(error)
    }
  },
)

export default instance
