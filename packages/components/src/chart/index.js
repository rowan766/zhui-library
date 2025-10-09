// packages/components/src/chart/index.js
import ZChart from './index.vue'

ZChart.install = function(Vue) {
  Vue.component(ZChart.name, ZChart)
}

export default ZChart
