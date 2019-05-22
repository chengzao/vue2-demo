import Vue from 'vue'
import Router from 'vue-router'

// import 路由配置
import routes from './routes'

// base dir
import { OUPUTDIR } from '@/config'

// use
Vue.use(Router)

// url: https://router.vuejs.org/zh/
export default new Router({
  mode: 'history',
  routes,
  base: '/' + OUPUTDIR,
})
