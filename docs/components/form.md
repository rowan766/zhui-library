# Form 表单

基于 Element UI Form 的二次封装，通过配置化的方式快速创建表单。

## 基础用法

通过 `form-items` 配置表单项，支持多种表单控件类型。

```vue
<template>
  <z-form
    :form-data="formData"
    :form-items="formItems"
    @submit="handleSubmit"
    @cancel="handleCancel"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        age: '',
        gender: '',
        desc: ''
      },
      formItems: [
        {
          label: '姓名',
          prop: 'name',
          type: 'input',
          required: true
        },
        {
          label: '年龄',
          prop: 'age',
          type: 'number',
          required: true
        },
        {
          label: '性别',
          prop: 'gender',
          type: 'select',
          options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' }
          ],
          required: true
        },
        {
          label: '描述',
          prop: 'desc',
          type: 'textarea'
        }
      ]
    }
  },
  methods: {
    handleSubmit(formData) {
      console.log('提交', formData)
    },
    handleCancel() {
      console.log('取消')
    }
  }
}
</script>
```

## 表单项类型

支持以下表单项类型：

- `input` - 输入框
- `number` - 数字输入框
- `textarea` - 文本域
- `select` - 选择器
- `radio` - 单选框
- `checkbox` - 多选框
- `date` - 日期选择器
- `time` - 时间选择器
- `switch` - 开关
- `slider` - 滑块
- `cascader` - 级联选择器
- `rate` - 评分
- `color` - 颜色选择器
- `upload` - 文件上传
- `slot` - 自定义插槽

## 表单验证

```vue
<template>
  <z-form
    ref="form"
    :form-data="formData"
    :form-items="formItems"
    :rules="formRules"
  />
</template>

<script>
import { validate } from '@rowan287630/zhui'

export default {
  data() {
    return {
      formData: { phone: '', email: '' },
      formItems: [
        { label: '手机号', prop: 'phone', type: 'input' },
        { label: '邮箱', prop: 'email', type: 'input' }
      ],
      formRules: {
        phone: validate.rules.phoneRequired,
        email: validate.rules.emailRequired
      }
    }
  }
}
</script>
```

## 权限控制

通过 `button-permissions` 控制按钮显示权限。

```vue
<z-form
  :form-data="formData"
  :form-items="formItems"
  :button-permissions="{
    submit: 'user:add',
    reset: null,
    cancel: null
  }"
/>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| form-data | 表单数据对象 | Object | - |
| form-items | 表单项配置 | Array | [] |
| rules | 表单验证规则 | Object | {} |
| label-width | 标签宽度 | String | '100px' |
| label-position | 标签位置 | String | 'right' |
| inline | 是否行内表单 | Boolean | false |
| show-buttons | 是否显示操作按钮 | Boolean | true |
| show-submit | 是否显示提交按钮 | Boolean | true |
| show-reset | 是否显示重置按钮 | Boolean | true |
| show-cancel | 是否显示取消按钮 | Boolean | false |
| button-permissions | 按钮权限配置 | Object | {} |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| submit | 提交表单 | formData |
| cancel | 取消操作 | - |
| reset | 重置表单 | - |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| validate | 验证表单 | - |
| resetFields | 重置表单字段 | - |
| clearValidate | 清空验证信息 | - |
