import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App'

import 'assets/css/app.styl'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
