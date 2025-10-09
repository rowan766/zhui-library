# SearchForm 搜索表单

用于快速构建搜索表单，支持折叠、权限控制等功能。

## 基础用法

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
          options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 }
          ]
        }
      ]
    }
  },
  methods: {
    handleSearch(data) {
      console.log('搜索', data)
    },
    handleReset() {
      console.log('重置')
    }
  }
}
</script>
```

## 可折叠

```vue
<z-search-form
  :search-data="searchData"
  :search-items="searchItems"
  collapsible
  :collapse-count="3"
  :default-collapsed="true"
  @search="handleSearch"
/>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| search-data | 搜索数据 | Object | {} |
| search-items | 搜索项配置 | Array | [] |
| collapsible | 是否可折叠 | Boolean | false |
| collapse-count | 折叠时显示数量 | Number | 3 |
| button-permissions | 按钮权限配置 | Object | {} |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| search | 搜索 | searchData |
| reset | 重置 | - |
