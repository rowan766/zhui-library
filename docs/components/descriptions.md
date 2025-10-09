# Descriptions 描述列表

用于展示详细信息的描述列表组件。

## 基础用法

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
        email: 'zhangsan@example.com'
      },
      items: [
        { label: '姓名', prop: 'name' },
        { label: '年龄', prop: 'age' },
        { label: '手机号', prop: 'phone' },
        { label: '邮箱', prop: 'email' }
      ]
    }
  }
}
</script>
```

## 多列布局

```vue
<z-descriptions
  :data="userData"
  :items="items"
  :column="3"
  border
/>
```
