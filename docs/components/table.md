# Table 表格

基于 Element UI Table 的二次封装,支持配置化列定义、分页、操作按钮权限控制等功能。

## 基础用法

通过 `columns` 和 `table-data` 配置表格。

::: demo
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
        { id: 1, name: '张三', age: 28, address: '上海市浦东新区' },
        { id: 2, name: '李四', age: 32, address: '北京市朝阳区' },
        { id: 3, name: '王五', age: 25, address: '广州市天河区' },
        { id: 4, name: '赵六', age: 35, address: '深圳市南山区' }
      ],
      columns: [
        { label: 'ID', prop: 'id', width: 80 },
        { label: '姓名', prop: 'name', width: 120 },
        { label: '年龄', prop: 'age', width: 100 },
        { label: '地址', prop: 'address' }
      ]
    }
  }
}
</script>
```
:::

## 带序号和选择框

显示序号列和多选框。

::: demo
```vue
<template>
  <div>
    <z-table
      :table-data="tableData"
      :columns="columns"
      show-index
      show-selection
      @selection-change="handleSelectionChange"
    />
    <div style="margin-top: 10px; color: #909399;">
      已选择 {{ selectedRows.length }} 项
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedRows: [],
      tableData: [
        { id: 1, name: '张三', department: '技术部', position: '前端工程师' },
        { id: 2, name: '李四', department: '产品部', position: '产品经理' },
        { id: 3, name: '王五', department: '技术部', position: '后端工程师' },
        { id: 4, name: '赵六', department: '设计部', position: 'UI设计师' }
      ],
      columns: [
        { label: '姓名', prop: 'name' },
        { label: '部门', prop: 'department' },
        { label: '职位', prop: 'position' }
      ]
    }
  },
  methods: {
    handleSelectionChange(selection) {
      this.selectedRows = selection
      console.log('选中的行:', selection)
    }
  }
}
</script>
```
:::

## 带分页

配置分页功能。

::: demo
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
      tableData: [
        { id: 1, name: '张三', email: 'zhangsan@example.com', status: 1 },
        { id: 2, name: '李四', email: 'lisi@example.com', status: 1 },
        { id: 3, name: '王五', email: 'wangwu@example.com', status: 0 },
        { id: 4, name: '赵六', email: 'zhaoliu@example.com', status: 1 },
        { id: 5, name: '孙七', email: 'sunqi@example.com', status: 0 }
      ],
      columns: [
        { label: 'ID', prop: 'id', width: 80 },
        { label: '姓名', prop: 'name', width: 120 },
        { label: '邮箱', prop: 'email' },
        { label: '状态', prop: 'status', width: 100 }
      ],
      pagination: {
        total: 50,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [5, 10, 20, 50]
      }
    }
  },
  methods: {
    handlePageChange(page) {
      this.pagination.currentPage = page
      this.$message.info(`切换到第 ${page} 页`)
      // 这里通常会重新请求数据
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.$message.info(`每页显示 ${size} 条`)
      // 这里通常会重新请求数据
    }
  }
}
</script>
```
:::

## 操作列

显示操作按钮列。

::: demo
```vue
<template>
  <z-table
    :table-data="tableData"
    :columns="columns"
    show-operation
    :operation-buttons="operationButtons"
    operation-width="200px"
  />
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { id: 1, name: '张三', age: 28, status: 1 },
        { id: 2, name: '李四', age: 32, status: 0 },
        { id: 3, name: '王五', age: 25, status: 1 }
      ],
      columns: [
        { label: 'ID', prop: 'id', width: 80 },
        { label: '姓名', prop: 'name' },
        { label: '年龄', prop: 'age' }
      ],
      operationButtons: [
        {
          label: '查看',
          type: 'text',
          handler: (row) => {
            this.$message.success(`查看: ${row.name}`)
          }
        },
        {
          label: '编辑',
          type: 'text',
          handler: (row) => {
            this.$message.success(`编辑: ${row.name}`)
          }
        },
        {
          label: '删除',
          type: 'text',
          style: { color: '#F56C6C' },
          handler: (row) => {
            this.$confirm('确认删除?', '提示', {
              type: 'warning'
            }).then(() => {
              this.$message.success(`删除: ${row.name}`)
            }).catch(() => {})
          }
        }
      ]
    }
  }
}
</script>
```
:::

## 自定义列

使用插槽自定义列内容。

