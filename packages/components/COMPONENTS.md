# 组件和工具方法使用文档

## 组件列表

### 基础组件

#### 1. ZForm - 表单组件
基于 Element UI 的二次封装，支持动态配置表单项。

```vue
<template>
  <z-form
    :form-data="formData"
    :form-items="formItems"
    :button-permissions="{ submit: 'user:add' }"
    @submit="handleSubmit"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: { name: '', email: '' },
      formItems: [
        { label: '姓名', prop: 'name', type: 'input', required: true },
        { label: '邮箱', prop: 'email', type: 'input', required: true }
      ]
    }
  },
  methods: {
    handleSubmit(data) {
      console.log('提交数据', data)
    }
  }
}
</script>
```

#### 2. ZTable - 表格组件
支持动态列配置、分页、操作按钮权限控制。

```vue
<template>
  <z-table
    :table-data="tableData"
    :columns="columns"
    show-operation
    :operation-buttons="operationButtons"
    :pagination="pagination"
    @current-change="handlePageChange"
  />
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      columns: [
        { label: 'ID', prop: 'id' },
        { label: '姓名', prop: 'name' }
      ],
      operationButtons: [
        {
          label: '编辑',
          permission: 'user:edit',
          handler: (row) => console.log('编辑', row)
        }
      ],
      pagination: { total: 100, pageSize: 10, currentPage: 1 }
    }
  }
}
</script>
```

#### 3. ZDialog - 对话框组件
对 Element UI Dialog 的封装，简化使用。

```vue
<template>
  <z-dialog
    :visible.sync="visible"
    title="提示"
    @confirm="handleConfirm"
  >
    <p>对话框内容</p>
  </z-dialog>
</template>
```

#### 4. ZSearchForm - 搜索表单组件
支持折叠、权限控制的搜索表单。

```vue
<template>
  <z-search-form
    :search-data="searchData"
    :search-items="searchItems"
    :button-permissions="{ search: 'user:search' }"
    collapsible
    @search="handleSearch"
  />
</template>
```

#### 5. ZDescriptions - 描述列表组件
用于展示详细信息。

```vue
<template>
  <z-descriptions
    :data="userData"
    :items="items"
    :column="3"
    border
  />
</template>

<script>
export default {
  data() {
    return {
      userData: { name: '张三', age: 25 },
      items: [
        { label: '姓名', prop: 'name' },
        { label: '年龄', prop: 'age' }
      ]
    }
  }
}
</script>
```

#### 6. ZCard - 卡片组件
封装 Element UI Card，支持更多功能。

```vue
<template>
  <z-card title="用户信息" extra="额外内容">
    <p>卡片内容</p>
  </z-card>
</template>
```

#### 7. ZPageHeader - 页面头部组件
包含面包屑、标题、返回按钮等。

```vue
<template>
  <z-page-header
    title="用户管理"
    :breadcrumb="['系统管理', '用户管理']"
    show-back
    @back="$router.back()"
  >
    <template #extra>
      <el-button type="primary">新增</el-button>
    </template>
  </z-page-header>
</template>
```

#### 8. ZChart - ECharts 图表组件
ECharts 封装，支持自动 resize、事件转发。

```vue
<template>
  <z-chart
    :option="chartOption"
    :height="400"
    :loading="loading"
    auto-resize
    @chart-ready="handleChartReady"
  />
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      chartOption: {
        title: { text: '示例图表' },
        xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
        yAxis: { type: 'value' },
        series: [{ data: [120, 200, 150], type: 'line' }]
      }
    }
  }
}
</script>
```

### 新增组件

#### 9. ZUpload - 文件上传组件
支持多种上传方式、文件大小和类型限制。

```vue
<template>
  <z-upload
    action="/api/upload"
    :max-size="5"
    :allowed-types="['jpg', 'png', 'pdf']"
    :limit="3"
    list-type="picture-card"
    @success="handleSuccess"
  />
</template>

<script>
export default {
  methods: {
    handleSuccess(response, file, fileList) {
      console.log('上传成功', response)
    }
  }
}
</script>
```

**主要特性：**
- 支持拖拽上传
- 文件大小限制
- 文件类型限制
- 自动/手动上传
- 图片预览
- 上传进度显示

#### 10. ZImagePreview - 图片预览组件
批量图片展示和预览。

```vue
<template>
  <z-image-preview
    :image-list="images"
    :width="100"
    :height="100"
    show-delete
    @delete="handleDelete"
  />
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg'
      ]
    }
  },
  methods: {
    handleDelete(index) {
      this.images.splice(index, 1)
    }
  }
}
</script>
```

#### 11. ZEmpty - 空状态组件
用于显示空数据状态。

```vue
<template>
  <z-empty
    description="暂无数据"
    :image-size="200"
  >
    <el-button type="primary">添加数据</el-button>
  </z-empty>
</template>
```

**使用场景：**
- 列表无数据
- 搜索无结果
- 加载失败

