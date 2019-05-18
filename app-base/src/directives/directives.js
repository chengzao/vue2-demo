let directives = {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  },
  color: {
    // 指令的定义
    inserted: function (el, bindings) {
      // console.log(arguments)
      el.style.color = bindings.value
    }
  }
}

export default directives
