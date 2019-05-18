<template>
  <div>
    <button v-on:click="show =! show">show / hide</button>
    <ku-button type="primary" size="small">真酷！!</ku-button>
    <transition name="fade">
      <p v-if="show">Hello vue</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'demo',
  data() {
    return {
      show: true
    }
  }
}
</script>

<style scope>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
