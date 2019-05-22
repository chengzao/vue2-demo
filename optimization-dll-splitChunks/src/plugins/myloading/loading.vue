<template>
  <div class="loading-warp" :id="elId">
    <div class="loading">
      <div class="bounce bounce1"></div>
      <div class="bounce bounce2"></div>
      <div class="bounce bounce3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyLoading',
  data() {
    return {
      title: '',
      elId: '',
    }
  },
}
</script>

<style scoped lang="scss">
.title {
  color: #ffffff;
  text-align: center;
}
.loading-warp {
  z-index: 123;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0);
  overflow: hidden;

  .loading {
    width: 150px;
    height: 150px;
    padding-top: 50px;
    text-align: center;
    position: relative;
    left: 50%;
    top: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  }

  .loading .bounce {
    width: 15px;
    height: 15px;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
    animation: bouncedelay 1.4s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    background-color: #ffc85a;
  }

  .loading .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .loading .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @keyframes bouncedelay {
    0%,
    80%,
    100% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }
    40% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }
  // .loading {
  //   position: absolute;
  //   left: 50%;
  //   top: 50%;
  //   transform: translate(-50%, -50%);
  //   width: 80px;
  //   height: 40px;
  // }
  // .loading span {
  //   display: inline-block;
  //   width: 8px;
  //   height: 100%;
  //   border-radius: 4px;
  //   background: lightgreen;
  //   animation: load 1s ease infinite;
  // }
  // @keyframes load {
  //   0%,
  //   100% {
  //     height: 40px;
  //     background: lightgreen;
  //   }
  //   50% {
  //     height: 70px;
  //     margin: -15px 0;
  //     background: lightblue;
  //   }
  // }
  // .loading span:nth-child(2) {
  //   animation-delay: 0.2s;
  // }
  // .loading span:nth-child(3) {
  //   animation-delay: 0.4s;
  // }
  // .loading span:nth-child(4) {
  //   animation-delay: 0.6s;
  // }
  // .loading span:nth-child(5) {
  //   animation-delay: 0.8s;
  // }
}
</style>