#### 12. ZSteps - 步骤条组件
带操作按钮的步骤条封装。

```vue
<template>
  <z-steps
    :active.sync="active"
    :steps="steps"
    :before-next="beforeNext"
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
    async beforeNext(currentStep) {
      // 验证当前步骤
      if (currentStep === 0) {
        return this.validateStep1()
      }
      return true
    },
    handleSubmit() {
      console.log('提交')
    }
  }
}
</script>
```

## 工具方法

### 1. validate - 表单验证工具

提供常用的表单验证规则。

```javascript
import { validate } from '@rowan287630/zhui'

// 使用预定义规则
const formRules = {
  phone: validate.rules.phoneRequired,
  email: validate.rules.emailRequired,
  username: validate.rules.usernameRequired
}

// 使用验证函数
const customRules = {
  phone: { validator: validate.phoneValidator, trigger: 'blur' },
  age: { validator: validate.rangeValidator(1, 120), trigger: 'blur' }
}
```

**可用验证器：**
- `phoneValidator` - 手机号验证
- `emailValidator` - 邮箱验证
- `idCardValidator` - 身份证验证
- `urlValidator` - 网址验证
- `passwordValidator` - 密码强度验证
- `integerValidator` - 整数验证
- `positiveIntegerValidator` - 正整数验证
- `positiveNumberValidator` - 正数验证
- `rangeValidator(min, max)` - 数字范围验证
- `lengthValidator(min, max)` - 长度范围验证
- `chineseValidator` - 中文验证
- `englishValidator` - 英文验证
- `usernameValidator` - 用户名验证
- `ipValidator` - IP地址验证
- `portValidator` - 端口号验证

### 2. format - 数据格式化工具

提供常用的数据格式化方法。

```javascript
import { format } from '@rowan287630/zhui'

// 格式化日期
format.formatDate(new Date(), 'YYYY-MM-DD') // '2024-01-01'
format.formatRelativeTime(new Date(Date.now() - 3600000)) // '1小时前'

// 格式化文件大小
format.formatFileSize(1024 * 1024) // '1 MB'

// 格式化金额
format.formatMoney(1234.56) // '¥1,234.56'
format.formatMoney(1234.56, 2, false) // '1,234.56'

// 格式化数字（千分位）
format.formatNumber(1234567.89) // '1,234,567.89'

// 格式化手机号（隐藏中间4位）
format.formatPhone('13812345678') // '138****5678'

// 格式化身份证（隐藏中间部分）
format.formatIdCard('110101199001011234') // '110101********1234'

// 格式化银行卡（每4位空格）
format.formatBankCard('6222021234567890') // '6222 0212 3456 7890'

// 格式化百分比
format.formatPercent(0.1234) // '12.34%'

// 截断文本
format.truncate('这是一段很长的文本', 5) // '这是一段很...'

// 首字母大写
format.capitalize('hello') // 'Hello'

// 驼峰转下划线
format.underscoreCase('userName') // 'user_name'

// 下划线转驼峰
format.camelCase('user_name') // 'userName'
```

**可用方法：**
- `formatDate(date, format)` - 格式化日期
- `formatRelativeTime(date)` - 相对时间
- `formatFileSize(bytes, decimals)` - 文件大小
- `formatMoney(amount, decimals, showSymbol)` - 金额
- `formatNumber(num, decimals)` - 数字千分位
- `formatPhone(phone)` - 手机号脱敏
- `formatIdCard(idCard)` - 身份证脱敏
- `formatBankCard(cardNumber)` - 银行卡格式化
- `formatPercent(num, decimals)` - 百分比
- `toFixed(num, decimals)` - 保留小数
- `truncate(text, length, ellipsis)` - 截断文本
- `capitalize(str)` - 首字母大写
- `camelCase(str)` - 转驼峰命名
- `underscoreCase(str)` - 转下划线命名

### 3. storage - 本地存储工具

封装了 localStorage 和 sessionStorage，支持过期时间。

```javascript
import { storage } from '@rowan287630/zhui'

// localStorage 操作
storage.local.set('user', { name: '张三' }) // 永久存储
storage.local.set('token', 'abc123', 3600) // 1小时后过期
storage.local.get('user') // 获取
storage.local.get('token', 'default') // 获取（带默认值）
storage.local.remove('user') // 删除
storage.local.clear() // 清空所有
storage.local.has('user') // 是否存在
storage.local.keys() // 获取所有键名

// sessionStorage 操作
storage.session.set('temp', 'data')
storage.session.get('temp')

// 创建自定义前缀的存储实例
const myStorage = storage.createStorage('myapp_')
myStorage.set('data', { value: 123 })
```

**主要特性：**
- 自动 JSON 序列化/反序列化
- 支持过期时间
- 自动清理过期数据
- 自定义前缀隔离
- 异常处理

### 4. request - 请求工具

基于 Fetch API 的请求封装。

