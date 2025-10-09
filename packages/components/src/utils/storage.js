// packages/components/src/utils/storage.js

/**
 * 本地存储封装（支持过期时间）
 */

const DEFAULT_PREFIX = 'zhui_'

/**
 * 存储包装类
 */
class Storage {
  constructor(storage, prefix = DEFAULT_PREFIX) {
    this.storage = storage
    this.prefix = prefix
  }

  /**
   * 获取完整的 key
   */
  getKey(key) {
    return this.prefix + key
  }

  /**
   * 设置存储
   * @param {String} key - 键名
   * @param {Any} value - 值
   * @param {Number} expire - 过期时间（秒），不传则永久有效
   */
  set(key, value, expire) {
    const data = {
      value,
      time: Date.now()
    }

    if (expire) {
      data.expire = expire * 1000
    }

    try {
      this.storage.setItem(this.getKey(key), JSON.stringify(data))
      return true
    } catch (e) {
      console.error('Storage set error:', e)
      return false
    }
  }

  /**
   * 获取存储
   * @param {String} key - 键名
   * @param {Any} defaultValue - 默认值
   * @returns {Any} 存储的值
   */
  get(key, defaultValue = null) {
    try {
      const item = this.storage.getItem(this.getKey(key))
      if (!item) {
        return defaultValue
      }

      const data = JSON.parse(item)

      // 检查是否过期
      if (data.expire) {
        const now = Date.now()
        if (now - data.time > data.expire) {
          this.remove(key)
          return defaultValue
        }
      }

      return data.value
    } catch (e) {
      console.error('Storage get error:', e)
      return defaultValue
    }
  }

  /**
   * 删除存储
   * @param {String} key - 键名
   */
  remove(key) {
    try {
      this.storage.removeItem(this.getKey(key))
      return true
    } catch (e) {
      console.error('Storage remove error:', e)
      return false
    }
  }

  /**
   * 清空所有存储
   */
  clear() {
    try {
      // 只清空带前缀的项
      const keys = Object.keys(this.storage)
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          this.storage.removeItem(key)
        }
      })
      return true
    } catch (e) {
      console.error('Storage clear error:', e)
      return false
    }
  }

  /**
   * 获取所有键名
   * @returns {Array} 键名数组
   */
  keys() {
    try {
      const keys = Object.keys(this.storage)
      return keys
        .filter(key => key.startsWith(this.prefix))
        .map(key => key.replace(this.prefix, ''))
    } catch (e) {
      console.error('Storage keys error:', e)
      return []
    }
  }

  /**
   * 检查是否存在
   * @param {String} key - 键名
   * @returns {Boolean}
   */
  has(key) {
    return this.get(key) !== null
  }

  /**
   * 获取存储大小（字节）
   * @returns {Number}
   */
  getSize() {
    try {
      let size = 0
      const keys = Object.keys(this.storage)
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          const item = this.storage.getItem(key)
          if (item) {
            size += item.length
          }
        }
      })
      return size
    } catch (e) {
      console.error('Storage getSize error:', e)
      return 0
    }
  }
}

// 检查是否在浏览器环境
const isBrowser = typeof window !== 'undefined'

// 创建一个空的 Storage 实现（用于 SSR）
class MockStorage {
  constructor() {
    this.store = {}
  }
  getItem(key) {
    return this.store[key] || null
  }
  setItem(key, value) {
    this.store[key] = value
  }
  removeItem(key) {
    delete this.store[key]
  }
  clear() {
    this.store = {}
  }
}

// localStorage 实例
export const local = isBrowser
  ? new Storage(window.localStorage)
  : new Storage(new MockStorage())

// sessionStorage 实例
export const session = isBrowser
  ? new Storage(window.sessionStorage)
  : new Storage(new MockStorage())

/**
 * 创建自定义前缀的存储实例
 * @param {String} prefix - 前缀
 * @param {Boolean} useSession - 是否使用 sessionStorage，默认 false
 * @returns {Storage} 存储实例
 */
export function createStorage(prefix, useSession = false) {
  if (!isBrowser) {
    return new Storage(new MockStorage(), prefix)
  }
  const storage = useSession ? window.sessionStorage : window.localStorage
  return new Storage(storage, prefix)
}

export default {
  local,
  session,
  createStorage,
  Storage
}