::: demo
```vue
<template>
  <z-table :table-data="tableData" :columns="columns">
    <template #status="{ row }">
      <el-tag :type="row.status === 1 ? 'success' : 'danger'">
        {{ row.status === 1 ? '启用' : '禁用' }}
      </el-tag>
    </template>
    <template #avatar="{ row }">
      <el-avatar :size="40" :src="row.avatar"></el-avatar>
    </template>
    <template #progress="{ row }">
      <el-progress :percentage="row.progress" :color="getProgressColor(row.progress)"></el-progress>
    </template>
  </z-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: '张三',
          status: 1,
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          progress: 80
        },
        {
          id: 2,
          name: '李四',
          status: 0,
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          progress: 45
        },
        {
          id: 3,
          name: '王五',
          status: 1,
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          progress: 100
        }
      ],
      columns: [
        { label: '头像', prop: 'avatar', slotName: 'avatar', width: 80 },
        { label: '姓名', prop: 'name', width: 120 },
        { label: '状态', prop: 'status', slotName: 'status', width: 100 },
        { label: '进度', prop: 'progress', slotName: 'progress' }
      ]
    }
  },
  methods: {
    getProgressColor(percentage) {
      if (percentage < 50) return '#f56c6c'
      if (percentage < 80) return '#e6a23c'
      return '#67c23a'
    }
  }
}
</script>
```
:::

## 格式化内容

使用 formatter 格式化列内容。

::: demo
```vue
<template>
  <z-table :table-data="tableData" :columns="columns" />
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { id: 1, name: '张三', salary: 15000, createTime: 1609459200000, rate: 0.85 },
        { id: 2, name: '李四', salary: 18000, createTime: 1612137600000, rate: 0.92 },
        { id: 3, name: '王五', salary: 12000, createTime: 1614556800000, rate: 0.78 }
      ],
      columns: [
        { label: '姓名', prop: 'name', width: 120 },
        {
          label: '薪资',
          prop: 'salary',
          formatter: (row) => `¥${row.salary.toLocaleString()}`
        },
        {
          label: '入职时间',
          prop: 'createTime',
          formatter: (row) => {
            const date = new Date(row.createTime)
            return date.toLocaleDateString('zh-CN')
          }
        },
        {
          label: '完成率',
          prop: 'rate',
          formatter: (row) => `${(row.rate * 100).toFixed(0)}%`
        }
      ]
    }
  }
}
</script>
```
:::

## 固定列

固定列功能,横向滚动时固定某些列。

::: demo
```vue
<template>
  <z-table :table-data="tableData" :columns="columns" />
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: '张三',
          province: '广东省',
          city: '深圳市',
          district: '南山区',
          street: '科技园',
          detail: '深南大道10000号'
        },
        {
          id: 2,
          name: '李四',
          province: '浙江省',
          city: '杭州市',
          district: '西湖区',
          street: '文一路',
          detail: '文一西路969号'
        }
      ],
      columns: [
        { label: 'ID', prop: 'id', width: 80, fixed: true },
        { label: '姓名', prop: 'name', width: 120, fixed: true },
        { label: '省份', prop: 'province', width: 120 },
        { label: '城市', prop: 'city', width: 120 },
        { label: '区县', prop: 'district', width: 120 },
        { label: '街道', prop: 'street', width: 120 },
        { label: '详细地址', prop: 'detail', width: 200, fixed: 'right' }
      ]
    }
  }
}
</script>
```
:::

## 排序

支持列排序功能。

::: demo
```vue
<template>
  <z-table :table-data="tableData" :columns="columns" />
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { id: 1, name: '张三', age: 28, score: 85 },
        { id: 2, name: '李四', age: 32, score: 92 },
        { id: 3, name: '王五', age: 25, score: 78 },
        { id: 4, name: '赵六', age: 35, score: 88 },
        { id: 5, name: '孙七', age: 29, score: 95 }
      ],
      columns: [
        { label: 'ID', prop: 'id', width: 80 },
        { label: '姓名', prop: 'name', width: 120 },
        { label: '年龄', prop: 'age', sortable: true, width: 100 },
        { label: '分数', prop: 'score', sortable: true, width: 100 }
      ]
    }
  }
}
</script>
```
:::

## 加载状态

显示加载状态。

