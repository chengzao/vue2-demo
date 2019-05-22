<template>
 <div>
   <h1>todo list</h1>
    <div>
      <input v-model="newtodo.text" type="text" @keydown.13="createTodo">
      <ul>
        <li v-for="todo in todos" :key="todo.text">
          {{todo.text}}
           <span @click="delTodo(todo)">删除</span></li>
      </ul>
    </div>

    <router-view></router-view>
    <router-view name='left'></router-view>
    <router-view name='right'></router-view>
 </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => {
    return {
      msg: 'hello',
      newtodo: {
        text: ''
      }
    }
  },
  mounted() {
    console.log(' $router ', this.$router)
    console.log(' $route ', this.$route)
  },
  computed: {
    ...mapGetters(['todos'])
  },
  methods: {
    ...mapActions(['addTodo', 'delTodo']),
    createTodo() {
      this.addTodo({
        ...this.newtodo
      })
      this.newtodo.text = ''
    }
  }
}
</script>

<style scoped>
</style>
