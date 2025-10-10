# Form 表单

基于 Element UI Form 的二次封装,通过配置化的方式快速创建表单。

## 基础用法

通过 `form-items` 配置表单项,支持多种表单控件类型。

::: demo
```vue
<template>
  <ZForm
    :form-data="formData"
    :form-items="formItems"
    @submit="handleSubmit"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: ''
      },
      formItems: [
        {
          label: '姓名',
          prop: 'name',
          type: 'input',
          required: true,
          placeholder: '请输入姓名'
        },
        {
          label: '邮箱',
          prop: 'email',
          type: 'input',
          required: true,
          placeholder: '请输入邮箱'
        }
      ]
    }
  },
  methods: {
    handleSubmit(formData) {
      this.$message.success('提交成功: ' + JSON.stringify(formData))
    }
  }
}
</script>
```
:::

## 所有表单项类型

展示所有支持的表单控件类型。

::: demo
```vue
<template>
  <ZForm
    :form-data="formData"
    :form-items="formItems"
    label-width="120px"
    @submit="handleSubmit"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {
        input: '',
        number: 0,
        textarea: '',
        select: '',
        radio: 1,
        checkbox: [],
        date: '',
        time: '',
        switch: false,
        slider: 50,
        rate: 0,
        color: '#409EFF'
      },
      formItems: [
        {
          label: '输入框',
          prop: 'input',
          type: 'input',
          placeholder: '请输入内容'
        },
        {
          label: '数字输入框',
          prop: 'number',
          type: 'number',
          min: 0,
          max: 100
        },
        {
          label: '文本域',
          prop: 'textarea',
          type: 'textarea',
          placeholder: '请输入多行文本',
          rows: 3
        },
        {
          label: '选择器',
          prop: 'select',
          type: 'select',
          placeholder: '请选择',
          options: [
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2' },
            { label: '选项三', value: '3' }
          ]
        },
        {
          label: '单选框',
          prop: 'radio',
          type: 'radio',
          options: [
            { label: '选项一', value: 1 },
            { label: '选项二', value: 2 },
            { label: '选项三', value: 3 }
          ]
        },
        {
          label: '多选框',
          prop: 'checkbox',
          type: 'checkbox',
          options: [
            { label: '选项一', value: 1 },
            { label: '选项二', value: 2 },
            { label: '选项三', value: 3 }
          ]
        },
        {
          label: '日期选择器',
          prop: 'date',
          type: 'date',
          placeholder: '选择日期'
        },
        {
          label: '时间选择器',
          prop: 'time',
          type: 'time',
          placeholder: '选择时间'
        },
        {
          label: '开关',
          prop: 'switch',
          type: 'switch'
        },
        {
          label: '滑块',
          prop: 'slider',
          type: 'slider'
        },
        {
          label: '评分',
          prop: 'rate',
          type: 'rate'
        },
        {
          label: '颜色选择器',
          prop: 'color',
          type: 'color'
        }
      ]
    }
  },
  methods: {
    handleSubmit(formData) {
      this.$message.success('提交成功!')
      console.log('表单数据:', formData)
    }
  }
}
</script>
```
:::

## 表单验证

支持内置和自定义验证规则。

::: demo
```vue
<template>
  <ZForm
    :form-data="formData"
    :form-items="formItems"
    :rules="rules"
    @submit="handleSubmit"
  />
</template>

<script>
export default {
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号'))
      } else if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }

    return {
      formData: {
        username: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      formItems: [
        {
          label: '用户名',
          prop: 'username',
          type: 'input',
          required: true,
          placeholder: '请输入用户名'
        },
        {
          label: '手机号',
          prop: 'phone',
          type: 'input',
          required: true,
          placeholder: '请输入手机号'
        },
        {
          label: '邮箱',
          prop: 'email',
          type: 'input',
          required: true,
          placeholder: '请输入邮箱'
        },
        {
          label: '密码',
          prop: 'password',
          type: 'input',
          inputType: 'password',
          required: true,
          placeholder: '请输入密码'
        },
        {
          label: '确认密码',
          prop: 'confirmPassword',
          type: 'input',
          inputType: 'password',
          required: true,
          placeholder: '请再次输入密码'
        }
      ],
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.formData.password) {
                callback(new Error('两次输入密码不一致!'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleSubmit(formData) {
      this.$message.success('验证通过,提交成功!')
      console.log('表单数据:', formData)
    }
  }
}
</script>
```
:::

