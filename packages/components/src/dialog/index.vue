<!-- packages/components/src/dialog/index.vue -->
<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :title="title"
    :width="width"
    :top="top"
    :modal="modal"
    :modal-append-to-body="modalAppendToBody"
    :append-to-body="appendToBody"
    :lock-scroll="lockScroll"
    :custom-class="customClass"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="showClose"
    :before-close="handleBeforeClose"
    :center="center"
    :destroy-on-close="destroyOnClose"
    :fullscreen="fullscreen"
    v-bind="$attrs"
    v-on="$listeners"
    @open="handleOpen"
    @opened="handleOpened"
    @close="handleClose"
    @closed="handleClosed"
  >
    <!-- 标题插槽 -->
    <template v-if="$slots.title" slot="title">
      <slot name="title"></slot>
    </template>

    <!-- 内容区 -->
    <div v-loading="loading" :element-loading-text="loadingText">
      <slot></slot>
    </div>

    <!-- 底部按钮区 -->
    <template v-if="showFooter" slot="footer">
      <slot name="footer">
        <el-button
          v-if="showCancel"
          :size="btnSize"
          @click="handleCancel"
        >
          {{ cancelText }}
        </el-button>
        <el-button
          v-if="showConfirm"
          type="primary"
          :size="btnSize"
          :loading="confirmLoading"
          @click="handleConfirm"
        >
          {{ confirmText }}
        </el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'ZDialog',
  props: {
    // 是否显示 Dialog
    visible: {
      type: Boolean,
      default: false
    },
    // Dialog 的标题
    title: {
      type: String,
      default: ''
    },
    // Dialog 的宽度
    width: {
      type: String,
      default: '50%'
    },
    // Dialog CSS 中的 margin-top 值
    top: {
      type: String,
      default: '15vh'
    },
    // 是否需要遮罩层
    modal: {
      type: Boolean,
      default: true
    },
    // 遮罩层是否插入至 body 元素上
    modalAppendToBody: {
      type: Boolean,
      default: true
    },
    // Dialog 自身是否插入至 body 元素上
    appendToBody: {
      type: Boolean,
      default: false
    },
    // 是否在 Dialog 出现时将 body 滚动锁定
    lockScroll: {
      type: Boolean,
      default: true
    },
    // Dialog 的自定义类名
    customClass: {
      type: String,
      default: ''
    },
    // 是否可以通过点击 modal 关闭 Dialog
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    // 是否可以通过按下 ESC 关闭 Dialog
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: true
    },
    // 关闭前的回调
    beforeClose: {
      type: Function,
      default: undefined
    },
    // 是否对头部和底部采用居中布局
    center: {
      type: Boolean,
      default: false
    },
    // 关闭时销毁 Dialog 中的元素
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    // 是否为全屏 Dialog
    fullscreen: {
      type: Boolean,
      default: false
    },
    // 是否显示底部
    showFooter: {
      type: Boolean,
      default: true
    },
    // 是否显示取消按钮
    showCancel: {
      type: Boolean,
      default: true
    },
    // 是否显示确认按钮
    showConfirm: {
      type: Boolean,
      default: true
    },
    // 取消按钮文本
    cancelText: {
      type: String,
      default: '取消'
    },
    // 确认按钮文本
    confirmText: {
      type: String,
      default: '确定'
    },
    // 确认按钮加载状态
    confirmLoading: {
      type: Boolean,
      default: false
    },
    // 内容加载状态
    loading: {
      type: Boolean,
      default: false
    },
    // 加载文案
    loadingText: {
      type: String,
      default: '加载中...'
    },
    // 按钮尺寸
    btnSize: {
      type: String,
      default: 'small',
      validator: val => ['medium', 'small', 'mini'].includes(val)
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    // 关闭前的回调
    handleBeforeClose(done) {
      if (this.beforeClose) {
        this.beforeClose(done)
      } else {
        done()
      }
    },
    // 取消
    handleCancel() {
      this.$emit('cancel')
      this.dialogVisible = false
    },
    // 确认
    handleConfirm() {
      this.$emit('confirm')
    },
    // Dialog 打开的回调
    handleOpen() {
      this.$emit('open')
    },
    // Dialog 打开动画结束时的回调
    handleOpened() {
      this.$emit('opened')
    },
    // Dialog 关闭的回调
    handleClose() {
      this.$emit('close')
    },
    // Dialog 关闭动画结束时的回调
    handleClosed() {
      this.$emit('closed')
    }
  }
}
</script>
