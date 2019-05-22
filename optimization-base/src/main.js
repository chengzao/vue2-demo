import 'babel-polyfill'
import Vue from 'vue'

// import scss
import '@assets/css/reset.scss'
import '@assets/css/common.scss'

// import router store
import router from './router'
import store from './store'
import MyLoading from '@@/plugins/myloading'

// import tools
// 自动注册common/global下的组件为全局组件
import './common/componentRegister'

// import main App.vue
import App from './App.vue'

if (process.env.NODE_ENV !== 'production') require('./mock')
Vue.config.productionTip = false

// custom plugins
Vue.use(MyLoading)

router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from)
  next()
})

// use vue
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
