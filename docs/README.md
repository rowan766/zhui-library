---
home: true
heroImage: /logo.png
heroText: Zhui 组件库
tagline: 基于 Element UI 的 Vue 2 组件库
actionText: 快速开始 →
actionLink: /guide/
features:
  - title: 🚀 开箱即用
    details: 基于 Element UI 二次封装，保持原有 API，降低学习成本
  - title: 📦 按需引入
    details: 支持完整引入和按需引入，优化项目体积
  - title: 🛠️ TypeScript 支持
    details: 使用 TypeScript 开发，提供完整的类型定义文件
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
