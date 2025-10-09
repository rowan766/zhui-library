# Dialog 对话框

基于 Element UI Dialog 的二次封装，简化常用场景的使用。

## 基础用法

```vue
<template>
  <div>
    <el-button @click="visible = true">打开对话框</el-button>
    
    <z-dialog
      :visible.sync="visible"
      title="提示"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <p>这是对话框内容</p>
    </z-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleConfirm() {
      console.log('确认')
      this.visible = false
    },
    handleCancel() {
      console.log('取消')
      this.visible = false
    }
  }
}
</script>
```

## 自定义按钮

```vue
<z-dialog
  :visible.sync="visible"
  title="自定义按钮"
  :show-footer="false"
>
  <p>内容</p>
  <template #footer>
    <el-button @click="visible = false">自定义按钮</el-button>
  </template>
</z-dialog>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示 | Boolean | false |
| title | 标题 | String | '提示' |
| width | 宽度 | String | '50%' |
| show-footer | 是否显示底部 | Boolean | true |
| confirm-text | 确认按钮文字 | String | '确定' |
| cancel-text | 取消按钮文字 | String | '取消' |
| before-close | 关闭前回调 | Function | - |

## Events

| 事件名 | 说明 |
| --- | --- |
| confirm | 点击确认按钮 |
| cancel | 点击取消按钮 |
| close | 对话框关闭 |
