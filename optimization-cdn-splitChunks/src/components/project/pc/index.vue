<template>
  <div class="project">
    <h1>Project pc</h1>
  </div>
</template>

<script>
import qs from 'qs'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'project_pc',
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
        vm.$router.replace({ name: 'project_h5', query: paramsObj })
      } else {
        vm.actionTask(paramsObj.id)
      }
    })
  },
  mounted() {},
}
</script>
<style lang="scss" scoped></style>
