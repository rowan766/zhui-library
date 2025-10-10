# Descriptions 描述列表

用于展示详细信息的描述列表组件,常用于详情页面。

## 基础用法

通过 `data` 和 `items` 配置描述列表。

::: demo
```vue
<template>
  <z-descriptions
    :data="userData"
    :items="items"
  />
</template>

<script>
export default {
  data() {
    return {
      userData: {
        name: '张三',
        age: 25,
        phone: '13812345678',
        email: 'zhangsan@example.com',
        address: '浙江省杭州市西湖区文一西路'
      },
      items: [
        { label: '姓名', prop: 'name' },
        { label: '年龄', prop: 'age' },
        { label: '手机号', prop: 'phone' },
        { label: '邮箱', prop: 'email' },
        { label: '地址', prop: 'address' }
      ]
    }
  }
}
</script>
```
:::

## 多列布局

通过 `column` 属性设置每行显示的列数。

::: demo
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
      userData: {
        username: 'zhangsan',
        realName: '张三',
        gender: '男',
        age: 28,
        department: '技术部',
        position: '前端工程师',
        phone: '13812345678',
        email: 'zhangsan@example.com',
        entryDate: '2020-01-15'
      },
      items: [
        { label: '用户名', prop: 'username' },
        { label: '真实姓名', prop: 'realName' },
        { label: '性别', prop: 'gender' },
        { label: '年龄', prop: 'age' },
        { label: '部门', prop: 'department' },
        { label: '职位', prop: 'position' },
        { label: '手机号', prop: 'phone' },
        { label: '邮箱', prop: 'email' },
        { label: '入职日期', prop: 'entryDate' }
      ]
    }
  }
}
</script>
```
:::

## 带边框

设置 `border` 属性显示边框。

::: demo
```vue
<template>
  <z-descriptions
    title="用户信息"
    :data="userData"
    :items="items"
    :column="2"
    border
  />
</template>

<script>
export default {
  data() {
    return {
      userData: {
        name: '李四',
        phone: '13900001111',
        email: 'lisi@example.com',
        company: '某某科技有限公司',
        department: '产品部',
        position: '产品经理'
      },
      items: [
        { label: '姓名', prop: 'name' },
        { label: '手机号', prop: 'phone' },
        { label: '邮箱', prop: 'email' },
        { label: '公司', prop: 'company' },
        { label: '部门', prop: 'department' },
        { label: '职位', prop: 'position' }
      ]
    }
  }
}
</script>
```
:::

## 自定义标题

通过 `title` 属性或插槽自定义标题。

::: demo
```vue
<template>
  <z-descriptions
    :data="orderData"
    :items="items"
    border
  >
    <template #title>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <span style="font-size: 16px; font-weight: bold;">订单详情</span>
        <el-tag type="success">已完成</el-tag>
      </div>
    </template>
  </z-descriptions>
</template>

<script>
export default {
  data() {
    return {
      orderData: {
        orderNo: 'ORD20231215001',
        amount: '¥1,299.00',
        status: '已完成',
        createTime: '2023-12-15 14:30:00',
        payTime: '2023-12-15 14:32:15',
        finishTime: '2023-12-20 10:15:00'
      },
      items: [
        { label: '订单号', prop: 'orderNo' },
        { label: '订单金额', prop: 'amount' },
        { label: '订单状态', prop: 'status' },
        { label: '创建时间', prop: 'createTime' },
        { label: '支付时间', prop: 'payTime' },
        { label: '完成时间', prop: 'finishTime' }
      ]
    }
  }
}
</script>
```
:::

## 自定义内容

通过具名插槽自定义单个描述项的内容。

::: demo
```vue
<template>
  <z-descriptions
    title="商品信息"
    :data="productData"
    :items="items"
    :column="2"
    border
  >
    <template #status="{ data }">
      <el-tag :type="data.status === 1 ? 'success' : 'danger'">
        {{ data.status === 1 ? '上架' : '下架' }}
      </el-tag>
    </template>
    <template #image="{ data }">
      <el-image
        :src="data.image"
        style="width: 100px; height: 100px;"
        fit="cover"
      ></el-image>
    </template>
    <template #price="{ data }">
      <span style="color: #f56c6c; font-size: 18px; font-weight: bold;">
        ¥{{ data.price }}
      </span>
    </template>
  </z-descriptions>
