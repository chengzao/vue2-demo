<template>
  <div>
    <p>链接：<a target="_blank" href="https://cn.vuejs.org/v2/api/#parent">https://cn.vuejs.org/v2/api/#parent</a></p>
    <div>{{msg}}</div>
    <hr>
    <com-a></com-a>
    <hr>
    <button @click="changeA">点击改变子组件值</button>
  </div>
</template>

<script>
import ComA from './Child.vue'
export default {
  name: 'Parent',
  components: { ComA },
  data() {
    return {
      msg: 'Parent Component'
    }
  },

  methods: {
    changeA() {
      // 获取到子组件A
      this.$children[0].messageA = 'This is new value'
    }
  }
}
</script>
