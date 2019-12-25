<template>
  <div>
    <p>{{name}}</p>
  </div>
</template>

<script>
export default {
    data () {
    return {
      name: 'Child'
    }
  },
  methods: {
    sayHello () {
      this.name = 'Ha!!!!!'
    }
  }
}
</script>
