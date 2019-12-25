<template>
  <div>
    <p v-for="(item, index) in articles" :key="index" @click="emitIndex(index)">{{item}}</p>
  </div>
</template>

<script>
export default {
  name:'ComChild',
  props: ["articles"],
  methods: {
    emitIndex(index) {
      this.$emit('onEmitIndex', index)
    }
  }
};
</script>
<style>
p{cursor:pointer}
</style>
