<template>
  <div>
    <div>{{msg}}</div>
  </div>
</template>
<script>
export default {
  beforeRouteEnter (to, from, next) {
    console.log('other component router before enter', this)
    next(vm => {
      console.log('after enter vm.id is ', vm.id)
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log('other component router update enter', to)
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('other component router leave enter')
    next()
  },
  props: ['id'],
  data () {
    return {
      msg: 'This is Other'
    }
  }
}
</script>
<style>
</style>
