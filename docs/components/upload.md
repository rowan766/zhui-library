# Upload 上传

文件上传组件,支持多种上传方式、文件类型和大小限制、拖拽上传等功能。

## 基础用法

点击上传文件。

::: demo
```vue
<template>
  <z-upload
    action="/api/upload"
    :file-list="fileList"
    @success="handleSuccess"
    @error="handleError"
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
      this.$message.success(`文件 ${file.name} 上传成功`)
      this.fileList = fileList
    },
    handleError(err, file, fileList) {
      this.$message.error(`文件 ${file.name} 上传失败`)
    }
  }
}
</script>
```
:::

## 拖拽上传

通过 `drag` 属性启用拖拽上传。

::: demo
```vue
<template>
  <z-upload
    action="/api/upload"
    drag
    :max-size="10"
    tip="支持拖拽上传,文件大小不超过10MB"
    @success="handleSuccess"
  />
</template>

<script>
export default {
  methods: {
    handleSuccess(response, file, fileList) {
      this.$message.success('上传成功')
      console.log('上传的文件:', file)
    }
  }
}
</script>
```
:::

## 图片上传

使用 `list-type="picture-card"` 展示图片列表。

::: demo
```vue
<template>
  <z-upload
    action="/api/upload"
    list-type="picture-card"
    :limit="5"
    :file-list="fileList"
    accept="image/*"
    @success="handleSuccess"
    @remove="handleRemove"
    @exceed="handleExceed"
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
      this.$message.success('图片上传成功')
      this.fileList = fileList
    },
    handleRemove(file, fileList) {
      this.$message.info('已删除图片')
      this.fileList = fileList
    },
    handleExceed(files, fileList) {
      this.$message.warning('最多只能上传5张图片')
    }
  }
}
</script>
```
:::

## 文件类型限制

通过 `allowed-types` 限制允许上传的文件类型。

::: demo
```vue
<template>
  <div>
    <z-upload
      action="/api/upload"
      :allowed-types="['pdf', 'doc', 'docx', 'xls', 'xlsx']"
      :max-size="5"
      tip="只能上传 Office 文档,且不超过 5MB"
      @error="handleError"
      @success="handleSuccess"
    />
  </div>
</template>

<script>
export default {
  methods: {
    handleSuccess(response, file) {
      this.$message.success(`${file.name} 上传成功`)
    },
    handleError(err, file) {
      this.$message.error(`${file.name} 上传失败`)
    }
  }
}
</script>
```
:::

## 手动上传

设置 `auto-upload` 为 false,手动控制上传时机。

::: demo
```vue
<template>
  <div>
    <z-upload
      ref="upload"
      action="/api/upload"
      :auto-upload="false"
      :file-list="fileList"
      @change="handleChange"
    />
    <div style="margin-top: 10px;">
      <el-button type="primary" @click="submitUpload" :disabled="fileList.length === 0">
        上传到服务器
      </el-button>
      <el-button @click="clearFiles">清空文件</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    submitUpload() {
      this.$refs.upload.submit()
      this.$message.success('开始上传文件')
    },
    clearFiles() {
      this.$refs.upload.clearFiles()
      this.fileList = []
      this.$message.info('已清空文件列表')
    }
  }
}
</script>
```
:::

## 文件列表

展示已上传的文件列表。

::: demo
```vue
<template>
  <z-upload
    action="/api/upload"
    :file-list="fileList"
    list-type="text"
    @success="handleSuccess"
    @remove="handleRemove"
  />
</template>

<script>
export default {
  data() {
    return {
      fileList: [
        {
          name: '文档1.pdf',
          url: 'https://example.com/file1.pdf'
        },
        {
          name: '文档2.docx',
          url: 'https://example.com/file2.docx'
        }
      ]
    }
  },
  methods: {
    handleSuccess(response, file, fileList) {
      this.$message.success('上传成功')
      this.fileList = fileList
    },
    handleRemove(file, fileList) {
      this.$message.info(`已删除 ${file.name}`)
      this.fileList = fileList
    }
  }
}
</script>
```
:::

## 上传前校验

通过 `before-upload` 钩子在上传前进行校验。

::: demo
```vue
<template>
  <z-upload
    action="/api/upload"
    :before-upload="beforeUpload"
    :max-size="2"
    tip="只能上传图片文件,且不超过2MB"
    @success="handleSuccess"
  />
</template>

<script>
export default {
  methods: {
    beforeUpload(file) {
      const isImage = file.type.startsWith('image/')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isImage) {
        this.$message.error('只能上传图片文件!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!')
        return false
      }
      return true
    },
    handleSuccess(response, file) {
      this.$message.success('上传成功')
    }
  }
}
</script>
```
:::

## 多文件上传

通过 `multiple` 支持多文件上传。

::: demo
```vue
<template>
  <div>
    <z-upload
      action="/api/upload"
      multiple
      :limit="3"
      :file-list="fileList"
      @success="handleSuccess"
      @exceed="handleExceed"
    />
    <p style="margin-top: 10px; color: #909399;">
      已上传 {{ fileList.length }} / 3 个文件
    </p>
  </div>
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
      this.$message.success(`${file.name} 上传成功`)
      this.fileList = fileList
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多只能上传 3 个文件,当前已上传 ${fileList.length} 个`)
    }
  }
}
</script>
```
:::

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| action | 上传地址(必填) | String | - |
| headers | 请求头 | Object | {} |
| method | 请求方法 | String | 'post' |
| multiple | 是否支持多选文件 | Boolean | false |
| data | 上传时附带的额外参数 | Object | {} |
| name | 上传的文件字段名 | String | 'file' |
| with-credentials | 是否携带 cookie | Boolean | false |
| accept | 接受的文件类型 | String | '' |
| list-type | 文件列表类型(text/picture/picture-card) | String | 'text' |
| auto-upload | 是否自动上传 | Boolean | true |
| file-list | 已上传的文件列表 | Array | [] |
| limit | 最大上传数量 | Number | - |
| drag | 是否启用拖拽上传 | Boolean | false |
| max-size | 文件大小限制(MB) | Number | - |
| allowed-types | 允许的文件类型数组 | Array | [] |
| tip | 提示文字 | String | '' |
| before-upload | 上传前钩子 | Function(file) | - |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| success | 文件上传成功时 | response, file, fileList |
| error | 文件上传失败时 | err, file, fileList |
| progress | 文件上传进度 | event, file, fileList |
| change | 文件状态改变时 | file, fileList |
| remove | 文件移除时 | file, fileList |
| exceed | 文件超出个数限制时 | files, fileList |
| before-upload | 上传文件之前 | file |
| before-remove | 删除文件之前 | file, fileList |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| submit | 手动上传文件列表 | - |
| clearFiles | 清空已上传的文件列表 | - |
| abort | 取消上传请求 | file |
