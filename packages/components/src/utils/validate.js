// packages/components/src/utils/validate.js

/**
 * 常用表单验证规则
 */

// 手机号验证
export const phoneValidator = (rule, value, callback) => {
  if (!value) {
    callback()
    return
  }
  const phoneReg = /^1[3-9]\d{9}$/
  if (!phoneReg.test(value)) {
    callback(new Error('请输入正确的手机号'))
  } else {
    callback()
  }
}

// 邮箱验证
export const emailValidator = (rule, value, callback) => {
  if (!value) {
    callback()
    return
  }
  const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailReg.test(value)) {
    callback(new Error('请输入正确的邮箱地址'))
  } else {
    callback()
  }
}

// 身份证验证
export const idCardValidator = (rule, value, callback) => {
  if (!value) {
    callback()
    return
  }
  const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!idCardReg.test(value)) {
    callback(new Error('请输入正确的身份证号'))
  } else {
    callback()
  }
}

// 网址验证
export const urlValidator = (rule, value, callback) => {
  if (!value) {
    callback()
    return
  }
  const urlReg = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
  if (!urlReg.test(value)) {
    callback(new Error('请输入正确的网址'))
  } else {
    callback()
  }
}

// 密码强度验证（至少包含数字和字母，长度6-20）
export const passwordValidator = (rule, value, callback) => {
  if (!value) {
    callback()
    return
  }
  const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,20}$/
  if (!passwordReg.test(value)) {
    callback(new Error('密码需包含数字和字母，长度6-20位'))
  } else {
    callback()
  }
}

// 整数验证
export const integerValidator = (rule, value, callback) => {
  if (!value && value !== 0) {
    callback()
    return
  }
  if (!Number.isInteger(Number(value))) {
    callback(new Error('请输入整数'))
  } else {
    callback()
  }
}

// 正整数验证
export const positiveIntegerValidator = (rule, value, callback) => {
  if (!value && value !== 0) {
    callback()
    return
  }
  const num = Number(value)
  if (!Number.isInteger(num) || num <= 0) {
    callback(new Error('请输入正整数'))
  } else {
    callback()
  }
}

// 正数验证（包括小数）
export const positiveNumberValidator = (rule, value, callback) => {
  if (!value && value !== 0) {
    callback()
    return
  }
  const num = Number(value)
  if (isNaN(num) || num <= 0) {
    callback(new Error('请输入正数'))
  } else {
    callback()
  }
}

// 数字范围验证
export const rangeValidator = (min, max) => {
  return (rule, value, callback) => {
    if (!value && value !== 0) {
      callback()
      return
    }
    const num = Number(value)
    if (isNaN(num)) {
      callback(new Error('请输入数字'))
    } else if (num < min || num > max) {
      callback(new Error(`请输入${min}到${max}之间的数字`))
    } else {
      callback()
    }
  }
}

// 长度范围验证
export const lengthValidator = (min, max) => {
  return (rule, value, callback) => {
    if (!value) {
      callback()
      return
    }
    const len = String(value).length
    if (len < min || len > max) {
      callback(new Error(`长度应在${min}到${max}个字符之间`))
    } else {
      callback()
    }
  }
}

// 中文验证
export const chineseValidator = (rule, value, callback) => {
  if (!value) {
    callback()
    return
  }
  const chineseReg = /^[\u4e00-\u9fa5]+$/
  if (!chineseReg.test(value)) {
    callback(new Error('请输入中文'))
  } else {
    callback()
  }
}

// 英文验证
export const englishValidator = (rule, value, callback) => {
  if (!value) {
    callback()
    return
  }
  const englishReg = /^[a-zA-Z]+$/
  if (!englishReg.test(value)) {
    callback(new Error('请输入英文'))
  } else {
    callback()
  }
}

// 用户名验证（字母开头，允许字母数字下划线，4-16位）
export const usernameValidator = (rule, value, callback) => {
  if (!value) {
    callback()
    return
  }
  const usernameReg = /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/
  if (!usernameReg.test(value)) {
    callback(new Error('用户名以字母开头，4-16位字母数字下划线'))
  } else {
    callback()
  }
}

// IP地址验证
export const ipValidator = (rule, value, callback) => {
  if (!value) {
    callback()
    return
  }
  const ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  if (!ipReg.test(value)) {
    callback(new Error('请输入正确的IP地址'))
  } else {
    callback()
  }
}

// 端口号验证
export const portValidator = (rule, value, callback) => {
  if (!value && value !== 0) {
    callback()
    return
  }
  const num = Number(value)
  if (!Number.isInteger(num) || num < 0 || num > 65535) {
    callback(new Error('请输入0-65535之间的端口号'))
  } else {
    callback()
  }
}

// 常用验证规则对象
export const rules = {
  // 必填
  required: { required: true, message: '此项为必填项', trigger: 'blur' },

  // 手机号
  phone: { validator: phoneValidator, trigger: 'blur' },
  phoneRequired: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { validator: phoneValidator, trigger: 'blur' }
  ],

  // 邮箱
  email: { validator: emailValidator, trigger: 'blur' },
  emailRequired: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { validator: emailValidator, trigger: 'blur' }
  ],

  // 身份证
  idCard: { validator: idCardValidator, trigger: 'blur' },
  idCardRequired: [
    { required: true, message: '请输入身份证号', trigger: 'blur' },
    { validator: idCardValidator, trigger: 'blur' }
  ],

  // 网址
  url: { validator: urlValidator, trigger: 'blur' },
  urlRequired: [
    { required: true, message: '请输入网址', trigger: 'blur' },
    { validator: urlValidator, trigger: 'blur' }
  ],

  // 密码
  password: { validator: passwordValidator, trigger: 'blur' },
  passwordRequired: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { validator: passwordValidator, trigger: 'blur' }
  ],

  // 用户名
  username: { validator: usernameValidator, trigger: 'blur' },
  usernameRequired: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { validator: usernameValidator, trigger: 'blur' }
  ]
}

export default {
  phoneValidator,
  emailValidator,
  idCardValidator,
  urlValidator,
  passwordValidator,
  integerValidator,
  positiveIntegerValidator,
  positiveNumberValidator,
  rangeValidator,
  lengthValidator,
  chineseValidator,
  englishValidator,
  usernameValidator,
  ipValidator,
  portValidator,
  rules
}
