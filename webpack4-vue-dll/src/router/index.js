import Vue from 'vue'
import VueRouter from "vue-router";
Vue.use(VueRouter)
export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/home',
      component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
      // component: Home
    },
    {
      path: '/about',
      component: () => import(/* webpackChunkName: "About" */ '../views/About.vue')
      // component: About
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
