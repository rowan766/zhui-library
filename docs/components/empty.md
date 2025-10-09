# Empty 空状态

用于显示空数据状态。

## 基础用法

```vue
<template>
  <z-empty description="暂无数据" />
</template>
```

## 自定义图片和内容

```vue
<z-empty
  image="https://example.com/empty.png"
  description="没有找到相关内容"
  :image-size="200"
>
  <el-button type="primary">添加数据</el-button>
</z-empty>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| image | 图片地址 | String | - |
| image-size | 图片大小 | Number | - |
| description | 描述文字 | String | '暂无数据' |
