# Button 按钮

基于 Element UI Button 组件的二次封装。

## 基础用法

使用 `type`、`size` 等属性来定义按钮的样式。

<demo-block>
  <my-button>默认按钮</my-button>
  <my-button type="primary">主要按钮</my-button>
  <my-button type="success">成功按钮</my-button>
  <my-button type="info">信息按钮</my-button>
  <my-button type="warning">警告按钮</my-button>
  <my-button type="danger">危险按钮</my-button>
</demo-block>

```vue
<template>
  <div>
    <my-button>默认按钮</my-button>
    <my-button type="primary">主要按钮</my-button>
    <my-button type="success">成功按钮</my-button>
    <my-button type="info">信息按钮</my-button>
    <my-button type="warning">警告按钮</my-button>
    <my-button type="danger">危险按钮</my-button>
  </div>
</template>
```

## 不同尺寸

Button 组件提供除了默认值以外的三种尺寸,可以在不同场景下选择合适的按钮尺寸。

<demo-block>
  <my-button size="medium">中等按钮</my-button>
  <my-button size="small">小型按钮</my-button>
  <my-button size="mini">超小按钮</my-button>
</demo-block>

```vue
<template>
  <div>
    <my-button size="medium">中等按钮</my-button>
    <my-button size="small">小型按钮</my-button>
    <my-button size="mini">超小按钮</my-button>
  </div>
</template>
```

## Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type | 类型 | string | primary / success / warning / danger / info / text | default |
| size | 尺寸 | string | medium / small / mini | medium |
| 其他 | 继承 el-button 的所有属性 | - | - | - |

## Events

继承 el-button 的所有事件。

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 按钮内容 |
