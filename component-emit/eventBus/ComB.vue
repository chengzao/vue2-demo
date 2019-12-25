<template>
  <div>计算和: {{count}}</div>
</template>

<script>
import { EventBus } from './Bus.js'
export default {
  data() {
    return {
      count: 0
    }
  },

  mounted() {
    EventBus.$on('addition', param => {
      this.count = this.count + param.num;
    })
  }
}
</script>
