<!-- packages/components/src/form/index.vue -->
<template>
  <el-form
    ref="elForm"
    :model="formData"
    :rules="formRules"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :inline="inline"
    :size="size"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-row :gutter="gutter">
      <el-col
        v-for="(item, index) in formItems"
        :key="item.prop || index"
        :span="item.span || defaultSpan"
        :xs="item.xs"
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
          :required="item.required"
          :rules="item.rules"
          :error="item.error"
          :show-message="item.showMessage !== false"
          :inline-message="item.inlineMessage"
          :size="item.size || size"
        >
          <!-- 输入框 -->
          <el-input
            v-if="item.type === 'input' || !item.type"
            v-model="formData[item.prop]"
            :placeholder="item.placeholder || `请输入${item.label}`"
            :clearable="item.clearable !== false"
            :disabled="item.disabled"
            :readonly="item.readonly"
            :maxlength="item.maxlength"
            :minlength="item.minlength"
            :show-word-limit="item.showWordLimit"
            :prefix-icon="item.prefixIcon"
            :suffix-icon="item.suffixIcon"
            v-bind="item.attrs"
            v-on="item.listeners || {}"
          />

          <!-- 文本域 -->
          <el-input
            v-else-if="item.type === 'textarea'"
            v-model="formData[item.prop]"
            type="textarea"
            :placeholder="item.placeholder || `请输入${item.label}`"
            :clearable="item.clearable !== false"
            :disabled="item.disabled"
            :readonly="item.readonly"
            :rows="item.rows || 3"
            :maxlength="item.maxlength"
            :minlength="item.minlength"
            :show-word-limit="item.showWordLimit"
            :autosize="item.autosize"
            v-bind="item.attrs"
            v-on="item.listeners || {}"
          />

          <!-- 数字输入框 -->
          <el-input-number
            v-else-if="item.type === 'number'"
            v-model="formData[item.prop]"
            :placeholder="item.placeholder"
            :disabled="item.disabled"
            :min="item.min"
            :max="item.max"
            :step="item.step || 1"
            :precision="item.precision"
            :controls-position="item.controlsPosition"
            v-bind="item.attrs"
            v-on="item.listeners || {}"
          />

          <!-- 选择器 -->
          <el-select
            v-else-if="item.type === 'select'"
            v-model="formData[item.prop]"
            :placeholder="item.placeholder || `请选择${item.label}`"
            :clearable="item.clearable !== false"
            :disabled="item.disabled"
            :multiple="item.multiple"
            :filterable="item.filterable"
            :allow-create="item.allowCreate"
            :remote="item.remote"
            :remote-method="item.remoteMethod"
            :loading="item.loading"
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
            v-model="formData[item.prop]"
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
            v-model="formData[item.prop]"
            :type="item.dateType || 'date'"
            :placeholder="item.placeholder || `请选择${item.label}`"
            :clearable="item.clearable !== false"
            :disabled="item.disabled"
            :editable="item.editable !== false"
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
            v-model="formData[item.prop]"
            :placeholder="item.placeholder || `请选择${item.label}`"
            :clearable="item.clearable !== false"
            :disabled="item.disabled"
            :editable="item.editable !== false"
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

          <!-- 开关 -->
          <el-switch
            v-else-if="item.type === 'switch'"
            v-model="formData[item.prop]"
            :disabled="item.disabled"
            :active-text="item.activeText"
            :inactive-text="item.inactiveText"
            :active-value="item.activeValue !== undefined ? item.activeValue : true"
            :inactive-value="item.inactiveValue !== undefined ? item.inactiveValue : false"
            :active-color="item.activeColor"
            :inactive-color="item.inactiveColor"
            v-bind="item.attrs"
            v-on="item.listeners || {}"
          />

          <!-- 单选框组 -->
          <el-radio-group
            v-else-if="item.type === 'radio'"
            v-model="formData[item.prop]"
            :disabled="item.disabled"
            :size="item.size || size"
            v-bind="item.attrs"
            v-on="item.listeners || {}"
          >
            <component
              :is="item.radioType === 'button' ? 'el-radio-button' : 'el-radio'"
              v-for="option in item.options"
              :key="option[item.optionValue || 'value']"
              :label="option[item.optionValue || 'value']"
              :disabled="option.disabled"
            >
              {{ option[item.optionLabel || 'label'] }}
            </component>
          </el-radio-group>

          <!-- 多选框组 -->
          <el-checkbox-group
            v-else-if="item.type === 'checkbox'"
            v-model="formData[item.prop]"
            :disabled="item.disabled"
            :min="item.min"
            :max="item.max"
            :size="item.size || size"
            v-bind="item.attrs"
            v-on="item.listeners || {}"
          >
            <component
              :is="item.checkboxType === 'button' ? 'el-checkbox-button' : 'el-checkbox'"
              v-for="option in item.options"
              :key="option[item.optionValue || 'value']"
              :label="option[item.optionValue || 'value']"
              :disabled="option.disabled"
            >
              {{ option[item.optionLabel || 'label'] }}
            </component>
          </el-checkbox-group>

          <!-- 滑块 -->
          <el-slider
            v-else-if="item.type === 'slider'"
            v-model="formData[item.prop]"
            :disabled="item.disabled"
            :min="item.min || 0"
            :max="item.max || 100"
            :step="item.step || 1"
            :show-input="item.showInput"
            :show-stops="item.showStops"
            :range="item.range"
            :marks="item.marks"
            v-bind="item.attrs"
            v-on="item.listeners || {}"
          />

          <!-- 评分 -->
          <el-rate
            v-else-if="item.type === 'rate'"
            v-model="formData[item.prop]"
            :disabled="item.disabled"
            :max="item.max || 5"
            :allow-half="item.allowHalf"
            :show-text="item.showText"
            :show-score="item.showScore"
            :texts="item.texts"
            v-bind="item.attrs"
            v-on="item.listeners || {}"
          />

          <!-- 颜色选择器 -->
          <el-color-picker
            v-else-if="item.type === 'color'"
            v-model="formData[item.prop]"
            :disabled="item.disabled"
            :show-alpha="item.showAlpha"
            :color-format="item.colorFormat"
            :predefine="item.predefine"
            v-bind="item.attrs"
            v-on="item.listeners || {}"
          />

          <!-- 上传 -->
          <el-upload
            v-else-if="item.type === 'upload'"
            :action="item.action"
            :headers="item.headers"
            :data="item.data"
            :name="item.name || 'file'"
            :accept="item.accept"
            :disabled="item.disabled"
            :limit="item.limit"
            :file-list="formData[item.prop] || []"
            :list-type="item.listType || 'text'"
            :auto-upload="item.autoUpload !== false"
            :multiple="item.multiple"
            :drag="item.drag"
            :on-preview="item.onPreview"
            :on-remove="item.onRemove || handleUploadRemove(item.prop)"
            :on-success="item.onSuccess || handleUploadSuccess(item.prop)"
            :on-error="item.onError"
            :on-progress="item.onProgress"
            :on-change="item.onChange"
            :on-exceed="item.onExceed"
            :before-upload="item.beforeUpload"
            :before-remove="item.beforeRemove"
            v-bind="item.attrs"
          >
            <el-button v-if="!item.drag" size="small" type="primary">
              {{ item.uploadText || '点击上传' }}
            </el-button>
            <div v-else>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                {{ item.uploadText || '将文件拖到此处，或点击上传' }}
              </div>
            </div>
            <div v-if="item.tip" slot="tip" class="el-upload__tip">
              {{ item.tip }}
            </div>
          </el-upload>

          <!-- 自定义插槽 -->
          <slot
            v-else-if="item.type === 'slot'"
            :name="item.slotName"
            :data="formData"
            :item="item"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 表单操作按钮 -->
    <el-form-item v-if="showButtons" :label-width="buttonLabelWidth || labelWidth">
      <slot name="buttons" :form-data="formData">
        <el-button
          v-if="showSubmit && checkButtonPermission('submit')"
          type="primary"
          :size="size"
          :loading="submitLoading"
          @click="handleSubmit"
        >
          {{ submitText }}
        </el-button>
        <el-button
          v-if="showReset && checkButtonPermission('reset')"
          :size="size"
          @click="handleReset"
        >
          {{ resetText }}
        </el-button>
        <el-button
          v-if="showCancel && checkButtonPermission('cancel')"
          :size="size"
          @click="handleCancel"
        >
          {{ cancelText }}
        </el-button>
      </slot>
    </el-form-item>
  </el-form>
