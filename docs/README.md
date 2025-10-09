---
home: true
heroImage: /logo.png
heroText: Zhui 组件库
tagline: 基于 Element UI 的 Vue 2 企业级组件库
actionText: 快速开始 →
actionLink: /guide/
features:
  - title: 🚀 开箱即用
    details: 基于 Element UI 二次封装，12+ 实用组件，降低开发成本
  - title: 📦 配置驱动
    details: 通过配置快速生成表单、表格等复杂组件，减少重复代码
  - title: 🔐 权限控制
    details: 内置完善的权限管理系统，支持按钮级别的权限控制
  - title: 🛠️ 实用工具
    details: 提供验证、格式化、存储、请求等常用工具方法
  - title: 📊 图表支持
    details: 集成 ECharts 图表组件，支持自动 resize 和事件转发
  - title: 💼 企业级
    details: 适用于中后台管理系统，覆盖常见业务场景
footer: MIT Licensed | Copyright © 2025 rowan287630
---
## 快速开始

### 安装

```bash
npm install @rowan287630/zhui element-ui vue
```

### 使用

```js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Zhui from '@rowan287630/zhui'

Vue.use(ElementUI)
Vue.use(Zhui)
```
