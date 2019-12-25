<template>
  <div>
    ComC: {{demo}}
    <button @click="change">Click</button>
  </div>
</template>

<script>
  export default {
    name: "C",
    inject: ['for'],
    data() {
      return {
        demo: this.for
      }
    },
    methods: {
      change(){
        this.demo = 'aaa'
      }
    },
  }
</script>
