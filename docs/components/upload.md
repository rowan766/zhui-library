# Upload 上传

文件上传组件，支持多种上传方式、文件类型和大小限制。

## 基础用法

```vue
<template>
  <z-upload
    action="/api/upload"
    :file-list="fileList"
    @success="handleSuccess"
  />
</template>

<script>
export default {
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    handleSuccess(response, file, fileList) {
      console.log('上传成功', response)
      this.fileList = fileList
    }
  }
}
</script>
```

## 拖拽上传

```vue
<z-upload
  action="/api/upload"
  drag
  :max-size="10"
  tip="支持拖拽上传，文件大小不超过10MB"
/>
```

## 图片上传

```vue
<z-upload
  action="/api/upload"
  list-type="picture-card"
  :limit="5"
  :allowed-types="['jpg', 'png', 'gif']"
  accept="image/*"
/>
```

## 文件类型和大小限制

```vue
<z-upload
  action="/api/upload"
  :max-size="5"
  :allowed-types="['pdf', 'doc', 'docx', 'xls', 'xlsx']"
  tip="只能上传 office 文档，且不超过 5MB"
  @error="handleError"
/>
```

## 手动上传

```vue
<template>
  <div>
    <z-upload
      ref="upload"
      action="/api/upload"
      :auto-upload="false"
    />
    <el-button @click="submitUpload">上传文件</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    }
  }
}
</script>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| action | 上传地址 | String | - |
| headers | 请求头 | Object | {} |
| multiple | 是否支持多选 | Boolean | false |
| accept | 接受的文件类型 | String | '' |
| list-type | 文件列表类型 | String | 'text' |
| auto-upload | 是否自动上传 | Boolean | true |
| file-list | 已上传文件列表 | Array | [] |
| limit | 最大上传数量 | Number | - |
| drag | 是否启用拖拽上传 | Boolean | false |
| max-size | 文件大小限制(MB) | Number | - |
| allowed-types | 允许的文件类型 | Array | [] |
| tip | 提示文字 | String | '' |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| success | 上传成功 | response, file, fileList |
| error | 上传失败 | err, file, fileList |
| remove | 删除文件 | file, fileList |
| change | 文件状态改变 | file, fileList |
| exceed | 超出限制 | files, fileList |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| submit | 手动上传 | - |
| clearFiles | 清空文件列表 | - |
