import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Zhui from '@rowan287630/zhui'
import * as echarts from 'echarts'

export default ({ Vue }) => {
  Vue.use(ElementUI)
  Vue.use(Zhui)

  // 将 echarts 挂载到 window 对象，供 ZChart 组件使用
  if (typeof window !== 'undefined') {
    window.echarts = echarts
  }
}