```javascript
import { request } from '@rowan287630/zhui'

// 创建请求实例
const api = request.createRequest({
  baseURL: 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Authorization': 'Bearer token'
  }
})

// GET 请求
api.get('/users', { page: 1, size: 10 })
  .then(res => console.log(res.data))

// POST 请求
api.post('/users', { name: '张三', age: 25 })
  .then(res => console.log(res.data))

// PUT 请求
api.put('/users/1', { name: '李四' })

// DELETE 请求
api.delete('/users/1')

// 添加请求拦截器
request.addRequestInterceptor(
  config => {
    // 在请求前添加 token
    config.headers['Authorization'] = 'Bearer ' + getToken()
    return config
  },
  error => Promise.reject(error)
)

// 添加响应拦截器
request.addResponseInterceptor(
  response => {
    // 统一处理响应
    if (response.data.code === 200) {
      return response.data
    }
    return Promise.reject(response.data)
  },
  error => {
    // 统一处理错误
    console.error('请求失败', error)
    return Promise.reject(error)
  }
)
```

**主要特性：**
- 基于 Fetch API
- 支持请求/响应拦截器
- 超时控制
- 自动 JSON 处理
- 支持多种 Content-Type

## 权限控制

详见 [PERMISSION.md](./PERMISSION.md)

## 完整使用示例

```vue
<template>
  <div class="user-management">
    <!-- 页面头部 -->
    <z-page-header
      title="用户管理"
      :breadcrumb="['系统管理', '用户管理']"
    >
      <template #extra>
        <el-button
          v-permission="'user:add'"
          type="primary"
          @click="handleAdd"
        >
          新增用户
        </el-button>
      </template>
    </z-page-header>

    <!-- 搜索表单 -->
    <z-card>
      <z-search-form
        :search-data="searchData"
        :search-items="searchItems"
        collapsible
        @search="handleSearch"
      />

      <!-- 表格 -->
      <z-table
        :table-data="tableData"
        :columns="columns"
        :loading="loading"
        show-operation
        :operation-buttons="operationButtons"
        :pagination="pagination"
        @current-change="handlePageChange"
      />
    </z-card>

    <!-- 编辑对话框 -->
    <z-dialog
      :visible.sync="dialogVisible"
      :title="dialogTitle"
      width="600px"
      @confirm="handleSave"
    >
      <z-form
        ref="form"
        :form-data="formData"
        :form-items="formItems"
        :rules="formRules"
        :show-buttons="false"
      />
    </z-dialog>
  </div>
</template>

<script>
import { validate, format, storage } from '@rowan287630/zhui'

export default {
  name: 'UserManagement',
  data() {
    return {
      loading: false,
      searchData: { keyword: '', status: '' },
      searchItems: [
        { label: '关键词', prop: 'keyword', type: 'input' },
        { label: '状态', prop: 'status', type: 'select', options: [] }
      ],
      tableData: [],
      columns: [
        { label: 'ID', prop: 'id', width: 80 },
        { label: '姓名', prop: 'name' },
        { label: '手机号', prop: 'phone', formatter: (row) => format.formatPhone(row.phone) },
        { label: '创建时间', prop: 'createTime', formatter: (row) => format.formatDate(row.createTime) }
      ],
      operationButtons: [
        {
          label: '编辑',
          type: 'text',
          permission: 'user:edit',
          handler: this.handleEdit
        },
        {
          label: '删除',
          type: 'text',
          permission: 'user:delete',
          handler: this.handleDelete
        }
      ],
      pagination: { total: 0, pageSize: 10, currentPage: 1 },
      dialogVisible: false,
      dialogTitle: '',
      formData: {},
      formItems: [
        { label: '姓名', prop: 'name', type: 'input', required: true },
        { label: '手机号', prop: 'phone', type: 'input', required: true },
        { label: '邮箱', prop: 'email', type: 'input', required: true }
      ],
      formRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: validate.rules.phoneRequired,
        email: validate.rules.emailRequired
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.loading = true
      // 加载数据逻辑
      this.loading = false
    },
    handleSearch(data) {
      console.log('搜索', data)
      this.loadData()
    },
    handlePageChange(page) {
      this.pagination.currentPage = page
      this.loadData()
    },
    handleAdd() {
      this.dialogTitle = '新增用户'
      this.formData = {}
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.dialogTitle = '编辑用户'
      this.formData = { ...row }
      this.dialogVisible = true
    },
    handleDelete(row) {
      this.$confirm('确认删除该用户？', '提示', {
        type: 'warning'
      }).then(() => {
        // 删除逻辑
        this.$message.success('删除成功')
        this.loadData()
      })
    },
    async handleSave() {
      const valid = await this.$refs.form.validate()
      if (valid) {
        // 保存逻辑
        this.$message.success('保存成功')
        this.dialogVisible = false
        this.loadData()
      }
    }
  }
}
</script>
```
