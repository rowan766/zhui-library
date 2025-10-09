# Zhui Library

基于 Element UI 封装的 Vue 2 组件库

[![npm version](https://img.shields.io/npm/v/@rowan287630/zhui.svg)](https://www.npmjs.com/package/@rowan287630/zhui)
[![npm downloads](https://img.shields.io/npm/dm/@rowan287630/zhui.svg)](https://www.npmjs.com/package/@rowan287630/zhui)
[![license](https://img.shields.io/npm/l/@rowan287630/zhui.svg)](https://github.com/rowan766/zhui-library/blob/main/LICENSE)

## ✨ 特性

- 🚀 **开箱即用** - 基于 Element UI 二次封装，保持原有 API，降低学习成本
- 📦 **按需引入** - 支持完整引入和按需引入，优化项目体积
- 🛠️ **易于扩展** - 组件化设计，方便自定义和扩展
- 📖 **详细文档** - 提供完整的使用文档和示例

## 📦 安装

```bash
# npm
npm install @rowan287630/zhui element-ui vue

# pnpm
pnpm add @rowan287630/zhui element-ui vue

# yarn
yarn add @rowan287630/zhui element-ui vue
```

## 🚀 快速开始

### 完整引入

```js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Zhui from '@rowan287630/zhui'

Vue.use(ElementUI)
Vue.use(Zhui)
```

### 按需引入

```js
import Vue from 'vue'
import { Button } from 'element-ui'
import { MyButton } from '@rowan287630/zhui'

Vue.component(Button.name, Button)
Vue.component(MyButton.name, MyButton)
```

### CDN 引入

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-ui@2.15.14/lib/theme-chalk/index.css">

<!-- 引入 Vue -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
<!-- 引入 Element UI -->
<script src="https://cdn.jsdelivr.net/npm/element-ui@2.15.14/lib/index.js"></script>
<!-- 引入 Zhui -->
<script src="https://unpkg.com/@rowan287630/zhui@latest/dist/index.js"></script>

<script>
  Vue.use(ELEMENT)
  Vue.use(Zhui)

  new Vue({
    el: '#app'
  })
</script>
```

## 📚 组件列表

- **MyButton** - 基于 el-button 封装的按钮组件

## 🔨 开发

```bash
# 安装依赖
pnpm install

# 构建组件库
pnpm build

# 清理构建产物
pnpm clean
```

## 📝 版本管理

本项目使用 [Changesets](https://github.com/changesets/changesets) 进行版本管理。

```bash
# 创建变更集
pnpm changeset

# 更新版本号
pnpm version

# 发布到 npm
pnpm release
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

[MIT](./LICENSE)

## 🔗 相关链接

- [Element UI](https://element.eleme.io/)
- [Vue 2](https://v2.vuejs.org/)
- [npm 包地址](https://www.npmjs.com/package/@rowan287630/zhui)
