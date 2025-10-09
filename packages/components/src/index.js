// packages/components/src/index.js
import MyButton from './button'

const components = [
  MyButton
]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

// 支持 script 标签引入
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  MyButton
}

export {
  MyButton
}