::: demo
```vue
<template>
  <div>
    <el-button @click="loading = !loading" size="small" style="margin-bottom: 10px">
      {{ loading ? '停止加载' : '开始加载' }}
    </el-button>
    <z-table
      :table-data="tableData"
      :columns="columns"
      :loading="loading"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      tableData: [
        { id: 1, name: '张三', department: '技术部' },
        { id: 2, name: '李四', department: '产品部' },
        { id: 3, name: '王五', department: '设计部' }
      ],
      columns: [
        { label: 'ID', prop: 'id', width: 80 },
        { label: '姓名', prop: 'name' },
        { label: '部门', prop: 'department' }
      ]
    }
  }
}
</script>
```
:::

## 空数据

空数据时的展示。

::: demo
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
      tableData: [],
      columns: [
        { label: 'ID', prop: 'id', width: 80 },
        { label: '姓名', prop: 'name' },
        { label: '部门', prop: 'department' }
      ]
    }
  }
}
</script>
```
:::

## 综合示例

包含序号、选择、操作列、分页的完整示例。

::: demo
```vue
<template>
  <z-table
    :table-data="tableData"
    :columns="columns"
    :pagination="pagination"
    :loading="loading"
    show-index
    show-selection
    show-operation
    :operation-buttons="operationButtons"
    @selection-change="handleSelectionChange"
    @current-change="handlePageChange"
    @size-change="handleSizeChange"
  />
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      tableData: [
        { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', status: 1 },
        { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑', status: 1 },
        { id: 3, name: '王五', email: 'wangwu@example.com', role: '访客', status: 0 }
      ],
      columns: [
        { label: '姓名', prop: 'name', width: 120 },
        { label: '邮箱', prop: 'email' },
        { label: '角色', prop: 'role', width: 100 },
        {
          label: '状态',
          prop: 'status',
          width: 100,
          formatter: (row) => row.status === 1 ? '启用' : '禁用'
        }
      ],
      pagination: {
        total: 100,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 50, 100]
      },
      operationButtons: [
        {
          label: '编辑',
          type: 'text',
          handler: (row) => {
            this.$message.success(`编辑: ${row.name}`)
          }
        },
        {
          label: '删除',
          type: 'text',
          style: { color: '#F56C6C' },
          handler: (row) => {
            this.$confirm('确认删除?', '提示', {
              type: 'warning'
            }).then(() => {
              this.$message.success(`删除: ${row.name}`)
            }).catch(() => {})
          }
        }
      ]
    }
  },
  methods: {
    handleSelectionChange(selection) {
      console.log('选中的行:', selection)
    },
    handlePageChange(page) {
      this.pagination.currentPage = page
      // 这里通常会重新请求数据
    },
    handleSizeChange(size) {
      this.pagination.pageSize = size
      // 这里通常会重新请求数据
    }
  }
}
</script>
```
:::

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
| operation-label | 操作列标题 | String | '操作' |
| operation-fixed | 操作列是否固定 | String/Boolean | 'right' |
| operation-buttons | 操作按钮配置 | Array/Function | [] |
| pagination | 分页配置 | Object/Boolean | false |
| border | 是否带有纵向边框 | Boolean | false |
| stripe | 是否为斑马纹 | Boolean | false |
| height | 表格高度 | String/Number | - |
| max-height | 表格最大高度 | String/Number | - |

## Column 配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 列标题 | String | - |
| prop | 字段名 | String | - |
| width | 列宽度 | String/Number | - |
| minWidth | 最小宽度 | String/Number | - |
| fixed | 固定列(true/'left'/'right') | String/Boolean | - |
| sortable | 是否可排序 | Boolean | false |
| formatter | 格式化函数 | Function(row, column, cellValue, index) | - |
| slotName | 自定义插槽名 | String | - |
| align | 对齐方式 | String | 'left' |
| showOverflowTooltip | 内容过长时显示 tooltip | Boolean | false |

## Pagination 配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| total | 总条目数 | Number | 0 |
| currentPage | 当前页数 | Number | 1 |
| pageSize | 每页显示条目个数 | Number | 10 |
| pageSizes | 每页显示个数选择器的选项 | Array | [10, 20, 50, 100] |
| layout | 组件布局 | String | 'total, sizes, prev, pager, next, jumper' |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| selection-change | 多选改变 | selection |
| current-change | 页码改变 | page |
| size-change | 每页条数改变 | size |
| row-click | 行点击事件 | row, column, event |
| sort-change | 排序改变 | { column, prop, order } |
