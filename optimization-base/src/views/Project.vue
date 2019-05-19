<template>
  <div class="Project">
    <router-view />
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'Project',
  components: {},
  data() {
    return {}
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      console.log('project')
      const paramsStr = window.location.search
      const paramsObj = qs.parse(paramsStr, { ignoreQueryPrefix: true })
      if (vm.$store.state.isMobile) {
        vm.$router.replace({ name: 'project_h5', query: paramsObj })
      } else {
        vm.$router.replace({ name: 'project_pc', query: paramsObj })
      }
    })
  },
  methods: {},
  mounted() {},
}
</script>
