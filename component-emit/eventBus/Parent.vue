<template>
  <div>
    <show-num-com></show-num-com>
    <com-c></com-c>
    <addition-num-com></addition-num-com>
  </div>
</template>

<script>
import showNumCom from './ComB'
import additionNumCom from './ComA'
import comC from './ComC'
export default {
  components: { showNumCom, additionNumCom,comC }
}
</script>
