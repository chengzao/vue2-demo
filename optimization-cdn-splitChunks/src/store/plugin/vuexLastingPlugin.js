/**
 * VuexLastingPlugin
 * @url https://gist.github.com/jrainlau/36ba8bb88f6940316044d3c35f5a370e
 * @desc Store vuex states in storage
 * @author JrainLau jrainlau@gmail.com
 *
 * @param {Object} options options
 * @param {String|Array} options.watch the state to store
 * @param {Boolean} options.debug debug mode
 * @param {Boolean} options.autoInit init state from storage automatically
 * @param {Object} option.storage store state in localStorage (in default) or sessionStorage
 * @param {String} options.storageKey item key in storage
 *
 * @example store = { plugins: [VuexLastingPlugin({})], state: {}, mutations: {}, actions: {} }
 */

import { isDev } from '@@/config'

// Plugin
function getObjDeepValue(obj, keysArr) {
  let val = obj
  keysArr.forEach(key => {
    val = val[key]
  })
  return val
}

function setObjDeepValue(obj, keysArr, value) {
  let key = keysArr.shift()
  if (keysArr.length) {
    setObjDeepValue(obj[key], keysArr, value)
  } else {
    obj[key] = value
  }
}
/* eslint-disable */
function logger(msg) {
  isDev
    ? console.log(
        `%c vuex-lasting-plugin %c ${msg} %c`,
        'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
        'background:transparent',
      )
    : console.clear()
}
/* eslint-enable */

const VuexLastingPlugin = function({
  watch = '*',
  debug = true,
  autoInit = true,
  storage = localStorage,
  storageKey = 'VuexLastingData',
}) {
  return store => {
    if (autoInit) {
      const localState = JSON.parse(storage && storage.getItem(storageKey))
      const storeState = store.state
      if (localState) {
        Object.keys(localState).forEach(key => {
          // deep_a.b.c 形式的值会被赋值到 state.a.b.c 中
          if (key.includes('deep_')) {
            let keysArr = key.replace('deep_', '').split('.')
            setObjDeepValue(storeState, keysArr, localState[key])
            delete localState[key]
          }
        })
        // 通过 Vuex 内置的 store.replaceState 方法修改 store.state
        store.replaceState({ ...storeState, ...localState })
        logger('States were init from localStorage.')
      }
    }

    store.subscribe((mutation, state) => {
      let watchedDatas = {}
      // 如果为全选，则持久化整个 state
      // 否则将只持久化被列出的 state
      if (watch === '*') {
        watchedDatas = state
      } else {
        watch.forEach(data => {
          if (data.split('.').length > 1) {
            watchedDatas[`deep_${data}`] = getObjDeepValue(
              state,
              data.split('.'),
            )
          } else {
            watchedDatas[data] = state[data]
          }
        })
      }
      if (debug) {
        logger('The states below were stored.')
        // console.log(watchedDatas)
      }
      // 通过 localStorage 持久化
      storage && storage.setItem(storageKey, JSON.stringify(watchedDatas))
    })
  }
}

export default VuexLastingPlugin
