# Dialog 对话框

基于 Element UI Dialog 的二次封装,简化常用场景的使用。

## 基础用法

最基本的对话框使用方式。

::: demo
```vue
<template>
  <div>
    <el-button type="primary" @click="visible = true">打开对话框</el-button>

    <z-dialog
      :visible.sync="visible"
      title="提示"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    >
      <p>这是对话框的内容区域</p>
      <p>您可以在这里放置任何内容</p>
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
      this.$message.success('点击了确认')
      this.visible = false
    },
    handleCancel() {
      this.$message.info('点击了取消')
      this.visible = false
    }
  }
}
</script>
```
:::

## 不同尺寸

通过 `width` 属性设置对话框宽度。

::: demo
```vue
<template>
  <div>
    <el-button @click="openDialog('30%')">小对话框</el-button>
    <el-button @click="openDialog('50%')">中对话框</el-button>
    <el-button @click="openDialog('70%')">大对话框</el-button>

    <z-dialog
      :visible.sync="visible"
      title="对话框"
      :width="currentWidth"
      @confirm="visible = false"
    >
      <p>当前宽度: {{ currentWidth }}</p>
    </z-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      currentWidth: '50%'
    }
  },
  methods: {
    openDialog(width) {
      this.currentWidth = width
      this.visible = true
    }
  }
}
</script>
```
:::

## 表单对话框

在对话框中嵌入表单。

::: demo
```vue
<template>
  <div>
    <el-button type="primary" @click="visible = true">新增用户</el-button>

    <z-dialog
      :visible.sync="visible"
      title="用户信息"
      width="500px"
      @confirm="handleSubmit"
      @cancel="visible = false"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.role" placeholder="请选择角色" style="width: 100%;">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="编辑" value="editor"></el-option>
            <el-option label="访客" value="viewer"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </z-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      form: {
        username: '',
        email: '',
        role: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$message.success('提交成功: ' + JSON.stringify(this.form))
      this.visible = false
      this.form = { username: '', email: '', role: '' }
    }
  }
}
</script>
```
:::

## 自定义按钮

通过 `footer` 插槽自定义底部按钮。

::: demo
```vue
<template>
  <div>
    <el-button @click="visible = true">自定义按钮</el-button>

    <z-dialog
      :visible.sync="visible"
      title="自定义底部"
      :show-footer="false"
    >
      <p>这是一个自定义底部按钮的对话框</p>
      <template #footer>
        <el-button icon="el-icon-close" @click="visible = false">关闭</el-button>
        <el-button type="success" icon="el-icon-check" @click="handleSave">保存</el-button>
        <el-button type="primary" icon="el-icon-upload2" @click="handleSubmit">提交</el-button>
      </template>
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
    handleSave() {
      this.$message.success('保存成功')
    },
    handleSubmit() {
      this.$message.success('提交成功')
      this.visible = false
    }
  }
}
</script>
```
:::

## 自定义按钮文字

通过 `confirm-text` 和 `cancel-text` 自定义按钮文字。

::: demo
```vue
<template>
  <div>
    <el-button type="danger" @click="visible = true">删除操作</el-button>

    <z-dialog
      :visible.sync="visible"
      title="删除确认"
      width="400px"
      confirm-text="确认删除"
      cancel-text="我再想想"
      @confirm="handleDelete"
      @cancel="visible = false"
    >
      <div style="text-align: center; padding: 20px 0;">
        <i class="el-icon-warning" style="font-size: 60px; color: #E6A23C;"></i>
        <p style="margin-top: 20px;">确定要删除这条数据吗?</p>
        <p style="color: #909399;">删除后将无法恢复</p>
      </div>
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
    handleDelete() {
      this.$message.success('删除成功')
      this.visible = false
    }
  }
}
</script>
```
:::

## 关闭前回调

使用 `before-close` 在关闭前执行回调。

::: demo
```vue
<template>
  <div>
    <el-button @click="visible = true">关闭前确认</el-button>

    <z-dialog
      :visible.sync="visible"
      title="编辑文章"
      :before-close="handleBeforeClose"
      @confirm="handleSave"
    >
      <el-input
        type="textarea"
        v-model="content"
        :rows="5"
        placeholder="请输入内容"
      ></el-input>
    </z-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      content: ''
    }
  },
  methods: {
    handleBeforeClose(done) {
      if (this.content) {
        this.$confirm('内容尚未保存,确认关闭?', '提示', {
          type: 'warning'
        }).then(() => {
          done()
        }).catch(() => {})
      } else {
        done()
      }
    },
    handleSave() {
      this.$message.success('保存成功')
      this.visible = false
      this.content = ''
    }
  }
}
</script>
```
:::

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示对话框,支持 .sync 修饰符 | Boolean | false |
| title | 对话框标题 | String | '提示' |
| width | 对话框宽度 | String | '50%' |
| show-footer | 是否显示底部按钮 | Boolean | true |
| confirm-text | 确认按钮文字 | String | '确定' |
| cancel-text | 取消按钮文字 | String | '取消' |
| before-close | 关闭前回调,会暂停关闭 | Function(done) | - |
| close-on-click-modal | 是否可以通过点击遮罩关闭 | Boolean | true |
| close-on-press-escape | 是否可以通过 ESC 键关闭 | Boolean | true |
| show-close | 是否显示关闭按钮 | Boolean | true |
| center | 是否对头部和底部采用居中布局 | Boolean | false |
| destroy-on-close | 关闭时销毁内部元素 | Boolean | false |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 对话框内容 |
| title | 对话框标题 |
| footer | 对话框底部按钮区域 |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| confirm | 点击确认按钮时触发 | - |
| cancel | 点击取消按钮时触发 | - |
| close | 对话框关闭时触发 | - |
| open | 对话框打开时触发 | - |
