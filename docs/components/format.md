# Format 格式化工具

提供常用的数据格式化方法。

## 安装使用

```js
import { format } from '@rowan287630/zhui'
```

## 日期时间格式化

### 格式化日期

```js
// 默认格式
format.formatDate(new Date())
// '2024-01-01 10:30:00'

// 自定义格式
format.formatDate(new Date(), 'YYYY-MM-DD')
// '2024-01-01'

format.formatDate(new Date(), 'YYYY/MM/DD HH:mm')
// '2024/01/01 10:30'

// 支持时间戳
format.formatDate(1704096600000, 'YYYY-MM-DD')
// '2024-01-01'
```

支持的格式化占位符：
- `YYYY` - 年份（4位）
- `MM` - 月份（2位，补零）
- `M` - 月份（不补零）
- `DD` - 日期（2位，补零）
- `D` - 日期（不补零）
- `HH` - 小时（2位，补零）
- `H` - 小时（不补零）
- `mm` - 分钟（2位，补零）
- `m` - 分钟（不补零）
- `ss` - 秒（2位，补零）
- `s` - 秒（不补零）

### 相对时间

```js
format.formatRelativeTime(new Date(Date.now() - 60000))
// '1分钟前'

format.formatRelativeTime(new Date(Date.now() - 3600000))
// '1小时前'

format.formatRelativeTime(new Date(Date.now() - 86400000))
// '1天前'
```

## 文件大小格式化

```js
format.formatFileSize(1024)
// '1 KB'

format.formatFileSize(1024 * 1024)
// '1 MB'

format.formatFileSize(1024 * 1024 * 1024)
// '1 GB'

format.formatFileSize(1536, 2)
// '1.50 KB'
```

## 金额格式化

```js
// 默认带货币符号
format.formatMoney(1234.56)
// '¥1,234.56'

// 不带货币符号
format.formatMoney(1234.56, 2, false)
// '1,234.56'

// 自定义小数位
format.formatMoney(1234.567, 3)
// '¥1,234.567'
```

## 数字格式化

```js
// 千分位分隔
format.formatNumber(1234567.89)
// '1,234,567.89'

// 指定小数位
format.formatNumber(1234.5678, 2)
// '1,234.57'
```

## 手机号脱敏

```js
format.formatPhone('13812345678')
// '138****5678'
```

## 身份证脱敏

```js
format.formatIdCard('110101199001011234')
// '110101********1234'

format.formatIdCard('110101990101123')
// '110101*****123'
```

## 银行卡格式化

```js
format.formatBankCard('6222021234567890')
// '6222 0212 3456 7890'
```

## 百分比格式化

```js
format.formatPercent(0.1234)
// '12.34%'

format.formatPercent(0.5, 0)
// '50%'
```

## 保留小数

```js
format.toFixed(3.1415926, 2)
// 3.14

format.toFixed(3.1415926, 4)
// 3.1416
```

## 文本处理

### 截断文本

```js
format.truncate('这是一段很长的文本内容', 5)
// '这是一段很...'

format.truncate('这是一段很长的文本内容', 5, '…')
// '这是一段很…'
```

### 首字母大写

```js
format.capitalize('hello')
// 'Hello'

format.capitalize('world')
// 'World'
```

### 驼峰命名转换

```js
// 下划线转驼峰
format.camelCase('user_name')
// 'userName'

format.camelCase('user_info_detail')
// 'userInfoDetail'

// 驼峰转下划线
format.underscoreCase('userName')
// 'user_name'

format.underscoreCase('userInfoDetail')
// 'user_info_detail'
```

## 在表格中使用

```vue
<template>
  <z-table
    :table-data="tableData"
    :columns="columns"
  />
</template>

<script>
import { format } from '@rowan287630/zhui'

export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: '张三',
          phone: '13812345678',
          amount: 12345.67,
          fileSize: 1024 * 1024 * 5,
          createTime: new Date()
        }
      ],
      columns: [
        { label: 'ID', prop: 'id' },
        { label: '姓名', prop: 'name' },
        {
          label: '手机号',
          prop: 'phone',
          formatter: (row) => format.formatPhone(row.phone)
        },
        {
          label: '金额',
          prop: 'amount',
          formatter: (row) => format.formatMoney(row.amount)
        },
        {
          label: '文件大小',
          prop: 'fileSize',
          formatter: (row) => format.formatFileSize(row.fileSize)
        },
        {
          label: '创建时间',
          prop: 'createTime',
          formatter: (row) => format.formatDate(row.createTime)
        }
      ]
    }
  }
}
</script>
```

## API

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| formatDate | 格式化日期 | (date, format) | String |
| formatRelativeTime | 相对时间 | (date) | String |
| formatFileSize | 文件大小 | (bytes, decimals) | String |
| formatMoney | 金额 | (amount, decimals, showSymbol) | String |
| formatNumber | 数字千分位 | (num, decimals) | String |
| formatPhone | 手机号脱敏 | (phone) | String |
| formatIdCard | 身份证脱敏 | (idCard) | String |
| formatBankCard | 银行卡格式化 | (cardNumber) | String |
| formatPercent | 百分比 | (num, decimals) | String |
| toFixed | 保留小数 | (num, decimals) | Number |
| truncate | 截断文本 | (text, length, ellipsis) | String |
| capitalize | 首字母大写 | (str) | String |
| camelCase | 转驼峰命名 | (str) | String |
| underscoreCase | 转下划线命名 | (str) | String |
