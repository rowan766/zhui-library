<!-- packages/components/src/search-form/index.vue -->
<template>
  <div class="z-search-form">
    <el-form
      ref="elForm"
      :model="searchData"
      :inline="inline"
      :label-width="labelWidth"
      :label-position="labelPosition"
      :size="size"
      v-bind="$attrs"
    >
      <el-row :gutter="gutter">
        <el-col
          v-for="(item, index) in visibleItems"
          :key="item.prop || index"
          :span="item.span || defaultSpan"
          :xs="item.xs || 24"
          :sm="item.sm"
          :md="item.md"
          :lg="item.lg"
          :xl="item.xl"
        >
          <el-form-item
            v-if="!item.hidden"
            :label="item.label"
            :prop="item.prop"
            :label-width="item.labelWidth"
          >
            <!-- 输入框 -->
            <el-input
              v-if="item.type === 'input' || !item.type"
              v-model="searchData[item.prop]"
              :placeholder="item.placeholder || `请输入${item.label}`"
              :clearable="item.clearable !== false"
              :disabled="item.disabled"
              v-bind="item.attrs"
              v-on="item.listeners || {}"
              @keyup.enter.native="handleSearch"
            />

            <!-- 选择器 -->
            <el-select
              v-else-if="item.type === 'select'"
              v-model="searchData[item.prop]"
              :placeholder="item.placeholder || `请选择${item.label}`"
              :clearable="item.clearable !== false"
              :disabled="item.disabled"
              :multiple="item.multiple"
              :filterable="item.filterable"
              :collapse-tags="item.collapseTags"
              v-bind="item.attrs"
              v-on="item.listeners || {}"
            >
              <el-option
                v-for="option in item.options"
                :key="option[item.optionValue || 'value']"
                :label="option[item.optionLabel || 'label']"
                :value="option[item.optionValue || 'value']"
                :disabled="option.disabled"
              />
            </el-select>

            <!-- 级联选择器 -->
            <el-cascader
              v-else-if="item.type === 'cascader'"
              v-model="searchData[item.prop]"
              :placeholder="item.placeholder || `请选择${item.label}`"
              :options="item.options"
              :props="item.cascaderProps"
              :clearable="item.clearable !== false"
              :disabled="item.disabled"
              :filterable="item.filterable"
              :show-all-levels="item.showAllLevels !== false"
              v-bind="item.attrs"
              v-on="item.listeners || {}"
            />

            <!-- 日期选择器 -->
            <el-date-picker
              v-else-if="item.type === 'date'"
              v-model="searchData[item.prop]"
              :type="item.dateType || 'date'"
              :placeholder="item.placeholder || `请选择${item.label}`"
              :clearable="item.clearable !== false"
              :disabled="item.disabled"
              :format="item.format"
              :value-format="item.valueFormat"
              :picker-options="item.pickerOptions"
              :range-separator="item.rangeSeparator || '至'"
              :start-placeholder="item.startPlaceholder || '开始日期'"
              :end-placeholder="item.endPlaceholder || '结束日期'"
              v-bind="item.attrs"
              v-on="item.listeners || {}"
            />

            <!-- 时间选择器 -->
            <el-time-picker
              v-else-if="item.type === 'time'"
              v-model="searchData[item.prop]"
              :placeholder="item.placeholder || `请选择${item.label}`"
              :clearable="item.clearable !== false"
              :disabled="item.disabled"
              :format="item.format"
              :value-format="item.valueFormat"
              :picker-options="item.pickerOptions"
              :is-range="item.isRange"
              :range-separator="item.rangeSeparator || '至'"
              :start-placeholder="item.startPlaceholder || '开始时间'"
              :end-placeholder="item.endPlaceholder || '结束时间'"
              v-bind="item.attrs"
              v-on="item.listeners || {}"
            />

            <!-- 自定义插槽 -->
            <slot
              v-else-if="item.type === 'slot'"
              :name="item.slotName"
              :data="searchData"
              :item="item"
            />
          </el-form-item>
        </el-col>

        <!-- 操作按钮 -->
        <el-col
          :span="btnSpan || defaultSpan"
          :xs="btnXs || 24"
          :sm="btnSm"
          :md="btnMd"
          :lg="btnLg"
          :xl="btnXl"
        >
          <el-form-item :label-width="btnLabelWidth || '0px'" class="z-search-form-btns">
            <slot name="buttons" :search-data="searchData">
              <el-button
                v-if="showSearch && checkButtonPermission('search')"
                type="primary"
                :size="size"
                :icon="searchIcon"
                :loading="searchLoading"
                @click="handleSearch"
              >
                {{ searchText }}
              </el-button>
              <el-button
                v-if="showReset && checkButtonPermission('reset')"
                :size="size"
                :icon="resetIcon"
                @click="handleReset"
              >
                {{ resetText }}
              </el-button>
              <el-button
                v-if="collapsible && searchItems.length > collapseCount"
                type="text"
                :size="size"
                @click="toggleCollapse"
              >
                {{ collapsed ? '展开' : '收起' }}
                <i :class="collapsed ? 'el-icon-arrow-down' : 'el-icon-arrow-up'" />
              </el-button>
            </slot>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { checkPermission } from '../utils/permission'

