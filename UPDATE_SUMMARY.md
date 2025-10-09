# Zhui 组件库更新总结

## 🎉 更新概览

本次更新大幅扩展了组件库的功能，新增了 4 个常用组件和 4 类实用工具方法，并完善了文档系统。

## 📦 新增组件（4个）

### 1. ZUpload - 文件上传组件
**功能特性：**
- 支持多种上传方式（按钮、拖拽、图片卡片）
- 文件大小和类型限制
- 图片预览功能
- 自动/手动上传模式
- 上传进度显示

**使用示例：**
```vue
<z-upload
  action="/api/upload"
  :max-size="5"
  :allowed-types="['jpg', 'png', 'pdf']"
  list-type="picture-card"
  @success="handleSuccess"
/>
```

### 2. ZImagePreview - 图片预览组件
**功能特性：**
- 批量图片展示
- 悬浮遮罩效果
- 支持删除操作
- 懒加载支持
- 自定义尺寸

**使用示例：**
```vue
<z-image-preview
  :image-list="images"
  :width="100"
  :height="100"
  show-delete
  @delete="handleDelete"
/>
```

### 3. ZEmpty - 空状态组件
**功能特性：**
- 自定义图片和描述
- 可调整大小
- 支持插槽自定义内容
- 内置默认图标

**使用示例：**
```vue
<z-empty description="暂无数据">
  <el-button type="primary">添加数据</el-button>
</z-empty>
```

### 4. ZSteps - 步骤条组件
**功能特性：**
- 封装 Element UI Steps
- 集成操作按钮（上一步/下一步/提交）
- 前置钩子验证
- 加载状态支持
- 自定义插槽

**使用示例：**
```vue
<z-steps
  :active.sync="active"
  :steps="steps"
  :before-next="beforeNext"
  @submit="handleSubmit"
/>
```

## 🛠️ 新增工具方法（4类）

### 1. validate - 表单验证工具
提供 15+ 常用验证器和预定义规则：
- 手机号、邮箱、身份证、网址验证
- 密码强度、用户名验证
- 整数、正数、范围验证
- 长度、IP、端口验证
- 中文、英文验证

**使用示例：**
```js
import { validate } from '@rowan287630/zhui'

const formRules = {
  phone: validate.rules.phoneRequired,
  email: validate.rules.emailRequired,
  age: { validator: validate.rangeValidator(1, 120), trigger: 'blur' }
}
```

### 2. format - 数据格式化工具
提供 15+ 格式化方法：
- 日期时间格式化（支持自定义格式、相对时间）
- 文件大小、金额、数字格式化
- 手机号、身份证脱敏
- 银行卡格式化
- 文本处理（截断、大小写、命名转换）

**使用示例：**
```js
import { format } from '@rowan287630/zhui'

format.formatDate(new Date(), 'YYYY-MM-DD')  // '2024-01-01'
format.formatMoney(1234.56)                  // '¥1,234.56'
format.formatPhone('13812345678')            // '138****5678'
format.formatFileSize(1024 * 1024)           // '1 MB'
```

### 3. storage - 本地存储工具
封装 localStorage 和 sessionStorage：
- 支持过期时间
- 自动 JSON 序列化
- 自定义前缀隔离
- 异常处理
- SSR 兼容

**使用示例：**
```js
import { storage } from '@rowan287630/zhui'

// 永久存储
storage.local.set('user', { name: '张三' })

// 1小时后过期
storage.local.set('token', 'abc123', 3600)

// 获取数据
const user = storage.local.get('user')
```

### 4. request - HTTP 请求工具
基于 Fetch API 封装：
- 请求/响应拦截器
- 超时控制
- 自动 JSON 处理
- 支持多种 HTTP 方法
- 错误统一处理

