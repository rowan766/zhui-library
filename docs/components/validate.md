# Validate 验证工具

提供常用的表单验证规则和验证器。

## 安装使用

```js
import { validate } from '@rowan287630/zhui'

// 使用预定义规则
const formRules = {
  phone: validate.rules.phoneRequired,
  email: validate.rules.emailRequired
}

// 使用验证函数
const customRules = {
  phone: { validator: validate.phoneValidator, trigger: 'blur' }
}
```

## 预定义规则

### 必填规则

```js
const rules = {
  name: validate.rules.required
}
```

### 手机号规则

```js
const rules = {
  // 可选
  phone: validate.rules.phone,
  // 必填
  phone: validate.rules.phoneRequired
}
```

### 邮箱规则

```js
const rules = {
  email: validate.rules.email,
  email: validate.rules.emailRequired
}
```

### 身份证规则

```js
const rules = {
  idCard: validate.rules.idCard,
  idCard: validate.rules.idCardRequired
}
```

### 网址规则

```js
const rules = {
  url: validate.rules.url,
  url: validate.rules.urlRequired
}
```

### 密码规则

```js
const rules = {
  password: validate.rules.password,
  password: validate.rules.passwordRequired
}
```

### 用户名规则

```js
const rules = {
  username: validate.rules.username,
  username: validate.rules.usernameRequired
}
```

## 验证器函数

### 整数验证

```js
const rules = {
  age: { validator: validate.integerValidator, trigger: 'blur' }
}
```

### 正整数验证

```js
const rules = {
  count: { validator: validate.positiveIntegerValidator, trigger: 'blur' }
}
```

### 正数验证

```js
const rules = {
  price: { validator: validate.positiveNumberValidator, trigger: 'blur' }
}
```

### 范围验证

```js
const rules = {
  age: { validator: validate.rangeValidator(1, 120), trigger: 'blur' }
}
```

### 长度验证

```js
const rules = {
  username: { validator: validate.lengthValidator(4, 16), trigger: 'blur' }
}
```

### 中文验证

```js
const rules = {
  name: { validator: validate.chineseValidator, trigger: 'blur' }
}
```

### 英文验证

```js
const rules = {
  name: { validator: validate.englishValidator, trigger: 'blur' }
}
```

### IP地址验证

```js
const rules = {
  ip: { validator: validate.ipValidator, trigger: 'blur' }
}
```

### 端口号验证

```js
const rules = {
  port: { validator: validate.portValidator, trigger: 'blur' }
}
```

## 完整示例

```vue
<template>
  <z-form
    :form-data="formData"
    :form-items="formItems"
    :rules="formRules"
    @submit="handleSubmit"
  />
</template>

<script>
import { validate } from '@rowan287630/zhui'

export default {
  data() {
    return {
      formData: {
        username: '',
        password: '',
        phone: '',
        email: '',
        age: ''
      },
      formItems: [
        { label: '用户名', prop: 'username', type: 'input' },
        { label: '密码', prop: 'password', type: 'input', inputType: 'password' },
        { label: '手机号', prop: 'phone', type: 'input' },
        { label: '邮箱', prop: 'email', type: 'input' },
        { label: '年龄', prop: 'age', type: 'number' }
      ],
      formRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: validate.usernameValidator, trigger: 'blur' }
        ],
        password: validate.rules.passwordRequired,
        phone: validate.rules.phoneRequired,
        email: validate.rules.emailRequired,
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { validator: validate.rangeValidator(1, 120), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit(data) {
      console.log('提交', data)
    }
  }
}
</script>
```

## API

### 验证器函数

| 函数名 | 说明 | 参数 |
| --- | --- | --- |
| phoneValidator | 手机号验证 | rule, value, callback |
| emailValidator | 邮箱验证 | rule, value, callback |
| idCardValidator | 身份证验证 | rule, value, callback |
| urlValidator | 网址验证 | rule, value, callback |
| passwordValidator | 密码验证 | rule, value, callback |
| integerValidator | 整数验证 | rule, value, callback |
| positiveIntegerValidator | 正整数验证 | rule, value, callback |
| positiveNumberValidator | 正数验证 | rule, value, callback |
| rangeValidator(min, max) | 范围验证 | 返回验证器函数 |
| lengthValidator(min, max) | 长度验证 | 返回验证器函数 |
| chineseValidator | 中文验证 | rule, value, callback |
| englishValidator | 英文验证 | rule, value, callback |
| usernameValidator | 用户名验证 | rule, value, callback |
| ipValidator | IP地址验证 | rule, value, callback |
| portValidator | 端口号验证 | rule, value, callback |

### 预定义规则

| 规则名 | 说明 |
| --- | --- |
| rules.required | 必填规则 |
| rules.phone | 手机号规则（可选） |
| rules.phoneRequired | 手机号规则（必填） |
| rules.email | 邮箱规则（可选） |
| rules.emailRequired | 邮箱规则（必填） |
| rules.idCard | 身份证规则（可选） |
| rules.idCardRequired | 身份证规则（必填） |
| rules.url | 网址规则（可选） |
| rules.urlRequired | 网址规则（必填） |
| rules.password | 密码规则（可选） |
| rules.passwordRequired | 密码规则（必填） |
| rules.username | 用户名规则（可选） |
| rules.usernameRequired | 用户名规则（必填） |