export default {
  name: 'ZSearchForm',
  props: {
    // 搜索数据
    searchData: {
      type: Object,
      required: true,
      default: () => ({})
    },
    // 搜索项配置
    searchItems: {
      type: Array,
      required: true,
      default: () => []
    },
    // 标签宽度
    labelWidth: {
      type: String,
      default: '80px'
    },
    // 标签位置
    labelPosition: {
      type: String,
      default: 'right',
      validator: val => ['left', 'right', 'top'].includes(val)
    },
    // 是否行内表单
    inline: {
      type: Boolean,
      default: true
    },
    // 表单尺寸
    size: {
      type: String,
      default: 'small',
      validator: val => ['medium', 'small', 'mini'].includes(val)
    },
    // 栅格间隔
    gutter: {
      type: Number,
      default: 20
    },
    // 默认列宽
    defaultSpan: {
      type: Number,
      default: 6
    },
    // 按钮列宽
    btnSpan: {
      type: Number,
      default: undefined
    },
    // 按钮响应式布局
    btnXs: {
      type: Number,
      default: undefined
    },
    btnSm: {
      type: Number,
      default: undefined
    },
    btnMd: {
      type: Number,
      default: undefined
    },
    btnLg: {
      type: Number,
      default: undefined
    },
    btnXl: {
      type: Number,
      default: undefined
    },
    // 按钮标签宽度
    btnLabelWidth: {
      type: String,
      default: ''
    },
    // 是否显示搜索按钮
    showSearch: {
      type: Boolean,
      default: true
    },
    // 是否显示重置按钮
    showReset: {
      type: Boolean,
      default: true
    },
    // 搜索按钮文本
    searchText: {
      type: String,
      default: '搜索'
    },
    // 重置按钮文本
    resetText: {
      type: String,
      default: '重置'
    },
    // 搜索按钮图标
    searchIcon: {
      type: String,
      default: 'el-icon-search'
    },
    // 重置按钮图标
    resetIcon: {
      type: String,
      default: 'el-icon-refresh'
    },
    // 搜索按钮加载状态
    searchLoading: {
      type: Boolean,
      default: false
    },
    // 是否可折叠
    collapsible: {
      type: Boolean,
      default: false
    },
    // 折叠时显示的表单项数量
    collapseCount: {
      type: Number,
      default: 3
    },
    // 默认是否折叠
    defaultCollapsed: {
      type: Boolean,
      default: true
    },
    // 按钮权限配置对象 { search: 'user:search', reset: null }
    buttonPermissions: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      collapsed: this.defaultCollapsed
    }
  },
  computed: {
    // 可见的搜索项
    visibleItems() {
      if (!this.collapsible || !this.collapsed) {
        return this.searchItems
      }
      return this.searchItems.slice(0, this.collapseCount)
    }
  },
  methods: {
    // 检查按钮权限
    checkButtonPermission(buttonType) {
      const permission = this.buttonPermissions[buttonType]
      if (!permission) {
        return true
      }
      return checkPermission(permission)
    },
    // 搜索
    handleSearch() {
      this.$emit('search', this.searchData)
    },
    // 重置
    handleReset() {
      this.$refs.elForm.resetFields()
      this.$emit('reset')
      this.$emit('search', this.searchData)
    },
    // 切换折叠状态
    toggleCollapse() {
      this.collapsed = !this.collapsed
    },
    // 对外暴露的重置表单方法
    resetFields() {
      return this.$refs.elForm.resetFields()
    }
  }
}
</script>

<style scoped>
.z-search-form {
  width: 100%;
}

.z-search-form-btns {
  text-align: left;
}
</style>
