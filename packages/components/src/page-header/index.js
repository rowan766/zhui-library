// packages/components/src/page-header/index.js
import ZPageHeader from './index.vue'

ZPageHeader.install = function(Vue) {
  Vue.component(ZPageHeader.name, ZPageHeader)
}

export default ZPageHeader
