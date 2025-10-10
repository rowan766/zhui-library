# PageHeader 页面头部

页面头部组件,包含面包屑、标题、返回按钮、操作区域等,适用于详情页、编辑页等场景。

## 基础用法

显示页面标题和面包屑导航。

::: demo
```vue
<template>
  <z-page-header
    title="用户详情"
    :breadcrumb="['系统管理', '用户管理', '用户详情']"
  />
</template>
```
:::

## 带返回按钮

通过 `show-back` 显示返回按钮。

::: demo
```vue
<template>
  <z-page-header
    title="编辑用户"
    :breadcrumb="['系统管理', '用户管理', '编辑用户']"
    show-back
    @back="handleBack"
  />
</template>

<script>
export default {
  methods: {
    handleBack() {
      this.$message.info('返回上一页')
    }
  }
}
</script>
```
:::

## 自定义返回文本

通过 `back-text` 自定义返回按钮的文字。

::: demo
```vue
<template>
  <z-page-header
    title="订单详情"
    :breadcrumb="['订单管理', '订单列表', '订单详情']"
    show-back
    back-text="返回列表"
    @back="handleBack"
  />
</template>

<script>
export default {
  methods: {
    handleBack() {
      this.$message.info('返回订单列表')
    }
  }
}
</script>
```
:::

## 带副标题

通过 `subtitle` 属性添加副标题描述。

::: demo
```vue
<template>
  <z-page-header
    title="商品管理"
    subtitle="管理所有商品的信息、库存和价格"
    :breadcrumb="['商城管理', '商品管理']"
  />
</template>
```
:::

## 带操作区域

通过 `extra` 插槽添加操作按钮。

::: demo
```vue
<template>
  <z-page-header
    title="文章详情"
    subtitle="创建于 2023-12-15 14:30:00"
    :breadcrumb="['内容管理', '文章列表', '文章详情']"
    show-back
    @back="handleBack"
  >
    <template #extra>
      <el-button type="primary" icon="el-icon-edit" @click="handleEdit">编辑</el-button>
      <el-button type="danger" icon="el-icon-delete" @click="handleDelete">删除</el-button>
      <el-button icon="el-icon-share" @click="handleShare">分享</el-button>
    </template>
  </z-page-header>
</template>

<script>
export default {
  methods: {
    handleBack() {
      this.$message.info('返回')
    },
    handleEdit() {
      this.$message.success('编辑文章')
    },
    handleDelete() {
      this.$confirm('确认删除此文章?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$message.success('已删除')
      }).catch(() => {})
    },
    handleShare() {
      this.$message.success('分享文章')
    }
  }
}
</script>
```
:::

## 自定义标题内容

通过 `title` 插槽自定义标题区域内容。

::: demo
```vue
<template>
  <z-page-header
    :breadcrumb="['项目管理', '项目详情']"
    show-back
    @back="handleBack"
  >
    <template #title>
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 20px; font-weight: bold;">在线商城系统</span>
        <el-tag type="success">进行中</el-tag>
        <el-tag type="warning" size="small">紧急</el-tag>
      </div>
    </template>
    <template #subtitle>
      <div style="margin-top: 8px; color: #606266;">
        <span style="margin-right: 20px;">
          <i class="el-icon-user"></i> 负责人: 张三
        </span>
        <span style="margin-right: 20px;">
          <i class="el-icon-date"></i> 截止日期: 2024-01-31
        </span>
        <span>
          <i class="el-icon-setting"></i> 进度: 68%
        </span>
      </div>
    </template>
    <template #extra>
      <el-button type="primary">开始任务</el-button>
      <el-button>查看详情</el-button>
    </template>
  </z-page-header>
</template>

<script>
export default {
  methods: {
    handleBack() {
      this.$message.info('返回项目列表')
    }
  }
}
</script>
```
:::

## 带标签页

结合标签页使用,常用于详情页的多标签切换。

::: demo
```vue
<template>
  <div>
    <z-page-header
      title="用户详情"
      subtitle="ID: 10001"
      :breadcrumb="['系统管理', '用户管理', '用户详情']"
      show-back
      @back="handleBack"
    >
      <template #extra>
        <el-button type="primary" icon="el-icon-edit">编辑</el-button>
        <el-button icon="el-icon-refresh">刷新</el-button>
      </template>
    </z-page-header>
    <el-tabs v-model="activeTab" style="margin-top: 20px;">
      <el-tab-pane label="基本信息" name="basic">
        <div style="padding: 20px;">基本信息内容</div>
      </el-tab-pane>
      <el-tab-pane label="权限设置" name="permission">
        <div style="padding: 20px;">权限设置内容</div>
      </el-tab-pane>
      <el-tab-pane label="操作日志" name="logs">
        <div style="padding: 20px;">操作日志内容</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'basic'
    }
  },
  methods: {
    handleBack() {
      this.$message.info('返回用户列表')
    }
  }
}
</script>
```
:::

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 页面标题 | String | - |
| subtitle | 副标题 | String | - |
| breadcrumb | 面包屑导航数组 | Array | [] |
| show-back | 是否显示返回按钮 | Boolean | false |
| back-text | 返回按钮文字 | String | '返回' |
| show-breadcrumb | 是否显示面包屑 | Boolean | true |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| back | 点击返回按钮时触发 | - |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| title | 自定义标题内容 |
| subtitle | 自定义副标题内容 |
| extra | 操作区域,显示在标题右侧 |
| breadcrumb | 自定义面包屑内容 |
