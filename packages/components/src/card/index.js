// packages/components/src/card/index.js
import ZCard from './index.vue'

ZCard.install = function(Vue) {
  Vue.component(ZCard.name, ZCard)
}

export default ZCard
