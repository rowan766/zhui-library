<!-- packages/components/src/table/index.vue -->
<template>
  <div class="z-table">
    <!-- 表格头部工具栏 -->
    <div v-if="showToolbar || $slots.toolbar" class="z-table-toolbar">
      <slot name="toolbar">
        <div class="z-table-toolbar-left">
          <slot name="toolbar-left"></slot>
        </div>
        <div class="z-table-toolbar-right">
          <slot name="toolbar-right"></slot>
        </div>
      </slot>
    </div>

    <!-- 表格主体 -->
    <el-table
      ref="elTable"
      :data="tableData"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :border="border"
      :size="size"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="currentRowKey"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      :cell-class-name="cellClassName"
      :cell-style="cellStyle"
      :header-row-class-name="headerRowClassName"
      :header-row-style="headerRowStyle"
      :header-cell-class-name="headerCellClassName"
      :header-cell-style="headerCellStyle"
      :row-key="rowKey"
      :empty-text="emptyText"
      :default-expand-all="defaultExpandAll"
      :expand-row-keys="expandRowKeys"
      :default-sort="defaultSort"
      :tooltip-effect="tooltipEffect"
      :show-summary="showSummary"
      :sum-text="sumText"
      :summary-method="summaryMethod"
      :span-method="spanMethod"
      :select-on-indeterminate="selectOnIndeterminate"
      :indent="indent"
      :lazy="lazy"
      :load="load"
      :tree-props="treeProps"
      v-bind="$attrs"
      v-on="$listeners"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
      @select-all="handleSelectAll"
      @current-change="handleCurrentChange"
      @sort-change="handleSortChange"
      @filter-change="handleFilterChange"
      @row-click="handleRowClick"
      @row-dblclick="handleRowDblclick"
      @row-contextmenu="handleRowContextmenu"
      @cell-click="handleCellClick"
      @cell-dblclick="handleCellDblclick"
      @header-click="handleHeaderClick"
      @header-contextmenu="handleHeaderContextmenu"
      @expand-change="handleExpandChange"
    >
      <!-- 多选列 -->
      <el-table-column
        v-if="showSelection"
        type="selection"
        :width="selectionWidth || 55"
        :fixed="selectionFixed"
        :selectable="selectable"
        :reserve-selection="reserveSelection"
        align="center"
      />

      <!-- 序号列 -->
      <el-table-column
        v-if="showIndex"
        type="index"
        :label="indexLabel || '序号'"
        :width="indexWidth || 55"
        :fixed="indexFixed"
        :index="indexMethod"
        align="center"
      />

      <!-- 展开列 -->
      <el-table-column
        v-if="showExpand"
        type="expand"
        :width="expandWidth"
        :fixed="expandFixed"
      >
        <template slot-scope="scope">
          <slot name="expand" :row="scope.row" :$index="scope.$index"></slot>
        </template>
      </el-table-column>

      <!-- 动态列 -->
      <template v-for="(column, index) in finalColumns">
        <!-- 普通列 -->
        <el-table-column
          v-if="!column.children"
          :key="column.prop || index"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :min-width="column.minWidth"
          :fixed="column.fixed"
          :sortable="column.sortable"
          :sort-method="column.sortMethod"
          :sort-by="column.sortBy"
          :sort-orders="column.sortOrders"
          :resizable="column.resizable !== false"
          :formatter="column.formatter"
          :show-overflow-tooltip="column.showOverflowTooltip !== false"
          :align="column.align || 'left'"
          :header-align="column.headerAlign || column.align || 'left'"
          :class-name="column.className"
          :label-class-name="column.labelClassName"
          :filters="column.filters"
          :filter-method="column.filterMethod"
          :filter-multiple="column.filterMultiple !== false"
          :filter-placement="column.filterPlacement"
          :filtered-value="column.filteredValue"
        >
          <template slot="header" slot-scope="scope">
            <slot
              v-if="column.headerSlot"
              :name="column.headerSlot"
              :column="column"
              :$index="scope.$index"
            >
              {{ column.label }}
            </slot>
            <span v-else>{{ column.label }}</span>
          </template>

          <template slot-scope="scope">
            <!-- 自定义插槽 -->
            <slot
              v-if="column.slot"
              :name="column.slot"
              :row="scope.row"
              :column="column"
              :$index="scope.$index"
            >
            </slot>
            <!-- 图片 -->
            <el-image
              v-else-if="column.type === 'image'"
              :src="scope.row[column.prop]"
              :fit="column.fit || 'cover'"
              :preview-src-list="column.previewSrcList ? column.previewSrcList(scope.row) : [scope.row[column.prop]]"
              style="width: 50px; height: 50px"
            />
            <!-- 标签 -->
            <el-tag
              v-else-if="column.type === 'tag'"
              :type="column.tagType ? column.tagType(scope.row) : ''"
              :size="column.tagSize || 'small'"
              :effect="column.tagEffect || 'light'"
            >
              {{ column.formatter ? column.formatter(scope.row, column, scope.row[column.prop], scope.$index) : scope.row[column.prop] }}
            </el-tag>
            <!-- 开关 -->
            <el-switch
              v-else-if="column.type === 'switch'"
              v-model="scope.row[column.prop]"
              :disabled="column.switchDisabled ? column.switchDisabled(scope.row) : false"
              :active-value="column.activeValue !== undefined ? column.activeValue : true"
              :inactive-value="column.inactiveValue !== undefined ? column.inactiveValue : false"
              @change="(val) => handleSwitchChange(val, scope.row, column)"
            />
            <!-- 链接 -->
            <el-link
              v-else-if="column.type === 'link'"
              :type="column.linkType || 'primary'"
              :underline="column.underline !== false"
              :disabled="column.linkDisabled ? column.linkDisabled(scope.row) : false"
              @click="() => handleLinkClick(scope.row, column)"
            >
              {{ column.formatter ? column.formatter(scope.row, column, scope.row[column.prop], scope.$index) : scope.row[column.prop] }}
            </el-link>
            <!-- 默认文本 -->
            <span v-else>
              {{ column.formatter ? column.formatter(scope.row, column, scope.row[column.prop], scope.$index) : scope.row[column.prop] }}
            </span>
          </template>
        </el-table-column>

        <!-- 多级表头 -->
        <el-table-column
          v-else
          :key="column.prop || index"
          :label="column.label"
          :width="column.width"
          :min-width="column.minWidth"
          :fixed="column.fixed"
          :align="column.align || 'left'"
          :header-align="column.headerAlign || column.align || 'left'"
        >
          <el-table-column
            v-for="(child, childIndex) in column.children"
            :key="child.prop || childIndex"
            :prop="child.prop"
            :label="child.label"
            :width="child.width"
            :min-width="child.minWidth"
            :sortable="child.sortable"
            :formatter="child.formatter"
            :show-overflow-tooltip="child.showOverflowTooltip !== false"
            :align="child.align || 'left'"
            :header-align="child.headerAlign || child.align || 'left'"
          >
            <template slot-scope="scope">
              <slot
                v-if="child.slot"
                :name="child.slot"
                :row="scope.row"
                :column="child"
                :$index="scope.$index"
              >
              </slot>
              <span v-else>
                {{ child.formatter ? child.formatter(scope.row, child, scope.row[child.prop], scope.$index) : scope.row[child.prop] }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>
      </template>

      <!-- 操作列 -->
      <el-table-column
        v-if="showOperation"
        :label="operationLabel || '操作'"
        :width="operationWidth"
        :min-width="operationMinWidth"
        :fixed="operationFixed || 'right'"
        :align="operationAlign || 'center'"
      >
        <template slot-scope="scope">
          <slot name="operation" :row="scope.row" :$index="scope.$index">
            <el-button
              v-for="(btn, btnIndex) in getOperationButtons(scope.row)"
              :key="btnIndex"
              :type="btn.type || 'text'"
              :size="btn.size || 'small'"
              :icon="btn.icon"
              :disabled="btn.disabled"
              @click="() => handleOperationClick(btn, scope.row, scope.$index)"
            >
              {{ btn.label }}
            </el-button>
          </slot>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div v-if="showPagination" class="z-table-pagination">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :total="total"
        :layout="paginationLayout"
        :background="paginationBackground"
        :small="paginationSmall"
        v-bind="paginationAttrs"
        @size-change="handleSizeChange"
        @current-change="handleCurrentPageChange"
      />
    </div>
  </div>
</template>

<script>
import { checkPermission } from '../utils/permission'

export default {
  name: 'ZTable',
  props: {
    // 表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 列配置
    columns: {
      type: Array,
      default: () => []
    },
    // 表格高度
    height: {
      type: [String, Number],
      default: undefined
    },
    // 表格最大高度
    maxHeight: {
      type: [String, Number],
      default: undefined
    },
    // 是否为斑马纹
    stripe: {
      type: Boolean,
      default: false
    },
    // 是否带有纵向边框
    border: {
      type: Boolean,
      default: true
    },
    // 表格尺寸
    size: {
      type: String,
      default: 'medium',
      validator: val => ['medium', 'small', 'mini'].includes(val)
    },
    // 列的宽度是否自撑开
    fit: {
      type: Boolean,
      default: true
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true
    },
    // 是否高亮当前行
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    // 当前行的 key
    currentRowKey: {
      type: [String, Number],
      default: undefined
    },
    // 行的 className 的回调方法
    rowClassName: {
      type: [String, Function],
      default: undefined
    },
    // 行的 style 的回调方法
    rowStyle: {
      type: [Object, Function],
      default: undefined
    },
    // 单元格的 className 的回调方法
    cellClassName: {
      type: [String, Function],
      default: undefined
    },
    // 单元格的 style 的回调方法
    cellStyle: {
      type: [Object, Function],
      default: undefined
    },
    // 表头行的 className 的回调方法
    headerRowClassName: {
      type: [String, Function],
      default: undefined
    },
    // 表头行的 style 的回调方法
    headerRowStyle: {
      type: [Object, Function],
      default: undefined
    },
    // 表头单元格的 className 的回调方法
    headerCellClassName: {
      type: [String, Function],
      default: undefined
    },
    // 表头单元格的 style 的回调方法
    headerCellStyle: {
      type: [Object, Function],
      default: undefined
    },
    // 行数据的 Key
    rowKey: {
      type: [String, Function],
      default: undefined
    },
    // 空数据时显示的文本内容
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    // 是否默认展开所有行
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    // 可以通过该属性设置 Table 目前的展开行
    expandRowKeys: {
      type: Array,
      default: undefined
    },
    // 默认的排序列的 prop 和顺序
    defaultSort: {
      type: Object,
      default: undefined
    },
    // tooltip effect 属性
    tooltipEffect: {
      type: String,
      default: 'dark'
    },
    // 是否在表尾显示合计行
    showSummary: {
      type: Boolean,
      default: false
    },
    // 合计行第一列的文本
    sumText: {
      type: String,
      default: '合计'
    },
    // 自定义的合计计算方法
    summaryMethod: {
      type: Function,
      default: undefined
    },
    // 合并行或列的计算方法
    spanMethod: {
      type: Function,
      default: undefined
    },
    // 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为
    selectOnIndeterminate: {
      type: Boolean,
      default: true
    },
    // 展示树形数据时，树节点的缩进
    indent: {
      type: Number,
      default: 16
    },
    // 是否懒加载子节点数据
    lazy: {
      type: Boolean,
      default: false
    },
    // 加载子节点数据的函数
    load: {
      type: Function,
      default: undefined
    },
    // 渲染嵌套数据的配置选项
    treeProps: {
      type: Object,
      default: () => ({ hasChildren: 'hasChildren', children: 'children' })
    },
    // 是否显示多选列
    showSelection: {
      type: Boolean,
      default: false
    },
    // 多选列宽度
    selectionWidth: {
      type: [String, Number],
      default: undefined
    },
    // 多选列是否固定
    selectionFixed: {
      type: [Boolean, String],
      default: undefined
    },
    // 仅对 type=selection 的列有效，类型为 Function
    selectable: {
      type: Function,
      default: undefined
    },
    // 是否保留之前选中的数据
    reserveSelection: {
      type: Boolean,
      default: false
    },
    // 是否显示序号列
    showIndex: {
      type: Boolean,
      default: false
    },
    // 序号列标签
    indexLabel: {
      type: String,
      default: undefined
    },
    // 序号列宽度
    indexWidth: {
      type: [String, Number],
      default: undefined
    },
    // 序号列是否固定
    indexFixed: {
      type: [Boolean, String],
      default: undefined
    },
    // 自定义索引
    indexMethod: {
      type: Function,
      default: undefined
    },
    // 是否显示展开列
    showExpand: {
      type: Boolean,
      default: false
    },
    // 展开列宽度
    expandWidth: {
      type: [String, Number],
      default: undefined
    },
    // 展开列是否固定
    expandFixed: {
      type: [Boolean, String],
      default: undefined
    },
    // 是否显示操作列
    showOperation: {
      type: Boolean,
      default: false
    },
    // 操作列标签
    operationLabel: {
      type: String,
      default: undefined
    },
    // 操作列宽度
    operationWidth: {
      type: [String, Number],
      default: undefined
    },
    // 操作列最小宽度
    operationMinWidth: {
      type: [String, Number],
      default: undefined
    },
    // 操作列是否固定
    operationFixed: {
      type: [Boolean, String],
      default: undefined
    },
    // 操作列对齐方式
    operationAlign: {
      type: String,
      default: undefined
    },
    // 操作按钮配置
    operationButtons: {
      type: [Array, Function],
      default: () => []
    },
    // 是否显示工具栏
    showToolbar: {
      type: Boolean,
      default: false
    },
    // 是否显示分页
    showPagination: {
      type: Boolean,
      default: false
    },
    // 当前页
    currentPage: {
      type: Number,
      default: 1
    },
    // 每页显示条数
    pageSize: {
      type: Number,
      default: 10
    },
    // 每页显示个数选择器的选项设置
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 50, 100]
    },
    // 总条数
    total: {
      type: Number,
      default: 0
    },
    // 分页组件布局
    paginationLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    // 是否为分页按钮添加背景色
    paginationBackground: {
      type: Boolean,
      default: true
    },
    // 是否使用小型分页样式
    paginationSmall: {
      type: Boolean,
      default: false
    },
    // 分页组件额外的属性
    paginationAttrs: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // 最终的列配置（处理隐藏列）
    finalColumns() {
      return this.columns.filter(column => !column.hidden)
    }
  },
  methods: {
    // 获取操作按钮
    getOperationButtons(row) {
      let buttons = []

      if (typeof this.operationButtons === 'function') {
        buttons = this.operationButtons(row)
      } else {
        buttons = this.operationButtons
      }

      // 过滤按钮：检查 show 属性和权限
      return buttons.filter(btn => {
        // 检查 show 属性
        if (typeof btn.show === 'function') {
          if (!btn.show(row)) {
            return false
          }
        } else if (btn.show === false) {
          return false
        }

        // 检查权限
        if (btn.permission) {
          const mode = btn.permissionMode || 'some'
          return checkPermission(btn.permission, mode)
        }

        return true
      })
    },
    // 操作按钮点击
    handleOperationClick(btn, row, index) {
      if (btn.handler) {
        btn.handler(row, index)
      }
      this.$emit('operation-click', { btn, row, index })
    },
    // 开关改变
    handleSwitchChange(val, row, column) {
      this.$emit('switch-change', { val, row, column })
      if (column.switchChange) {
        column.switchChange(val, row)
      }
    },
    // 链接点击
    handleLinkClick(row, column) {
      this.$emit('link-click', { row, column })
      if (column.linkClick) {
        column.linkClick(row)
      }
    },
    // 选择项发生变化
    handleSelectionChange(selection) {
      this.$emit('selection-change', selection)
    },
    // 用户手动勾选数据行
    handleSelect(selection, row) {
      this.$emit('select', selection, row)
    },
    // 用户手动勾选全选
    handleSelectAll(selection) {
      this.$emit('select-all', selection)
    },
    // 当前行发生变化
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.$emit('current-change', currentRow, oldCurrentRow)
    },
    // 排序条件发生变化
    handleSortChange({ column, prop, order }) {
      this.$emit('sort-change', { column, prop, order })
    },
    // 筛选条件发生变化
    handleFilterChange(filters) {
      this.$emit('filter-change', filters)
    },
    // 行点击
    handleRowClick(row, column, event) {
      this.$emit('row-click', row, column, event)
    },
    // 行双击
    handleRowDblclick(row, column, event) {
      this.$emit('row-dblclick', row, column, event)
    },
    // 行右键
    handleRowContextmenu(row, column, event) {
      this.$emit('row-contextmenu', row, column, event)
    },
    // 单元格点击
    handleCellClick(row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event)
    },
    // 单元格双击
    handleCellDblclick(row, column, cell, event) {
      this.$emit('cell-dblclick', row, column, cell, event)
    },
    // 表头点击
    handleHeaderClick(column, event) {
      this.$emit('header-click', column, event)
    },
    // 表头右键
    handleHeaderContextmenu(column, event) {
      this.$emit('header-contextmenu', column, event)
    },
    // 展开行变化
    handleExpandChange(row, expandedRows) {
      this.$emit('expand-change', row, expandedRows)
    },
    // 每页条数改变
    handleSizeChange(val) {
      this.$emit('size-change', val)
      this.$emit('update:pageSize', val)
    },
    // 当前页改变
    handleCurrentPageChange(val) {
      this.$emit('current-change', val)
      this.$emit('update:currentPage', val)
    },
    // 对外暴露的方法
    clearSelection() {
      this.$refs.elTable.clearSelection()
    },
    toggleRowSelection(row, selected) {
      this.$refs.elTable.toggleRowSelection(row, selected)
    },
    toggleAllSelection() {
      this.$refs.elTable.toggleAllSelection()
    },
    toggleRowExpansion(row, expanded) {
      this.$refs.elTable.toggleRowExpansion(row, expanded)
    },
    setCurrentRow(row) {
      this.$refs.elTable.setCurrentRow(row)
    },
    clearSort() {
      this.$refs.elTable.clearSort()
    },
    clearFilter(columnKey) {
      this.$refs.elTable.clearFilter(columnKey)
    },
    doLayout() {
      this.$refs.elTable.doLayout()
    },
    sort(prop, order) {
      this.$refs.elTable.sort(prop, order)
    }
  }
}
</script>

<style scoped>
.z-table {
  width: 100%;
}

.z-table-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 10px;
}

.z-table-toolbar-left {
  flex: 1;
}

.z-table-toolbar-right {
  flex: 1;
  text-align: right;
}

.z-table-pagination {
  margin-top: 15px;
  text-align: right;
}
</style>
