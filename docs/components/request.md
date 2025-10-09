# Request 请求工具

基于 Fetch API 的请求封装，支持拦截器、超时控制等功能。

## 基础用法

```js
import { request } from '@rowan287630/zhui'

// GET 请求
request.get('/api/users', { page: 1, size: 10 })
  .then(res => console.log(res.data))

// POST 请求
request.post('/api/users', { name: '张三', age: 25 })
  .then(res => console.log(res.data))

// PUT 请求
request.put('/api/users/1', { name: '李四' })

// DELETE 请求
request.delete('/api/users/1')
```

## 创建实例

```js
import { request } from '@rowan287630/zhui'

const api = request.createRequest({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Authorization': 'Bearer token'
  }
})

// 使用实例
api.get('/users').then(res => console.log(res))
```

## 请求拦截器

```js
import { request } from '@rowan287630/zhui'

request.addRequestInterceptor(
  // 请求成功拦截
  config => {
    // 添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  // 请求失败拦截
  error => {
    console.error('请求错误', error)
    return Promise.reject(error)
  }
)
```

## 响应拦截器

```js
request.addResponseInterceptor(
  // 响应成功拦截
  response => {
    // 统一处理响应数据
    if (response.data.code === 200) {
      return response.data
    }
    return Promise.reject(response.data)
  },
  // 响应失败拦截
  error => {
    console.error('响应错误', error)
    return Promise.reject(error)
  }
)
```

## 完整示例

```js
// api/index.js
import { request, storage } from '@rowan287630/zhui'

// 创建 API 实例
const api = request.createRequest({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 10000
})

// 请求拦截器
request.addRequestInterceptor(config => {
  const token = storage.local.get('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// 响应拦截器
request.addResponseInterceptor(
  response => {
    const { data } = response
    if (data.code === 200) {
      return data
    } else if (data.code === 401) {
      // 未登录，跳转登录页
      storage.local.remove('token')
      window.location.href = '/login'
      return Promise.reject(data)
    } else {
      // 其他错误
      return Promise.reject(data)
    }
  },
  error => {
    console.error('请求失败', error)
    return Promise.reject(error)
  }
)

export default api
```

```js
// api/user.js
import api from './index'

export const getUserList = (params) => {
  return api.get('/users', params)
}

export const createUser = (data) => {
  return api.post('/users', data)
}

export const updateUser = (id, data) => {
  return api.put(`/users/${id}`, data)
}

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`)
}
```

## API

### request

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| get | GET 请求 | (url, params, options) | Promise |
| post | POST 请求 | (url, data, options) | Promise |
| put | PUT 请求 | (url, data, options) | Promise |
| delete | DELETE 请求 | (url, data, options) | Promise |
| patch | PATCH 请求 | (url, data, options) | Promise |

### createRequest

创建新的请求实例。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| baseURL | 基础URL | String | '' |
| timeout | 超时时间(ms) | Number | 10000 |
| headers | 请求头 | Object | {} |
| withCredentials | 是否携带凭证 | Boolean | false |

### addRequestInterceptor

添加请求拦截器。

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| onFulfilled | 成功回调 | Function |
| onRejected | 失败回调 | Function |

### addResponseInterceptor

添加响应拦截器。

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| onFulfilled | 成功回调 | Function |
| onRejected | 失败回调 | Function |