**使用示例：**
```js
import { request } from '@rowan287630/zhui'

// 创建 API 实例
const api = request.createRequest({
  baseURL: 'https://api.example.com',
  timeout: 10000
})

// 添加拦截器
request.addRequestInterceptor(config => {
  config.headers['Authorization'] = `Bearer ${token}`
  return config
})

// 发起请求
api.get('/users', { page: 1 }).then(res => console.log(res.data))
```

## 📚 文档系统更新

### 更新内容
1. **重构 VuePress 配置**
   - 重新组织侧边栏结构
   - 按功能分类（基础组件、数据展示、表单组件、工具方法、其他）
   - 更新导航链接

2. **创建完整组件文档**（17个文档页面）
   - 12 个组件文档（form、table、dialog、search-form、descriptions、card、page-header、chart、upload、image-preview、empty、steps）
   - 4 个工具方法文档（validate、format、storage、request）
   - 1 个权限控制文档（permission）

3. **更新指南页面**
   - 更新首页特性介绍
   - 完善快速开始指南
   - 添加组件和工具使用示例
   - 添加 ECharts 安装说明

### 文档特点
- ✅ 每个组件/工具都有详细文档
- ✅ 包含基础用法和进阶示例
- ✅ 完整的 Props、Events、Methods API 文档
- ✅ 实战导向的代码示例
- ✅ 支持 SSR 构建

## 🔧 技术改进

### SSR 兼容性
修复了服务端渲染（SSR）问题：
- 在 `storage.js` 中添加环境检测
- 创建 MockStorage 用于 SSR 环境
- 确保文档可以正常构建

### 依赖管理
- 将 `echarts` 添加到 `peerDependencies`
- 设置为可选依赖（optional），不使用图表组件时无需安装

## 📊 当前统计

### 组件总数：12 个
**基础组件（7个）：**
- ZForm, ZTable, ZDialog, ZSearchForm, ZDescriptions, ZCard, ZPageHeader

**数据展示（3个）：**
- ZChart, ZImagePreview, ZEmpty

**表单组件（2个）：**
- ZUpload, ZSteps

### 工具方法：4 类
- validate（15+ 验证器）
- format（15+ 格式化方法）
- storage（localStorage/sessionStorage 封装）
- request（HTTP 请求封装）

### 特色功能
- ✅ 权限控制系统
- ✅ v-permission 指令
- ✅ 配置驱动开发
- ✅ 完整的文档系统
- ✅ SSR 兼容

## 🚀 使用方式

### 安装
```bash
npm install @rowan287630/zhui element-ui vue

# 如果使用图表组件
npm install echarts
```

### 完整引入
```js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Zhui, { permissionManager } from '@rowan287630/zhui'

Vue.use(ElementUI)
Vue.use(Zhui)

// 设置权限
permissionManager.setPermissions(['user:add', 'user:edit'])
```

### 按需引入
```js
import {
  ZForm,
  ZTable,
  ZUpload,
  validate,
  format,
  storage
} from '@rowan287630/zhui'

Vue.component(ZForm.name, ZForm)
Vue.component(ZTable.name, ZTable)
Vue.component(ZUpload.name, ZUpload)
```

## 📝 文档地址

启动文档服务：
```bash
pnpm docs:dev
```

构建文档：
```bash
pnpm docs:build
```

## ✅ 测试验证

- ✅ 组件库构建成功
- ✅ 文档构建成功（SSR 兼容）
- ✅ 所有 17 个文档页面生成完成
- ✅ peerDependencies 配置正确

## 🎯 后续计划

1. 添加更多业务组件（如：富文本编辑器、地图组件等）
2. 完善单元测试
3. 添加 TypeScript 类型定义
4. 优化构建配置
5. 发布到 npm

## 📖 相关文档

- [组件使用文档](./packages/components/COMPONENTS.md)
- [权限控制文档](./packages/components/PERMISSION.md)
- [在线文档](https://rowan766.github.io/zhui-library/)

---

**版本：** 0.2.0
**更新日期：** 2025-01-09
**维护者：** rowan287630
