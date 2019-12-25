<template>
  <div>
    ComB: {{demo}}
    <comC></comC>
    <com-d></com-d>
  </div>
</template>

<script>
  import comC from './ComC.vue'
  import comD from './ComD.vue'
  export default {
    name: "B",
    inject: ['for'],
    data() {
      return {
        demo: this.for
      }
    },
    components: {
      comC,comD
    }
  }
</script>
