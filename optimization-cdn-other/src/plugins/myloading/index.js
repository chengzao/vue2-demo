import 'babel-polyfill'
import modal from './loading.vue'
let myLoding = {}

myLoding.install = function(Vue, options = { delay: 3000 }) {
  Vue.prototype.$MyLoading = function(show, opt = {}) {
    let V = Vue.extend(modal)
    options = { ...options, ...opt }
    let doc = document.body
    let vm = new V({ data: options })
    if (myLoding.el) {
      if (!show) {
        doc.className = 'ov-auto'
        doc.removeChild(myLoding.el)
        myLoding.el = null
      }
    } else {
      let div = document.createElement('div')
      vm.elId = `myloading_${vm._uid}`
      doc.className = 'ov-hide'
      vm.$mount(div)
      vm.title = options.title || 'loading'
      doc.appendChild(vm.$el)
      myLoding.el = vm.$el
      if (!show) {
        doc.removeChild(vm.$el)
        myLoding.el = null
      }
    }
  }
}

export default myLoding
