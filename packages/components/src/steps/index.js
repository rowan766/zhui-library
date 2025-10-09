// packages/components/src/steps/index.js
import ZSteps from './index.vue'

ZSteps.install = function(Vue) {
  Vue.component(ZSteps.name, ZSteps)
}

export default ZSteps
