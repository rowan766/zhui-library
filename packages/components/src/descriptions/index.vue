<!-- packages/components/src/descriptions/index.vue -->
<template>
  <div class="z-descriptions" :class="{ 'is-bordered': border }">
    <!-- 标题 -->
    <div v-if="title || $slots.title || $slots.extra" class="z-descriptions-header">
      <div class="z-descriptions-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="$slots.extra" class="z-descriptions-extra">
        <slot name="extra"></slot>
      </div>
    </div>

    <!-- 内容 -->
    <div class="z-descriptions-body">
      <table :class="`z-descriptions-table is-${size}`">
        <tbody>
          <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
            <td
              v-for="(item, colIndex) in row"
              :key="`${item.isLabel ? 'label' : 'content'}-${colIndex}`"
              :class="[
                item.isLabel ? 'z-descriptions-item-label' : 'z-descriptions-item-content',
                item.isLabel ? item.labelClassName : item.contentClassName
              ]"
              :style="item.isLabel ? item.labelStyle : item.contentStyle"
              :colspan="item.colspan || 1"
            >
              <template v-if="item.isLabel">
                <slot v-if="item.labelSlot" :name="item.labelSlot">
                  {{ item.label }}
                </slot>
                <template v-else>{{ item.label }}</template>
              </template>
              <template v-else>
                <slot v-if="item.slot" :name="item.slot" :data="data" :item="item">
                  {{ getItemValue(item) }}
                </slot>
                <template v-else>{{ getItemValue(item) }}</template>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZDescriptions',
  props: {
    // 数据对象
    data: {
      type: Object,
      default: () => ({})
    },
    // 描述项配置
    items: {
      type: Array,
      required: true,
      default: () => []
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 是否带有边框
    border: {
      type: Boolean,
      default: false
    },
    // 每行显示的列数
    column: {
      type: Number,
      default: 3,
      validator: val => val > 0
    },
    // 尺寸
    size: {
      type: String,
      default: 'medium',
      validator: val => ['medium', 'small', 'mini'].includes(val)
    },
    // 列的比例，1-24
    labelWidth: {
      type: [String, Number],
      default: ''
    },
    // 列的样式
    labelStyle: {
      type: Object,
      default: () => ({})
    },
    // 列的自定义类名
    labelClassName: {
      type: String,
      default: ''
    },
    // 内容的样式
    contentStyle: {
      type: Object,
      default: () => ({})
    },
    // 内容的自定义类名
    contentClassName: {
      type: String,
      default: ''
    },
    // 冒号
    colon: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 构建表格数据
    tableData() {
      const rows = []
      let currentRow = []
      let currentColSpan = 0

      this.items.forEach(item => {
        if (item.hidden) return

        const span = item.span || 1
        const realSpan = Math.min(span, this.column)

        // 如果当前行放不下，开启新行
        if (currentColSpan + realSpan > this.column) {
          // 填充当前行剩余空间
          if (currentColSpan < this.column) {
            const lastItem = currentRow[currentRow.length - 1]
            if (lastItem && !lastItem.isLabel) {
              lastItem.colspan = (lastItem.colspan || 1) + (this.column - currentColSpan)
            }
          }
          rows.push(currentRow)
          currentRow = []
          currentColSpan = 0
        }

        // 添加标签列
        currentRow.push({
          isLabel: true,
          label: item.label + (this.colon ? '：' : ''),
          labelSlot: item.labelSlot,
          labelClassName: item.labelClassName || this.labelClassName,
          labelStyle: {
            width: this.labelWidth ? (typeof this.labelWidth === 'number' ? `${this.labelWidth}px` : this.labelWidth) : '',
            ...this.labelStyle,
            ...(item.labelStyle || {})
          },
          colspan: 1
        })

        // 添加内容列
        currentRow.push({
          isLabel: false,
          prop: item.prop,
          slot: item.slot,
          formatter: item.formatter,
          contentClassName: item.contentClassName || this.contentClassName,
          contentStyle: {
            ...this.contentStyle,
            ...(item.contentStyle || {})
          },
          colspan: realSpan * 2 - 1
        })

        currentColSpan += realSpan
      })

      // 处理最后一行
      if (currentRow.length > 0) {
        if (currentColSpan < this.column) {
          const lastItem = currentRow[currentRow.length - 1]
          if (lastItem && !lastItem.isLabel) {
            lastItem.colspan = (lastItem.colspan || 1) + (this.column - currentColSpan) * 2
          }
        }
        rows.push(currentRow)
      }

      return rows
    }
  },
  methods: {
    // 获取项的值
    getItemValue(item) {
      if (!item.prop) return ''
      const value = this.data[item.prop]
      if (item.formatter) {
        return item.formatter(value, this.data)
      }
      return value === undefined || value === null ? '' : value
    }
  }
}
</script>

<style scoped>
.z-descriptions {
  box-sizing: border-box;
  font-size: 14px;
  color: #606266;
}

.z-descriptions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.z-descriptions-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

.z-descriptions-extra {
  margin-left: auto;
}

.z-descriptions-body {
  color: #606266;
  background-color: #fff;
}

.z-descriptions-table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}

.z-descriptions-item-label {
  font-weight: bold;
  color: #909399;
  background-color: #fafafa;
  padding: 12px 10px;
  vertical-align: middle;
  word-break: break-all;
}

.z-descriptions-item-content {
  color: #606266;
  background-color: #fff;
  padding: 12px 10px;
  vertical-align: middle;
  word-break: break-all;
}

/* 带边框样式 */
.is-bordered .z-descriptions-item-label,
.is-bordered .z-descriptions-item-content {
  border: 1px solid #ebeef5;
}

/* 尺寸 */
.z-descriptions-table.is-medium .z-descriptions-item-label,
.z-descriptions-table.is-medium .z-descriptions-item-content {
  padding: 12px 10px;
}

.z-descriptions-table.is-small .z-descriptions-item-label,
.z-descriptions-table.is-small .z-descriptions-item-content {
  padding: 8px 10px;
  font-size: 13px;
}

.z-descriptions-table.is-mini .z-descriptions-item-label,
.z-descriptions-table.is-mini .z-descriptions-item-content {
  padding: 6px 10px;
  font-size: 12px;
}
</style>
