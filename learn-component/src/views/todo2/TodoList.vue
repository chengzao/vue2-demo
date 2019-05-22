<template>
  <div id="app">
    <input type="text" name="" v-model="iptVal">
    <button @click="handleClick">提交</button>
    <ul>
      <todo-item v-for="(item, index) in list" :key="index" :content="item" :index="index" @delete="handleDelete"></todo-item>
    </ul>
  </div>
</template>

<script>
import TodoItem from './TodoItem'

export default {
  components: {
    'todo-item': TodoItem
  },
  data () {
    return {
      iptVal: '123',
      list: []
    }
  },
  methods: {
    handleClick () {
      this.list.push(this.iptVal)
      this.iptVal = ''
    },
    handleDelete (index) {
      this.list.splice(index, 1)
    }
  }
}
</script>

<style>

</style>
