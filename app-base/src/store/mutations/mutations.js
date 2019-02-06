import * as Types from './mutation-types'

let idStart = 1

export default {
  updateCount (state, { num, num2 }) {
    // console.log(num2)
    state.count = num
  },
  [Types.ADDTODO] (state, todo) {
    // console.log(arguments)
    if (!todo.id) {
      todo.id = ++idStart
    }
    state.todos.push(todo)
  },
  [Types.DELTODO] (state, todo) {
    state.todos.forEach((item, index) => {
      if (item.id === todo.id) {
        state.todos.splice(index, 1)
      }
    })
  },
  increment: state => state.count++,
  decrement: state => state.count--,
  startLoading (state) {
    state.loading = true
  },
  endLoading (state) {
    state.loading = false
  }
}
