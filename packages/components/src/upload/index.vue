<!-- packages/components/src/upload/index.vue -->
<template>
  <div class="z-upload">
    <el-upload
      ref="upload"
      :action="action"
      :headers="headers"
      :data="data"
      :name="name"
      :with-credentials="withCredentials"
      :multiple="multiple"
      :accept="accept"
      :list-type="listType"
      :auto-upload="autoUpload"
      :file-list="fileList"
      :disabled="disabled"
      :limit="limit"
      :drag="drag"
      :before-upload="handleBeforeUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :http-request="httpRequest"
      v-bind="$attrs"
    >
      <slot>
        <!-- 拖拽上传 -->
        <template v-if="drag">
          <i class="el-icon-upload" />
          <div class="el-upload__text">
            {{ dragText || '将文件拖到此处，或<em>点击上传</em>' }}
          </div>
        </template>
        <!-- 图片上传 -->
        <template v-else-if="listType === 'picture-card'">
          <i class="el-icon-plus" />
        </template>
        <!-- 按钮上传 -->
        <template v-else>
          <el-button :size="size" :type="buttonType" :icon="buttonIcon">
            {{ buttonText }}
          </el-button>
        </template>
      </slot>
      <div v-if="tip" slot="tip" class="el-upload__tip">
        {{ tip }}
      </div>
    </el-upload>

    <!-- 图片预览对话框 -->
    <el-dialog
      :visible.sync="previewVisible"
      :append-to-body="true"
      width="800px"
      title="图片预览"
    >
      <img :src="previewUrl" style="width: 100%">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ZUpload',
  props: {
    // 上传地址
    action: {
      type: String,
      default: ''
    },
    // 请求头
    headers: {
      type: Object,
      default: () => ({})
    },
    // 上传时附带的额外参数
    data: {
      type: Object,
      default: () => ({})
    },
    // 上传的文件字段名
    name: {
      type: String,
      default: 'file'
    },
    // 支持发送 cookie 凭证信息
    withCredentials: {
      type: Boolean,
      default: false
    },
    // 是否支持多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 接受的文件类型
    accept: {
      type: String,
      default: ''
    },
    // 文件列表的类型
    listType: {
      type: String,
      default: 'text',
      validator: val => ['text', 'picture', 'picture-card'].includes(val)
    },
    // 是否自动上传
    autoUpload: {
      type: Boolean,
      default: true
    },
    // 已上传的文件列表
    fileList: {
      type: Array,
      default: () => []
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 最大上传数量
    limit: {
      type: Number,
      default: undefined
    },
    // 是否启用拖拽上传
    drag: {
      type: Boolean,
      default: false
    },
    // 拖拽区域文字
    dragText: {
      type: String,
      default: ''
    },
    // 提示文字
    tip: {
      type: String,
      default: ''
    },
    // 按钮文字
    buttonText: {
      type: String,
      default: '点击上传'
    },
    // 按钮类型
    buttonType: {
      type: String,
      default: 'primary'
    },
    // 按钮图标
    buttonIcon: {
      type: String,
      default: 'el-icon-upload2'
    },
    // 按钮尺寸
    size: {
      type: String,
      default: 'small'
    },
    // 文件大小限制（MB）
    maxSize: {
      type: Number,
      default: undefined
    },
    // 允许的文件类型
    allowedTypes: {
      type: Array,
      default: () => []
    },
    // 自定义上传方法
    httpRequest: {
      type: Function,
      default: undefined
    },
    // 上传前的钩子
    beforeUpload: {
      type: Function,
      default: undefined
    },
    // 是否显示图片预览
    showPreview: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      previewVisible: false,
      previewUrl: ''
    }
  },
  methods: {
    // 上传前的钩子
    handleBeforeUpload(file) {
      // 自定义 beforeUpload
      if (this.beforeUpload) {
        const result = this.beforeUpload(file)
        if (result === false) {
          return false
        }
      }

      // 检查文件大小
      if (this.maxSize) {
        const isLtMaxSize = file.size / 1024 / 1024 < this.maxSize
        if (!isLtMaxSize) {
          this.$message.error(`上传文件大小不能超过 ${this.maxSize}MB!`)
          return false
        }
      }

      // 检查文件类型
      if (this.allowedTypes.length > 0) {
        const fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
        const isAllowedType = this.allowedTypes.includes(fileType.toLowerCase())
        if (!isAllowedType) {
          this.$message.error(`只允许上传 ${this.allowedTypes.join('、')} 格式的文件!`)
          return false
        }
      }

      this.$emit('before-upload', file)
      return true
    },

    // 预览
    handlePreview(file) {
      if (this.showPreview && this.listType.includes('picture')) {
        this.previewUrl = file.url
        this.previewVisible = true
      }
      this.$emit('preview', file)
    },

    // 移除文件
    handleRemove(file, fileList) {
      this.$emit('remove', file, fileList)
      this.$emit('update:fileList', fileList)
    },

    // 上传成功
    handleSuccess(response, file, fileList) {
      this.$emit('success', response, file, fileList)
      this.$emit('update:fileList', fileList)
    },

    // 上传失败
    handleError(err, file, fileList) {
      this.$message.error('上传失败，请重试!')
      this.$emit('error', err, file, fileList)
    },

    // 上传进度
    handleProgress(event, file, fileList) {
      this.$emit('progress', event, file, fileList)
    },

    // 文件状态改变
    handleChange(file, fileList) {
      this.$emit('change', file, fileList)
      this.$emit('update:fileList', fileList)
    },

    // 超出限制
    handleExceed(files, fileList) {
      this.$message.warning(`最多只能上传 ${this.limit} 个文件!`)
      this.$emit('exceed', files, fileList)
    },

    // 清空已上传的文件列表
    clearFiles() {
      this.$refs.upload.clearFiles()
    },

    // 手动上传
    submit() {
      this.$refs.upload.submit()
    },

    // 取消上传
    abort(file) {
      this.$refs.upload.abort(file)
    }
  }
}
</script>

<style scoped>
.z-upload {
  width: 100%;
}
</style>
