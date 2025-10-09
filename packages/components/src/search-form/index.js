// packages/components/src/search-form/index.js
import ZSearchForm from './index.vue'

ZSearchForm.install = function(Vue) {
  Vue.component(ZSearchForm.name, ZSearchForm)
}

export default ZSearchForm
