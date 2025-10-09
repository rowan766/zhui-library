<!-- packages/components/src/chart/index.vue -->
<template>
  <div ref="chartContainer" :style="containerStyle" class="z-chart"></div>
</template>

<script>
export default {
  name: 'ZChart',
  props: {
    // 图表配置项
    option: {
      type: Object,
      required: true,
      default: () => ({})
    },
    // 图表主题
    theme: {
      type: [String, Object],
      default: ''
    },
    // 图表初始化配置
    initOptions: {
      type: Object,
      default: () => ({})
    },
    // 图表宽度
    width: {
      type: [String, Number],
      default: '100%'
    },
    // 图表高度
    height: {
      type: [String, Number],
      default: '400px'
    },
    // 是否自动 resize
    autoResize: {
      type: Boolean,
      default: true
    },
    // 是否显示加载动画
    loading: {
      type: Boolean,
      default: false
    },
    // 加载动画配置
    loadingOptions: {
      type: Object,
      default: () => ({})
    },
    // 图表组
    group: {
      type: String,
      default: undefined
    },
    // 手动管理配置项
    manualUpdate: {
      type: Boolean,
      default: false
    },
    // 更新配置项的参数
    notMerge: {
      type: Boolean,
      default: false
    },
    lazyUpdate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chart: null,
      resizeObserver: null
    }
  },
  computed: {
    containerStyle() {
      return {
        width: typeof this.width === 'number' ? `${this.width}px` : this.width,
        height: typeof this.height === 'number' ? `${this.height}px` : this.height
      }
    }
  },
  watch: {
    option: {
      handler(newVal) {
        if (!this.manualUpdate && this.chart) {
          this.setOption(newVal)
        }
      },
      deep: true
    },
    loading(val) {
      if (!this.chart) return
      if (val) {
        this.showLoading()
      } else {
        this.hideLoading()
      }
    },
    group(val) {
      if (!this.chart) return
      this.chart.group = val
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    this.dispose()
  },
  methods: {
    // 初始化图表
    initChart() {
      if (!this.$refs.chartContainer) return

      // 检查是否已加载 echarts
      if (!window.echarts) {
        console.error('ECharts is not loaded. Please import echarts before using ZChart component.')
        this.$emit('error', new Error('ECharts not found'))
        return
      }

      try {
        // 初始化 echarts 实例
        this.chart = window.echarts.init(
          this.$refs.chartContainer,
          this.theme,
          this.initOptions
        )

        // 设置配置项
        if (this.option) {
          this.setOption(this.option)
        }

        // 设置 group
        if (this.group) {
          this.chart.group = this.group
        }

        // 设置加载状态
        if (this.loading) {
          this.showLoading()
        }

        // 绑定事件
        this.bindEvents()

        // 设置自动 resize
        if (this.autoResize) {
          this.enableAutoResize()
        }

        this.$emit('chart-ready', this.chart)
      } catch (error) {
        console.error('Failed to initialize chart:', error)
        this.$emit('error', error)
      }
    },

    // 设置配置项
    setOption(option, opts) {
      if (!this.chart) return

      const options = opts || {
        notMerge: this.notMerge,
        lazyUpdate: this.lazyUpdate
      }

      try {
        this.chart.setOption(option, options)
        this.$emit('option-set')
      } catch (error) {
        console.error('Failed to set option:', error)
        this.$emit('error', error)
      }
    },

    // 显示加载动画
    showLoading(options) {
      if (!this.chart) return
      this.chart.showLoading(options || this.loadingOptions)
    },

    // 隐藏加载动画
    hideLoading() {
      if (!this.chart) return
      this.chart.hideLoading()
    },

    // 绑定事件
    bindEvents() {
      if (!this.chart) return

      const events = [
        'click', 'dblclick', 'mousedown', 'mousemove', 'mouseup', 'mouseover', 'mouseout',
        'globalout', 'contextmenu', 'highlight', 'downplay', 'selectchanged',
        'legendselectchanged', 'legendselected', 'legendunselected', 'legendselectall',
        'legendinverseselect', 'legendscroll', 'datazoom', 'datarangeselected',
        'timelinechanged', 'timelineplaychanged', 'restore', 'dataviewchanged',
        'magictypechanged', 'geoselectchanged', 'geoselected', 'geounselected',
        'axisareaselected', 'brush', 'brushEnd', 'brushselected', 'globalcursortaken',
        'rendered', 'finished'
      ]

      events.forEach(event => {
        this.chart.on(event, (params) => {
          this.$emit(event, params)
        })
      })
    },

    // 启用自动 resize
    enableAutoResize() {
      if (!this.$refs.chartContainer || !this.chart) return

      // 使用 ResizeObserver 监听容器大小变化
      if (window.ResizeObserver) {
        this.resizeObserver = new ResizeObserver(() => {
          this.resize()
        })
        this.resizeObserver.observe(this.$refs.chartContainer)
      } else {
        // 降级方案：监听 window resize
        window.addEventListener('resize', this.resize)
      }
    },

    // 禁用自动 resize
    disableAutoResize() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect()
        this.resizeObserver = null
      } else {
        window.removeEventListener('resize', this.resize)
      }
    },

    // 调整图表大小
    resize(opts) {
      if (!this.chart) return
      this.chart.resize(opts)
    },

    // 清空图表
    clear() {
      if (!this.chart) return
      this.chart.clear()
    },

    // 销毁图表
    dispose() {
      if (this.autoResize) {
        this.disableAutoResize()
      }

      if (this.chart) {
        this.chart.dispose()
        this.chart = null
      }
    },

    // 获取图表实例
    getChart() {
      return this.chart
    },

    // 获取图表的 DataURL
    getDataURL(opts) {
      if (!this.chart) return ''
      return this.chart.getDataURL(opts)
    },

    // 获取图表的 ConnectedDataURL
    getConnectedDataURL(opts) {
      if (!this.chart) return ''
      return this.chart.getConnectedDataURL(opts)
    },

    // 追加数据
    appendData(opts) {
      if (!this.chart) return
      this.chart.appendData(opts)
    },

    // 转换坐标
    convertToPixel(finder, value) {
      if (!this.chart) return null
      return this.chart.convertToPixel(finder, value)
    },

    convertFromPixel(finder, value) {
      if (!this.chart) return null
      return this.chart.convertFromPixel(finder, value)
    },

    // 判断给定的点是否在指定的坐标系或者系列上
    containPixel(finder, value) {
      if (!this.chart) return false
      return this.chart.containPixel(finder, value)
    },

    // 分发 action
    dispatchAction(payload) {
      if (!this.chart) return
      this.chart.dispatchAction(payload)
    },

    // 动态设置图表配置项（手动更新模式）
    mergeOptions(option) {
      if (!this.chart) return
      this.setOption(option, { notMerge: false })
    },

    // 刷新图表
    refresh() {
      if (!this.chart) return
      this.clear()
      this.setOption(this.option)
    }
  }
}
</script>

<style scoped>
.z-chart {
  min-height: 100px;
}
</style>
