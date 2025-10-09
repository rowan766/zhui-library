# Permission 权限控制

内置完善的权限控制功能，支持按钮级别的权限管理。

## 快速开始

### 1. 初始化权限

在应用入口设置用户权限：

```js
import Vue from 'vue'
import ZhuiUI, { permissionManager } from '@rowan287630/zhui'

Vue.use(ZhuiUI)

// 设置用户权限列表（通常从后端获取）
permissionManager.setPermissions([
  'user:add',
  'user:edit',
  'user:delete',
  'user:view'
])
```

### 2. 使用权限指令

```vue
<template>
  <div>
    <!-- 单个权限 -->
    <el-button v-permission="'user:add'" type="primary">
      新增用户
    </el-button>

    <!-- 多个权限（有一个即可显示） -->
    <el-button v-permission="['user:edit', 'user:delete']">
      批量操作
    </el-button>

    <!-- 多个权限（需要全部拥有） -->
    <el-button v-permission:every="['user:edit', 'user:delete']">
      高级操作
    </el-button>
  </div>
</template>
```

### 3. 在组件中使用

#### Table 操作按钮

```vue
<z-table
  :table-data="tableData"
  :columns="columns"
  show-operation
  :operation-buttons="operationButtons"
/>
```

```js
export default {
  data() {
    return {
      operationButtons: [
        {
          label: '编辑',
          permission: 'user:edit',
          handler: (row) => this.handleEdit(row)
        },
        {
          label: '删除',
          permission: 'user:delete',
          handler: (row) => this.handleDelete(row)
        }
      ]
    }
  }
}
```

#### Form 按钮权限

```vue
<z-form
  :form-data="formData"
  :form-items="formItems"
  :button-permissions="{
    submit: 'user:add',
    reset: null,
    cancel: null
  }"
/>
```

#### SearchForm 按钮权限

```vue
<z-search-form
  :search-data="searchData"
  :search-items="searchItems"
  :button-permissions="{
    search: 'user:search',
    reset: null
  }"
/>
```

### 4. 在 JS 中检查权限

```js
import { checkPermission, permissionManager } from '@rowan287630/zhui'

// 使用 checkPermission
if (checkPermission('user:add')) {
  // 有权限，执行操作
}

// 检查多个权限（有一个即可）
if (checkPermission(['user:add', 'user:edit'], 'some')) {
  // 有任一权限
}

// 检查多个权限（需要全部）
if (checkPermission(['user:add', 'user:edit'], 'every')) {
  // 拥有全部权限
}

// 使用 permissionManager
if (permissionManager.has('user:add')) {
  // 有权限
}

if (permissionManager.hasAny(['user:add', 'user:edit'])) {
  // 有任一权限
}

if (permissionManager.hasAll(['user:add', 'user:edit'])) {
  // 拥有全部权限
}
```

## 高级用法

### 动态更新权限

```js
import { permissionManager } from '@rowan287630/zhui'

// 设置新的权限列表
permissionManager.setPermissions(['user:view', 'user:edit'])

// 添加权限
permissionManager.add('user:delete')
permissionManager.add(['role:add', 'role:edit'])

// 移除权限
permissionManager.remove('user:delete')
permissionManager.remove(['role:add', 'role:edit'])

// 清空所有权限
permissionManager.clear()
```

### 自定义权限检查函数

```js
import { permissionManager } from '@rowan287630/zhui'

permissionManager.setCheckFunction((permission, userPermissions) => {
  // 自定义权限检查逻辑
  if (Array.isArray(permission)) {
    return permission.some(p => userPermissions.includes(p))
  }
  return userPermissions.includes(permission)
})
```

### 动态操作按钮

```js
export default {
  data() {
    return {
      // 根据行数据返回不同的按钮
      operationButtons: (row) => {
        const buttons = [
          {
            label: '查看',
            permission: 'user:view',
            handler: (row) => {}
          }
        ]

        // 只有管理员才显示编辑和删除按钮
        if (row.role === 'admin') {
          buttons.push(
            {
              label: '编辑',
              permission: 'user:edit',
              handler: (row) => {}
            },
            {
              label: '删除',
              permission: 'user:delete',
              handler: (row) => {}
            }
          )
        }

        return buttons
      }
    }
  }
}
```

## API

### permissionManager

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| setPermissions | 设置权限列表 | (permissions: string[]) | - |
| has | 检查权限 | (permission, mode?) | Boolean |
| hasAny | 检查任一权限 | (permissions: string[]) | Boolean |
| hasAll | 检查全部权限 | (permissions: string[]) | Boolean |
| add | 添加权限 | (permission) | - |
| remove | 移除权限 | (permission) | - |
| clear | 清空权限 | - | - |
| getPermissions | 获取权限列表 | - | string[] |
| setCheckFunction | 设置检查函数 | (fn: Function) | - |

### checkPermission

```js
checkPermission(permission: string | string[], mode?: 'some' | 'every'): boolean
```

检查权限是否满足。

- `permission`: 权限码或权限码数组
- `mode`: 检查模式，`some`（有一个即可）或 `every`（需要全部）

### v-permission 指令

```vue
<!-- 单个权限 -->
<div v-permission="'user:add'">内容</div>

<!-- 多个权限（有一个即可） -->
<div v-permission="['user:add', 'user:edit']">内容</div>

<!-- 多个权限（需要全部） -->
<div v-permission:every="['user:add', 'user:edit']">内容</div>
```
