# SearchForm 搜索表单

用于快速构建搜索表单，支持折叠、权限控制等功能。

## 基础用法

通过 `search-data` 和 `search-items` 配置搜索表单。

::: demo
```vue
<template>
  <z-search-form
    :search-data="searchData"
    :search-items="searchItems"
    @search="handleSearch"
    @reset="handleReset"
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
        {
          label: '关键词',
          prop: 'keyword',
          type: 'input',
          placeholder: '请输入关键词'
        },
        {
          label: '状态',
          prop: 'status',
          type: 'select',
          placeholder: '请选择状态',
          options: [
            { label: '全部', value: '' },
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ]
        }
      ]
    }
  },
  methods: {
    handleSearch(data) {
      this.$message.success('搜索: ' + JSON.stringify(data))
    },
    handleReset() {
      this.$message.info('已重置搜索条件')
    }
  }
}
</script>
```
:::

## 多种表单项类型

支持多种搜索表单项类型。

::: demo
```vue
<template>
  <z-search-form
    :search-data="searchData"
    :search-items="searchItems"
    @search="handleSearch"
  />
</template>

<script>
export default {
  data() {
    return {
      searchData: {
        username: '',
        department: '',
        status: [],
        dateRange: [],
        createTime: ''
      },
      searchItems: [
        {
          label: '用户名',
          prop: 'username',
          type: 'input',
          placeholder: '请输入用户名'
        },
        {
          label: '部门',
          prop: 'department',
          type: 'select',
          placeholder: '请选择部门',
          options: [
            { label: '技术部', value: 'tech' },
            { label: '产品部', value: 'product' },
            { label: '设计部', value: 'design' },
            { label: '运营部', value: 'operation' }
          ]
        },
        {
          label: '状态',
          prop: 'status',
          type: 'checkbox',
          options: [
            { label: '在职', value: 1 },
            { label: '离职', value: 0 }
          ]
        },
        {
          label: '日期范围',
          prop: 'dateRange',
          type: 'date-range',
          placeholder: '选择日期范围'
        },
        {
          label: '创建时间',
          prop: 'createTime',
          type: 'date',
          placeholder: '选择创建时间'
        }
      ]
    }
  },
  methods: {
    handleSearch(data) {
      this.$message.success('搜索: ' + JSON.stringify(data))
    }
  }
}
</script>
```
:::

## 可折叠

当搜索项较多时，可以设置折叠功能，默认只显示部分搜索项。

::: demo
```vue
<template>
  <z-search-form
    :search-data="searchData"
    :search-items="searchItems"
    collapsible
    :collapse-count="3"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>

<script>
export default {
  data() {
    return {
      searchData: {
        name: '',
        email: '',
        phone: '',
        department: '',
        position: '',
        status: '',
        createTime: ''
      },
      searchItems: [
        {
          label: '姓名',
          prop: 'name',
          type: 'input',
          placeholder: '请输入姓名'
        },
        {
          label: '邮箱',
          prop: 'email',
          type: 'input',
          placeholder: '请输入邮箱'
        },
        {
          label: '手机号',
          prop: 'phone',
          type: 'input',
          placeholder: '请输入手机号'
        },
        {
          label: '部门',
          prop: 'department',
          type: 'select',
          placeholder: '请选择部门',
          options: [
            { label: '技术部', value: '1' },
            { label: '产品部', value: '2' },
            { label: '设计部', value: '3' }
          ]
        },
        {
          label: '职位',
          prop: 'position',
          type: 'input',
          placeholder: '请输入职位'
        },
        {
          label: '状态',
          prop: 'status',
          type: 'select',
          placeholder: '请选择状态',
          options: [
            { label: '在职', value: '1' },
            { label: '离职', value: '0' }
          ]
        },
        {
          label: '创建时间',
          prop: 'createTime',
          type: 'date',
          placeholder: '选择创建时间'
        }
      ]
    }
  },
  methods: {
    handleSearch(data) {
      this.$message.success('搜索参数: ' + JSON.stringify(data))
    },
    handleReset() {
      this.$message.info('已重置')
    }
  }
}
</script>
```
:::

## 默认展开/收起

通过 `default-collapsed` 控制默认是否收起。

