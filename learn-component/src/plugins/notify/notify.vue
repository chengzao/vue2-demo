<template>
  <div>
    <h1>{{value}}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  components: {}
}
</script>

<style scoped lang="stylus">
h1 {
  width: 100px;
  height: 50px;
  background-color: #000;
  color: #fff;
}
</style>
