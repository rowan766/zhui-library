// packages/components/src/upload/index.js
import ZUpload from './index.vue'

ZUpload.install = function(Vue) {
  Vue.component(ZUpload.name, ZUpload)
}

export default ZUpload
