// packages/components/src/table/index.js
import ZTable from './index.vue'

ZTable.install = function(Vue) {
  Vue.component(ZTable.name, ZTable)
}

export default ZTable
