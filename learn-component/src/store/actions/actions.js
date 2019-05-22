import * as Types from '../mutations/mutation-types'

// Action 类似于 mutation，不同在于：
// Action 提交的是 mutation，而不是直接变更状态。
// Action 可以包含任意异步操作

export default {
  updateCountAsync (store, data) {
    // console.log('asdasd')
    setTimeout(() => {
      store.commit('updateCount', {
        num: data.num
      })
    }, data.time)
  },
  incrementAsync ({ commit, state }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  },
  decrementAsync ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('decrement')
        resolve('12')
      }, 1000)
    })
  },
  addTodo ({ commit }, todo) {
    // console.log(arguments)
    commit(Types.ADDTODO, todo)
  },

  delTodo ({ commit }, todo) {
    commit(Types.DELTODO, todo)
  }
}
