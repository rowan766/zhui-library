# 快速开始

本节将介绍如何在项目中使用 Zhui 组件库。

## 完整引入

在 main.js 中写入以下内容：

```js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Zhui, { permissionManager } from '@rowan287630/zhui'
import App from './App.vue'

// 引入 Element UI
Vue.use(ElementUI)

// 引入 Zhui 组件库
Vue.use(Zhui)

// 设置用户权限（可选，如果使用权限功能）
permissionManager.setPermissions([
  'user:add',
  'user:edit',
  'user:delete',
  'user:view'
])

new Vue({
  el: '#app',
  render: h => h(App)
})
```

以上代码便完成了 Zhui 的引入。

## 按需引入

如果你只希望引入部分组件，可以按需引入：

```js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {
  ZForm,
  ZTable,
  ZDialog,
  permissionManager,
  validate,
  format
} from '@rowan287630/zhui'
import App from './App.vue'

Vue.use(ElementUI)

// 注册组件
Vue.component(ZForm.name, ZForm)
Vue.component(ZTable.name, ZTable)
Vue.component(ZDialog.name, ZDialog)

// 设置权限
permissionManager.setPermissions(['user:add', 'user:edit'])

new Vue({
  el: '#app',
  render: h => h(App)
})
```

## 使用 ECharts 组件

如果需要使用 ZChart 图表组件，需要先安装 ECharts：

```bash
npm install echarts
```

在 main.js 中引入：

```js
import * as echarts from 'echarts'
window.echarts = echarts
```

然后就可以使用 ZChart 组件了：

```vue
<template>
  <z-chart :option="chartOption" :height="400" />
</template>
```

## 使用工具方法

```js
import { validate, format, storage, request } from '@rowan287630/zhui'

// 使用验证工具
const rules = {
  phone: validate.rules.phoneRequired,
  email: validate.rules.emailRequired
}

// 使用格式化工具
const formattedDate = format.formatDate(new Date())
const formattedMoney = format.formatMoney(1234.56)

// 使用存储工具
storage.local.set('user', { name: '张三' })
const user = storage.local.get('user')

// 使用请求工具
request.get('/api/users').then(res => {
  console.log(res.data)
})
```

## 开始使用

至此，一个基于 Vue 和 Zhui 的开发环境已经搭建完毕，现在就可以编写代码了。

### 创建一个表单

```vue
<template>
  <z-form
    :form-data="formData"
    :form-items="formItems"
    @submit="handleSubmit"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: ''
      },
      formItems: [
        { label: '姓名', prop: 'name', type: 'input', required: true },
        { label: '邮箱', prop: 'email', type: 'input', required: true }
      ]
    }
  },
  methods: {
    handleSubmit(data) {
      console.log('提交数据', data)
    }
  }
}
</script>
```

### 创建一个表格

```vue
<template>
  <z-table
    :table-data="tableData"
    :columns="columns"
    show-operation
    :operation-buttons="operationButtons"
  />
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { id: 1, name: '张三', age: 28 },
        { id: 2, name: '李四', age: 32 }
      ],
      columns: [
        { label: 'ID', prop: 'id', width: 80 },
        { label: '姓名', prop: 'name' },
        { label: '年龄', prop: 'age' }
      ],
      operationButtons: [
        {
          label: '编辑',
          permission: 'user:edit',
          handler: (row) => console.log('编辑', row)
        },
        {
          label: '删除',
          permission: 'user:delete',
          handler: (row) => console.log('删除', row)
        }
      ]
    }
  }
}
</script>
```

各个组件的详细使用方法请参阅它们各自的文档。