</template>

<script>
export default {
  data() {
    return {
      productData: {
        name: 'iPhone 15 Pro',
        price: 7999,
        stock: 100,
        status: 1,
        category: '手机数码',
        image: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
      },
      items: [
        { label: '商品图片', prop: 'image', slotName: 'image', span: 2 },
        { label: '商品名称', prop: 'name' },
        { label: '商品分类', prop: 'category' },
        { label: '商品价格', prop: 'price', slotName: 'price' },
        { label: '库存数量', prop: 'stock' },
        { label: '商品状态', prop: 'status', slotName: 'status', span: 2 }
      ]
    }
  }
}
</script>
```
:::

## 格式化内容

通过 `formatter` 函数格式化描述项内容。

::: demo
```vue
<template>
  <z-descriptions
    title="员工信息"
    :data="employeeData"
    :items="items"
    :column="2"
    border
  />
</template>

<script>
export default {
  data() {
    return {
      employeeData: {
        name: '王五',
        gender: 1,
        salary: 15000,
        entryDate: 1609459200000,
        status: 1,
        performance: 0.92
      },
      items: [
        { label: '姓名', prop: 'name' },
        {
          label: '性别',
          prop: 'gender',
          formatter: (data) => data.gender === 1 ? '男' : '女'
        },
        {
          label: '薪资',
          prop: 'salary',
          formatter: (data) => data.salary ? `¥${data.salary.toLocaleString()}` : '-'
        },
        {
          label: '入职日期',
          prop: 'entryDate',
          formatter: (data) => {
            if (!data.entryDate) return '-'
            const date = new Date(data.entryDate)
            return date.toLocaleDateString('zh-CN')
          }
        },
        {
          label: '在职状态',
          prop: 'status',
          formatter: (data) => data.status === 1 ? '在职' : '离职'
        },
        {
          label: '绩效分数',
          prop: 'performance',
          formatter: (data) => data.performance !== undefined ? `${(data.performance * 100).toFixed(0)}%` : '-'
        }
      ]
    }
  }
}
</script>
```
:::

## 不同尺寸

提供三种尺寸:large、default、small。

::: demo
```vue
<template>
  <div>
    <el-radio-group v-model="size" style="margin-bottom: 20px;">
      <el-radio-button label="large">大尺寸</el-radio-button>
      <el-radio-button label="default">默认</el-radio-button>
      <el-radio-button label="small">小尺寸</el-radio-button>
    </el-radio-group>

    <z-descriptions
      title="用户信息"
      :data="userData"
      :items="items"
      :column="3"
      :size="size"
      border
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: 'default',
      userData: {
        name: '赵六',
        age: 30,
        phone: '13700002222',
        email: 'zhaoliu@example.com',
        address: '北京市朝阳区建国路',
        company: '某某集团'
      },
      items: [
        { label: '姓名', prop: 'name' },
        { label: '年龄', prop: 'age' },
        { label: '手机号', prop: 'phone' },
        { label: '邮箱', prop: 'email' },
        { label: '公司', prop: 'company' },
        { label: '地址', prop: 'address', span: 3 }
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
| data | 数据对象 | Object | {} |
| items | 描述项配置 | Array | [] |
| title | 标题 | String | - |
| column | 每行显示的列数 | Number | 3 |
| border | 是否带有边框 | Boolean | false |
| size | 列表尺寸 | String | 'default' |
| label-align | label 对齐方式 | String | 'left' |
| content-align | content 对齐方式 | String | 'left' |
| colon | 是否显示冒号 | Boolean | true |

## Item 配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标签文本 | String | - |
| prop | 字段名 | String | - |
| span | 占据的列数 | Number | 1 |
| slotName | 自定义插槽名 | String | - |
| formatter | 格式化函数 | Function(data) | - |
| labelClassName | 自定义 label 类名 | String | - |
| contentClassName | 自定义 content 类名 | String | - |

## Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| title | 自定义标题 | - |
| extra | 标题右侧的操作区域 | - |
| [prop] | 自定义描述项内容,prop 为 item 的 prop 值 | { data } |
