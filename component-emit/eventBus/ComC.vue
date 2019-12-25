<template>
  <div>计算和: {{count}} <button @click="addEvent">添加事件</button></div>

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

  },
  methods: {
    addEvent(){
      EventBus.$on('addition', param => {
        this.count = this.count + param.num;
      })
    }
  },
}
</script>
