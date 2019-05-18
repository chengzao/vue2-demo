let routes = []

// 未匹配到路由配置
const NotFoundRoute = [
  {
    path: '*',
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "notFound" */ '@views/NotFound.vue'),
  },
]

// 自动引入router目录下文件夹内的index.js文件（例：project/index.js）
const routerContext = require.context('./', true, /index\.js$/)
routerContext.keys().forEach(route => {
  // 如果是根目录的 index.js 、不处理
  if (route.startsWith('./index')) {
    return
  }
  const routerModule = routerContext(route)
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  routes = [...routes, ...(routerModule.default || routerModule)]
})

// 未匹配到路由的配置
routes = [...routes, ...NotFoundRoute]

export default routes
