// packages/components/src/index.js
import ZForm from './form'
import ZTable from './table'
import ZDialog from './dialog'
import ZSearchForm from './search-form'
import ZDescriptions from './descriptions'
import ZCard from './card'
import ZPageHeader from './page-header'
import ZChart from './chart'
import ZUpload from './upload'
import ZImagePreview from './image-preview'
import ZEmpty from './empty'
import ZSteps from './steps'

// 导入权限相关
import permissionManager, { checkPermission } from './utils/permission'
import { install as installPermissionDirective } from './directives/permission'

// 导入工具方法
import * as validate from './utils/validate'
import * as format from './utils/format'
import * as storage from './utils/storage'
import * as request from './utils/request'

const components = [
  ZForm,
  ZTable,
  ZDialog,
  ZSearchForm,
  ZDescriptions,
  ZCard,
  ZPageHeader,
  ZChart,
  ZUpload,
  ZImagePreview,
  ZEmpty,
  ZSteps
]

const install = function(Vue) {
  // 注册组件
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  // 注册权限指令
  installPermissionDirective(Vue)
}

// 支持 script 标签引入
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ZForm,
  ZTable,
  ZDialog,
  ZSearchForm,
  ZDescriptions,
  ZCard,
  ZPageHeader,
  ZChart,
  ZUpload,
  ZImagePreview,
  ZEmpty,
  ZSteps,
  // 导出权限相关
  permissionManager,
  checkPermission,
  // 导出工具方法
  validate,
  format,
  storage,
  request
}

export {
  ZForm,
  ZTable,
  ZDialog,
  ZSearchForm,
  ZDescriptions,
  ZCard,
  ZPageHeader,
  ZChart,
  ZUpload,
  ZImagePreview,
  ZEmpty,
  ZSteps,
  // 导出权限相关
  permissionManager,
  checkPermission,
  // 导出工具方法
  validate,
  format,
  storage,
  request
}