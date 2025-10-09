# 权限控制使用指南

组件库内置了完善的权限控制功能，可以轻松实现按钮级别的权限控制。

## 快速开始

### 1. 初始化权限

在应用入口（如 `main.js`）中设置用户权限：

```javascript
import Vue from 'vue'
import ZhuiUI, { permissionManager } from '@rowan287630/zhui'

Vue.use(ZhuiUI)

// 设置用户权限列表（通常从后端获取）
permissionManager.setPermissions([
  'user:add',
  'user:edit',
  'user:delete',
  'user:view',
  'role:add',
  'role:edit'
])
```

### 2. 在 Table 组件中使用权限

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
        { id: 1, name: '张三', role: '管理员' },
        { id: 2, name: '李四', role: '普通用户' }
      ],
      columns: [
        { label: 'ID', prop: 'id' },
        { label: '姓名', prop: 'name' },
        { label: '角色', prop: 'role' }
      ],
      operationButtons: [
        {
          label: '编辑',
          type: 'text',
          permission: 'user:edit', // 需要编辑权限
          handler: (row) => {
            console.log('编辑', row)
          }
        },
        {
          label: '删除',
          type: 'text',
          permission: 'user:delete', // 需要删除权限
          handler: (row) => {
            console.log('删除', row)
          }
        },
        {
          label: '查看',
          type: 'text',
          permission: 'user:view', // 需要查看权限
          handler: (row) => {
            console.log('查看', row)
          }
        }
      ]
    }
  }
}
</script>
```

### 3. 在 Form 组件中使用权限

```vue
<template>
  <z-form
    :form-data="formData"
    :form-items="formItems"
    :button-permissions="buttonPermissions"
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
        { label: '姓名', prop: 'name', type: 'input' },
        { label: '邮箱', prop: 'email', type: 'input' }
      ],
      // 配置按钮权限
      buttonPermissions: {
        submit: 'user:add',  // 提交按钮需要添加权限
        reset: null,         // 重置按钮不需要权限
        cancel: null         // 取消按钮不需要权限
      }
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

### 4. 在 SearchForm 组件中使用权限

```vue
<template>
  <z-search-form
    :search-data="searchData"
    :search-items="searchItems"
    :button-permissions="buttonPermissions"
    @search="handleSearch"
  />
</template>

<script>
export default {
  data() {
    return {
      searchData: {
        keyword: '',
        status: ''
      },
      searchItems: [
        { label: '关键词', prop: 'keyword', type: 'input' },
        { label: '状态', prop: 'status', type: 'select', options: [] }
      ],
      buttonPermissions: {
        search: 'user:search',  // 搜索按钮需要搜索权限
        reset: null             // 重置按钮不需要权限
      }
    }
  },
  methods: {
    handleSearch(data) {
      console.log('搜索', data)
    }
  }
}
</script>
```

### 5. 使用权限指令

除了组件内置的权限控制，还可以使用 `v-permission` 指令：

```vue
<template>
  <div>
    <!-- 单个权限 -->
    <el-button v-permission="'user:add'" type="primary">
      新增用户
    </el-button>

    <!-- 多个权限（有一个即可显示） -->
    <el-button v-permission="['user:edit', 'user:delete']" type="danger">
      批量操作
    </el-button>

    <!-- 多个权限（需要全部拥有） -->
    <el-button v-permission:every="['user:edit', 'user:delete']" type="warning">
      高级操作
    </el-button>
  </div>
</template>
```

## 高级用法

### 自定义权限检查函数

如果你的权限逻辑比较复杂，可以自定义权限检查函数：

```javascript
import { permissionManager } from '@rowan287630/zhui'

// 设置自定义检查函数
permissionManager.setCheckFunction((permission, userPermissions) => {
  // 自定义权限检查逻辑
  // permission: 需要的权限（可能是字符串或数组）
  // userPermissions: 用户拥有的权限列表

  if (Array.isArray(permission)) {
    // 处理多个权限的情况
    return permission.some(p => userPermissions.includes(p))
  }

  // 单个权限的情况
  return userPermissions.includes(permission)
})
```

### 动态更新权限

在用户登录或权限变更时，可以动态更新权限：

```javascript
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

### 在 JS 中检查权限

```javascript
import { checkPermission, permissionManager } from '@rowan287630/zhui'

