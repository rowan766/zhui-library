# Storage 存储工具

封装 localStorage 和 sessionStorage，支持过期时间、自动序列化等功能。

## 基础用法

```js
import { storage } from '@rowan287630/zhui'

// localStorage 操作
storage.local.set('key', 'value')
storage.local.get('key')
storage.local.remove('key')
storage.local.clear()
storage.local.has('key')

// sessionStorage 操作
storage.session.set('key', 'value')
storage.session.get('key')
```

## 存储对象

自动进行 JSON 序列化和反序列化：

```js
const user = { name: '张三', age: 25 }

// 存储对象
storage.local.set('user', user)

// 获取对象
const savedUser = storage.local.get('user')
console.log(savedUser) // { name: '张三', age: 25 }
```

## 过期时间

设置过期时间（单位：秒）：

```js
// 存储 1 小时后过期
storage.local.set('token', 'abc123', 3600)

// 存储 30 分钟后过期
storage.local.set('temp', 'data', 1800)

// 获取时自动检查过期
const token = storage.local.get('token')
// 如果已过期，返回 null
```

## 默认值

```js
// 如果 key 不存在，返回默认值
const value = storage.local.get('notExist', 'default')
console.log(value) // 'default'

const user = storage.local.get('user', { name: '游客' })
```

## 检查是否存在

```js
if (storage.local.has('token')) {
  console.log('已登录')
}
```

## 获取所有键名

```js
const keys = storage.local.keys()
console.log(keys) // ['user', 'token', ...]
```

## 获取存储大小

```js
const size = storage.local.getSize()
console.log(`当前存储大小: ${size} 字节`)
```

## 清空存储

```js
// 清空所有带前缀的项（不影响其他应用的存储）
storage.local.clear()
```

## 自定义前缀

创建独立的存储实例，避免命名冲突：

```js
import { storage } from '@rowan287630/zhui'

// 创建自定义前缀的 localStorage 实例
const myStorage = storage.createStorage('myapp_')
myStorage.set('user', { name: '张三' })

// 创建自定义前缀的 sessionStorage 实例
const mySession = storage.createStorage('myapp_', true)
mySession.set('temp', 'data')
```

## 实际应用

### 用户信息管理

```js
import { storage } from '@rowan287630/zhui'

// 登录后保存用户信息和 token
export function login(username, password) {
  return api.login({ username, password }).then(res => {
    // 保存用户信息（永久）
    storage.local.set('userInfo', res.userInfo)
    
    // 保存 token（2 小时后过期）
    storage.local.set('token', res.token, 7200)
    
    return res
  })
}

// 登出时清空
export function logout() {
  storage.local.remove('userInfo')
  storage.local.remove('token')
}

// 检查是否登录
export function isLogin() {
  return storage.local.has('token')
}

// 获取用户信息
export function getUserInfo() {
  return storage.local.get('userInfo')
}
```

### 表单数据缓存

```js
export default {
  data() {
    return {
      formData: storage.session.get('formData', {
        name: '',
        email: ''
      })
    }
  },
  watch: {
    formData: {
      handler(val) {
        // 实时缓存表单数据
        storage.session.set('formData', val)
      },
      deep: true
    }
  },
  methods: {
    handleSubmit() {
      // 提交成功后清除缓存
      storage.session.remove('formData')
    }
  }
}
```

## API

### storage.local

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| set | 设置存储 | (key, value, expire?) | Boolean |
| get | 获取存储 | (key, defaultValue?) | Any |
| remove | 删除存储 | (key) | Boolean |
| clear | 清空存储 | - | Boolean |
| has | 是否存在 | (key) | Boolean |
| keys | 获取所有键名 | - | Array |
| getSize | 获取存储大小 | - | Number |

### storage.session

与 `storage.local` 相同的 API。

### storage.createStorage

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prefix | 存储前缀 | String | - |
| useSession | 是否使用 sessionStorage | Boolean | false |

返回一个新的存储实例，具有与 `storage.local` 相同的 API。
