# Steps 步骤条

带操作按钮的步骤条组件,用于引导用户按照流程完成任务。

## 基础用法

基本的步骤条使用。

::: demo
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
      this.$message.success('提交成功!')
      console.log('完成所有步骤')
    }
  }
}
</script>
```
:::

## 带表单的步骤

在步骤条中嵌入表单内容。

::: demo
```vue
<template>
  <z-steps
    :active.sync="active"
    :steps="steps"
    @submit="handleSubmit"
  >
    <template #step-0>
      <el-form :model="formData" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
      </el-form>
    </template>

    <template #step-1>
      <el-form :model="formData" label-width="100px">
        <el-form-item label="手机号">
          <el-input v-model="formData.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="formData.address" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
    </template>

    <template #step-2>
      <div style="padding: 20px;">
        <h4>请确认您的信息</h4>
        <p>用户名: {{ formData.username }}</p>
        <p>邮箱: {{ formData.email }}</p>
        <p>手机号: {{ formData.phone }}</p>
        <p>地址: {{ formData.address }}</p>
      </div>
    </template>
  </z-steps>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      formData: {
        username: '',
        email: '',
        phone: '',
        address: ''
      },
      steps: [
        { title: '基本信息', description: '填写用户名和邮箱' },
        { title: '联系方式', description: '填写手机号和地址' },
        { title: '确认信息', description: '确认并提交' }
      ]
    }
  },
  methods: {
    handleSubmit() {
      this.$message.success('注册成功!')
      console.log('提交的数据:', this.formData)
    }
  }
}
</script>
```
:::

## 带验证的步骤

通过 `before-next` 钩子在进入下一步前进行验证。

::: demo
```vue
<template>
  <z-steps
    :active.sync="active"
    :steps="steps"
    :before-next="beforeNext"
    @submit="handleSubmit"
  >
    <template #step-0>
      <el-form :model="formData" label-width="100px">
        <el-form-item label="姓名" required>
          <el-input v-model="formData.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
      </el-form>
    </template>

    <template #step-1>
      <el-form :model="formData" label-width="100px">
        <el-form-item label="年龄" required>
          <el-input-number v-model="formData.age" :min="1" :max="100"></el-input-number>
        </el-form-item>
      </el-form>
    </template>

    <template #step-2>
      <div style="padding: 20px;">
        <h4>信息确认</h4>
        <p>姓名: {{ formData.name }}</p>
        <p>年龄: {{ formData.age }}</p>
      </div>
    </template>
  </z-steps>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      formData: {
        name: '',
        age: null
      },
      steps: [
        { title: '输入姓名', description: '请输入您的姓名' },
        { title: '输入年龄', description: '请输入您的年龄' },
        { title: '完成', description: '确认信息' }
      ]
    }
  },
  methods: {
    beforeNext(currentStep) {
      if (currentStep === 0 && !this.formData.name) {
        this.$message.warning('请输入姓名')
        return false
      }
      if (currentStep === 1 && !this.formData.age) {
        this.$message.warning('请输入年龄')
        return false
      }
      return true
    },
    handleSubmit() {
      this.$message.success('提交成功!')
    }
  }
}
</script>
```
:::

## 竖向步骤条

设置 `direction="vertical"` 展示竖向步骤条。

::: demo
```vue
<template>
  <z-steps
    :active.sync="active"
    :steps="steps"
    direction="vertical"
    @submit="handleSubmit"
  >
    <template #step-0>
      <div style="padding: 20px; background: #f5f7fa; border-radius: 4px;">
        <p>第一步内容</p>
      </div>
    </template>
    <template #step-1>
      <div style="padding: 20px; background: #f5f7fa; border-radius: 4px;">
        <p>第二步内容</p>
      </div>
    </template>
    <template #step-2>
      <div style="padding: 20px; background: #f5f7fa; border-radius: 4px;">
        <p>第三步内容</p>
      </div>
    </template>
  </z-steps>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      steps: [
        { title: '步骤一', description: '这是第一步' },
        { title: '步骤二', description: '这是第二步' },
        { title: '步骤三', description: '这是第三步' }
      ]
    }
  },
  methods: {
    handleSubmit() {
      this.$message.success('完成!')
    }
  }
}
</script>
```
:::

## 简洁风格

设置 `simple` 属性切换到简洁风格。

::: demo
```vue
<template>
  <z-steps
    :active.sync="active"
    :steps="steps"
    simple
    @submit="handleSubmit"
  >
    <template #step-0>
      <div style="padding: 30px; text-align: center;">
        <i class="el-icon-user" style="font-size: 48px; color: #409EFF;"></i>
        <p style="margin-top: 10px;">创建账号</p>
      </div>
    </template>
    <template #step-1>
      <div style="padding: 30px; text-align: center;">
        <i class="el-icon-setting" style="font-size: 48px; color: #67C23A;"></i>
        <p style="margin-top: 10px;">设置信息</p>
      </div>
    </template>
    <template #step-2>
      <div style="padding: 30px; text-align: center;">
        <i class="el-icon-circle-check" style="font-size: 48px; color: #67C23A;"></i>
        <p style="margin-top: 10px;">完成</p>
      </div>
    </template>
  </z-steps>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      steps: [
        { title: '创建账号' },
        { title: '设置信息' },
        { title: '完成' }
      ]
    }
  },
  methods: {
    handleSubmit() {
      this.$message.success('设置完成!')
    }
  }
}
</script>
```
:::

## 自定义按钮文字

通过相关属性自定义按钮文字。

::: demo
```vue
<template>
  <z-steps
    :active.sync="active"
    :steps="steps"
    next-text="下一步"
    prev-text="上一步"
    submit-text="完成配置"
    @submit="handleSubmit"
  >
    <template #step-0>
      <div style="padding: 20px;">选择模板</div>
    </template>
    <template #step-1>
      <div style="padding: 20px;">配置参数</div>
    </template>
    <template #step-2>
      <div style="padding: 20px;">预览效果</div>
    </template>
  </z-steps>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      steps: [
        { title: '选择模板', description: '选择合适的模板' },
        { title: '配置参数', description: '设置相关参数' },
        { title: '预览', description: '预览最终效果' }
      ]
    }
  },
  methods: {
    handleSubmit() {
      this.$message.success('配置完成!')
    }
  }
}
</script>
```
:::

## 隐藏按钮

设置 `show-buttons` 为 false 隐藏按钮,手动控制步骤切换。

::: demo
```vue
<template>
  <div>
    <z-steps
      :active.sync="active"
      :steps="steps"
      :show-buttons="false"
    >
      <template #step-0>
        <div style="padding: 20px;">第一步内容</div>
      </template>
      <template #step-1>
        <div style="padding: 20px;">第二步内容</div>
      </template>
      <template #step-2>
        <div style="padding: 20px;">第三步内容</div>
      </template>
    </z-steps>

    <div style="margin-top: 20px; text-align: center;">
      <el-button @click="prevStep" :disabled="active === 0">上一步</el-button>
      <el-button type="primary" @click="nextStep" :disabled="active === steps.length - 1">
        下一步
      </el-button>
      <el-button type="success" @click="handleFinish" :disabled="active !== steps.length - 1">
        完成
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      steps: [
        { title: '步骤1' },
        { title: '步骤2' },
        { title: '步骤3' }
      ]
    }
  },
  methods: {
    prevStep() {
      if (this.active > 0) {
        this.active--
      }
    },
    nextStep() {
      if (this.active < this.steps.length - 1) {
        this.active++
      }
    },
    handleFinish() {
      this.$message.success('完成!')
    }
  }
}
</script>
```
:::

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 当前激活步骤(支持 .sync 修饰符) | Number | 0 |
| steps | 步骤配置数组 | Array | [] |
| direction | 显示方向(horizontal/vertical) | String | 'horizontal' |
| simple | 是否应用简洁风格 | Boolean | false |
| show-buttons | 是否显示操作按钮 | Boolean | true |
| next-text | 下一步按钮文字 | String | '下一步' |
| prev-text | 上一步按钮文字 | String | '上一步' |
| submit-text | 提交按钮文字 | String | '提交' |
| before-next | 下一步前的钩子函数 | Function(currentStep) | - |
| finish-status | 结束步骤的状态(wait/process/finish/error/success) | String | 'success' |

## Steps 配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | String | - |
| description | 描述文字 | String | - |
| icon | 图标类名 | String | - |
| status | 步骤状态(wait/process/finish/error/success) | String | - |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| submit | 点击提交按钮时触发 | - |
| change | 当前步骤改变时触发 | active, oldActive |
| prev | 点击上一步按钮时触发 | currentStep |
| next | 点击下一步按钮时触发 | currentStep |

## Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| step-[index] | 自定义步骤内容,index 为步骤索引 | - |
