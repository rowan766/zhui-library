// packages/components/src/form/index.js
import ZForm from './index.vue'

ZForm.install = function(Vue) {
  Vue.component(ZForm.name, ZForm)
}

export default ZForm
