<template>
  <div class="project">
    <h1>Project h5</h1>
  </div>
</template>

<script>
import qs from 'qs'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'project_h5',
  data() {
    return {
      params: {},
      appVersion: '',
    }
  },
  computed: {
    ...mapState('project', ['project']),
  },
  methods: {
    ...mapActions('project', ['actionTask']),
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      const paramsStr = window.location.search
      const paramsObj = qs.parse(paramsStr, { ignoreQueryPrefix: true })
      if (vm.$store.state.isMobile) {
        vm.actionTask(paramsObj.id)
      } else {
        vm.$router.replace({ name: 'project_pc', query: paramsObj })
      }
    })
  },
  mounted() {},
}
</script>
<style lang="scss" scoped></style>
