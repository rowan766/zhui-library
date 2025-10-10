# Chart 图表

基于 ECharts 的图表组件封装,支持自动 resize、事件转发、加载状态等功能。

## 安装 ECharts

使用 ZChart 组件前需要先安装 ECharts:

```bash
npm install echarts
```

在项目中引入:

```js
import * as echarts from 'echarts'
window.echarts = echarts
```

## 基础用法

最基本的折线图示例。

::: demo
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
        title: { text: '月度销售趋势' },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'line',
          smooth: true
        }]
      }
    }
  }
}
</script>
```
:::

## 柱状图

展示柱状图示例。

::: demo
```vue
<template>
  <z-chart
    :option="chartOption"
    :height="350"
  />
</template>

<script>
export default {
  data() {
    return {
      chartOption: {
        title: {
          text: '各部门人员统计'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: ['技术部', '产品部', '设计部', '运营部', '市场部']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '人数',
          type: 'bar',
          data: [25, 18, 12, 20, 15],
          itemStyle: {
            color: '#409EFF'
          }
        }]
      }
    }
  }
}
</script>
```
:::

## 饼图

展示饼图示例。

::: demo
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
        title: {
          text: '产品销售占比',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '销售额',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 335, name: '产品A' },
              { value: 310, name: '产品B' },
              { value: 234, name: '产品C' },
              { value: 135, name: '产品D' },
              { value: 148, name: '产品E' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  }
}
</script>
```
:::

## 加载状态

展示加载动画。

::: demo
```vue
<template>
  <div>
    <el-button @click="toggleLoading" size="small" style="margin-bottom: 10px;">
      {{ loading ? '停止加载' : '开始加载' }}
    </el-button>
    <z-chart
      :option="chartOption"
      :loading="loading"
      :height="300"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      chartOption: {
        title: { text: '数据统计' },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }]
      }
    }
  },
  methods: {
    toggleLoading() {
      this.loading = !this.loading
    }
  }
}
</script>
```
:::

## 多系列图表

展示多个数据系列的对比图表。

::: demo
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
        title: {
          text: '季度销售对比'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['2022年', '2023年']
        },
        xAxis: {
          type: 'category',
          data: ['Q1', 'Q2', 'Q3', 'Q4']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '2022年',
            type: 'bar',
            data: [320, 332, 301, 334]
          },
          {
            name: '2023年',
            type: 'bar',
            data: [420, 482, 391, 454]
          }
        ]
      }
    }
  }
}
</script>
```
:::

## 事件监听

监听图表点击事件。

::: demo
```vue
<template>
  <div>
    <div v-if="clickedData" style="margin-bottom: 10px; padding: 10px; background: #f0f9ff; border-radius: 4px;">
      点击的数据: {{ clickedData }}
    </div>
    <z-chart
      :option="chartOption"
      :height="350"
      @click="handleClick"
      @chart-ready="handleChartReady"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      clickedData: '',
      chartOption: {
        title: {
          text: '点击柱状图查看详情'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '访问量',
          type: 'bar',
          data: [120, 200, 150, 80, 70, 110, 130],
          itemStyle: {
            color: '#67C23A'
          }
        }]
      }
    }
  },
  methods: {
    handleClick(params) {
      this.clickedData = `${params.name}: ${params.value}`
      this.$message.success(`点击了 ${params.name}`)
    },
    handleChartReady(chart) {
      console.log('图表实例已准备好', chart)
    }
  }
}
</script>
```
:::

## 动态数据更新

演示动态更新图表数据。

::: demo
```vue
<template>
  <div>
    <el-button @click="updateData" type="primary" size="small" style="margin-bottom: 10px;">
      更新数据
    </el-button>
    <z-chart
      :option="chartOption"
      :height="350"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartOption: {
        title: {
          text: '实时数据监控'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: '访问量',
          type: 'line',
          data: [50, 80, 120, 160, 140, 100],
          smooth: true,
          areaStyle: {
            opacity: 0.3
          }
        }]
      }
    }
  },
  methods: {
    updateData() {
      const newData = Array.from({ length: 6 }, () => Math.floor(Math.random() * 200))
      this.chartOption = {
        ...this.chartOption,
        series: [{
          ...this.chartOption.series[0],
          data: newData
        }]
      }
      this.$message.success('数据已更新')
    }
  }
}
</script>
```
:::

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| option | ECharts 配置项 | Object | {} |
| theme | 图表主题 | String/Object | '' |
| width | 图表宽度 | String/Number | '100%' |
| height | 图表高度 | String/Number | '400px' |
| auto-resize | 是否自动 resize | Boolean | true |
| loading | 是否显示加载动画 | Boolean | false |
| loading-options | 加载动画配置 | Object | - |

## Events

支持所有 ECharts 事件,如: click、dblclick、mouseover、mouseout 等。

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| chart-ready | 图表初始化完成 | chart 实例 |
| click | 点击图表 | params |
| dblclick | 双击图表 | params |
| mouseover | 鼠标移入 | params |
| mouseout | 鼠标移出 | params |

## Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| resize | 调整图表大小 | - |
| clear | 清空图表 | - |
| getChart | 获取图表实例 | - |
| setOption | 设置图表配置 | option, notMerge, lazyUpdate |
