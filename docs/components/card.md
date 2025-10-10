# Card 卡片

通用的卡片容器组件,支持标题、额外操作区域、阴影效果等。

## 基础用法

包含标题和内容的基础卡片。

::: demo
```vue
<template>
  <z-card title="用户信息">
    <p>这是卡片的内容区域</p>
    <p>可以放置任何内容</p>
  </z-card>
</template>
```
:::

## 简单卡片

不带标题的简单卡片。

::: demo
```vue
<template>
  <z-card>
    <div style="padding: 14px;">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" style="width: 100%; display: block;">
      <div style="padding: 14px 0;">
        <span>好吃的汉堡</span>
        <div style="margin-top: 13px; line-height: 12px;">
          <span style="font-size: 13px; color: #999;">2023-12-15 12:30</span>
        </div>
      </div>
    </div>
  </z-card>
</template>
```
:::

## 带操作区域

通过 `extra` 属性或插槽设置卡片右上角的操作区域。

::: demo
```vue
<template>
  <z-card title="用户列表">
    <template #extra>
      <el-button type="text" @click="handleMore">查看更多</el-button>
    </template>
    <div>
      <p>张三 - 管理员</p>
      <p>李四 - 编辑</p>
      <p>王五 - 访客</p>
    </div>
  </z-card>
</template>

<script>
export default {
  methods: {
    handleMore() {
      this.$message.info('查看更多用户')
    }
  }
}
</script>
```
:::

## 自定义标题

通过具名插槽 `header` 自定义标题区域。

::: demo
```vue
<template>
  <z-card>
    <template #header>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center;">
          <i class="el-icon-user" style="margin-right: 8px; font-size: 18px;"></i>
          <span style="font-weight: bold;">个人中心</span>
        </div>
        <div>
          <el-button type="primary" size="small">编辑</el-button>
          <el-button size="small">设置</el-button>
        </div>
      </div>
    </template>
    <div style="padding: 10px 0;">
      <p>用户名: zhangsan</p>
      <p>邮箱: zhangsan@example.com</p>
      <p>注册时间: 2023-01-15</p>
    </div>
  </z-card>
</template>
```
:::

## 不同阴影效果

通过 `shadow` 属性设置卡片的阴影显示时机。

::: demo
```vue
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <z-card title="总是显示" shadow="always">
          <p>shadow = always</p>
          <p>卡片总是显示阴影</p>
        </z-card>
      </el-col>
      <el-col :span="8">
        <z-card title="鼠标悬浮" shadow="hover">
          <p>shadow = hover</p>
          <p>鼠标悬浮时显示阴影</p>
        </z-card>
      </el-col>
      <el-col :span="8">
        <z-card title="从不显示" shadow="never">
          <p>shadow = never</p>
          <p>卡片从不显示阴影</p>
        </z-card>
      </el-col>
    </el-row>
  </div>
</template>
```
:::

## 卡片组合

多个卡片组合使用展示不同信息。

::: demo
```vue
<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <z-card shadow="hover">
        <div style="text-align: center;">
          <i class="el-icon-user" style="font-size: 48px; color: #409EFF;"></i>
          <h3 style="margin: 10px 0;">用户总数</h3>
          <p style="font-size: 24px; font-weight: bold; color: #409EFF;">1,234</p>
        </div>
      </z-card>
    </el-col>
    <el-col :span="6">
      <z-card shadow="hover">
        <div style="text-align: center;">
          <i class="el-icon-document" style="font-size: 48px; color: #67C23A;"></i>
          <h3 style="margin: 10px 0;">文章数量</h3>
          <p style="font-size: 24px; font-weight: bold; color: #67C23A;">567</p>
        </div>
      </z-card>
    </el-col>
    <el-col :span="6">
      <z-card shadow="hover">
        <div style="text-align: center;">
          <i class="el-icon-message" style="font-size: 48px; color: #E6A23C;"></i>
          <h3 style="margin: 10px 0;">评论数量</h3>
          <p style="font-size: 24px; font-weight: bold; color: #E6A23C;">890</p>
        </div>
      </z-card>
    </el-col>
    <el-col :span="6">
      <z-card shadow="hover">
        <div style="text-align: center;">
          <i class="el-icon-star-on" style="font-size: 48px; color: #F56C6C;"></i>
          <h3 style="margin: 10px 0;">收藏数量</h3>
          <p style="font-size: 24px; font-weight: bold; color: #F56C6C;">345</p>
        </div>
      </z-card>
    </el-col>
  </el-row>
</template>
```
:::

## 图片卡片

展示带图片的卡片样式。

::: demo
```vue
<template>
  <el-row :gutter="20">
    <el-col :span="8" v-for="item in products" :key="item.id">
      <z-card shadow="hover" :body-style="{ padding: '0px' }">
        <img :src="item.image" style="width: 100%; height: 200px; object-fit: cover;">
        <div style="padding: 14px;">
          <h4 style="margin: 0 0 10px 0;">{{ item.name }}</h4>
          <p style="color: #999; font-size: 13px; margin: 0 0 10px 0;">{{ item.description }}</p>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: #f56c6c; font-size: 18px; font-weight: bold;">¥{{ item.price }}</span>
            <el-button type="primary" size="small">购买</el-button>
          </div>
        </div>
      </z-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: '商品A',
          description: '这是商品A的描述信息',
          price: 299,
          image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        },
        {
          id: 2,
          name: '商品B',
          description: '这是商品B的描述信息',
          price: 399,
          image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        },
        {
          id: 3,
          name: '商品C',
          description: '这是商品C的描述信息',
          price: 499,
          image: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
        }
      ]
    }
  }
}
</script>
```
:::

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 卡片标题 | String | - |
| extra | 卡片右上角的操作区域 | String | - |
| shadow | 阴影显示时机 (always/hover/never) | String | 'always' |
| body-style | 内容区域的自定义样式 | Object | - |
| header-style | 标题区域的自定义样式 | Object | - |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 卡片内容 |
| header | 自定义标题区域内容 |
| extra | 卡片右上角的操作区域 |
