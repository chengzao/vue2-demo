<template>
  <div class="com_a">
    <span>Child Component: {{messageA}}</span>
    <p>获取父组件的值为:  {{parentVal}}</p>
  </div>
</template>

<script>
export default {
  name: 'Child',
  data() {
    return {
      messageA: 'this is old'
    }
  },
  computed:{
    parentVal(){
      // 获取父组件属性
      return this.$parent.msg;
    }
  }
}
</script>