## 行内表单

设置 `inline` 属性可以让表单域变为行内布局。

::: demo
```vue
<template>
  <ZForm
    :form-data="formData"
    :form-items="formItems"
    inline
    @submit="handleSubmit"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {
        keyword: '',
        status: ''
      },
      formItems: [
        {
          label: '关键词',
          prop: 'keyword',
          type: 'input',
          placeholder: '请输入关键词'
        },
        {
          label: '状态',
          prop: 'status',
          type: 'select',
          placeholder: '请选择状态',
          options: [
            { label: '全部', value: '' },
            { label: '启用', value: '1' },
            { label: '禁用', value: '0' }
          ]
        }
      ]
    }
  },
  methods: {
    handleSubmit(formData) {
      this.$message.success('搜索: ' + JSON.stringify(formData))
    }
  }
}
</script>
```
:::

## 自定义按钮

可以控制按钮的显示和权限。

::: demo
```vue
<template>
  <ZForm
    :form-data="formData"
    :form-items="formItems"
    :show-reset="true"
    :show-cancel="true"
    @submit="handleSubmit"
    @cancel="handleCancel"
    @reset="handleReset"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        desc: ''
      },
      formItems: [
        {
          label: '名称',
          prop: 'name',
          type: 'input',
          required: true,
          placeholder: '请输入名称'
        },
        {
          label: '描述',
          prop: 'desc',
          type: 'textarea',
          placeholder: '请输入描述'
        }
      ]
    }
  },
  methods: {
    handleSubmit(formData) {
      this.$message.success('提交成功!')
    },
    handleCancel() {
      this.$message.info('取消操作')
    },
    handleReset() {
      this.$message.info('重置表单')
    }
  }
}
</script>
```
:::

## 级联选择器

支持级联选择。

::: demo
```vue
<template>
  <ZForm
    :form-data="formData"
    :form-items="formItems"
    @submit="handleSubmit"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {
        region: []
      },
      formItems: [
        {
          label: '所在地区',
          prop: 'region',
          type: 'cascader',
          placeholder: '请选择地区',
          options: [
            {
              value: 'guangdong',
              label: '广东省',
              children: [
                {
                  value: 'guangzhou',
                  label: '广州市',
                  children: [
                    { value: 'tianhe', label: '天河区' },
                    { value: 'haizhu', label: '海珠区' }
                  ]
                },
                {
                  value: 'shenzhen',
                  label: '深圳市',
                  children: [
                    { value: 'futian', label: '福田区' },
                    { value: 'nanshan', label: '南山区' }
                  ]
                }
              ]
            },
            {
              value: 'zhejiang',
              label: '浙江省',
              children: [
                {
                  value: 'hangzhou',
                  label: '杭州市',
                  children: [
                    { value: 'xihu', label: '西湖区' },
                    { value: 'binjiang', label: '滨江区' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleSubmit(formData) {
      this.$message.success('提交成功: ' + JSON.stringify(formData))
    }
  }
}
</script>
```
:::

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

## Form Item 配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标签文本 | String | - |
| prop | 表单域字段名 | String | - |
| type | 表单控件类型 | String | 'input' |
| placeholder | 占位文本 | String | - |
| required | 是否必填 | Boolean | false |
| disabled | 是否禁用 | Boolean | false |
| options | 选项列表(select/radio/checkbox/cascader) | Array | [] |
| rows | textarea 行数 | Number | 2 |
| min | 最小值(number/slider) | Number | - |
| max | 最大值(number/slider) | Number | - |
| inputType | input 原生类型 | String | 'text' |

## 表单项类型

支持以下表单项类型:

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
