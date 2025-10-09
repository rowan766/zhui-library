# Table 表格

基于 Element UI Table 的二次封装，支持配置化列定义、分页、操作按钮权限控制等功能。

## 基础用法

```vue
<template>
  <z-table
    :table-data="tableData"
    :columns="columns"
  />
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { id: 1, name: '张三', age: 28, address: '上海市' },
        { id: 2, name: '李四', age: 32, address: '北京市' }
      ],
      columns: [
        { label: 'ID', prop: 'id', width: 80 },
        { label: '姓名', prop: 'name' },
        { label: '年龄', prop: 'age' },
        { label: '地址', prop: 'address' }
      ]
    }
  }
}
</script>
```

## 带分页

```vue
<template>
  <z-table
    :table-data="tableData"
    :columns="columns"
    :pagination="pagination"
    @current-change="handlePageChange"
    @size-change="handleSizeChange"
  />
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      columns: [],
      pagination: {
        total: 100,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    handlePageChange(page) {
      this.pagination.currentPage = page
      this.loadData()
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.loadData()
    }
  }
}
</script>
```

## 操作列

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
      operationButtons: [
        {
          label: '编辑',
          type: 'text',
          permission: 'user:edit',
          handler: (row) => {
            console.log('编辑', row)
          }
        },
        {
          label: '删除',
          type: 'text',
          permission: 'user:delete',
          handler: (row) => {
            this.$confirm('确认删除？').then(() => {
              console.log('删除', row)
            })
          }
        }
      ]
    }
  }
}
</script>
```

## 自定义列

```vue
<template>
  <z-table :table-data="tableData" :columns="columns">
    <template #status="{ row }">
      <el-tag :type="row.status === 1 ? 'success' : 'danger'">
        {{ row.status === 1 ? '启用' : '禁用' }}
      </el-tag>
    </template>
  </z-table>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { label: '姓名', prop: 'name' },
        { label: '状态', prop: 'status', slotName: 'status' }
      ]
    }
  }
}
</script>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| table-data | 表格数据 | Array | [] |
| columns | 列配置 | Array | [] |
| loading | 加载状态 | Boolean | false |
| show-index | 是否显示序号列 | Boolean | false |
| show-selection | 是否显示多选框 | Boolean | false |
| show-operation | 是否显示操作列 | Boolean | false |
| operation-width | 操作列宽度 | String/Number | '150px' |
| operation-buttons | 操作按钮配置 | Array/Function | [] |
| pagination | 分页配置 | Object/Boolean | false |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| selection-change | 多选改变 | selection |
| current-change | 页码改变 | page |
| size-change | 每页条数改变 | size |

## Column 配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 列标题 | String | - |
| prop | 字段名 | String | - |
| width | 列宽度 | String/Number | - |
| minWidth | 最小宽度 | String/Number | - |
| fixed | 固定列 | String/Boolean | - |
| sortable | 是否可排序 | Boolean | false |
| formatter | 格式化函数 | Function | - |
| slotName | 自定义插槽名 | String | - |
