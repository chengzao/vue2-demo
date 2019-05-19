<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import tools from '@@/libs/tools'
import { UPDATEPLATFORM } from '@store/constant/types'
export default {
  name: 'App',
  metaInfo: {
    title: 'App Learn',
  },
  mounted() {
    // 判断设备
    this.$store.commit(UPDATEPLATFORM, tools.checkPlatform().isMobile)
  },
}
</script>
