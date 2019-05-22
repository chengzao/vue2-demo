import modal from './notify.vue'

let myNotify = {

}

myNotify.install = function (Vue, options = {delay: 3000}) {
  Vue.prototype.$MyNotiyPlugin = function (message, opt = {}) {
    if (myNotify.el) return
    options = {...options, ...opt}
    let V = Vue.extend(modal)
    let vm = new V()
    let div = document.createElement('div')
    vm.$mount(div)
    vm.value = message || 'noity'
    document.body.appendChild(vm.$el)
    myNotify.el = vm.$el

    setTimeout(() => {
      document.body.removeChild(vm.$el)
      myNotify.el = null
    }, options.delay)
  }
}

export default myNotify