// 检查单个权限
if (checkPermission('user:add')) {
  // 有权限，执行操作
}

// 检查多个权限（有一个即可）
if (checkPermission(['user:add', 'user:edit'], 'some')) {
  // 有任一权限，执行操作
}

// 检查多个权限（需要全部）
if (checkPermission(['user:add', 'user:edit'], 'every')) {
  // 拥有全部权限，执行操作
}

// 使用 permissionManager 的方法
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

## Table 操作按钮配置详解

### 基础配置

```javascript
operationButtons: [
  {
    label: '编辑',           // 按钮文字
    type: 'text',            // 按钮类型
    size: 'small',           // 按钮尺寸
    icon: 'el-icon-edit',    // 按钮图标
    permission: 'user:edit', // 权限码
    handler: (row, index) => {
      // 点击处理函数
    }
  }
]
```

### 动态按钮

```javascript
operationButtons: (row) => {
  // 根据行数据返回不同的按钮
  const buttons = [
    {
      label: '查看',
      permission: 'user:view',
      handler: (row) => {}
    }
  ]

  // 只有管理员才显示编辑和删除按钮
  if (row.role === 'admin') {
    buttons.push({
      label: '编辑',
      permission: 'user:edit',
      handler: (row) => {}
    })
    buttons.push({
      label: '删除',
      permission: 'user:delete',
      handler: (row) => {}
    })
  }

  return buttons
}
```

### 多权限模式

```javascript
{
  label: '高级操作',
  permission: ['user:edit', 'user:delete'], // 多个权限
  permissionMode: 'every',  // 'some'（有一个即可）或 'every'（需要全部）
  handler: (row) => {}
}
```

## 注意事项

1. **权限初始化**：确保在应用启动时设置用户权限，通常在登录成功后从后端获取
2. **权限更新**：当用户权限变更时，及时更新权限列表
3. **默认行为**：如果没有设置权限列表，所有按钮默认都会显示
4. **性能考虑**：权限检查是同步的，不会影响性能

## 完整示例

```vue
<template>
  <div>
    <z-page-header title="用户管理">
      <template #extra>
        <el-button v-permission="'user:add'" type="primary" @click="handleAdd">
          新增用户
        </el-button>
      </template>
    </z-page-header>

    <z-card>
      <z-search-form
        :search-data="searchData"
        :search-items="searchItems"
        :button-permissions="{ search: 'user:search' }"
        @search="handleSearch"
      />

      <z-table
        :table-data="tableData"
        :columns="columns"
        show-operation
        :operation-buttons="operationButtons"
      />
    </z-card>

    <z-dialog
      :visible.sync="dialogVisible"
      title="编辑用户"
      @confirm="handleSave"
    >
      <z-form
        :form-data="formData"
        :form-items="formItems"
        :button-permissions="{ submit: 'user:edit' }"
        @submit="handleSave"
      />
    </z-dialog>
  </div>
</template>

<script>
import { checkPermission } from '@rowan287630/zhui'

export default {
  data() {
    return {
      searchData: { keyword: '' },
      searchItems: [
        { label: '关键词', prop: 'keyword', type: 'input' }
      ],
      tableData: [],
      columns: [
        { label: 'ID', prop: 'id' },
        { label: '姓名', prop: 'name' }
      ],
      operationButtons: [
        {
          label: '编辑',
          permission: 'user:edit',
          handler: this.handleEdit
        },
        {
          label: '删除',
          permission: 'user:delete',
          handler: this.handleDelete
        }
      ],
      dialogVisible: false,
      formData: {},
      formItems: []
    }
  },
  methods: {
    handleAdd() {
      if (!checkPermission('user:add')) {
        this.$message.warning('没有权限')
        return
      }
      // 执行添加操作
    },
    handleEdit(row) {
      this.formData = { ...row }
      this.dialogVisible = true
    },
    handleDelete(row) {
      this.$confirm('确认删除？').then(() => {
        // 执行删除
      })
    },
    handleSearch(data) {
      // 执行搜索
    },
    handleSave(data) {
      // 保存数据
    }
  }
}
</script>
```

## 总结

通过内置的权限控制功能，你可以轻松实现：

✅ 按钮级别的权限控制
✅ 动态显示/隐藏功能
✅ 灵活的权限检查逻辑
✅ 统一的权限管理

让你的管理系统权限控制更加简单和优雅！
