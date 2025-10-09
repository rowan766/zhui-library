# ImagePreview 图片预览

批量图片展示和预览组件。

## 基础用法

```vue
<template>
  <z-image-preview
    :image-list="images"
    :width="100"
    :height="100"
  />
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg'
      ]
    }
  }
}
</script>
```

## 支持删除

```vue
<z-image-preview
  :image-list="images"
  show-delete
  @delete="handleDelete"
/>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| image-list | 图片列表 | Array | [] |
| width | 图片宽度 | String/Number | '100px' |
| height | 图片高度 | String/Number | '100px' |
| show-delete | 是否显示删除按钮 | Boolean | false |
