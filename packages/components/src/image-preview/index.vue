<!-- packages/components/src/image-preview/index.vue -->
<template>
  <div class="z-image-preview">
    <div class="z-image-preview__list">
      <div
        v-for="(url, index) in imageList"
        :key="index"
        class="z-image-preview__item"
        :style="itemStyle"
      >
        <el-image
          :src="url"
          :fit="fit"
          :lazy="lazy"
          :preview-src-list="previewList"
          :z-index="zIndex"
          :initial-index="index"
          style="width: 100%; height: 100%"
        >
          <div slot="placeholder" class="image-slot">
            <i class="el-icon-loading" />
          </div>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" />
          </div>
        </el-image>

        <!-- 操作遮罩 -->
        <div v-if="showMask" class="z-image-preview__mask">
          <span class="z-image-preview__actions">
            <i class="el-icon-zoom-in" @click="handlePreview(index)" />
            <i v-if="showDelete" class="el-icon-delete" @click="handleDelete(index)" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZImagePreview',
  props: {
    // 图片 URL 列表
    imageList: {
      type: Array,
      required: true,
      default: () => []
    },
    // 图片宽度
    width: {
      type: [String, Number],
      default: '100px'
    },
    // 图片高度
    height: {
      type: [String, Number],
      default: '100px'
    },
    // 图片如何适应容器
    fit: {
      type: String,
      default: 'cover',
      validator: val => ['fill', 'contain', 'cover', 'none', 'scale-down'].includes(val)
    },
    // 是否懒加载
    lazy: {
      type: Boolean,
      default: false
    },
    // 预览时的 z-index
    zIndex: {
      type: Number,
      default: 2000
    },
    // 是否显示遮罩层
    showMask: {
      type: Boolean,
      default: true
    },
    // 是否显示删除按钮
    showDelete: {
      type: Boolean,
      default: false
    },
    // 预览图片列表（如果不传则使用 imageList）
    previewSrcList: {
      type: Array,
      default: undefined
    }
  },
  computed: {
    itemStyle() {
      const width = typeof this.width === 'number' ? `${this.width}px` : this.width
      const height = typeof this.height === 'number' ? `${this.height}px` : this.height
      return {
        width,
        height
      }
    },
    previewList() {
      return this.previewSrcList || this.imageList
    }
  },
  methods: {
    // 预览图片
    handlePreview(index) {
      this.$emit('preview', index)
    },
    // 删除图片
    handleDelete(index) {
      this.$emit('delete', index)
    }
  }
}
</script>

<style scoped>
.z-image-preview__list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.z-image-preview__item {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #dcdfe6;
}

.z-image-preview__mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.z-image-preview__item:hover .z-image-preview__mask {
  opacity: 1;
}

.z-image-preview__actions i {
  color: #fff;
  font-size: 20px;
  margin: 0 8px;
  cursor: pointer;
  transition: transform 0.3s;
}

.z-image-preview__actions i:hover {
  transform: scale(1.2);
}

.image-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #f5f7fa;
  color: #909399;
  font-size: 30px;
}
</style>
