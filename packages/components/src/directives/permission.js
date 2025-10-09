// packages/components/src/directives/permission.js
import permissionManager from '../utils/permission'

/**
 * 权限指令
 * v-permission="'user:add'" - 单个权限
 * v-permission="['user:add', 'user:edit']" - 多个权限（有一个即可）
 * v-permission:every="['user:add', 'user:edit']" - 多个权限（需要全部）
 */
export default {
  inserted(el, binding) {
    const { value, modifiers } = binding
    const mode = modifiers.every ? 'every' : 'some'

    const hasPermission = permissionManager.has(value, mode)

    if (!hasPermission) {
      // 移除元素
      el.parentNode && el.parentNode.removeChild(el)
    }
  },

  update(el, binding) {
    const { value, oldValue, modifiers } = binding

    // 如果权限值没有变化，不处理
    if (JSON.stringify(value) === JSON.stringify(oldValue)) {
      return
    }

    const mode = modifiers.every ? 'every' : 'some'
    const hasPermission = permissionManager.has(value, mode)

    if (!hasPermission) {
      // 移除元素
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}

/**
 * 安装权限指令
 */
export function install(Vue) {
  Vue.directive('permission', {
    inserted(el, binding) {
      const { value, modifiers } = binding
      const mode = modifiers.every ? 'every' : 'some'

      const hasPermission = permissionManager.has(value, mode)

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    },

    update(el, binding) {
      const { value, oldValue, modifiers } = binding

      if (JSON.stringify(value) === JSON.stringify(oldValue)) {
        return
      }

      const mode = modifiers.every ? 'every' : 'some'
      const hasPermission = permissionManager.has(value, mode)

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  })
}