::: demo
```vue
<template>
  <div>
    <z-search-form
      :search-data="searchData"
      :search-items="searchItems"
      collapsible
      :collapse-count="2"
      :default-collapsed="true"
      @search="handleSearch"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchData: {
        keyword: '',
        category: '',
        status: '',
        startDate: '',
        endDate: ''
      },
      searchItems: [
        {
          label: '关键词',
          prop: 'keyword',
          type: 'input',
          placeholder: '请输入关键词'
        },
        {
          label: '分类',
          prop: 'category',
          type: 'select',
          placeholder: '请选择分类',
          options: [
            { label: '分类一', value: '1' },
            { label: '分类二', value: '2' },
            { label: '分类三', value: '3' }
          ]
        },
        {
          label: '状态',
          prop: 'status',
          type: 'radio',
          options: [
            { label: '全部', value: '' },
            { label: '启用', value: '1' },
            { label: '禁用', value: '0' }
          ]
        },
        {
          label: '开始日期',
          prop: 'startDate',
          type: 'date',
          placeholder: '选择开始日期'
        },
        {
          label: '结束日期',
          prop: 'endDate',
          type: 'date',
          placeholder: '选择结束日期'
        }
      ]
    }
  },
  methods: {
    handleSearch(data) {
      console.log('搜索:', data)
      this.$message.success('开始搜索')
    }
  }
}
</script>
```
:::

## 自定义按钮

可以通过插槽自定义按钮区域。

::: demo
```vue
<template>
  <z-search-form
    :search-data="searchData"
    :search-items="searchItems"
    @search="handleSearch"
  >
    <template #buttons>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="success" @click="handleExport">导出</el-button>
      <el-button type="warning" @click="handleAdvanced">高级搜索</el-button>
    </template>
  </z-search-form>
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
        {
          label: '关键词',
          prop: 'keyword',
          type: 'input',
          placeholder: '请输入关键词'
        },
        {
          label: '状态',
          prop: 'status',
          type: 'select',
          placeholder: '请选择状态',
          options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ]
        }
      ]
    }
  },
  methods: {
    handleSearch() {
      this.$message.success('搜索: ' + JSON.stringify(this.searchData))
    },
    handleReset() {
      this.searchData = { keyword: '', status: '' }
      this.$message.info('已重置')
    },
    handleExport() {
      this.$message.success('导出数据')
    },
    handleAdvanced() {
      this.$message.info('打开高级搜索')
    }
  }
}
</script>
```
:::

## 按钮权限控制

通过 `button-permissions` 控制按钮的显示权限。

::: demo
```vue
<template>
  <div>
    <div style="margin-bottom: 10px;">
      <el-checkbox v-model="permissions.search">搜索权限</el-checkbox>
      <el-checkbox v-model="permissions.reset">重置权限</el-checkbox>
      <el-checkbox v-model="permissions.export">导出权限</el-checkbox>
    </div>
    <z-search-form
      :search-data="searchData"
      :search-items="searchItems"
      :button-permissions="permissions"
      @search="handleSearch"
      @reset="handleReset"
      @export="handleExport"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchData: {
        keyword: '',
        type: ''
      },
      searchItems: [
        {
          label: '关键词',
          prop: 'keyword',
          type: 'input',
          placeholder: '请输入关键词'
        },
        {
          label: '类型',
          prop: 'type',
          type: 'select',
          placeholder: '请选择类型',
          options: [
            { label: '类型A', value: 'A' },
            { label: '类型B', value: 'B' }
          ]
        }
      ],
      permissions: {
        search: true,
        reset: true,
        export: false
      }
    }
  },
  methods: {
    handleSearch(data) {
      this.$message.success('搜索')
    },
    handleReset() {
      this.$message.info('重置')
    },
    handleExport() {
      this.$message.success('导出')
    }
  }
}
</script>
```
:::

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| search-data | 搜索数据对象 | Object | {} |
| search-items | 搜索项配置 | Array | [] |
| label-width | 标签宽度 | String | '100px' |
| collapsible | 是否可折叠 | Boolean | false |
| collapse-count | 折叠时显示的搜索项数量 | Number | 3 |
| default-collapsed | 是否默认折叠 | Boolean | false |
| show-reset | 是否显示重置按钮 | Boolean | true |
| button-permissions | 按钮权限配置 | Object | {} |

## Search Item 配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标签文本 | String | - |
| prop | 字段名 | String | - |
| type | 表单控件类型 | String | 'input' |
| placeholder | 占位文本 | String | - |
| options | 选项列表(select/radio/checkbox) | Array | [] |
| disabled | 是否禁用 | Boolean | false |

## 搜索项类型

支持以下搜索项类型:

- `input` - 输入框
- `select` - 选择器
- `radio` - 单选框
- `checkbox` - 多选框
- `date` - 日期选择器
- `date-range` - 日期范围选择器
- `time` - 时间选择器
- `cascader` - 级联选择器

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| search | 点击搜索按钮 | searchData |
| reset | 点击重置按钮 | - |
| export | 点击导出按钮 | searchData |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| buttons | 自定义按钮区域 |
