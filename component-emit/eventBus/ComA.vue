<template>
  <div>
    <button @click="additionHandle">+加法器</button>
  </div>
</template>

<script>
import {EventBus} from './Bus.js'
console.log(EventBus) // eslint-disable-line
export default {
  data(){
    return{
      num:1
    }
  },

  methods:{
    additionHandle(){
      EventBus.$emit('addition', {
        num:this.num++
      })
    }
  }
}
</script>
