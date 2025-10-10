# Empty 空状态

用于显示空数据状态的占位提示组件。

## 基础用法

基本的空状态展示。

::: demo
```vue
<template>
  <z-empty description="暂无数据" />
</template>
```
:::

## 自定义描述文字

通过 `description` 属性自定义描述文字。

::: demo
```vue
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <z-empty description="暂无搜索结果" />
      </el-col>
      <el-col :span="8">
        <z-empty description="购物车是空的" />
      </el-col>
      <el-col :span="8">
        <z-empty description="没有找到相关内容" />
      </el-col>
    </el-row>
  </div>
</template>
```
:::

## 自定义图片

通过 `image` 属性自定义空状态图片。

::: demo
```vue
<template>
  <z-empty
    image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
    description="自定义空状态图片"
  />
</template>
```
:::

## 调整图片大小

通过 `image-size` 属性调整图片大小。

::: demo
```vue
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div style="text-align: center; margin-bottom: 10px; color: #909399;">小尺寸 (80px)</div>
        <z-empty
          description="小图标"
          :image-size="80"
        />
      </el-col>
      <el-col :span="8">
        <div style="text-align: center; margin-bottom: 10px; color: #909399;">默认尺寸</div>
        <z-empty
          description="默认图标"
        />
      </el-col>
      <el-col :span="8">
        <div style="text-align: center; margin-bottom: 10px; color: #909399;">大尺寸 (200px)</div>
        <z-empty
          description="大图标"
          :image-size="200"
        />
      </el-col>
    </el-row>
  </div>
</template>
```
:::

## 底部内容

通过默认插槽添加底部内容,如操作按钮。

::: demo
```vue
<template>
  <z-empty description="暂无数据">
    <el-button type="primary" @click="handleAdd">添加数据</el-button>
  </z-empty>
</template>

<script>
export default {
  methods: {
    handleAdd() {
      this.$message.success('添加数据')
    }
  }
}
</script>
```
:::

## 不同场景

展示不同场景下的空状态。

::: demo
```vue
<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="搜索结果" name="search">
        <z-empty description="未找到相关搜索结果">
          <el-button type="primary" @click="handleClearSearch">清空搜索条件</el-button>
        </z-empty>
      </el-tab-pane>
      <el-tab-pane label="购物车" name="cart">
        <z-empty description="购物车还是空的,快去挑选商品吧">
          <el-button type="primary" @click="handleGoShop">去购物</el-button>
        </z-empty>
      </el-tab-pane>
      <el-tab-pane label="订单列表" name="order">
        <z-empty description="暂无订单记录">
          <el-button type="primary" @click="handleCreateOrder">创建订单</el-button>
        </z-empty>
      </el-tab-pane>
      <el-tab-pane label="收藏夹" name="favorite">
        <z-empty description="还没有收藏任何内容">
          <el-button type="primary" @click="handleExplore">去发现</el-button>
        </z-empty>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'search'
    }
  },
  methods: {
    handleClearSearch() {
      this.$message.info('已清空搜索条件')
    },
    handleGoShop() {
      this.$message.success('前往商城')
    },
    handleCreateOrder() {
      this.$message.success('创建新订单')
    },
    handleExplore() {
      this.$message.success('前往发现页')
    }
  }
}
</script>
```
:::

## 自定义图标

通过 `image` 插槽自定义图标。

::: demo
```vue
<template>
  <z-empty description="网络连接失败">
    <template #image>
      <i class="el-icon-warning" style="font-size: 100px; color: #E6A23C;"></i>
    </template>
    <el-button type="primary" @click="handleRetry">重新连接</el-button>
  </z-empty>
</template>

<script>
export default {
  methods: {
    handleRetry() {
      this.$message.info('正在重新连接...')
    }
  }
}
</script>
```
:::

## 在表格中使用

表格数据为空时的展示。

::: demo
```vue
<template>
  <div>
    <div style="margin-bottom: 10px;">
      <el-button @click="toggleData" size="small">{{ hasData ? '清空数据' : '加载数据' }}</el-button>
    </div>
    <el-table :data="tableData" border>
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="age" label="年龄" />
      <el-table-column prop="address" label="地址" />
      <template #empty>
        <z-empty description="暂无用户数据">
          <el-button type="primary" size="small" @click="handleAddUser">添加用户</el-button>
        </z-empty>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasData: false,
      tableData: []
    }
  },
  methods: {
    toggleData() {
      if (this.hasData) {
        this.tableData = []
        this.hasData = false
      } else {
        this.tableData = [
          { name: '张三', age: 28, address: '上海市' },
          { name: '李四', age: 32, address: '北京市' }
        ]
        this.hasData = true
      }
    },
    handleAddUser() {
      this.$message.success('添加用户')
    }
  }
}
</script>
```
:::

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| image | 图片地址 | String | - |
| image-size | 图片大小(像素) | Number | 100 |
| description | 描述文字 | String | '暂无数据' |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义底部内容 |
| image | 自定义图片内容 |
| description | 自定义描述文字 |
