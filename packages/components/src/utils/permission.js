// packages/components/src/utils/permission.js

/**
 * 权限管理类
 */
class PermissionManager {
  constructor() {
    // 用户权限列表
    this.permissions = []
    // 权限检查函数（可自定义）
    this.checkFunction = null
  }

  /**
   * 设置用户权限列表
   * @param {Array} permissions - 权限列表
   */
  setPermissions(permissions) {
    this.permissions = permissions || []
  }

  /**
   * 获取用户权限列表
   * @returns {Array}
   */
  getPermissions() {
    return this.permissions
  }

  /**
   * 设置自定义权限检查函数
   * @param {Function} fn - 检查函数
   */
  setCheckFunction(fn) {
    if (typeof fn === 'function') {
      this.checkFunction = fn
    }
  }

  /**
   * 检查是否有权限
   * @param {String|Array} permission - 权限码或权限码数组
   * @param {String} mode - 检查模式：'some'（有一个即可）或 'every'（全部拥有）
   * @returns {Boolean}
   */
  has(permission, mode = 'some') {
    // 如果设置了自定义检查函数，优先使用
    if (this.checkFunction) {
      return this.checkFunction(permission, this.permissions)
    }

    // 如果没有权限要求，直接返回 true
    if (!permission) {
      return true
    }

    // 如果没有设置权限列表，默认返回 true
    if (!this.permissions || this.permissions.length === 0) {
      return true
    }

    // 单个权限检查
    if (typeof permission === 'string') {
      return this.permissions.includes(permission)
    }

    // 多个权限检查
    if (Array.isArray(permission)) {
      if (permission.length === 0) {
        return true
      }

      if (mode === 'every') {
        // 需要拥有所有权限
        return permission.every(p => this.permissions.includes(p))
      } else {
        // 只需要拥有其中一个权限
        return permission.some(p => this.permissions.includes(p))
      }
    }

    return false
  }

  /**
   * 检查是否有任一权限（别名方法）
   * @param {Array} permissions - 权限码数组
   * @returns {Boolean}
   */
  hasAny(permissions) {
    return this.has(permissions, 'some')
  }

  /**
   * 检查是否拥有所有权限（别名方法）
   * @param {Array} permissions - 权限码数组
   * @returns {Boolean}
   */
  hasAll(permissions) {
    return this.has(permissions, 'every')
  }

  /**
   * 添加权限
   * @param {String|Array} permission - 权限码或权限码数组
   */
  add(permission) {
    if (typeof permission === 'string') {
      if (!this.permissions.includes(permission)) {
        this.permissions.push(permission)
      }
    } else if (Array.isArray(permission)) {
      permission.forEach(p => {
        if (!this.permissions.includes(p)) {
          this.permissions.push(p)
        }
      })
    }
  }

  /**
   * 移除权限
   * @param {String|Array} permission - 权限码或权限码数组
   */
  remove(permission) {
    if (typeof permission === 'string') {
      const index = this.permissions.indexOf(permission)
      if (index > -1) {
        this.permissions.splice(index, 1)
      }
    } else if (Array.isArray(permission)) {
      permission.forEach(p => {
        const index = this.permissions.indexOf(p)
        if (index > -1) {
          this.permissions.splice(index, 1)
        }
      })
    }
  }

  /**
   * 清空权限
   */
  clear() {
    this.permissions = []
  }
}

// 创建单例
const permissionManager = new PermissionManager()

export default permissionManager

/**
 * 检查权限的工具函数
 * @param {String|Array} permission - 权限码或权限码数组
 * @param {String} mode - 检查模式
 * @returns {Boolean}
 */
export function checkPermission(permission, mode = 'some') {
  return permissionManager.has(permission, mode)
}
