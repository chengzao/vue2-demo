<template>
  <div class="loading-warp" v-if="isLoading">
    <div class="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isLoading(val) {
      if (!val) {
        document.body.style = 'overflow: auto'
      }
    },
  },
  mounted() {
    document.body.style = 'overflow: hidden'
  },
}
</script>
<style lang="scss" scoped>
.loading-warp {
  z-index: 123;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  overflow: hidden;
  .loading {
    width: 80px;
    height: 40px;
    margin: 0 auto;
    margin-top: 100px;
  }
  .loading span {
    display: inline-block;
    width: 8px;
    height: 100%;
    border-radius: 4px;
    background: lightgreen;
    animation: load 1s ease infinite;
  }
  @keyframes load {
    0%,
    100% {
      height: 40px;
      background: lightgreen;
    }
    50% {
      height: 70px;
      margin: -15px 0;
      background: lightblue;
    }
  }
  .loading span:nth-child(2) {
    animation-delay: 0.2s;
  }
  .loading span:nth-child(3) {
    animation-delay: 0.4s;
  }
  .loading span:nth-child(4) {
    animation-delay: 0.6s;
  }
  .loading span:nth-child(5) {
    animation-delay: 0.8s;
  }
}
</style>
