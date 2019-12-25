<template class="border">
  <div>
    <p>name: {{ name}}</p>
    <p>ComB的$attrs: {{ $attrs }}</p>
    <com-c v-bind="$attrs"></com-c>
  </div>
</template>
<script>
const ComC = () => import("./ComC.vue");
export default {
  components: {
    ComC
  },
  inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
  props: {
    name: String
  },
  created() {
    console.log(this.$attrs);  // eslint-disable-line
  }
};
</script>
