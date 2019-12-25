<template>
  <div class="border">
    <p>age: {{ age}}</p>
    <p>ComC: {{ $attrs }}</p>
  </div>
</template>
<script>

export default {
  inheritAttrs: false,
  props: {
    age: String
  },
  created() {
    console.log(this.$attrs); // eslint-disable-line
  }
};
</script>
