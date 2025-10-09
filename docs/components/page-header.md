# PageHeader 页面头部

页面头部组件，包含面包屑、标题、返回按钮等。

## 基础用法

```vue
<template>
  <z-page-header
    title="用户详情"
    :breadcrumb="['系统管理', '用户管理', '用户详情']"
  />
</template>
```

## 带返回按钮

```vue
<z-page-header
  title="用户详情"
  show-back
  @back="$router.back()"
>
  <template #extra>
    <el-button type="primary">操作</el-button>
  </template>
</z-page-header>
```
