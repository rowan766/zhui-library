// packages/components/src/utils/request.js

/**
 * 请求工具封装
 * 注意：这是一个基础封装，实际使用时建议根据项目需求进行扩展
 */

/**
 * 默认配置
 */
const defaultConfig = {
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
}

/**
 * 请求拦截器列表
 */
const requestInterceptors = []

/**
 * 响应拦截器列表
 */
const responseInterceptors = []

/**
 * 创建请求实例
 * @param {Object} config - 配置对象
 */
export function createRequest(config = {}) {
  const mergedConfig = { ...defaultConfig, ...config }

  /**
   * 请求方法
   */
  async function request(url, options = {}) {
    // 合并配置
    const finalConfig = {
      ...mergedConfig,
      ...options,
      headers: {
        ...mergedConfig.headers,
        ...options.headers
      }
    }

    // 构建完整 URL
    const fullURL = finalConfig.baseURL + url

    // 请求拦截
    let requestConfig = { url: fullURL, ...finalConfig }
    for (const interceptor of requestInterceptors) {
      try {
        requestConfig = await interceptor.onFulfilled(requestConfig)
      } catch (error) {
        if (interceptor.onRejected) {
          return interceptor.onRejected(error)
        }
        throw error
      }
    }

    // 处理请求体
    let body
    if (requestConfig.data) {
      if (requestConfig.headers['Content-Type'] === 'application/json') {
        body = JSON.stringify(requestConfig.data)
      } else if (requestConfig.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        body = new URLSearchParams(requestConfig.data).toString()
      } else {
        body = requestConfig.data
      }
    }

    // 发起请求
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), requestConfig.timeout)

      const response = await fetch(requestConfig.url, {
        method: requestConfig.method || 'GET',
        headers: requestConfig.headers,
        body,
        credentials: requestConfig.withCredentials ? 'include' : 'same-origin',
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      // 处理响应
      let data
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        data = await response.json()
      } else {
        data = await response.text()
      }

      const result = {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: requestConfig
      }

      // 响应拦截
      let finalResult = result
      for (const interceptor of responseInterceptors) {
        try {
          finalResult = await interceptor.onFulfilled(finalResult)
        } catch (error) {
          if (interceptor.onRejected) {
            return interceptor.onRejected(error)
          }
          throw error
        }
      }

      // 检查响应状态
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
      }

      return finalResult
    } catch (error) {
      // 错误处理
      if (error.name === 'AbortError') {
        throw new Error('请求超时')
      }

      // 响应错误拦截
      for (const interceptor of responseInterceptors) {
        if (interceptor.onRejected) {
          try {
            return await interceptor.onRejected(error)
          } catch (e) {
            error = e
          }
        }
      }

      throw error
    }
  }

  /**
   * GET 请求
   */
  request.get = function(url, params, options = {}) {
    if (params) {
      const queryString = new URLSearchParams(params).toString()
      url = url + (url.includes('?') ? '&' : '?') + queryString
    }
    return request(url, { ...options, method: 'GET' })
  }

  /**
   * POST 请求
   */
  request.post = function(url, data, options = {}) {
    return request(url, { ...options, method: 'POST', data })
  }

  /**
   * PUT 请求
   */
  request.put = function(url, data, options = {}) {
    return request(url, { ...options, method: 'PUT', data })
  }

  /**
   * DELETE 请求
   */
  request.delete = function(url, data, options = {}) {
    return request(url, { ...options, method: 'DELETE', data })
  }

  /**
   * PATCH 请求
   */
  request.patch = function(url, data, options = {}) {
    return request(url, { ...options, method: 'PATCH', data })
  }

  return request
}

/**
 * 添加请求拦截器
 * @param {Function} onFulfilled - 成功回调
 * @param {Function} onRejected - 失败回调
 */
export function addRequestInterceptor(onFulfilled, onRejected) {
  requestInterceptors.push({ onFulfilled, onRejected })
}

/**
 * 添加响应拦截器
 * @param {Function} onFulfilled - 成功回调
 * @param {Function} onRejected - 失败回调
 */
export function addResponseInterceptor(onFulfilled, onRejected) {
  responseInterceptors.push({ onFulfilled, onRejected })
}

/**
 * 清空拦截器
 */
export function clearInterceptors() {
  requestInterceptors.length = 0
  responseInterceptors.length = 0
}

// 默认请求实例
export const request = createRequest()

export default {
  createRequest,
  addRequestInterceptor,
  addResponseInterceptor,
  clearInterceptors,
  request
}
