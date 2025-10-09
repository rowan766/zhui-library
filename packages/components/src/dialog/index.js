// packages/components/src/dialog/index.js
import ZDialog from './index.vue'

ZDialog.install = function(Vue) {
  Vue.component(ZDialog.name, ZDialog)
}

export default ZDialog
