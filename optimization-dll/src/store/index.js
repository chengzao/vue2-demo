import Vue from 'vue'
import Vuex from 'vuex'

// env
import { isDev } from '../config'

// plugin
import VuexLastingPlugin from './plugin/vuexLastingPlugin'

// normal
import defaultState from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

// modules
import project from './modules/project/project'

// production env
let modules = {
  project,
}
let plugins = []

// 根据环境写入模块或插件
if (!isDev) {
  plugins = [...plugins, VuexLastingPlugin({})]
}

// use vuex
Vue.use(Vuex)

// url: https://vuex.vuejs.org/zh/
export default new Vuex.Store({
  strict: isDev,
  state: defaultState,
  mutations,
  getters,
  actions,
  plugins,
  modules,
})
