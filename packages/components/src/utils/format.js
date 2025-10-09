// packages/components/src/utils/format.js

/**
 * 常用数据格式化方法
 */

/**
 * 格式化日期时间
 * @param {Date|String|Number} date - 日期对象、时间戳或日期字符串
 * @param {String} format - 格式化模板，默认 'YYYY-MM-DD HH:mm:ss'
 * @returns {String} 格式化后的日期字符串
 */
export function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!date) return ''

  const d = new Date(date)
  if (isNaN(d.getTime())) return ''

  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const hour = d.getHours()
  const minute = d.getMinutes()
  const second = d.getSeconds()

  const padZero = (num) => String(num).padStart(2, '0')

  const formatMap = {
    YYYY: year,
    MM: padZero(month),
    M: month,
    DD: padZero(day),
    D: day,
    HH: padZero(hour),
    H: hour,
    mm: padZero(minute),
    m: minute,
    ss: padZero(second),
    s: second
  }

  let result = format
  Object.keys(formatMap).forEach(key => {
    result = result.replace(key, formatMap[key])
  })

  return result
}

/**
 * 格式化时间为相对时间
 * @param {Date|String|Number} date - 日期对象、时间戳或日期字符串
 * @returns {String} 相对时间描述
 */
export function formatRelativeTime(date) {
  if (!date) return ''

  const d = new Date(date)
  if (isNaN(d.getTime())) return ''

  const now = Date.now()
  const diff = now - d.getTime()

  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day
  const year = 365 * day

  if (diff < minute) {
    return '刚刚'
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)}分钟前`
  } else if (diff < day) {
    return `${Math.floor(diff / hour)}小时前`
  } else if (diff < week) {
    return `${Math.floor(diff / day)}天前`
  } else if (diff < month) {
    return `${Math.floor(diff / week)}周前`
  } else if (diff < year) {
    return `${Math.floor(diff / month)}个月前`
  } else {
    return `${Math.floor(diff / year)}年前`
  }
}

/**
 * 格式化文件大小
 * @param {Number} bytes - 字节数
 * @param {Number} decimals - 小数位数，默认2位
 * @returns {String} 格式化后的文件大小
 */
export function formatFileSize(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes'
  if (!bytes) return ''

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * 格式化金额
 * @param {Number|String} amount - 金额
 * @param {Number} decimals - 小数位数，默认2位
 * @param {Boolean} showSymbol - 是否显示货币符号，默认true
 * @returns {String} 格式化后的金额
 */
export function formatMoney(amount, decimals = 2, showSymbol = true) {
  if (amount === null || amount === undefined || amount === '') return ''

  const num = parseFloat(amount)
  if (isNaN(num)) return ''

  const formatted = num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return showSymbol ? `¥${formatted}` : formatted
}

/**
 * 格式化数字（千分位）
 * @param {Number|String} num - 数字
 * @param {Number} decimals - 小数位数
 * @returns {String} 格式化后的数字
 */
export function formatNumber(num, decimals) {
  if (num === null || num === undefined || num === '') return ''

  const number = parseFloat(num)
  if (isNaN(number)) return ''

  let result = decimals !== undefined ? number.toFixed(decimals) : String(number)
  return result.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 格式化手机号（隐藏中间4位）
 * @param {String} phone - 手机号
 * @returns {String} 格式化后的手机号
 */
export function formatPhone(phone) {
  if (!phone) return ''
  const str = String(phone)
  if (str.length === 11) {
    return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  }
  return str
}

/**
 * 格式化身份证号（隐藏中间部分）
 * @param {String} idCard - 身份证号
 * @returns {String} 格式化后的身份证号
 */
export function formatIdCard(idCard) {
  if (!idCard) return ''
  const str = String(idCard)
  if (str.length === 15) {
    return str.replace(/(\d{6})\d{5}(\d{4})/, '$1*****$2')
  } else if (str.length === 18) {
    return str.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2')
  }
  return str
}

/**
 * 格式化银行卡号（每4位空格分隔）
 * @param {String} cardNumber - 银行卡号
 * @returns {String} 格式化后的银行卡号
 */
export function formatBankCard(cardNumber) {
  if (!cardNumber) return ''
  return String(cardNumber).replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
}

/**
 * 格式化百分比
 * @param {Number} num - 数字（0-1之间）
 * @param {Number} decimals - 小数位数，默认2位
 * @returns {String} 百分比字符串
 */
export function formatPercent(num, decimals = 2) {
  if (num === null || num === undefined || num === '') return ''
  const number = parseFloat(num)
  if (isNaN(number)) return ''
  return (number * 100).toFixed(decimals) + '%'
}

/**
 * 保留小数位
 * @param {Number} num - 数字
 * @param {Number} decimals - 小数位数
 * @returns {Number} 保留指定小数位的数字
 */
export function toFixed(num, decimals = 2) {
  if (num === null || num === undefined || num === '') return ''
  const number = parseFloat(num)
  if (isNaN(number)) return ''
  return parseFloat(number.toFixed(decimals))
}

/**
 * 截断文本
 * @param {String} text - 文本
 * @param {Number} length - 保留长度
 * @param {String} ellipsis - 省略符号，默认'...'
 * @returns {String} 截断后的文本
 */
export function truncate(text, length, ellipsis = '...') {
  if (!text) return ''
  const str = String(text)
  if (str.length <= length) return str
  return str.substring(0, length) + ellipsis
}

/**
 * 首字母大写
 * @param {String} str - 字符串
 * @returns {String} 首字母大写的字符串
 */
export function capitalize(str) {
  if (!str) return ''
  return String(str).charAt(0).toUpperCase() + String(str).slice(1)
}

/**
 * 下划线转驼峰
 * @param {String} str - 字符串
 * @returns {String} 驼峰命名的字符串
 */
export function camelCase(str) {
  if (!str) return ''
  return String(str).replace(/_([a-z])/g, (match, letter) => letter.toUpperCase())
}

/**
 * 驼峰转下划线
 * @param {String} str - 字符串
 * @returns {String} 下划线命名的字符串
 */
export function underscoreCase(str) {
  if (!str) return ''
  return String(str).replace(/([A-Z])/g, '_$1').toLowerCase()
}

export default {
  formatDate,
  formatRelativeTime,
  formatFileSize,
  formatMoney,
  formatNumber,
  formatPhone,
  formatIdCard,
  formatBankCard,
  formatPercent,
  toFixed,
  truncate,
  capitalize,
  camelCase,
  underscoreCase
}
