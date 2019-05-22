import qs from 'qs'
import instance from '@@/libs/http'
/**
 * get方法，对应get请求
 * @param {String} url
 * @param {Object} config
 */
export const get = function(url, config = {}) {
  return new Promise(function(resolve, reject) {
    instance
      .get(url)
      .then(function(res) {
        resolve(res)
      })
      .catch(function(err) {
        reject(err)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url
 * @param {Object} data
 * @param {Object} config
 */
export const post = function(url, data = {}, config = {}) {
  return new Promise(function(resolve, reject) {
    instance
      .post(url, qs.stringify(data), config)
      .then(function(res) {
        resolve(res)
      })
      .catch(function(err) {
        reject(err)
      })
  })
}
