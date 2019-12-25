<template>
  <div>
    <p>Parent</p>
    <child ref="comA"></child>
    <button @click="changeA">Click Change Child Component</button>
  </div>
</template>
<script>
import Child from './Child'
export default {
  components:{Child},
  methods: {
    changeA(){
      const comA = this.$refs.comA;
      comA.sayHello();
    }
  },
}
</script>
