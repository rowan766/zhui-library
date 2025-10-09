# Chart 图表

基于 ECharts 的图表组件封装，支持自动 resize、事件转发等功能。

## 安装 ECharts

使用 ZChart 组件前需要先安装 ECharts：

```bash
npm install echarts
```

在项目中引入：

```js
import * as echarts from 'echarts'
window.echarts = echarts
```

## 基础用法

```vue
<template>
  <z-chart
    :option="chartOption"
    :height="400"
  />
</template>

<script>
export default {
  data() {
    return {
      chartOption: {
        title: { text: '示例图表' },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'line'
        }]
      }
    }
  }
}
</script>
```

## 加载状态

```vue
<template>
  <z-chart
    :option="chartOption"
    :loading="loading"
    :height="400"
  />
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      chartOption: {}
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      this.loading = true
      // 加载数据
      this.chartOption = { /* ... */ }
      this.loading = false
    }
  }
}
</script>
```

## 响应式

```vue
<z-chart
  :option="chartOption"
  :auto-resize="true"
  :height="400"
/>
```

## 事件监听

```vue
<template>
  <z-chart
    :option="chartOption"
    @click="handleClick"
    @chart-ready="handleChartReady"
  />
</template>

<script>
export default {
  methods: {
    handleClick(params) {
      console.log('点击图表', params)
    },
    handleChartReady(chart) {
      console.log('图表实例', chart)
      // 可以调用 echarts 实例方法
    }
  }
}
</script>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| option | echarts 配置项 | Object | {} |
| theme | 图表主题 | String/Object | '' |
| width | 图表宽度 | String/Number | '100%' |
| height | 图表高度 | String/Number | '400px' |
| auto-resize | 是否自动 resize | Boolean | true |
| loading | 是否显示加载动画 | Boolean | false |

## Events

支持所有 ECharts 事件，如：click、dblclick、mouseover、mouseout 等。

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| chart-ready | 图表初始化完成 | chart 实例 |
| click | 点击图表 | params |
| dblclick | 双击图表 | params |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| resize | 调整图表大小 | - |
| clear | 清空图表 | - |
| getChart | 获取图表实例 | - |
