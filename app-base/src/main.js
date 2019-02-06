// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Meta from 'vue-meta'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'

import createRouter from './router/router'
import createStore from './store'

import MyNotification from './components/notification'
import Tabs from './components/tabs'
import MyNotify from './plugins/notify'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)
Vue.use(ElementUI)

Vue.use(MyNotification)
Vue.use(Tabs)
Vue.use(MyNotify)

const router = createRouter()
const store = createStore()

store.registerModule('c', {
  state: {
    text: 3
  }
})

// store.watch((state) => state.count + 1, (newCount) => {
//   console.log('new count watched:', newCount)
// })

// store.subscribe((mutation, state) => {
//   console.log(mutation.type)
//   console.log(mutation.payload)
// })

store.subscribeAction((action, state) => {
  console.log(action.type)
  console.log(action.payload)
})

router.beforeEach((to, from, next) => {
  console.log('app before each invoked')
  next()
  // if (to.fullPath === '/app') {
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }
})

router.beforeResolve((to, from, next) => {
  console.log('app before resolve invoked')
  next()
})

router.afterEach((to, from) => {
  console.log('app after each invoked')
})

// Vue.directive('focus', {
//   inserted: function (el) {
//     el.focus()
//   }
// })

// Vue.filter('Myfilter', function (value) {
//   if (!value) return ''
//   value = value.toString()
//   return value.charAt(0).toUpperCase() + value.slice(1)
// })

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
