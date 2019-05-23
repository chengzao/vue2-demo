<template>
  <div v-if="test">
    <img @click="clickMe" src="@/assets/img/logo.png" />
    <p class="red">{{ msg }}</p>
    <Index></Index>
    <Test></Test>
  </div>
</template>

<script>
import Index from '@/components/Index.vue'
import Test from './test'
export default {
  data() {
    return {
      test: 0,
      msg: 'Index',
    }
  },
  components: {
    Index,
    Test,
  },
  mounted() {
    setTimeout(() => {
      this.test = 1
    }, 100)
  },
  methods: {
    clickMe() {
      this.$http.get('/mock/goods/list?a=10').then(data => {
        console.log(data)
      })
    },
  },
}
</script>
