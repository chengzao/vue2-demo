export default [
  {
    path: '/project',
    name: 'project_app',
    component: () =>
      import(/* webpackChunkName: "project_app" */ '@views/Project.vue'),
  },
  {
    path: '/project/pc',
    name: 'project_pc',
    component: () =>
      import(
        /* webpackChunkName: "project_pc" */ '@components/project/pc/index.vue'
      ),
  },
  {
    path: '/project/h5',
    name: 'project_h5',
    component: () =>
      import(
        /* webpackChunkName: "project_h5" */ '@components/project/h5/index.vue'
      ),
  },
]
