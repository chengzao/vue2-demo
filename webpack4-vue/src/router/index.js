import Vue from 'vue'
import VueRouter from "vue-router";
Vue.use(VueRouter)

const Markdown = () => import(/* webpackChunkName: "Markdown" */ 'components/markdown.md')
const Home = () => import(/* webpackChunkName: "Markdown" */ '@views/Home.vue')
const About = () => import(/* webpackChunkName: "Markdown" */ '@views/About.vue')

export default new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/home',
      component: Home
      // component: Home
    },
    {
      path: '/about',
      component: About
      // component: About
    },
    {
      path: '/md',
      name: 'Markdown',
      component: Markdown
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
