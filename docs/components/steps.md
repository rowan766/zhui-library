# Steps 步骤条

带操作按钮的步骤条组件。

## 基础用法

```vue
<template>
  <z-steps
    :active.sync="active"
    :steps="steps"
    @submit="handleSubmit"
  />
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      steps: [
        { title: '基本信息', description: '填写基本信息' },
        { title: '详细信息', description: '填写详细信息' },
        { title: '完成', description: '确认并提交' }
      ]
    }
  },
  methods: {
    handleSubmit() {
      console.log('提交')
    }
  }
}
</script>
```

## 带验证

```vue
<z-steps
  :active.sync="active"
  :steps="steps"
  :before-next="beforeNext"
  @submit="handleSubmit"
/>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 当前激活步骤 | Number | 0 |
| steps | 步骤配置 | Array | [] |
| before-next | 下一步前的钩子 | Function | - |
| show-buttons | 是否显示按钮 | Boolean | true |