</template>

<script>
import { checkPermission } from '../utils/permission'

export default {
  name: 'ZForm',
  props: {
    // 表单数据
    formData: {
      type: Object,
      required: true,
      default: () => ({})
    },
    // 表单项配置
    formItems: {
      type: Array,
      required: true,
      default: () => []
    },
    // 表单验证规则
    rules: {
      type: Object,
      default: () => ({})
    },
    // 标签宽度
    labelWidth: {
      type: String,
      default: '100px'
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
      default: false
    },
    // 表单尺寸
    size: {
      type: String,
      default: 'medium',
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
      default: 24
    },
    // 是否显示操作按钮
    showButtons: {
      type: Boolean,
      default: true
    },
    // 是否显示提交按钮
    showSubmit: {
      type: Boolean,
      default: true
    },
    // 是否显示重置按钮
    showReset: {
      type: Boolean,
      default: true
    },
    // 是否显示取消按钮
    showCancel: {
      type: Boolean,
      default: false
    },
    // 提交按钮文本
    submitText: {
      type: String,
      default: '提交'
    },
    // 重置按钮文本
    resetText: {
      type: String,
      default: '重置'
    },
    // 取消按钮文本
    cancelText: {
      type: String,
      default: '取消'
    },
    // 提交按钮加载状态
    submitLoading: {
      type: Boolean,
      default: false
    },
    // 按钮区域标签宽度
    buttonLabelWidth: {
      type: String,
      default: ''
    },
    // 按钮权限配置对象 { submit: 'user:add', reset: null, cancel: null }
    buttonPermissions: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    formRules() {
      const rules = {}
      // 合并 props.rules 和 formItems 中的 rules
      this.formItems.forEach(item => {
        if (item.prop && item.rules) {
          rules[item.prop] = item.rules
        }
      })
      return { ...rules, ...this.rules }
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
    // 提交表单
    handleSubmit() {
      this.$refs.elForm.validate((valid, invalidFields) => {
        if (valid) {
          this.$emit('submit', this.formData)
        } else {
          this.$emit('validate-error', invalidFields)
        }
      })
    },
    // 重置表单
    handleReset() {
      this.$refs.elForm.resetFields()
      this.$emit('reset')
    },
    // 取消
    handleCancel() {
      this.$emit('cancel')
    },
    // 上传成功处理
    handleUploadSuccess(prop) {
      return (response, file, fileList) => {
        this.$set(this.formData, prop, fileList)
        this.$emit('upload-success', { prop, response, file, fileList })
      }
    },
    // 移除文件处理
    handleUploadRemove(prop) {
      return (file, fileList) => {
        this.$set(this.formData, prop, fileList)
        this.$emit('upload-remove', { prop, file, fileList })
      }
    },
    // 对外暴露的验证方法
    validate(callback) {
      return this.$refs.elForm.validate(callback)
    },
    // 对外暴露的验证指定字段方法
    validateField(props, callback) {
      return this.$refs.elForm.validateField(props, callback)
    },
    // 对外暴露的重置表单方法
    resetFields() {
      return this.$refs.elForm.resetFields()
    },
    // 对外暴露的清空验证方法
    clearValidate(props) {
      return this.$refs.elForm.clearValidate(props)
    }
  }
}
</script>

<style scoped>
.el-upload__tip {
  line-height: 1.2;
  margin-top: 7px;
}
</style>
