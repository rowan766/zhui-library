<!-- packages/components/src/card/index.vue -->
<template>
  <div class="z-card" :class="cardClass" :style="cardStyle">
    <!-- 头部 -->
    <div v-if="showHeader" class="z-card-header">
      <slot name="header">
        <div class="z-card-header-title">
          <i v-if="icon" :class="icon" class="z-card-header-icon" />
          <span>{{ title }}</span>
        </div>
        <div v-if="$slots.extra" class="z-card-header-extra">
          <slot name="extra"></slot>
        </div>
      </slot>
    </div>

    <!-- 内容区 -->
    <div v-loading="loading" :element-loading-text="loadingText" class="z-card-body" :style="bodyStyle">
      <slot></slot>
    </div>

    <!-- 底部 -->
    <div v-if="$slots.footer" class="z-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZCard',
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 标题图标
    icon: {
      type: String,
      default: ''
    },
    // 是否显示头部
    showHeader: {
      type: Boolean,
      default: true
    },
    // 阴影显示时机
    shadow: {
      type: String,
      default: 'always',
      validator: val => ['always', 'hover', 'never'].includes(val)
    },
    // 卡片样式
    bodyStyle: {
      type: Object,
      default: () => ({})
    },
    // 是否显示边框
    border: {
      type: Boolean,
      default: true
    },
    // 加载状态
    loading: {
      type: Boolean,
      default: false
    },
    // 加载文案
    loadingText: {
      type: String,
      default: '加载中...'
    }
  },
  computed: {
    cardClass() {
      return {
        [`is-${this.shadow}-shadow`]: true,
        'is-no-border': !this.border
      }
    },
    cardStyle() {
      return {}
    }
  }
}
</script>

<style scoped>
.z-card {
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
}

.z-card.is-no-border {
  border: none;
}

.z-card.is-always-shadow {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.z-card.is-hover-shadow:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.z-card.is-never-shadow {
  box-shadow: none;
}

.z-card-header {
  padding: 18px 20px;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.z-card-header-title {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

.z-card-header-icon {
  margin-right: 8px;
  font-size: 18px;
}

.z-card-header-extra {
  margin-left: auto;
}

.z-card-body {
  padding: 20px;
}

.z-card-footer {
  padding: 18px 20px;
  border-top: 1px solid #ebeef5;
  box-sizing: border-box;
}
</style>
