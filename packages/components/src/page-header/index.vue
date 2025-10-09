<!-- packages/components/src/page-header/index.vue -->
<template>
  <div class="z-page-header">
    <!-- 面包屑 -->
    <div v-if="showBreadcrumb && breadcrumbItems.length > 0" class="z-page-header-breadcrumb">
      <el-breadcrumb :separator="breadcrumbSeparator" :separator-class="breadcrumbSeparatorClass">
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbItems"
          :key="index"
          :to="item.to"
        >
          <i v-if="item.icon" :class="item.icon" />
          {{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 主要内容 -->
    <div class="z-page-header-content">
      <!-- 返回按钮 -->
      <div v-if="showBack" class="z-page-header-back" @click="handleBack">
        <i :class="backIcon" />
        <span v-if="backText">{{ backText }}</span>
      </div>

      <!-- 标题区域 -->
      <div class="z-page-header-title-wrapper">
        <slot name="title">
          <div class="z-page-header-title">
            <i v-if="icon" :class="icon" class="z-page-header-icon" />
            <span class="z-page-header-title-text">{{ title }}</span>
          </div>
          <div v-if="subtitle" class="z-page-header-subtitle">
            {{ subtitle }}
          </div>
        </slot>
      </div>

      <!-- 标签 -->
      <div v-if="tags && tags.length > 0" class="z-page-header-tags">
        <el-tag
          v-for="(tag, index) in tags"
          :key="index"
          :type="tag.type"
          :size="tag.size || 'small'"
          :effect="tag.effect || 'light'"
        >
          {{ tag.label }}
        </el-tag>
      </div>

      <!-- 右侧操作区 -->
      <div v-if="$slots.extra" class="z-page-header-extra">
        <slot name="extra"></slot>
      </div>
    </div>

    <!-- 内容区域 -->
    <div v-if="$slots.content" class="z-page-header-main">
      <slot name="content"></slot>
    </div>

    <!-- 底部操作区 -->
    <div v-if="$slots.footer" class="z-page-header-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZPageHeader',
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 副标题
    subtitle: {
      type: String,
      default: ''
    },
    // 标题图标
    icon: {
      type: String,
      default: ''
    },
    // 是否显示返回按钮
    showBack: {
      type: Boolean,
      default: false
    },
    // 返回按钮文本
    backText: {
      type: String,
      default: ''
    },
    // 返回按钮图标
    backIcon: {
      type: String,
      default: 'el-icon-back'
    },
    // 是否显示面包屑
    showBreadcrumb: {
      type: Boolean,
      default: false
    },
    // 面包屑数据
    breadcrumbItems: {
      type: Array,
      default: () => []
    },
    // 面包屑分隔符
    breadcrumbSeparator: {
      type: String,
      default: '/'
    },
    // 面包屑分隔符图标
    breadcrumbSeparatorClass: {
      type: String,
      default: ''
    },
    // 标签
    tags: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 返回
    handleBack() {
      this.$emit('back')
      // 如果没有监听 back 事件，默认执行路由返回
      if (!this.$listeners.back) {
        this.$router && this.$router.back()
      }
    }
  }
}
</script>

<style scoped>
.z-page-header {
  background-color: #fff;
  padding: 16px 20px;
  margin-bottom: 16px;
}

.z-page-header-breadcrumb {
  margin-bottom: 16px;
}

.z-page-header-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.z-page-header-back {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #409eff;
  font-size: 14px;
  transition: color 0.3s;
}

.z-page-header-back:hover {
  color: #66b1ff;
}

.z-page-header-back i {
  font-size: 16px;
  margin-right: 4px;
}

.z-page-header-title-wrapper {
  flex: 1;
}

.z-page-header-title {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #303133;
  line-height: 28px;
}

.z-page-header-icon {
  margin-right: 8px;
  font-size: 22px;
}

.z-page-header-subtitle {
  margin-top: 4px;
  font-size: 14px;
  color: #909399;
  line-height: 22px;
}

.z-page-header-tags {
  display: flex;
  align-items: center;
  gap: 8px;
}

.z-page-header-extra {
  margin-left: auto;
}

.z-page-header-main {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #ebeef5;
}

.z-page-header-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #ebeef5;
}
</style>
