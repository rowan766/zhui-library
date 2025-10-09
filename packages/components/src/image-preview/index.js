// packages/components/src/image-preview/index.js
import ZImagePreview from './index.vue'

ZImagePreview.install = function(Vue) {
  Vue.component(ZImagePreview.name, ZImagePreview)
}

export default ZImagePreview
