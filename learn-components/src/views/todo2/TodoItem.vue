<template>
  <div>
    <li @click="handleClick">{{content}}</li>
  </div>
</template>

<script>
export default {
  props: ['content', 'index'],
  methods: {
    handleClick () {
      this.$emit('delete', this.index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
