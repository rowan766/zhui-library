# ImagePreview 图片预览

批量图片展示和预览组件,支持图片列表展示、点击预览、删除等功能。

## 基础用法

展示图片列表,点击可预览大图。

::: demo
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
        'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
      ]
    }
  }
}
</script>
```
:::

## 自定义尺寸

通过 `width` 和 `height` 属性设置图片尺寸。

::: demo
```vue
<template>
  <div>
    <h4>小尺寸 (80x80)</h4>
    <z-image-preview
      :image-list="images"
      :width="80"
      :height="80"
    />

    <h4 style="margin-top: 20px;">中尺寸 (120x120)</h4>
    <z-image-preview
      :image-list="images"
      :width="120"
      :height="120"
    />

    <h4 style="margin-top: 20px;">大尺寸 (150x150)</h4>
    <z-image-preview
      :image-list="images"
      :width="150"
      :height="150"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      ]
    }
  }
}
</script>
```
:::

## 支持删除

通过 `show-delete` 显示删除按钮。

::: demo
```vue
<template>
  <div>
    <z-image-preview
      :image-list="images"
      :width="120"
      :height="120"
      show-delete
      @delete="handleDelete"
    />
    <p style="margin-top: 10px; color: #909399;">剩余 {{ images.length }} 张图片</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
      ]
    }
  },
  methods: {
    handleDelete(index) {
      this.$confirm('确认删除这张图片?', '提示', {
        type: 'warning'
      }).then(() => {
        this.images.splice(index, 1)
        this.$message.success('删除成功')
      }).catch(() => {})
    }
  }
}
</script>
```
:::

## 圆角样式

通过 `border-radius` 设置图片圆角。

::: demo
```vue
<template>
  <div>
    <h4>默认圆角</h4>
    <z-image-preview
      :image-list="images"
      :width="100"
      :height="100"
      border-radius="4px"
    />

    <h4 style="margin-top: 20px;">圆形</h4>
    <z-image-preview
      :image-list="images"
      :width="100"
      :height="100"
      border-radius="50%"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
      ]
    }
  }
}
</script>
```
:::

## 多图展示

展示多张图片的场景。

::: demo
```vue
<template>
  <z-image-preview
    :image-list="images"
    :width="110"
    :height="110"
    show-delete
    @delete="handleDelete"
  />
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
        'https://fuss10.elemecdn.com/0/6f/e35d7c2e56aa7f3fcb63c3f8c79e8jpeg.jpeg',
        'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
      ]
    }
  },
  methods: {
    handleDelete(index) {
      this.images.splice(index, 1)
      this.$message.success('删除成功')
    }
  }
}
</script>
```
:::

## 自定义填充方式

通过 `fit` 属性设置图片的填充方式。

::: demo
```vue
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" v-for="fit in fits" :key="fit">
        <div style="margin-bottom: 10px; text-align: center; color: #909399;">{{ fit }}</div>
        <z-image-preview
          :image-list="[image]"
          :width="150"
          :height="150"
          :fit="fit"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fits: ['fill', 'contain', 'cover', 'none'],
      image: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  }
}
</script>
```
:::

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| image-list | 图片 URL 列表 | Array | [] |
| width | 图片宽度 | String/Number | '100px' |
| height | 图片高度 | String/Number | '100px' |
| show-delete | 是否显示删除按钮 | Boolean | false |
| border-radius | 图片圆角 | String | '4px' |
| fit | 图片填充方式 (fill/contain/cover/none/scale-down) | String | 'cover' |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| delete | 删除图片时触发 | index |
| preview | 预览图片时触发 | index, url |
