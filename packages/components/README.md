# @rowan287630/zhui

基于 Element UI 的 Vue 2 组件库

[![npm version](https://img.shields.io/npm/v/@rowan287630/zhui.svg)](https://www.npmjs.com/package/@rowan287630/zhui)
[![npm downloads](https://img.shields.io/npm/dm/@rowan287630/zhui.svg)](https://www.npmjs.com/package/@rowan287630/zhui)
[![license](https://img.shields.io/npm/l/@rowan287630/zhui.svg)](https://github.com/rowan766/zhui-library/blob/main/LICENSE)

## ✨ 特性

- 基于 Element UI 二次封装
- 保持 Element UI 原有 API
- 支持完整引入和按需引入
- 提供 ES Module、CommonJS、UMD 三种格式

## 📦 安装

```bash
# npm
npm install @rowan287630/zhui element-ui vue

# pnpm
pnpm add @rowan287630/zhui element-ui vue

# yarn
yarn add @rowan287630/zhui element-ui vue
```

## 🚀 使用

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
import { MyButton } from '@rowan287630/zhui'

Vue.component(MyButton.name, MyButton)
```

### CDN 引入

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-ui@2.15.14/lib/theme-chalk/index.css">
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/element-ui@2.15.14/lib/index.js"></script>
<script src="https://unpkg.com/@rowan287630/zhui@latest/dist/index.js"></script>

<script>
  Vue.use(ELEMENT)
  Vue.use(Zhui)
</script>
```

## 📚 组件

### MyButton

基于 `el-button` 封装的按钮组件，支持所有 Element UI Button 的属性和事件。

```vue
<template>
  <div>
    <my-button>默认按钮</my-button>
    <my-button type="primary">主要按钮</my-button>
    <my-button type="success" size="small">成功按钮</my-button>
  </div>
</template>
```

#### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 按钮类型 | string | default |
| size | 按钮尺寸 | string | medium |
| ... | 支持所有 el-button 的属性 | - | - |

#### Events

继承 `el-button` 的所有事件，如 `click`、`focus` 等。

## 🔨 开发

```bash
# 构建
pnpm build

# 清理
pnpm clean
```

## 📝 Changelog

详见 [CHANGELOG.md](./CHANGELOG.md)

## 📄 License

[MIT](../../LICENSE)
