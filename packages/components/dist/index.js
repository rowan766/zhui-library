(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Zhui = {}));
})(this, (function (exports) { 'use strict';

  // packages/components/src/utils/permission.js

  /**
   * 权限管理类
   */
  class PermissionManager {
    constructor() {
      // 用户权限列表
      this.permissions = [];
      // 权限检查函数（可自定义）
      this.checkFunction = null;
    }

    /**
     * 设置用户权限列表
     * @param {Array} permissions - 权限列表
     */
    setPermissions(permissions) {
      this.permissions = permissions || [];
    }

    /**
     * 获取用户权限列表
     * @returns {Array}
     */
    getPermissions() {
      return this.permissions
    }

    /**
     * 设置自定义权限检查函数
     * @param {Function} fn - 检查函数
     */
    setCheckFunction(fn) {
      if (typeof fn === 'function') {
        this.checkFunction = fn;
      }
    }

    /**
     * 检查是否有权限
     * @param {String|Array} permission - 权限码或权限码数组
     * @param {String} mode - 检查模式：'some'（有一个即可）或 'every'（全部拥有）
     * @returns {Boolean}
     */
    has(permission, mode = 'some') {
      // 如果设置了自定义检查函数，优先使用
      if (this.checkFunction) {
        return this.checkFunction(permission, this.permissions)
      }

      // 如果没有权限要求，直接返回 true
      if (!permission) {
        return true
      }

      // 如果没有设置权限列表，默认返回 true
      if (!this.permissions || this.permissions.length === 0) {
        return true
      }

      // 单个权限检查
      if (typeof permission === 'string') {
        return this.permissions.includes(permission)
      }

      // 多个权限检查
      if (Array.isArray(permission)) {
        if (permission.length === 0) {
          return true
        }

        if (mode === 'every') {
          // 需要拥有所有权限
          return permission.every(p => this.permissions.includes(p))
        } else {
          // 只需要拥有其中一个权限
          return permission.some(p => this.permissions.includes(p))
        }
      }

      return false
    }

    /**
     * 检查是否有任一权限（别名方法）
     * @param {Array} permissions - 权限码数组
     * @returns {Boolean}
     */
    hasAny(permissions) {
      return this.has(permissions, 'some')
    }

    /**
     * 检查是否拥有所有权限（别名方法）
     * @param {Array} permissions - 权限码数组
     * @returns {Boolean}
     */
    hasAll(permissions) {
      return this.has(permissions, 'every')
    }

    /**
     * 添加权限
     * @param {String|Array} permission - 权限码或权限码数组
     */
    add(permission) {
      if (typeof permission === 'string') {
        if (!this.permissions.includes(permission)) {
          this.permissions.push(permission);
        }
      } else if (Array.isArray(permission)) {
        permission.forEach(p => {
          if (!this.permissions.includes(p)) {
            this.permissions.push(p);
          }
        });
      }
    }

    /**
     * 移除权限
     * @param {String|Array} permission - 权限码或权限码数组
     */
    remove(permission) {
      if (typeof permission === 'string') {
        const index = this.permissions.indexOf(permission);
        if (index > -1) {
          this.permissions.splice(index, 1);
        }
      } else if (Array.isArray(permission)) {
        permission.forEach(p => {
          const index = this.permissions.indexOf(p);
          if (index > -1) {
            this.permissions.splice(index, 1);
          }
        });
      }
    }

    /**
     * 清空权限
     */
    clear() {
      this.permissions = [];
    }
  }

  // 创建单例
  const permissionManager = new PermissionManager();

  /**
   * 检查权限的工具函数
   * @param {String|Array} permission - 权限码或权限码数组
   * @param {String} mode - 检查模式
   * @returns {Boolean}
   */
  function checkPermission(permission, mode = 'some') {
    return permissionManager.has(permission, mode)
  }

  //

  var script$b = {
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
        const rules = {};
        // 合并 props.rules 和 formItems 中的 rules
        this.formItems.forEach(item => {
          if (item.prop && item.rules) {
            rules[item.prop] = item.rules;
          }
        });
        return { ...rules, ...this.rules }
      }
    },
    methods: {
      // 检查按钮权限
      checkButtonPermission(buttonType) {
        const permission = this.buttonPermissions[buttonType];
        if (!permission) {
          return true
        }
        return checkPermission(permission)
      },
      // 提交表单
      handleSubmit() {
        this.$refs.elForm.validate((valid, invalidFields) => {
          if (valid) {
            this.$emit('submit', this.formData);
          } else {
            this.$emit('validate-error', invalidFields);
          }
        });
      },
      // 重置表单
      handleReset() {
        this.$refs.elForm.resetFields();
        this.$emit('reset');
      },
      // 取消
      handleCancel() {
        this.$emit('cancel');
      },
      // 上传成功处理
      handleUploadSuccess(prop) {
        return (response, file, fileList) => {
          this.$set(this.formData, prop, fileList);
          this.$emit('upload-success', { prop, response, file, fileList });
        }
      },
      // 移除文件处理
      handleUploadRemove(prop) {
        return (file, fileList) => {
          this.$set(this.formData, prop, fileList);
          this.$emit('upload-remove', { prop, file, fileList });
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
  };

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z$a = "\n.el-upload__tip[data-v-0c07867a] {\r\n  line-height: 1.2;\r\n  margin-top: 7px;\n}\r\n";
  styleInject(css_248z$a);

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  /* script */
  const __vue_script__$b = script$b;
  /* template */
  var __vue_render__$b = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "el-form",
      _vm._g(
        _vm._b(
          {
            ref: "elForm",
            attrs: {
              model: _vm.formData,
              rules: _vm.formRules,
              "label-width": _vm.labelWidth,
              "label-position": _vm.labelPosition,
              inline: _vm.inline,
              size: _vm.size,
            },
          },
          "el-form",
          _vm.$attrs,
          false
        ),
        _vm.$listeners
      ),
      [
        _c(
          "el-row",
          { attrs: { gutter: _vm.gutter } },
          _vm._l(_vm.formItems, function (item, index) {
            return _c(
              "el-col",
              {
                key: item.prop || index,
                attrs: {
                  span: item.span || _vm.defaultSpan,
                  xs: item.xs,
                  sm: item.sm,
                  md: item.md,
                  lg: item.lg,
                  xl: item.xl,
                },
              },
              [
                !item.hidden
                  ? _c(
                      "el-form-item",
                      {
                        attrs: {
                          label: item.label,
                          prop: item.prop,
                          "label-width": item.labelWidth,
                          required: item.required,
                          rules: item.rules,
                          error: item.error,
                          "show-message": item.showMessage !== false,
                          "inline-message": item.inlineMessage,
                          size: item.size || _vm.size,
                        },
                      },
                      [
                        item.type === "input" || !item.type
                          ? _c(
                              "el-input",
                              _vm._g(
                                _vm._b(
                                  {
                                    attrs: {
                                      placeholder:
                                        item.placeholder || "请输入" + item.label,
                                      clearable: item.clearable !== false,
                                      disabled: item.disabled,
                                      readonly: item.readonly,
                                      maxlength: item.maxlength,
                                      minlength: item.minlength,
                                      "show-word-limit": item.showWordLimit,
                                      "prefix-icon": item.prefixIcon,
                                      "suffix-icon": item.suffixIcon,
                                    },
                                    model: {
                                      value: _vm.formData[item.prop],
                                      callback: function ($$v) {
                                        _vm.$set(_vm.formData, item.prop, $$v);
                                      },
                                      expression: "formData[item.prop]",
                                    },
                                  },
                                  "el-input",
                                  item.attrs,
                                  false
                                ),
                                item.listeners || {}
                              )
                            )
                          : item.type === "textarea"
                          ? _c(
                              "el-input",
                              _vm._g(
                                _vm._b(
                                  {
                                    attrs: {
                                      type: "textarea",
                                      placeholder:
                                        item.placeholder || "请输入" + item.label,
                                      clearable: item.clearable !== false,
                                      disabled: item.disabled,
                                      readonly: item.readonly,
                                      rows: item.rows || 3,
                                      maxlength: item.maxlength,
                                      minlength: item.minlength,
                                      "show-word-limit": item.showWordLimit,
                                      autosize: item.autosize,
                                    },
                                    model: {
                                      value: _vm.formData[item.prop],
                                      callback: function ($$v) {
                                        _vm.$set(_vm.formData, item.prop, $$v);
                                      },
                                      expression: "formData[item.prop]",
                                    },
                                  },
                                  "el-input",
                                  item.attrs,
                                  false
                                ),
                                item.listeners || {}
                              )
                            )
                          : item.type === "number"
                          ? _c(
                              "el-input-number",
                              _vm._g(
                                _vm._b(
                                  {
                                    attrs: {
                                      placeholder: item.placeholder,
                                      disabled: item.disabled,
                                      min: item.min,
                                      max: item.max,
                                      step: item.step || 1,
                                      precision: item.precision,
                                      "controls-position": item.controlsPosition,
                                    },
                                    model: {
                                      value: _vm.formData[item.prop],
                                      callback: function ($$v) {
                                        _vm.$set(_vm.formData, item.prop, $$v);
                                      },
                                      expression: "formData[item.prop]",
                                    },
                                  },
                                  "el-input-number",
                                  item.attrs,
                                  false
                                ),
                                item.listeners || {}
                              )
                            )
                          : item.type === "select"
                          ? _c(
                              "el-select",
                              _vm._g(
                                _vm._b(
                                  {
                                    attrs: {
                                      placeholder:
                                        item.placeholder || "请选择" + item.label,
                                      clearable: item.clearable !== false,
                                      disabled: item.disabled,
                                      multiple: item.multiple,
                                      filterable: item.filterable,
                                      "allow-create": item.allowCreate,
                                      remote: item.remote,
                                      "remote-method": item.remoteMethod,
                                      loading: item.loading,
                                      "collapse-tags": item.collapseTags,
                                    },
                                    model: {
                                      value: _vm.formData[item.prop],
                                      callback: function ($$v) {
                                        _vm.$set(_vm.formData, item.prop, $$v);
                                      },
                                      expression: "formData[item.prop]",
                                    },
                                  },
                                  "el-select",
                                  item.attrs,
                                  false
                                ),
                                item.listeners || {}
                              ),
                              _vm._l(item.options, function (option) {
                                return _c("el-option", {
                                  key: option[item.optionValue || "value"],
                                  attrs: {
                                    label: option[item.optionLabel || "label"],
                                    value: option[item.optionValue || "value"],
                                    disabled: option.disabled,
                                  },
                                })
                              }),
                              1
                            )
                          : item.type === "cascader"
                          ? _c(
                              "el-cascader",
                              _vm._g(
                                _vm._b(
                                  {
                                    attrs: {
                                      placeholder:
                                        item.placeholder || "请选择" + item.label,
                                      options: item.options,
                                      props: item.cascaderProps,
                                      clearable: item.clearable !== false,
                                      disabled: item.disabled,
                                      filterable: item.filterable,
                                      "show-all-levels":
                                        item.showAllLevels !== false,
                                    },
                                    model: {
                                      value: _vm.formData[item.prop],
                                      callback: function ($$v) {
                                        _vm.$set(_vm.formData, item.prop, $$v);
                                      },
                                      expression: "formData[item.prop]",
                                    },
                                  },
                                  "el-cascader",
                                  item.attrs,
                                  false
                                ),
                                item.listeners || {}
                              )
                            )
                          : item.type === "date"
                          ? _c(
                              "el-date-picker",
                              _vm._g(
                                _vm._b(
                                  {
                                    attrs: {
                                      type: item.dateType || "date",
                                      placeholder:
                                        item.placeholder || "请选择" + item.label,
                                      clearable: item.clearable !== false,
                                      disabled: item.disabled,
                                      editable: item.editable !== false,
                                      format: item.format,
                                      "value-format": item.valueFormat,
                                      "picker-options": item.pickerOptions,
                                      "range-separator":
                                        item.rangeSeparator || "至",
                                      "start-placeholder":
                                        item.startPlaceholder || "开始日期",
                                      "end-placeholder":
                                        item.endPlaceholder || "结束日期",
                                    },
                                    model: {
                                      value: _vm.formData[item.prop],
                                      callback: function ($$v) {
                                        _vm.$set(_vm.formData, item.prop, $$v);
                                      },
                                      expression: "formData[item.prop]",
                                    },
                                  },
                                  "el-date-picker",
                                  item.attrs,
                                  false
                                ),
                                item.listeners || {}
                              )
                            )
                          : item.type === "time"
                          ? _c(
                              "el-time-picker",
                              _vm._g(
                                _vm._b(
                                  {
                                    attrs: {
                                      placeholder:
                                        item.placeholder || "请选择" + item.label,
                                      clearable: item.clearable !== false,
                                      disabled: item.disabled,
                                      editable: item.editable !== false,
                                      format: item.format,
                                      "value-format": item.valueFormat,
                                      "picker-options": item.pickerOptions,
                                      "is-range": item.isRange,
                                      "range-separator":
                                        item.rangeSeparator || "至",
                                      "start-placeholder":
                                        item.startPlaceholder || "开始时间",
                                      "end-placeholder":
                                        item.endPlaceholder || "结束时间",
                                    },
                                    model: {
                                      value: _vm.formData[item.prop],
                                      callback: function ($$v) {
                                        _vm.$set(_vm.formData, item.prop, $$v);
                                      },
                                      expression: "formData[item.prop]",
                                    },
                                  },
                                  "el-time-picker",
                                  item.attrs,
                                  false
                                ),
                                item.listeners || {}
                              )
                            )
                          : item.type === "switch"
                          ? _c(
                              "el-switch",
                              _vm._g(
                                _vm._b(
                                  {
                                    attrs: {
                                      disabled: item.disabled,
                                      "active-text": item.activeText,
                                      "inactive-text": item.inactiveText,
                                      "active-value":
                                        item.activeValue !== undefined
                                          ? item.activeValue
                                          : true,
                                      "inactive-value":
                                        item.inactiveValue !== undefined
                                          ? item.inactiveValue
                                          : false,
                                      "active-color": item.activeColor,
                                      "inactive-color": item.inactiveColor,
                                    },
                                    model: {
                                      value: _vm.formData[item.prop],
                                      callback: function ($$v) {
                                        _vm.$set(_vm.formData, item.prop, $$v);
                                      },
                                      expression: "formData[item.prop]",
                                    },
                                  },
                                  "el-switch",
                                  item.attrs,
                                  false
                                ),
                                item.listeners || {}
                              )
                            )
                          : item.type === "radio"
                          ? _c(
                              "el-radio-group",
                              _vm._g(
                                _vm._b(
                                  {
                                    attrs: {
                                      disabled: item.disabled,
                                      size: item.size || _vm.size,
                                    },
                                    model: {
                                      value: _vm.formData[item.prop],
                                      callback: function ($$v) {
                                        _vm.$set(_vm.formData, item.prop, $$v);
                                      },
                                      expression: "formData[item.prop]",
                                    },
                                  },
                                  "el-radio-group",
                                  item.attrs,
                                  false
                                ),
                                item.listeners || {}
                              ),
                              _vm._l(item.options, function (option) {
                                return _c(
                                  item.radioType === "button"
                                    ? "el-radio-button"
                                    : "el-radio",
                                  {
                                    key: option[item.optionValue || "value"],
                                    tag: "component",
                                    attrs: {
                                      label: option[item.optionValue || "value"],
                                      disabled: option.disabled,
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "\n            " +
                                        _vm._s(
                                          option[item.optionLabel || "label"]
                                        ) +
                                        "\n          "
                                    ),
                                  ]
                                )
                              }),
                              1
                            )
                          : item.type === "checkbox"
                          ? _c(
                              "el-checkbox-group",
                              _vm._g(
                                _vm._b(
                                  {
                                    attrs: {
                                      disabled: item.disabled,
                                      min: item.min,
                                      max: item.max,
                                      size: item.size || _vm.size,
                                    },
                                    model: {
                                      value: _vm.formData[item.prop],
                                      callback: function ($$v) {
                                        _vm.$set(_vm.formData, item.prop, $$v);
                                      },
                                      expression: "formData[item.prop]",
                                    },
                                  },
                                  "el-checkbox-group",
                                  item.attrs,
                                  false
                                ),
                                item.listeners || {}
                              ),
                              _vm._l(item.options, function (option) {
                                return _c(
                                  item.checkboxType === "button"
                                    ? "el-checkbox-button"
                                    : "el-checkbox",
                                  {
                                    key: option[item.optionValue || "value"],
                                    tag: "component",
                                    attrs: {
                                      label: option[item.optionValue || "value"],
                                      disabled: option.disabled,
                                    },
                                  },
                                  [
                                    _vm._v(
                                      "\n            " +
                                        _vm._s(
                                          option[item.optionLabel || "label"]
                                        ) +
                                        "\n          "
                                    ),
                                  ]
                                )
                              }),
                              1
                            )
                          : item.type === "slider"
                          ? _c(
                              "el-slider",
                              _vm._g(
                                _vm._b(
                                  {
                                    attrs: {
                                      disabled: item.disabled,
                                      min: item.min || 0,
                                      max: item.max || 100,
                                      step: item.step || 1,
                                      "show-input": item.showInput,
                                      "show-stops": item.showStops,
                                      range: item.range,
                                      marks: item.marks,
                                    },
                                    model: {
                                      value: _vm.formData[item.prop],
                                      callback: function ($$v) {
                                        _vm.$set(_vm.formData, item.prop, $$v);
                                      },
                                      expression: "formData[item.prop]",
                                    },
                                  },
                                  "el-slider",
                                  item.attrs,
                                  false
                                ),
                                item.listeners || {}
                              )
                            )
                          : item.type === "rate"
                          ? _c(
                              "el-rate",
                              _vm._g(
                                _vm._b(
                                  {
                                    attrs: {
                                      disabled: item.disabled,
                                      max: item.max || 5,
                                      "allow-half": item.allowHalf,
                                      "show-text": item.showText,
                                      "show-score": item.showScore,
                                      texts: item.texts,
                                    },
                                    model: {
                                      value: _vm.formData[item.prop],
                                      callback: function ($$v) {
                                        _vm.$set(_vm.formData, item.prop, $$v);
                                      },
                                      expression: "formData[item.prop]",
                                    },
                                  },
                                  "el-rate",
                                  item.attrs,
                                  false
                                ),
                                item.listeners || {}
                              )
                            )
                          : item.type === "color"
                          ? _c(
                              "el-color-picker",
                              _vm._g(
                                _vm._b(
                                  {
                                    attrs: {
                                      disabled: item.disabled,
                                      "show-alpha": item.showAlpha,
                                      "color-format": item.colorFormat,
                                      predefine: item.predefine,
                                    },
                                    model: {
                                      value: _vm.formData[item.prop],
                                      callback: function ($$v) {
                                        _vm.$set(_vm.formData, item.prop, $$v);
                                      },
                                      expression: "formData[item.prop]",
                                    },
                                  },
                                  "el-color-picker",
                                  item.attrs,
                                  false
                                ),
                                item.listeners || {}
                              )
                            )
                          : item.type === "upload"
                          ? _c(
                              "el-upload",
                              _vm._b(
                                {
                                  attrs: {
                                    action: item.action,
                                    headers: item.headers,
                                    data: item.data,
                                    name: item.name || "file",
                                    accept: item.accept,
                                    disabled: item.disabled,
                                    limit: item.limit,
                                    "file-list": _vm.formData[item.prop] || [],
                                    "list-type": item.listType || "text",
                                    "auto-upload": item.autoUpload !== false,
                                    multiple: item.multiple,
                                    drag: item.drag,
                                    "on-preview": item.onPreview,
                                    "on-remove":
                                      item.onRemove ||
                                      _vm.handleUploadRemove(item.prop),
                                    "on-success":
                                      item.onSuccess ||
                                      _vm.handleUploadSuccess(item.prop),
                                    "on-error": item.onError,
                                    "on-progress": item.onProgress,
                                    "on-change": item.onChange,
                                    "on-exceed": item.onExceed,
                                    "before-upload": item.beforeUpload,
                                    "before-remove": item.beforeRemove,
                                  },
                                },
                                "el-upload",
                                item.attrs,
                                false
                              ),
                              [
                                !item.drag
                                  ? _c(
                                      "el-button",
                                      {
                                        attrs: { size: "small", type: "primary" },
                                      },
                                      [
                                        _vm._v(
                                          "\n            " +
                                            _vm._s(
                                              item.uploadText || "点击上传"
                                            ) +
                                            "\n          "
                                        ),
                                      ]
                                    )
                                  : _c("div", [
                                      _c("i", { staticClass: "el-icon-upload" }),
                                      _vm._v(" "),
                                      _c(
                                        "div",
                                        { staticClass: "el-upload__text" },
                                        [
                                          _vm._v(
                                            "\n              " +
                                              _vm._s(
                                                item.uploadText ||
                                                  "将文件拖到此处，或点击上传"
                                              ) +
                                              "\n            "
                                          ),
                                        ]
                                      ),
                                    ]),
                                _vm._v(" "),
                                item.tip
                                  ? _c(
                                      "div",
                                      {
                                        staticClass: "el-upload__tip",
                                        attrs: { slot: "tip" },
                                        slot: "tip",
                                      },
                                      [
                                        _vm._v(
                                          "\n            " +
                                            _vm._s(item.tip) +
                                            "\n          "
                                        ),
                                      ]
                                    )
                                  : _vm._e(),
                              ],
                              1
                            )
                          : item.type === "slot"
                          ? _vm._t(item.slotName, null, {
                              data: _vm.formData,
                              item: item,
                            })
                          : _vm._e(),
                      ],
                      2
                    )
                  : _vm._e(),
              ],
              1
            )
          }),
          1
        ),
        _vm._v(" "),
        _vm.showButtons
          ? _c(
              "el-form-item",
              {
                attrs: { "label-width": _vm.buttonLabelWidth || _vm.labelWidth },
              },
              [
                _vm._t(
                  "buttons",
                  function () {
                    return [
                      _vm.showSubmit && _vm.checkButtonPermission("submit")
                        ? _c(
                            "el-button",
                            {
                              attrs: {
                                type: "primary",
                                size: _vm.size,
                                loading: _vm.submitLoading,
                              },
                              on: { click: _vm.handleSubmit },
                            },
                            [
                              _vm._v(
                                "\n        " + _vm._s(_vm.submitText) + "\n      "
                              ),
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.showReset && _vm.checkButtonPermission("reset")
                        ? _c(
                            "el-button",
                            {
                              attrs: { size: _vm.size },
                              on: { click: _vm.handleReset },
                            },
                            [
                              _vm._v(
                                "\n        " + _vm._s(_vm.resetText) + "\n      "
                              ),
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.showCancel && _vm.checkButtonPermission("cancel")
                        ? _c(
                            "el-button",
                            {
                              attrs: { size: _vm.size },
                              on: { click: _vm.handleCancel },
                            },
                            [
                              _vm._v(
                                "\n        " + _vm._s(_vm.cancelText) + "\n      "
                              ),
                            ]
                          )
                        : _vm._e(),
                    ]
                  },
                  { formData: _vm.formData }
                ),
              ],
              2
            )
          : _vm._e(),
      ],
      1
    )
  };
  var __vue_staticRenderFns__$b = [];
  __vue_render__$b._withStripped = true;

    /* style */
    const __vue_inject_styles__$b = undefined;
    /* scoped */
    const __vue_scope_id__$b = "data-v-0c07867a";
    /* module identifier */
    const __vue_module_identifier__$b = undefined;
    /* functional template */
    const __vue_is_functional_template__$b = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$b = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
      __vue_inject_styles__$b,
      __vue_script__$b,
      __vue_scope_id__$b,
      __vue_is_functional_template__$b,
      __vue_module_identifier__$b,
      false,
      undefined,
      undefined,
      undefined
    );

  // packages/components/src/form/index.js

  __vue_component__$b.install = function(Vue) {
    Vue.component(__vue_component__$b.name, __vue_component__$b);
  };

  //

  var script$a = {
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
        let buttons = [];

        if (typeof this.operationButtons === 'function') {
          buttons = this.operationButtons(row);
        } else {
          buttons = this.operationButtons;
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
            const mode = btn.permissionMode || 'some';
            return checkPermission(btn.permission, mode)
          }

          return true
        })
      },
      // 操作按钮点击
      handleOperationClick(btn, row, index) {
        if (btn.handler) {
          btn.handler(row, index);
        }
        this.$emit('operation-click', { btn, row, index });
      },
      // 开关改变
      handleSwitchChange(val, row, column) {
        this.$emit('switch-change', { val, row, column });
        if (column.switchChange) {
          column.switchChange(val, row);
        }
      },
      // 链接点击
      handleLinkClick(row, column) {
        this.$emit('link-click', { row, column });
        if (column.linkClick) {
          column.linkClick(row);
        }
      },
      // 选择项发生变化
      handleSelectionChange(selection) {
        this.$emit('selection-change', selection);
      },
      // 用户手动勾选数据行
      handleSelect(selection, row) {
        this.$emit('select', selection, row);
      },
      // 用户手动勾选全选
      handleSelectAll(selection) {
        this.$emit('select-all', selection);
      },
      // 当前行发生变化
      handleCurrentChange(currentRow, oldCurrentRow) {
        this.$emit('current-change', currentRow, oldCurrentRow);
      },
      // 排序条件发生变化
      handleSortChange({ column, prop, order }) {
        this.$emit('sort-change', { column, prop, order });
      },
      // 筛选条件发生变化
      handleFilterChange(filters) {
        this.$emit('filter-change', filters);
      },
      // 行点击
      handleRowClick(row, column, event) {
        this.$emit('row-click', row, column, event);
      },
      // 行双击
      handleRowDblclick(row, column, event) {
        this.$emit('row-dblclick', row, column, event);
      },
      // 行右键
      handleRowContextmenu(row, column, event) {
        this.$emit('row-contextmenu', row, column, event);
      },
      // 单元格点击
      handleCellClick(row, column, cell, event) {
        this.$emit('cell-click', row, column, cell, event);
      },
      // 单元格双击
      handleCellDblclick(row, column, cell, event) {
        this.$emit('cell-dblclick', row, column, cell, event);
      },
      // 表头点击
      handleHeaderClick(column, event) {
        this.$emit('header-click', column, event);
      },
      // 表头右键
      handleHeaderContextmenu(column, event) {
        this.$emit('header-contextmenu', column, event);
      },
      // 展开行变化
      handleExpandChange(row, expandedRows) {
        this.$emit('expand-change', row, expandedRows);
      },
      // 每页条数改变
      handleSizeChange(val) {
        this.$emit('size-change', val);
        this.$emit('update:pageSize', val);
      },
      // 当前页改变
      handleCurrentPageChange(val) {
        this.$emit('current-change', val);
        this.$emit('update:currentPage', val);
      },
      // 对外暴露的方法
      clearSelection() {
        this.$refs.elTable.clearSelection();
      },
      toggleRowSelection(row, selected) {
        this.$refs.elTable.toggleRowSelection(row, selected);
      },
      toggleAllSelection() {
        this.$refs.elTable.toggleAllSelection();
      },
      toggleRowExpansion(row, expanded) {
        this.$refs.elTable.toggleRowExpansion(row, expanded);
      },
      setCurrentRow(row) {
        this.$refs.elTable.setCurrentRow(row);
      },
      clearSort() {
        this.$refs.elTable.clearSort();
      },
      clearFilter(columnKey) {
        this.$refs.elTable.clearFilter(columnKey);
      },
      doLayout() {
        this.$refs.elTable.doLayout();
      },
      sort(prop, order) {
        this.$refs.elTable.sort(prop, order);
      }
    }
  };

  var css_248z$9 = "\n.z-table[data-v-8b40cd94] {\r\n  width: 100%;\n}\n.z-table-toolbar[data-v-8b40cd94] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 10px 0;\r\n  margin-bottom: 10px;\n}\n.z-table-toolbar-left[data-v-8b40cd94] {\r\n  flex: 1;\n}\n.z-table-toolbar-right[data-v-8b40cd94] {\r\n  flex: 1;\r\n  text-align: right;\n}\n.z-table-pagination[data-v-8b40cd94] {\r\n  margin-top: 15px;\r\n  text-align: right;\n}\r\n";
  styleInject(css_248z$9);

  /* script */
  const __vue_script__$a = script$a;
  /* template */
  var __vue_render__$a = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "z-table" },
      [
        _vm.showToolbar || _vm.$slots.toolbar
          ? _c(
              "div",
              { staticClass: "z-table-toolbar" },
              [
                _vm._t("toolbar", function () {
                  return [
                    _c(
                      "div",
                      { staticClass: "z-table-toolbar-left" },
                      [_vm._t("toolbar-left")],
                      2
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "z-table-toolbar-right" },
                      [_vm._t("toolbar-right")],
                      2
                    ),
                  ]
                }),
              ],
              2
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "el-table",
          _vm._g(
            _vm._b(
              {
                ref: "elTable",
                attrs: {
                  data: _vm.tableData,
                  height: _vm.height,
                  "max-height": _vm.maxHeight,
                  stripe: _vm.stripe,
                  border: _vm.border,
                  size: _vm.size,
                  fit: _vm.fit,
                  "show-header": _vm.showHeader,
                  "highlight-current-row": _vm.highlightCurrentRow,
                  "current-row-key": _vm.currentRowKey,
                  "row-class-name": _vm.rowClassName,
                  "row-style": _vm.rowStyle,
                  "cell-class-name": _vm.cellClassName,
                  "cell-style": _vm.cellStyle,
                  "header-row-class-name": _vm.headerRowClassName,
                  "header-row-style": _vm.headerRowStyle,
                  "header-cell-class-name": _vm.headerCellClassName,
                  "header-cell-style": _vm.headerCellStyle,
                  "row-key": _vm.rowKey,
                  "empty-text": _vm.emptyText,
                  "default-expand-all": _vm.defaultExpandAll,
                  "expand-row-keys": _vm.expandRowKeys,
                  "default-sort": _vm.defaultSort,
                  "tooltip-effect": _vm.tooltipEffect,
                  "show-summary": _vm.showSummary,
                  "sum-text": _vm.sumText,
                  "summary-method": _vm.summaryMethod,
                  "span-method": _vm.spanMethod,
                  "select-on-indeterminate": _vm.selectOnIndeterminate,
                  indent: _vm.indent,
                  lazy: _vm.lazy,
                  load: _vm.load,
                  "tree-props": _vm.treeProps,
                },
                on: {
                  "selection-change": _vm.handleSelectionChange,
                  select: _vm.handleSelect,
                  "select-all": _vm.handleSelectAll,
                  "current-change": _vm.handleCurrentChange,
                  "sort-change": _vm.handleSortChange,
                  "filter-change": _vm.handleFilterChange,
                  "row-click": _vm.handleRowClick,
                  "row-dblclick": _vm.handleRowDblclick,
                  "row-contextmenu": _vm.handleRowContextmenu,
                  "cell-click": _vm.handleCellClick,
                  "cell-dblclick": _vm.handleCellDblclick,
                  "header-click": _vm.handleHeaderClick,
                  "header-contextmenu": _vm.handleHeaderContextmenu,
                  "expand-change": _vm.handleExpandChange,
                },
              },
              "el-table",
              _vm.$attrs,
              false
            ),
            _vm.$listeners
          ),
          [
            _vm.showSelection
              ? _c("el-table-column", {
                  attrs: {
                    type: "selection",
                    width: _vm.selectionWidth || 55,
                    fixed: _vm.selectionFixed,
                    selectable: _vm.selectable,
                    "reserve-selection": _vm.reserveSelection,
                    align: "center",
                  },
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.showIndex
              ? _c("el-table-column", {
                  attrs: {
                    type: "index",
                    label: _vm.indexLabel || "序号",
                    width: _vm.indexWidth || 55,
                    fixed: _vm.indexFixed,
                    index: _vm.indexMethod,
                    align: "center",
                  },
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.showExpand
              ? _c("el-table-column", {
                  attrs: {
                    type: "expand",
                    width: _vm.expandWidth,
                    fixed: _vm.expandFixed,
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "default",
                        fn: function (scope) {
                          return [
                            _vm._t("expand", null, {
                              row: scope.row,
                              $index: scope.$index,
                            }),
                          ]
                        },
                      },
                    ],
                    null,
                    true
                  ),
                })
              : _vm._e(),
            _vm._v(" "),
            _vm._l(_vm.finalColumns, function (column, index) {
              return [
                !column.children
                  ? _c("el-table-column", {
                      key: column.prop || index,
                      attrs: {
                        prop: column.prop,
                        label: column.label,
                        width: column.width,
                        "min-width": column.minWidth,
                        fixed: column.fixed,
                        sortable: column.sortable,
                        "sort-method": column.sortMethod,
                        "sort-by": column.sortBy,
                        "sort-orders": column.sortOrders,
                        resizable: column.resizable !== false,
                        formatter: column.formatter,
                        "show-overflow-tooltip":
                          column.showOverflowTooltip !== false,
                        align: column.align || "left",
                        "header-align":
                          column.headerAlign || column.align || "left",
                        "class-name": column.className,
                        "label-class-name": column.labelClassName,
                        filters: column.filters,
                        "filter-method": column.filterMethod,
                        "filter-multiple": column.filterMultiple !== false,
                        "filter-placement": column.filterPlacement,
                        "filtered-value": column.filteredValue,
                      },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "header",
                            fn: function (scope) {
                              return [
                                column.headerSlot
                                  ? _vm._t(
                                      column.headerSlot,
                                      function () {
                                        return [
                                          _vm._v(
                                            "\n            " +
                                              _vm._s(column.label) +
                                              "\n          "
                                          ),
                                        ]
                                      },
                                      { column: column, $index: scope.$index }
                                    )
                                  : _c("span", [_vm._v(_vm._s(column.label))]),
                              ]
                            },
                          },
                          {
                            key: "default",
                            fn: function (scope) {
                              return [
                                column.slot
                                  ? _vm._t(column.slot, null, {
                                      row: scope.row,
                                      column: column,
                                      $index: scope.$index,
                                    })
                                  : column.type === "image"
                                  ? _c("el-image", {
                                      staticStyle: {
                                        width: "50px",
                                        height: "50px",
                                      },
                                      attrs: {
                                        src: scope.row[column.prop],
                                        fit: column.fit || "cover",
                                        "preview-src-list": column.previewSrcList
                                          ? column.previewSrcList(scope.row)
                                          : [scope.row[column.prop]],
                                      },
                                    })
                                  : column.type === "tag"
                                  ? _c(
                                      "el-tag",
                                      {
                                        attrs: {
                                          type: column.tagType
                                            ? column.tagType(scope.row)
                                            : "",
                                          size: column.tagSize || "small",
                                          effect: column.tagEffect || "light",
                                        },
                                      },
                                      [
                                        _vm._v(
                                          "\n            " +
                                            _vm._s(
                                              column.formatter
                                                ? column.formatter(
                                                    scope.row,
                                                    column,
                                                    scope.row[column.prop],
                                                    scope.$index
                                                  )
                                                : scope.row[column.prop]
                                            ) +
                                            "\n          "
                                        ),
                                      ]
                                    )
                                  : column.type === "switch"
                                  ? _c("el-switch", {
                                      attrs: {
                                        disabled: column.switchDisabled
                                          ? column.switchDisabled(scope.row)
                                          : false,
                                        "active-value":
                                          column.activeValue !== undefined
                                            ? column.activeValue
                                            : true,
                                        "inactive-value":
                                          column.inactiveValue !== undefined
                                            ? column.inactiveValue
                                            : false,
                                      },
                                      on: {
                                        change: function (val) {
                                          return _vm.handleSwitchChange(
                                            val,
                                            scope.row,
                                            column
                                          )
                                        },
                                      },
                                      model: {
                                        value: scope.row[column.prop],
                                        callback: function ($$v) {
                                          _vm.$set(scope.row, column.prop, $$v);
                                        },
                                        expression: "scope.row[column.prop]",
                                      },
                                    })
                                  : column.type === "link"
                                  ? _c(
                                      "el-link",
                                      {
                                        attrs: {
                                          type: column.linkType || "primary",
                                          underline: column.underline !== false,
                                          disabled: column.linkDisabled
                                            ? column.linkDisabled(scope.row)
                                            : false,
                                        },
                                        on: {
                                          click: function () {
                                            return _vm.handleLinkClick(
                                              scope.row,
                                              column
                                            )
                                          },
                                        },
                                      },
                                      [
                                        _vm._v(
                                          "\n            " +
                                            _vm._s(
                                              column.formatter
                                                ? column.formatter(
                                                    scope.row,
                                                    column,
                                                    scope.row[column.prop],
                                                    scope.$index
                                                  )
                                                : scope.row[column.prop]
                                            ) +
                                            "\n          "
                                        ),
                                      ]
                                    )
                                  : _c("span", [
                                      _vm._v(
                                        "\n            " +
                                          _vm._s(
                                            column.formatter
                                              ? column.formatter(
                                                  scope.row,
                                                  column,
                                                  scope.row[column.prop],
                                                  scope.$index
                                                )
                                              : scope.row[column.prop]
                                          ) +
                                          "\n          "
                                      ),
                                    ]),
                              ]
                            },
                          },
                        ],
                        null,
                        true
                      ),
                    })
                  : _c(
                      "el-table-column",
                      {
                        key: column.prop || index,
                        attrs: {
                          label: column.label,
                          width: column.width,
                          "min-width": column.minWidth,
                          fixed: column.fixed,
                          align: column.align || "left",
                          "header-align":
                            column.headerAlign || column.align || "left",
                        },
                      },
                      _vm._l(column.children, function (child, childIndex) {
                        return _c("el-table-column", {
                          key: child.prop || childIndex,
                          attrs: {
                            prop: child.prop,
                            label: child.label,
                            width: child.width,
                            "min-width": child.minWidth,
                            sortable: child.sortable,
                            formatter: child.formatter,
                            "show-overflow-tooltip":
                              child.showOverflowTooltip !== false,
                            align: child.align || "left",
                            "header-align":
                              child.headerAlign || child.align || "left",
                          },
                          scopedSlots: _vm._u(
                            [
                              {
                                key: "default",
                                fn: function (scope) {
                                  return [
                                    child.slot
                                      ? _vm._t(child.slot, null, {
                                          row: scope.row,
                                          column: child,
                                          $index: scope.$index,
                                        })
                                      : _c("span", [
                                          _vm._v(
                                            "\n              " +
                                              _vm._s(
                                                child.formatter
                                                  ? child.formatter(
                                                      scope.row,
                                                      child,
                                                      scope.row[child.prop],
                                                      scope.$index
                                                    )
                                                  : scope.row[child.prop]
                                              ) +
                                              "\n            "
                                          ),
                                        ]),
                                  ]
                                },
                              },
                            ],
                            null,
                            true
                          ),
                        })
                      }),
                      1
                    ),
              ]
            }),
            _vm._v(" "),
            _vm.showOperation
              ? _c("el-table-column", {
                  attrs: {
                    label: _vm.operationLabel || "操作",
                    width: _vm.operationWidth,
                    "min-width": _vm.operationMinWidth,
                    fixed: _vm.operationFixed || "right",
                    align: _vm.operationAlign || "center",
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "default",
                        fn: function (scope) {
                          return [
                            _vm._t(
                              "operation",
                              function () {
                                return _vm._l(
                                  _vm.getOperationButtons(scope.row),
                                  function (btn, btnIndex) {
                                    return _c(
                                      "el-button",
                                      {
                                        key: btnIndex,
                                        attrs: {
                                          type: btn.type || "text",
                                          size: btn.size || "small",
                                          icon: btn.icon,
                                          disabled: btn.disabled,
                                        },
                                        on: {
                                          click: function () {
                                            return _vm.handleOperationClick(
                                              btn,
                                              scope.row,
                                              scope.$index
                                            )
                                          },
                                        },
                                      },
                                      [
                                        _vm._v(
                                          "\n            " +
                                            _vm._s(btn.label) +
                                            "\n          "
                                        ),
                                      ]
                                    )
                                  }
                                )
                              },
                              { row: scope.row, $index: scope.$index }
                            ),
                          ]
                        },
                      },
                    ],
                    null,
                    true
                  ),
                })
              : _vm._e(),
          ],
          2
        ),
        _vm._v(" "),
        _vm.showPagination
          ? _c(
              "div",
              { staticClass: "z-table-pagination" },
              [
                _c(
                  "el-pagination",
                  _vm._b(
                    {
                      attrs: {
                        "current-page": _vm.currentPage,
                        "page-size": _vm.pageSize,
                        "page-sizes": _vm.pageSizes,
                        total: _vm.total,
                        layout: _vm.paginationLayout,
                        background: _vm.paginationBackground,
                        small: _vm.paginationSmall,
                      },
                      on: {
                        "size-change": _vm.handleSizeChange,
                        "current-change": _vm.handleCurrentPageChange,
                      },
                    },
                    "el-pagination",
                    _vm.paginationAttrs,
                    false
                  )
                ),
              ],
              1
            )
          : _vm._e(),
      ],
      1
    )
  };
  var __vue_staticRenderFns__$a = [];
  __vue_render__$a._withStripped = true;

    /* style */
    const __vue_inject_styles__$a = undefined;
    /* scoped */
    const __vue_scope_id__$a = "data-v-8b40cd94";
    /* module identifier */
    const __vue_module_identifier__$a = undefined;
    /* functional template */
    const __vue_is_functional_template__$a = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$a = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
      __vue_inject_styles__$a,
      __vue_script__$a,
      __vue_scope_id__$a,
      __vue_is_functional_template__$a,
      __vue_module_identifier__$a,
      false,
      undefined,
      undefined,
      undefined
    );

  // packages/components/src/table/index.js

  __vue_component__$a.install = function(Vue) {
    Vue.component(__vue_component__$a.name, __vue_component__$a);
  };

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$9 = {
    name: 'ZDialog',
    props: {
      // 是否显示 Dialog
      visible: {
        type: Boolean,
        default: false
      },
      // Dialog 的标题
      title: {
        type: String,
        default: ''
      },
      // Dialog 的宽度
      width: {
        type: String,
        default: '50%'
      },
      // Dialog CSS 中的 margin-top 值
      top: {
        type: String,
        default: '15vh'
      },
      // 是否需要遮罩层
      modal: {
        type: Boolean,
        default: true
      },
      // 遮罩层是否插入至 body 元素上
      modalAppendToBody: {
        type: Boolean,
        default: true
      },
      // Dialog 自身是否插入至 body 元素上
      appendToBody: {
        type: Boolean,
        default: false
      },
      // 是否在 Dialog 出现时将 body 滚动锁定
      lockScroll: {
        type: Boolean,
        default: true
      },
      // Dialog 的自定义类名
      customClass: {
        type: String,
        default: ''
      },
      // 是否可以通过点击 modal 关闭 Dialog
      closeOnClickModal: {
        type: Boolean,
        default: true
      },
      // 是否可以通过按下 ESC 关闭 Dialog
      closeOnPressEscape: {
        type: Boolean,
        default: true
      },
      // 是否显示关闭按钮
      showClose: {
        type: Boolean,
        default: true
      },
      // 关闭前的回调
      beforeClose: {
        type: Function,
        default: undefined
      },
      // 是否对头部和底部采用居中布局
      center: {
        type: Boolean,
        default: false
      },
      // 关闭时销毁 Dialog 中的元素
      destroyOnClose: {
        type: Boolean,
        default: false
      },
      // 是否为全屏 Dialog
      fullscreen: {
        type: Boolean,
        default: false
      },
      // 是否显示底部
      showFooter: {
        type: Boolean,
        default: true
      },
      // 是否显示取消按钮
      showCancel: {
        type: Boolean,
        default: true
      },
      // 是否显示确认按钮
      showConfirm: {
        type: Boolean,
        default: true
      },
      // 取消按钮文本
      cancelText: {
        type: String,
        default: '取消'
      },
      // 确认按钮文本
      confirmText: {
        type: String,
        default: '确定'
      },
      // 确认按钮加载状态
      confirmLoading: {
        type: Boolean,
        default: false
      },
      // 内容加载状态
      loading: {
        type: Boolean,
        default: false
      },
      // 加载文案
      loadingText: {
        type: String,
        default: '加载中...'
      },
      // 按钮尺寸
      btnSize: {
        type: String,
        default: 'small',
        validator: val => ['medium', 'small', 'mini'].includes(val)
      }
    },
    computed: {
      dialogVisible: {
        get() {
          return this.visible
        },
        set(val) {
          this.$emit('update:visible', val);
        }
      }
    },
    methods: {
      // 关闭前的回调
      handleBeforeClose(done) {
        if (this.beforeClose) {
          this.beforeClose(done);
        } else {
          done();
        }
      },
      // 取消
      handleCancel() {
        this.$emit('cancel');
        this.dialogVisible = false;
      },
      // 确认
      handleConfirm() {
        this.$emit('confirm');
      },
      // Dialog 打开的回调
      handleOpen() {
        this.$emit('open');
      },
      // Dialog 打开动画结束时的回调
      handleOpened() {
        this.$emit('opened');
      },
      // Dialog 关闭的回调
      handleClose() {
        this.$emit('close');
      },
      // Dialog 关闭动画结束时的回调
      handleClosed() {
        this.$emit('closed');
      }
    }
  };

  /* script */
  const __vue_script__$9 = script$9;

  /* template */
  var __vue_render__$9 = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "el-dialog",
      _vm._g(
        _vm._b(
          {
            attrs: {
              visible: _vm.dialogVisible,
              title: _vm.title,
              width: _vm.width,
              top: _vm.top,
              modal: _vm.modal,
              "modal-append-to-body": _vm.modalAppendToBody,
              "append-to-body": _vm.appendToBody,
              "lock-scroll": _vm.lockScroll,
              "custom-class": _vm.customClass,
              "close-on-click-modal": _vm.closeOnClickModal,
              "close-on-press-escape": _vm.closeOnPressEscape,
              "show-close": _vm.showClose,
              "before-close": _vm.handleBeforeClose,
              center: _vm.center,
              "destroy-on-close": _vm.destroyOnClose,
              fullscreen: _vm.fullscreen,
            },
            on: {
              "update:visible": function ($event) {
                _vm.dialogVisible = $event;
              },
              open: _vm.handleOpen,
              opened: _vm.handleOpened,
              close: _vm.handleClose,
              closed: _vm.handleClosed,
            },
          },
          "el-dialog",
          _vm.$attrs,
          false
        ),
        _vm.$listeners
      ),
      [
        _vm.$slots.title
          ? _c("template", { slot: "title" }, [_vm._t("title")], 2)
          : _vm._e(),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "loading",
                rawName: "v-loading",
                value: _vm.loading,
                expression: "loading",
              },
            ],
            attrs: { "element-loading-text": _vm.loadingText },
          },
          [_vm._t("default")],
          2
        ),
        _vm._v(" "),
        _vm.showFooter
          ? _c(
              "template",
              { slot: "footer" },
              [
                _vm._t("footer", function () {
                  return [
                    _vm.showCancel
                      ? _c(
                          "el-button",
                          {
                            attrs: { size: _vm.btnSize },
                            on: { click: _vm.handleCancel },
                          },
                          [
                            _vm._v(
                              "\n        " + _vm._s(_vm.cancelText) + "\n      "
                            ),
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.showConfirm
                      ? _c(
                          "el-button",
                          {
                            attrs: {
                              type: "primary",
                              size: _vm.btnSize,
                              loading: _vm.confirmLoading,
                            },
                            on: { click: _vm.handleConfirm },
                          },
                          [
                            _vm._v(
                              "\n        " + _vm._s(_vm.confirmText) + "\n      "
                            ),
                          ]
                        )
                      : _vm._e(),
                  ]
                }),
              ],
              2
            )
          : _vm._e(),
      ],
      2
    )
  };
  var __vue_staticRenderFns__$9 = [];
  __vue_render__$9._withStripped = true;

    /* style */
    const __vue_inject_styles__$9 = undefined;
    /* scoped */
    const __vue_scope_id__$9 = undefined;
    /* module identifier */
    const __vue_module_identifier__$9 = undefined;
    /* functional template */
    const __vue_is_functional_template__$9 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$9 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
      __vue_inject_styles__$9,
      __vue_script__$9,
      __vue_scope_id__$9,
      __vue_is_functional_template__$9,
      __vue_module_identifier__$9,
      false,
      undefined,
      undefined,
      undefined
    );

  // packages/components/src/dialog/index.js

  __vue_component__$9.install = function(Vue) {
    Vue.component(__vue_component__$9.name, __vue_component__$9);
  };

  //

  var script$8 = {
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
        const permission = this.buttonPermissions[buttonType];
        if (!permission) {
          return true
        }
        return checkPermission(permission)
      },
      // 搜索
      handleSearch() {
        this.$emit('search', this.searchData);
      },
      // 重置
      handleReset() {
        this.$refs.elForm.resetFields();
        this.$emit('reset');
        this.$emit('search', this.searchData);
      },
      // 切换折叠状态
      toggleCollapse() {
        this.collapsed = !this.collapsed;
      },
      // 对外暴露的重置表单方法
      resetFields() {
        return this.$refs.elForm.resetFields()
      }
    }
  };

  var css_248z$8 = "\n.z-search-form[data-v-07e46fe8] {\r\n  width: 100%;\n}\n.z-search-form-btns[data-v-07e46fe8] {\r\n  text-align: left;\n}\r\n";
  styleInject(css_248z$8);

  /* script */
  const __vue_script__$8 = script$8;
  /* template */
  var __vue_render__$8 = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "z-search-form" },
      [
        _c(
          "el-form",
          _vm._b(
            {
              ref: "elForm",
              attrs: {
                model: _vm.searchData,
                inline: _vm.inline,
                "label-width": _vm.labelWidth,
                "label-position": _vm.labelPosition,
                size: _vm.size,
              },
            },
            "el-form",
            _vm.$attrs,
            false
          ),
          [
            _c(
              "el-row",
              { attrs: { gutter: _vm.gutter } },
              [
                _vm._l(_vm.visibleItems, function (item, index) {
                  return _c(
                    "el-col",
                    {
                      key: item.prop || index,
                      attrs: {
                        span: item.span || _vm.defaultSpan,
                        xs: item.xs || 24,
                        sm: item.sm,
                        md: item.md,
                        lg: item.lg,
                        xl: item.xl,
                      },
                    },
                    [
                      !item.hidden
                        ? _c(
                            "el-form-item",
                            {
                              attrs: {
                                label: item.label,
                                prop: item.prop,
                                "label-width": item.labelWidth,
                              },
                            },
                            [
                              item.type === "input" || !item.type
                                ? _c(
                                    "el-input",
                                    _vm._g(
                                      _vm._b(
                                        {
                                          attrs: {
                                            placeholder:
                                              item.placeholder ||
                                              "请输入" + item.label,
                                            clearable: item.clearable !== false,
                                            disabled: item.disabled,
                                          },
                                          nativeOn: {
                                            keyup: function ($event) {
                                              if (
                                                !$event.type.indexOf("key") &&
                                                _vm._k(
                                                  $event.keyCode,
                                                  "enter",
                                                  13,
                                                  $event.key,
                                                  "Enter"
                                                )
                                              ) {
                                                return null
                                              }
                                              return _vm.handleSearch.apply(
                                                null,
                                                arguments
                                              )
                                            },
                                          },
                                          model: {
                                            value: _vm.searchData[item.prop],
                                            callback: function ($$v) {
                                              _vm.$set(
                                                _vm.searchData,
                                                item.prop,
                                                $$v
                                              );
                                            },
                                            expression: "searchData[item.prop]",
                                          },
                                        },
                                        "el-input",
                                        item.attrs,
                                        false
                                      ),
                                      item.listeners || {}
                                    )
                                  )
                                : item.type === "select"
                                ? _c(
                                    "el-select",
                                    _vm._g(
                                      _vm._b(
                                        {
                                          attrs: {
                                            placeholder:
                                              item.placeholder ||
                                              "请选择" + item.label,
                                            clearable: item.clearable !== false,
                                            disabled: item.disabled,
                                            multiple: item.multiple,
                                            filterable: item.filterable,
                                            "collapse-tags": item.collapseTags,
                                          },
                                          model: {
                                            value: _vm.searchData[item.prop],
                                            callback: function ($$v) {
                                              _vm.$set(
                                                _vm.searchData,
                                                item.prop,
                                                $$v
                                              );
                                            },
                                            expression: "searchData[item.prop]",
                                          },
                                        },
                                        "el-select",
                                        item.attrs,
                                        false
                                      ),
                                      item.listeners || {}
                                    ),
                                    _vm._l(item.options, function (option) {
                                      return _c("el-option", {
                                        key: option[item.optionValue || "value"],
                                        attrs: {
                                          label:
                                            option[item.optionLabel || "label"],
                                          value:
                                            option[item.optionValue || "value"],
                                          disabled: option.disabled,
                                        },
                                      })
                                    }),
                                    1
                                  )
                                : item.type === "cascader"
                                ? _c(
                                    "el-cascader",
                                    _vm._g(
                                      _vm._b(
                                        {
                                          attrs: {
                                            placeholder:
                                              item.placeholder ||
                                              "请选择" + item.label,
                                            options: item.options,
                                            props: item.cascaderProps,
                                            clearable: item.clearable !== false,
                                            disabled: item.disabled,
                                            filterable: item.filterable,
                                            "show-all-levels":
                                              item.showAllLevels !== false,
                                          },
                                          model: {
                                            value: _vm.searchData[item.prop],
                                            callback: function ($$v) {
                                              _vm.$set(
                                                _vm.searchData,
                                                item.prop,
                                                $$v
                                              );
                                            },
                                            expression: "searchData[item.prop]",
                                          },
                                        },
                                        "el-cascader",
                                        item.attrs,
                                        false
                                      ),
                                      item.listeners || {}
                                    )
                                  )
                                : item.type === "date"
                                ? _c(
                                    "el-date-picker",
                                    _vm._g(
                                      _vm._b(
                                        {
                                          attrs: {
                                            type: item.dateType || "date",
                                            placeholder:
                                              item.placeholder ||
                                              "请选择" + item.label,
                                            clearable: item.clearable !== false,
                                            disabled: item.disabled,
                                            format: item.format,
                                            "value-format": item.valueFormat,
                                            "picker-options": item.pickerOptions,
                                            "range-separator":
                                              item.rangeSeparator || "至",
                                            "start-placeholder":
                                              item.startPlaceholder || "开始日期",
                                            "end-placeholder":
                                              item.endPlaceholder || "结束日期",
                                          },
                                          model: {
                                            value: _vm.searchData[item.prop],
                                            callback: function ($$v) {
                                              _vm.$set(
                                                _vm.searchData,
                                                item.prop,
                                                $$v
                                              );
                                            },
                                            expression: "searchData[item.prop]",
                                          },
                                        },
                                        "el-date-picker",
                                        item.attrs,
                                        false
                                      ),
                                      item.listeners || {}
                                    )
                                  )
                                : item.type === "time"
                                ? _c(
                                    "el-time-picker",
                                    _vm._g(
                                      _vm._b(
                                        {
                                          attrs: {
                                            placeholder:
                                              item.placeholder ||
                                              "请选择" + item.label,
                                            clearable: item.clearable !== false,
                                            disabled: item.disabled,
                                            format: item.format,
                                            "value-format": item.valueFormat,
                                            "picker-options": item.pickerOptions,
                                            "is-range": item.isRange,
                                            "range-separator":
                                              item.rangeSeparator || "至",
                                            "start-placeholder":
                                              item.startPlaceholder || "开始时间",
                                            "end-placeholder":
                                              item.endPlaceholder || "结束时间",
                                          },
                                          model: {
                                            value: _vm.searchData[item.prop],
                                            callback: function ($$v) {
                                              _vm.$set(
                                                _vm.searchData,
                                                item.prop,
                                                $$v
                                              );
                                            },
                                            expression: "searchData[item.prop]",
                                          },
                                        },
                                        "el-time-picker",
                                        item.attrs,
                                        false
                                      ),
                                      item.listeners || {}
                                    )
                                  )
                                : item.type === "slot"
                                ? _vm._t(item.slotName, null, {
                                    data: _vm.searchData,
                                    item: item,
                                  })
                                : _vm._e(),
                            ],
                            2
                          )
                        : _vm._e(),
                    ],
                    1
                  )
                }),
                _vm._v(" "),
                _c(
                  "el-col",
                  {
                    attrs: {
                      span: _vm.btnSpan || _vm.defaultSpan,
                      xs: _vm.btnXs || 24,
                      sm: _vm.btnSm,
                      md: _vm.btnMd,
                      lg: _vm.btnLg,
                      xl: _vm.btnXl,
                    },
                  },
                  [
                    _c(
                      "el-form-item",
                      {
                        staticClass: "z-search-form-btns",
                        attrs: { "label-width": _vm.btnLabelWidth || "0px" },
                      },
                      [
                        _vm._t(
                          "buttons",
                          function () {
                            return [
                              _vm.showSearch &&
                              _vm.checkButtonPermission("search")
                                ? _c(
                                    "el-button",
                                    {
                                      attrs: {
                                        type: "primary",
                                        size: _vm.size,
                                        icon: _vm.searchIcon,
                                        loading: _vm.searchLoading,
                                      },
                                      on: { click: _vm.handleSearch },
                                    },
                                    [
                                      _vm._v(
                                        "\n              " +
                                          _vm._s(_vm.searchText) +
                                          "\n            "
                                      ),
                                    ]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.showReset && _vm.checkButtonPermission("reset")
                                ? _c(
                                    "el-button",
                                    {
                                      attrs: {
                                        size: _vm.size,
                                        icon: _vm.resetIcon,
                                      },
                                      on: { click: _vm.handleReset },
                                    },
                                    [
                                      _vm._v(
                                        "\n              " +
                                          _vm._s(_vm.resetText) +
                                          "\n            "
                                      ),
                                    ]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _vm.collapsible &&
                              _vm.searchItems.length > _vm.collapseCount
                                ? _c(
                                    "el-button",
                                    {
                                      attrs: { type: "text", size: _vm.size },
                                      on: { click: _vm.toggleCollapse },
                                    },
                                    [
                                      _vm._v(
                                        "\n              " +
                                          _vm._s(
                                            _vm.collapsed ? "展开" : "收起"
                                          ) +
                                          "\n              "
                                      ),
                                      _c("i", {
                                        class: _vm.collapsed
                                          ? "el-icon-arrow-down"
                                          : "el-icon-arrow-up",
                                      }),
                                    ]
                                  )
                                : _vm._e(),
                            ]
                          },
                          { searchData: _vm.searchData }
                        ),
                      ],
                      2
                    ),
                  ],
                  1
                ),
              ],
              2
            ),
          ],
          1
        ),
      ],
      1
    )
  };
  var __vue_staticRenderFns__$8 = [];
  __vue_render__$8._withStripped = true;

    /* style */
    const __vue_inject_styles__$8 = undefined;
    /* scoped */
    const __vue_scope_id__$8 = "data-v-07e46fe8";
    /* module identifier */
    const __vue_module_identifier__$8 = undefined;
    /* functional template */
    const __vue_is_functional_template__$8 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$8 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
      __vue_inject_styles__$8,
      __vue_script__$8,
      __vue_scope_id__$8,
      __vue_is_functional_template__$8,
      __vue_module_identifier__$8,
      false,
      undefined,
      undefined,
      undefined
    );

  // packages/components/src/search-form/index.js

  __vue_component__$8.install = function(Vue) {
    Vue.component(__vue_component__$8.name, __vue_component__$8);
  };

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$7 = {
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
        const rows = [];
        let currentRow = [];
        let currentColSpan = 0;

        this.items.forEach(item => {
          if (item.hidden) return

          const span = item.span || 1;
          const realSpan = Math.min(span, this.column);

          // 如果当前行放不下，开启新行
          if (currentColSpan + realSpan > this.column) {
            // 填充当前行剩余空间
            if (currentColSpan < this.column) {
              const lastItem = currentRow[currentRow.length - 1];
              if (lastItem && !lastItem.isLabel) {
                lastItem.colspan = (lastItem.colspan || 1) + (this.column - currentColSpan);
              }
            }
            rows.push(currentRow);
            currentRow = [];
            currentColSpan = 0;
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
          });

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
          });

          currentColSpan += realSpan;
        });

        // 处理最后一行
        if (currentRow.length > 0) {
          if (currentColSpan < this.column) {
            const lastItem = currentRow[currentRow.length - 1];
            if (lastItem && !lastItem.isLabel) {
              lastItem.colspan = (lastItem.colspan || 1) + (this.column - currentColSpan) * 2;
            }
          }
          rows.push(currentRow);
        }

        return rows
      }
    },
    methods: {
      // 获取项的值
      getItemValue(item) {
        if (!item.prop) return ''
        const value = this.data[item.prop];
        if (item.formatter) {
          return item.formatter(value, this.data)
        }
        return value === undefined || value === null ? '' : value
      }
    }
  };

  var css_248z$7 = "\n.z-descriptions[data-v-d3702bb0] {\r\n  box-sizing: border-box;\r\n  font-size: 14px;\r\n  color: #606266;\n}\n.z-descriptions-header[data-v-d3702bb0] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin-bottom: 20px;\n}\n.z-descriptions-title[data-v-d3702bb0] {\r\n  font-size: 16px;\r\n  font-weight: bold;\r\n  color: #303133;\n}\n.z-descriptions-extra[data-v-d3702bb0] {\r\n  margin-left: auto;\n}\n.z-descriptions-body[data-v-d3702bb0] {\r\n  color: #606266;\r\n  background-color: #fff;\n}\n.z-descriptions-table[data-v-d3702bb0] {\r\n  width: 100%;\r\n  table-layout: fixed;\r\n  border-collapse: collapse;\n}\n.z-descriptions-item-label[data-v-d3702bb0] {\r\n  font-weight: bold;\r\n  color: #909399;\r\n  background-color: #fafafa;\r\n  padding: 12px 10px;\r\n  vertical-align: middle;\r\n  word-break: break-all;\n}\n.z-descriptions-item-content[data-v-d3702bb0] {\r\n  color: #606266;\r\n  background-color: #fff;\r\n  padding: 12px 10px;\r\n  vertical-align: middle;\r\n  word-break: break-all;\n}\r\n\r\n/* 带边框样式 */\n.is-bordered .z-descriptions-item-label[data-v-d3702bb0],\r\n.is-bordered .z-descriptions-item-content[data-v-d3702bb0] {\r\n  border: 1px solid #ebeef5;\n}\r\n\r\n/* 尺寸 */\n.z-descriptions-table.is-medium .z-descriptions-item-label[data-v-d3702bb0],\r\n.z-descriptions-table.is-medium .z-descriptions-item-content[data-v-d3702bb0] {\r\n  padding: 12px 10px;\n}\n.z-descriptions-table.is-small .z-descriptions-item-label[data-v-d3702bb0],\r\n.z-descriptions-table.is-small .z-descriptions-item-content[data-v-d3702bb0] {\r\n  padding: 8px 10px;\r\n  font-size: 13px;\n}\n.z-descriptions-table.is-mini .z-descriptions-item-label[data-v-d3702bb0],\r\n.z-descriptions-table.is-mini .z-descriptions-item-content[data-v-d3702bb0] {\r\n  padding: 6px 10px;\r\n  font-size: 12px;\n}\r\n";
  styleInject(css_248z$7);

  /* script */
  const __vue_script__$7 = script$7;
  /* template */
  var __vue_render__$7 = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "z-descriptions", class: { "is-bordered": _vm.border } },
      [
        _vm.title || _vm.$slots.title || _vm.$slots.extra
          ? _c("div", { staticClass: "z-descriptions-header" }, [
              _c(
                "div",
                { staticClass: "z-descriptions-title" },
                [
                  _vm._t("title", function () {
                    return [_vm._v(_vm._s(_vm.title))]
                  }),
                ],
                2
              ),
              _vm._v(" "),
              _vm.$slots.extra
                ? _c(
                    "div",
                    { staticClass: "z-descriptions-extra" },
                    [_vm._t("extra")],
                    2
                  )
                : _vm._e(),
            ])
          : _vm._e(),
        _vm._v(" "),
        _c("div", { staticClass: "z-descriptions-body" }, [
          _c("table", { class: "z-descriptions-table is-" + _vm.size }, [
            _c(
              "tbody",
              _vm._l(_vm.tableData, function (row, rowIndex) {
                return _c(
                  "tr",
                  { key: rowIndex },
                  _vm._l(row, function (item, colIndex) {
                    return _c(
                      "td",
                      {
                        key:
                          (item.isLabel ? "label" : "content") + "-" + colIndex,
                        class: [
                          item.isLabel
                            ? "z-descriptions-item-label"
                            : "z-descriptions-item-content",
                          item.isLabel
                            ? item.labelClassName
                            : item.contentClassName,
                        ],
                        style: item.isLabel ? item.labelStyle : item.contentStyle,
                        attrs: { colspan: item.colspan || 1 },
                      },
                      [
                        item.isLabel
                          ? [
                              item.labelSlot
                                ? _vm._t(item.labelSlot, function () {
                                    return [
                                      _vm._v(
                                        "\n                " +
                                          _vm._s(item.label) +
                                          "\n              "
                                      ),
                                    ]
                                  })
                                : [_vm._v(_vm._s(item.label))],
                            ]
                          : [
                              item.slot
                                ? _vm._t(
                                    item.slot,
                                    function () {
                                      return [
                                        _vm._v(
                                          "\n                " +
                                            _vm._s(_vm.getItemValue(item)) +
                                            "\n              "
                                        ),
                                      ]
                                    },
                                    { data: _vm.data, item: item }
                                  )
                                : [_vm._v(_vm._s(_vm.getItemValue(item)))],
                            ],
                      ],
                      2
                    )
                  }),
                  0
                )
              }),
              0
            ),
          ]),
        ]),
      ]
    )
  };
  var __vue_staticRenderFns__$7 = [];
  __vue_render__$7._withStripped = true;

    /* style */
    const __vue_inject_styles__$7 = undefined;
    /* scoped */
    const __vue_scope_id__$7 = "data-v-d3702bb0";
    /* module identifier */
    const __vue_module_identifier__$7 = undefined;
    /* functional template */
    const __vue_is_functional_template__$7 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$7 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
      __vue_inject_styles__$7,
      __vue_script__$7,
      __vue_scope_id__$7,
      __vue_is_functional_template__$7,
      __vue_module_identifier__$7,
      false,
      undefined,
      undefined,
      undefined
    );

  // packages/components/src/descriptions/index.js

  __vue_component__$7.install = function(Vue) {
    Vue.component(__vue_component__$7.name, __vue_component__$7);
  };

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$6 = {
    name: 'ZCard',
    props: {
      // 标题
      title: {
        type: String,
        default: ''
      },
      // 标题图标
      icon: {
        type: String,
        default: ''
      },
      // 是否显示头部
      showHeader: {
        type: Boolean,
        default: true
      },
      // 阴影显示时机
      shadow: {
        type: String,
        default: 'always',
        validator: val => ['always', 'hover', 'never'].includes(val)
      },
      // 卡片样式
      bodyStyle: {
        type: Object,
        default: () => ({})
      },
      // 是否显示边框
      border: {
        type: Boolean,
        default: true
      },
      // 加载状态
      loading: {
        type: Boolean,
        default: false
      },
      // 加载文案
      loadingText: {
        type: String,
        default: '加载中...'
      }
    },
    computed: {
      cardClass() {
        return {
          [`is-${this.shadow}-shadow`]: true,
          'is-no-border': !this.border
        }
      },
      cardStyle() {
        return {}
      }
    }
  };

  var css_248z$6 = "\n.z-card[data-v-288a569c] {\r\n  border-radius: 4px;\r\n  border: 1px solid #ebeef5;\r\n  background-color: #fff;\r\n  overflow: hidden;\r\n  color: #303133;\r\n  transition: 0.3s;\n}\n.z-card.is-no-border[data-v-288a569c] {\r\n  border: none;\n}\n.z-card.is-always-shadow[data-v-288a569c] {\r\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n}\n.z-card.is-hover-shadow[data-v-288a569c]:hover {\r\n  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n}\n.z-card.is-never-shadow[data-v-288a569c] {\r\n  box-shadow: none;\n}\n.z-card-header[data-v-288a569c] {\r\n  padding: 18px 20px;\r\n  border-bottom: 1px solid #ebeef5;\r\n  box-sizing: border-box;\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\n}\n.z-card-header-title[data-v-288a569c] {\r\n  display: flex;\r\n  align-items: center;\r\n  font-size: 16px;\r\n  font-weight: bold;\r\n  color: #303133;\n}\n.z-card-header-icon[data-v-288a569c] {\r\n  margin-right: 8px;\r\n  font-size: 18px;\n}\n.z-card-header-extra[data-v-288a569c] {\r\n  margin-left: auto;\n}\n.z-card-body[data-v-288a569c] {\r\n  padding: 20px;\n}\n.z-card-footer[data-v-288a569c] {\r\n  padding: 18px 20px;\r\n  border-top: 1px solid #ebeef5;\r\n  box-sizing: border-box;\n}\r\n";
  styleInject(css_248z$6);

  /* script */
  const __vue_script__$6 = script$6;
  /* template */
  var __vue_render__$6 = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "z-card", class: _vm.cardClass, style: _vm.cardStyle },
      [
        _vm.showHeader
          ? _c(
              "div",
              { staticClass: "z-card-header" },
              [
                _vm._t("header", function () {
                  return [
                    _c("div", { staticClass: "z-card-header-title" }, [
                      _vm.icon
                        ? _c("i", {
                            staticClass: "z-card-header-icon",
                            class: _vm.icon,
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _c("span", [_vm._v(_vm._s(_vm.title))]),
                    ]),
                    _vm._v(" "),
                    _vm.$slots.extra
                      ? _c(
                          "div",
                          { staticClass: "z-card-header-extra" },
                          [_vm._t("extra")],
                          2
                        )
                      : _vm._e(),
                  ]
                }),
              ],
              2
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "loading",
                rawName: "v-loading",
                value: _vm.loading,
                expression: "loading",
              },
            ],
            staticClass: "z-card-body",
            style: _vm.bodyStyle,
            attrs: { "element-loading-text": _vm.loadingText },
          },
          [_vm._t("default")],
          2
        ),
        _vm._v(" "),
        _vm.$slots.footer
          ? _c("div", { staticClass: "z-card-footer" }, [_vm._t("footer")], 2)
          : _vm._e(),
      ]
    )
  };
  var __vue_staticRenderFns__$6 = [];
  __vue_render__$6._withStripped = true;

    /* style */
    const __vue_inject_styles__$6 = undefined;
    /* scoped */
    const __vue_scope_id__$6 = "data-v-288a569c";
    /* module identifier */
    const __vue_module_identifier__$6 = undefined;
    /* functional template */
    const __vue_is_functional_template__$6 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$6 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
      __vue_inject_styles__$6,
      __vue_script__$6,
      __vue_scope_id__$6,
      __vue_is_functional_template__$6,
      __vue_module_identifier__$6,
      false,
      undefined,
      undefined,
      undefined
    );

  // packages/components/src/card/index.js

  __vue_component__$6.install = function(Vue) {
    Vue.component(__vue_component__$6.name, __vue_component__$6);
  };

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$5 = {
    name: 'ZPageHeader',
    props: {
      // 标题
      title: {
        type: String,
        default: ''
      },
      // 副标题
      subtitle: {
        type: String,
        default: ''
      },
      // 标题图标
      icon: {
        type: String,
        default: ''
      },
      // 是否显示返回按钮
      showBack: {
        type: Boolean,
        default: false
      },
      // 返回按钮文本
      backText: {
        type: String,
        default: ''
      },
      // 返回按钮图标
      backIcon: {
        type: String,
        default: 'el-icon-back'
      },
      // 是否显示面包屑
      showBreadcrumb: {
        type: Boolean,
        default: false
      },
      // 面包屑数据
      breadcrumbItems: {
        type: Array,
        default: () => []
      },
      // 面包屑分隔符
      breadcrumbSeparator: {
        type: String,
        default: '/'
      },
      // 面包屑分隔符图标
      breadcrumbSeparatorClass: {
        type: String,
        default: ''
      },
      // 标签
      tags: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      // 返回
      handleBack() {
        this.$emit('back');
        // 如果没有监听 back 事件，默认执行路由返回
        if (!this.$listeners.back) {
          this.$router && this.$router.back();
        }
      }
    }
  };

  var css_248z$5 = "\n.z-page-header[data-v-0bddbaac] {\r\n  background-color: #fff;\r\n  padding: 16px 20px;\r\n  margin-bottom: 16px;\n}\n.z-page-header-breadcrumb[data-v-0bddbaac] {\r\n  margin-bottom: 16px;\n}\n.z-page-header-content[data-v-0bddbaac] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\n}\n.z-page-header-back[data-v-0bddbaac] {\r\n  display: flex;\r\n  align-items: center;\r\n  cursor: pointer;\r\n  color: #409eff;\r\n  font-size: 14px;\r\n  transition: color 0.3s;\n}\n.z-page-header-back[data-v-0bddbaac]:hover {\r\n  color: #66b1ff;\n}\n.z-page-header-back i[data-v-0bddbaac] {\r\n  font-size: 16px;\r\n  margin-right: 4px;\n}\n.z-page-header-title-wrapper[data-v-0bddbaac] {\r\n  flex: 1;\n}\n.z-page-header-title[data-v-0bddbaac] {\r\n  display: flex;\r\n  align-items: center;\r\n  font-size: 20px;\r\n  font-weight: bold;\r\n  color: #303133;\r\n  line-height: 28px;\n}\n.z-page-header-icon[data-v-0bddbaac] {\r\n  margin-right: 8px;\r\n  font-size: 22px;\n}\n.z-page-header-subtitle[data-v-0bddbaac] {\r\n  margin-top: 4px;\r\n  font-size: 14px;\r\n  color: #909399;\r\n  line-height: 22px;\n}\n.z-page-header-tags[data-v-0bddbaac] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\n}\n.z-page-header-extra[data-v-0bddbaac] {\r\n  margin-left: auto;\n}\n.z-page-header-main[data-v-0bddbaac] {\r\n  margin-top: 16px;\r\n  padding-top: 16px;\r\n  border-top: 1px solid #ebeef5;\n}\n.z-page-header-footer[data-v-0bddbaac] {\r\n  margin-top: 16px;\r\n  padding-top: 16px;\r\n  border-top: 1px solid #ebeef5;\n}\r\n";
  styleInject(css_248z$5);

  /* script */
  const __vue_script__$5 = script$5;
  /* template */
  var __vue_render__$5 = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "z-page-header" }, [
      _vm.showBreadcrumb && _vm.breadcrumbItems.length > 0
        ? _c(
            "div",
            { staticClass: "z-page-header-breadcrumb" },
            [
              _c(
                "el-breadcrumb",
                {
                  attrs: {
                    separator: _vm.breadcrumbSeparator,
                    "separator-class": _vm.breadcrumbSeparatorClass,
                  },
                },
                _vm._l(_vm.breadcrumbItems, function (item, index) {
                  return _c(
                    "el-breadcrumb-item",
                    { key: index, attrs: { to: item.to } },
                    [
                      item.icon ? _c("i", { class: item.icon }) : _vm._e(),
                      _vm._v("\n        " + _vm._s(item.label) + "\n      "),
                    ]
                  )
                }),
                1
              ),
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "z-page-header-content" }, [
        _vm.showBack
          ? _c(
              "div",
              {
                staticClass: "z-page-header-back",
                on: { click: _vm.handleBack },
              },
              [
                _c("i", { class: _vm.backIcon }),
                _vm._v(" "),
                _vm.backText
                  ? _c("span", [_vm._v(_vm._s(_vm.backText))])
                  : _vm._e(),
              ]
            )
          : _vm._e(),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "z-page-header-title-wrapper" },
          [
            _vm._t("title", function () {
              return [
                _c("div", { staticClass: "z-page-header-title" }, [
                  _vm.icon
                    ? _c("i", {
                        staticClass: "z-page-header-icon",
                        class: _vm.icon,
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _c("span", { staticClass: "z-page-header-title-text" }, [
                    _vm._v(_vm._s(_vm.title)),
                  ]),
                ]),
                _vm._v(" "),
                _vm.subtitle
                  ? _c("div", { staticClass: "z-page-header-subtitle" }, [
                      _vm._v(
                        "\n          " + _vm._s(_vm.subtitle) + "\n        "
                      ),
                    ])
                  : _vm._e(),
              ]
            }),
          ],
          2
        ),
        _vm._v(" "),
        _vm.tags && _vm.tags.length > 0
          ? _c(
              "div",
              { staticClass: "z-page-header-tags" },
              _vm._l(_vm.tags, function (tag, index) {
                return _c(
                  "el-tag",
                  {
                    key: index,
                    attrs: {
                      type: tag.type,
                      size: tag.size || "small",
                      effect: tag.effect || "light",
                    },
                  },
                  [_vm._v("\n        " + _vm._s(tag.label) + "\n      ")]
                )
              }),
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.$slots.extra
          ? _c(
              "div",
              { staticClass: "z-page-header-extra" },
              [_vm._t("extra")],
              2
            )
          : _vm._e(),
      ]),
      _vm._v(" "),
      _vm.$slots.content
        ? _c("div", { staticClass: "z-page-header-main" }, [_vm._t("content")], 2)
        : _vm._e(),
      _vm._v(" "),
      _vm.$slots.footer
        ? _c(
            "div",
            { staticClass: "z-page-header-footer" },
            [_vm._t("footer")],
            2
          )
        : _vm._e(),
    ])
  };
  var __vue_staticRenderFns__$5 = [];
  __vue_render__$5._withStripped = true;

    /* style */
    const __vue_inject_styles__$5 = undefined;
    /* scoped */
    const __vue_scope_id__$5 = "data-v-0bddbaac";
    /* module identifier */
    const __vue_module_identifier__$5 = undefined;
    /* functional template */
    const __vue_is_functional_template__$5 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$5 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
      __vue_inject_styles__$5,
      __vue_script__$5,
      __vue_scope_id__$5,
      __vue_is_functional_template__$5,
      __vue_module_identifier__$5,
      false,
      undefined,
      undefined,
      undefined
    );

  // packages/components/src/page-header/index.js

  __vue_component__$5.install = function(Vue) {
    Vue.component(__vue_component__$5.name, __vue_component__$5);
  };

  //
  //
  //
  //
  //

  var script$4 = {
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
            this.setOption(newVal);
          }
        },
        deep: true
      },
      loading(val) {
        if (!this.chart) return
        if (val) {
          this.showLoading();
        } else {
          this.hideLoading();
        }
      },
      group(val) {
        if (!this.chart) return
        this.chart.group = val;
      }
    },
    mounted() {
      this.initChart();
    },
    beforeDestroy() {
      this.dispose();
    },
    methods: {
      // 初始化图表
      initChart() {
        if (!this.$refs.chartContainer) return

        // 检查是否已加载 echarts
        if (!window.echarts) {
          console.error('ECharts is not loaded. Please import echarts before using ZChart component.');
          this.$emit('error', new Error('ECharts not found'));
          return
        }

        try {
          // 初始化 echarts 实例
          this.chart = window.echarts.init(
            this.$refs.chartContainer,
            this.theme,
            this.initOptions
          );

          // 设置配置项
          if (this.option) {
            this.setOption(this.option);
          }

          // 设置 group
          if (this.group) {
            this.chart.group = this.group;
          }

          // 设置加载状态
          if (this.loading) {
            this.showLoading();
          }

          // 绑定事件
          this.bindEvents();

          // 设置自动 resize
          if (this.autoResize) {
            this.enableAutoResize();
          }

          this.$emit('chart-ready', this.chart);
        } catch (error) {
          console.error('Failed to initialize chart:', error);
          this.$emit('error', error);
        }
      },

      // 设置配置项
      setOption(option, opts) {
        if (!this.chart) return

        const options = opts || {
          notMerge: this.notMerge,
          lazyUpdate: this.lazyUpdate
        };

        try {
          this.chart.setOption(option, options);
          this.$emit('option-set');
        } catch (error) {
          console.error('Failed to set option:', error);
          this.$emit('error', error);
        }
      },

      // 显示加载动画
      showLoading(options) {
        if (!this.chart) return
        this.chart.showLoading(options || this.loadingOptions);
      },

      // 隐藏加载动画
      hideLoading() {
        if (!this.chart) return
        this.chart.hideLoading();
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
        ];

        events.forEach(event => {
          this.chart.on(event, (params) => {
            this.$emit(event, params);
          });
        });
      },

      // 启用自动 resize
      enableAutoResize() {
        if (!this.$refs.chartContainer || !this.chart) return

        // 使用 ResizeObserver 监听容器大小变化
        if (window.ResizeObserver) {
          this.resizeObserver = new ResizeObserver(() => {
            this.resize();
          });
          this.resizeObserver.observe(this.$refs.chartContainer);
        } else {
          // 降级方案：监听 window resize
          window.addEventListener('resize', this.resize);
        }
      },

      // 禁用自动 resize
      disableAutoResize() {
        if (this.resizeObserver) {
          this.resizeObserver.disconnect();
          this.resizeObserver = null;
        } else {
          window.removeEventListener('resize', this.resize);
        }
      },

      // 调整图表大小
      resize(opts) {
        if (!this.chart) return
        this.chart.resize(opts);
      },

      // 清空图表
      clear() {
        if (!this.chart) return
        this.chart.clear();
      },

      // 销毁图表
      dispose() {
        if (this.autoResize) {
          this.disableAutoResize();
        }

        if (this.chart) {
          this.chart.dispose();
          this.chart = null;
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
        this.chart.appendData(opts);
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
        this.chart.dispatchAction(payload);
      },

      // 动态设置图表配置项（手动更新模式）
      mergeOptions(option) {
        if (!this.chart) return
        this.setOption(option, { notMerge: false });
      },

      // 刷新图表
      refresh() {
        if (!this.chart) return
        this.clear();
        this.setOption(this.option);
      }
    }
  };

  var css_248z$4 = "\n.z-chart[data-v-4561ef7a] {\r\n  min-height: 100px;\n}\r\n";
  styleInject(css_248z$4);

  /* script */
  const __vue_script__$4 = script$4;
  /* template */
  var __vue_render__$4 = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", {
      ref: "chartContainer",
      staticClass: "z-chart",
      style: _vm.containerStyle,
    })
  };
  var __vue_staticRenderFns__$4 = [];
  __vue_render__$4._withStripped = true;

    /* style */
    const __vue_inject_styles__$4 = undefined;
    /* scoped */
    const __vue_scope_id__$4 = "data-v-4561ef7a";
    /* module identifier */
    const __vue_module_identifier__$4 = undefined;
    /* functional template */
    const __vue_is_functional_template__$4 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$4 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
      __vue_inject_styles__$4,
      __vue_script__$4,
      __vue_scope_id__$4,
      __vue_is_functional_template__$4,
      __vue_module_identifier__$4,
      false,
      undefined,
      undefined,
      undefined
    );

  // packages/components/src/chart/index.js

  __vue_component__$4.install = function(Vue) {
    Vue.component(__vue_component__$4.name, __vue_component__$4);
  };

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$3 = {
    name: 'ZUpload',
    props: {
      // 上传地址
      action: {
        type: String,
        default: ''
      },
      // 请求头
      headers: {
        type: Object,
        default: () => ({})
      },
      // 上传时附带的额外参数
      data: {
        type: Object,
        default: () => ({})
      },
      // 上传的文件字段名
      name: {
        type: String,
        default: 'file'
      },
      // 支持发送 cookie 凭证信息
      withCredentials: {
        type: Boolean,
        default: false
      },
      // 是否支持多选
      multiple: {
        type: Boolean,
        default: false
      },
      // 接受的文件类型
      accept: {
        type: String,
        default: ''
      },
      // 文件列表的类型
      listType: {
        type: String,
        default: 'text',
        validator: val => ['text', 'picture', 'picture-card'].includes(val)
      },
      // 是否自动上传
      autoUpload: {
        type: Boolean,
        default: true
      },
      // 已上传的文件列表
      fileList: {
        type: Array,
        default: () => []
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 最大上传数量
      limit: {
        type: Number,
        default: undefined
      },
      // 是否启用拖拽上传
      drag: {
        type: Boolean,
        default: false
      },
      // 拖拽区域文字
      dragText: {
        type: String,
        default: ''
      },
      // 提示文字
      tip: {
        type: String,
        default: ''
      },
      // 按钮文字
      buttonText: {
        type: String,
        default: '点击上传'
      },
      // 按钮类型
      buttonType: {
        type: String,
        default: 'primary'
      },
      // 按钮图标
      buttonIcon: {
        type: String,
        default: 'el-icon-upload2'
      },
      // 按钮尺寸
      size: {
        type: String,
        default: 'small'
      },
      // 文件大小限制（MB）
      maxSize: {
        type: Number,
        default: undefined
      },
      // 允许的文件类型
      allowedTypes: {
        type: Array,
        default: () => []
      },
      // 自定义上传方法
      httpRequest: {
        type: Function,
        default: undefined
      },
      // 上传前的钩子
      beforeUpload: {
        type: Function,
        default: undefined
      },
      // 是否显示图片预览
      showPreview: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        previewVisible: false,
        previewUrl: ''
      }
    },
    methods: {
      // 上传前的钩子
      handleBeforeUpload(file) {
        // 自定义 beforeUpload
        if (this.beforeUpload) {
          const result = this.beforeUpload(file);
          if (result === false) {
            return false
          }
        }

        // 检查文件大小
        if (this.maxSize) {
          const isLtMaxSize = file.size / 1024 / 1024 < this.maxSize;
          if (!isLtMaxSize) {
            this.$message.error(`上传文件大小不能超过 ${this.maxSize}MB!`);
            return false
          }
        }

        // 检查文件类型
        if (this.allowedTypes.length > 0) {
          const fileType = file.name.substring(file.name.lastIndexOf('.') + 1);
          const isAllowedType = this.allowedTypes.includes(fileType.toLowerCase());
          if (!isAllowedType) {
            this.$message.error(`只允许上传 ${this.allowedTypes.join('、')} 格式的文件!`);
            return false
          }
        }

        this.$emit('before-upload', file);
        return true
      },

      // 预览
      handlePreview(file) {
        if (this.showPreview && this.listType.includes('picture')) {
          this.previewUrl = file.url;
          this.previewVisible = true;
        }
        this.$emit('preview', file);
      },

      // 移除文件
      handleRemove(file, fileList) {
        this.$emit('remove', file, fileList);
        this.$emit('update:fileList', fileList);
      },

      // 上传成功
      handleSuccess(response, file, fileList) {
        this.$emit('success', response, file, fileList);
        this.$emit('update:fileList', fileList);
      },

      // 上传失败
      handleError(err, file, fileList) {
        this.$message.error('上传失败，请重试!');
        this.$emit('error', err, file, fileList);
      },

      // 上传进度
      handleProgress(event, file, fileList) {
        this.$emit('progress', event, file, fileList);
      },

      // 文件状态改变
      handleChange(file, fileList) {
        this.$emit('change', file, fileList);
        this.$emit('update:fileList', fileList);
      },

      // 超出限制
      handleExceed(files, fileList) {
        this.$message.warning(`最多只能上传 ${this.limit} 个文件!`);
        this.$emit('exceed', files, fileList);
      },

      // 清空已上传的文件列表
      clearFiles() {
        this.$refs.upload.clearFiles();
      },

      // 手动上传
      submit() {
        this.$refs.upload.submit();
      },

      // 取消上传
      abort(file) {
        this.$refs.upload.abort(file);
      }
    }
  };

  var css_248z$3 = "\n.z-upload[data-v-946ca08a] {\r\n  width: 100%;\n}\r\n";
  styleInject(css_248z$3);

  /* script */
  const __vue_script__$3 = script$3;
  /* template */
  var __vue_render__$3 = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "z-upload" },
      [
        _c(
          "el-upload",
          _vm._b(
            {
              ref: "upload",
              attrs: {
                action: _vm.action,
                headers: _vm.headers,
                data: _vm.data,
                name: _vm.name,
                "with-credentials": _vm.withCredentials,
                multiple: _vm.multiple,
                accept: _vm.accept,
                "list-type": _vm.listType,
                "auto-upload": _vm.autoUpload,
                "file-list": _vm.fileList,
                disabled: _vm.disabled,
                limit: _vm.limit,
                drag: _vm.drag,
                "before-upload": _vm.handleBeforeUpload,
                "on-preview": _vm.handlePreview,
                "on-remove": _vm.handleRemove,
                "on-success": _vm.handleSuccess,
                "on-error": _vm.handleError,
                "on-progress": _vm.handleProgress,
                "on-change": _vm.handleChange,
                "on-exceed": _vm.handleExceed,
                "http-request": _vm.httpRequest,
              },
            },
            "el-upload",
            _vm.$attrs,
            false
          ),
          [
            _vm._t("default", function () {
              return [
                _vm.drag
                  ? [
                      _c("i", { staticClass: "el-icon-upload" }),
                      _vm._v(" "),
                      _c("div", { staticClass: "el-upload__text" }, [
                        _vm._v("\n          {{ dragText || '将文件拖到此处，或"),
                        _c("em", [_vm._v("点击上传")]),
                        _vm._v("' }}\n        "),
                      ]),
                    ]
                  : _vm.listType === "picture-card"
                  ? [_c("i", { staticClass: "el-icon-plus" })]
                  : [
                      _c(
                        "el-button",
                        {
                          attrs: {
                            size: _vm.size,
                            type: _vm.buttonType,
                            icon: _vm.buttonIcon,
                          },
                        },
                        [
                          _vm._v(
                            "\n          " + _vm._s(_vm.buttonText) + "\n        "
                          ),
                        ]
                      ),
                    ],
              ]
            }),
            _vm._v(" "),
            _vm.tip
              ? _c(
                  "div",
                  {
                    staticClass: "el-upload__tip",
                    attrs: { slot: "tip" },
                    slot: "tip",
                  },
                  [_vm._v("\n      " + _vm._s(_vm.tip) + "\n    ")]
                )
              : _vm._e(),
          ],
          2
        ),
        _vm._v(" "),
        _c(
          "el-dialog",
          {
            attrs: {
              visible: _vm.previewVisible,
              "append-to-body": true,
              width: "800px",
              title: "图片预览",
            },
            on: {
              "update:visible": function ($event) {
                _vm.previewVisible = $event;
              },
            },
          },
          [
            _c("img", {
              staticStyle: { width: "100%" },
              attrs: { src: _vm.previewUrl },
            }),
          ]
        ),
      ],
      1
    )
  };
  var __vue_staticRenderFns__$3 = [];
  __vue_render__$3._withStripped = true;

    /* style */
    const __vue_inject_styles__$3 = undefined;
    /* scoped */
    const __vue_scope_id__$3 = "data-v-946ca08a";
    /* module identifier */
    const __vue_module_identifier__$3 = undefined;
    /* functional template */
    const __vue_is_functional_template__$3 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$3 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
      __vue_inject_styles__$3,
      __vue_script__$3,
      __vue_scope_id__$3,
      __vue_is_functional_template__$3,
      __vue_module_identifier__$3,
      false,
      undefined,
      undefined,
      undefined
    );

  // packages/components/src/upload/index.js

  __vue_component__$3.install = function(Vue) {
    Vue.component(__vue_component__$3.name, __vue_component__$3);
  };

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$2 = {
    name: 'ZImagePreview',
    props: {
      // 图片 URL 列表
      imageList: {
        type: Array,
        required: true,
        default: () => []
      },
      // 图片宽度
      width: {
        type: [String, Number],
        default: '100px'
      },
      // 图片高度
      height: {
        type: [String, Number],
        default: '100px'
      },
      // 图片如何适应容器
      fit: {
        type: String,
        default: 'cover',
        validator: val => ['fill', 'contain', 'cover', 'none', 'scale-down'].includes(val)
      },
      // 是否懒加载
      lazy: {
        type: Boolean,
        default: false
      },
      // 预览时的 z-index
      zIndex: {
        type: Number,
        default: 2000
      },
      // 是否显示遮罩层
      showMask: {
        type: Boolean,
        default: true
      },
      // 是否显示删除按钮
      showDelete: {
        type: Boolean,
        default: false
      },
      // 预览图片列表（如果不传则使用 imageList）
      previewSrcList: {
        type: Array,
        default: undefined
      }
    },
    computed: {
      itemStyle() {
        const width = typeof this.width === 'number' ? `${this.width}px` : this.width;
        const height = typeof this.height === 'number' ? `${this.height}px` : this.height;
        return {
          width,
          height
        }
      },
      previewList() {
        return this.previewSrcList || this.imageList
      }
    },
    methods: {
      // 预览图片
      handlePreview(index) {
        this.$emit('preview', index);
      },
      // 删除图片
      handleDelete(index) {
        this.$emit('delete', index);
      }
    }
  };

  var css_248z$2 = "\n.z-image-preview__list[data-v-6ae61e54] {\r\n  display: flex;\r\n  flex-wrap: wrap;\r\n  gap: 10px;\n}\n.z-image-preview__item[data-v-6ae61e54] {\r\n  position: relative;\r\n  border-radius: 4px;\r\n  overflow: hidden;\r\n  border: 1px solid #dcdfe6;\n}\n.z-image-preview__mask[data-v-6ae61e54] {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  background-color: rgba(0, 0, 0, 0.5);\r\n  opacity: 0;\r\n  transition: opacity 0.3s;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\n}\n.z-image-preview__item:hover .z-image-preview__mask[data-v-6ae61e54] {\r\n  opacity: 1;\n}\n.z-image-preview__actions i[data-v-6ae61e54] {\r\n  color: #fff;\r\n  font-size: 20px;\r\n  margin: 0 8px;\r\n  cursor: pointer;\r\n  transition: transform 0.3s;\n}\n.z-image-preview__actions i[data-v-6ae61e54]:hover {\r\n  transform: scale(1.2);\n}\n.image-slot[data-v-6ae61e54] {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-color: #f5f7fa;\r\n  color: #909399;\r\n  font-size: 30px;\n}\r\n";
  styleInject(css_248z$2);

  /* script */
  const __vue_script__$2 = script$2;
  /* template */
  var __vue_render__$2 = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "z-image-preview" }, [
      _c(
        "div",
        { staticClass: "z-image-preview__list" },
        _vm._l(_vm.imageList, function (url, index) {
          return _c(
            "div",
            {
              key: index,
              staticClass: "z-image-preview__item",
              style: _vm.itemStyle,
            },
            [
              _c(
                "el-image",
                {
                  staticStyle: { width: "100%", height: "100%" },
                  attrs: {
                    src: url,
                    fit: _vm.fit,
                    lazy: _vm.lazy,
                    "preview-src-list": _vm.previewList,
                    "z-index": _vm.zIndex,
                    "initial-index": index,
                  },
                },
                [
                  _c(
                    "div",
                    {
                      staticClass: "image-slot",
                      attrs: { slot: "placeholder" },
                      slot: "placeholder",
                    },
                    [_c("i", { staticClass: "el-icon-loading" })]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "image-slot",
                      attrs: { slot: "error" },
                      slot: "error",
                    },
                    [_c("i", { staticClass: "el-icon-picture-outline" })]
                  ),
                ]
              ),
              _vm._v(" "),
              _vm.showMask
                ? _c("div", { staticClass: "z-image-preview__mask" }, [
                    _c("span", { staticClass: "z-image-preview__actions" }, [
                      _c("i", {
                        staticClass: "el-icon-zoom-in",
                        on: {
                          click: function ($event) {
                            return _vm.handlePreview(index)
                          },
                        },
                      }),
                      _vm._v(" "),
                      _vm.showDelete
                        ? _c("i", {
                            staticClass: "el-icon-delete",
                            on: {
                              click: function ($event) {
                                return _vm.handleDelete(index)
                              },
                            },
                          })
                        : _vm._e(),
                    ]),
                  ])
                : _vm._e(),
            ],
            1
          )
        }),
        0
      ),
    ])
  };
  var __vue_staticRenderFns__$2 = [];
  __vue_render__$2._withStripped = true;

    /* style */
    const __vue_inject_styles__$2 = undefined;
    /* scoped */
    const __vue_scope_id__$2 = "data-v-6ae61e54";
    /* module identifier */
    const __vue_module_identifier__$2 = undefined;
    /* functional template */
    const __vue_is_functional_template__$2 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
      __vue_inject_styles__$2,
      __vue_script__$2,
      __vue_scope_id__$2,
      __vue_is_functional_template__$2,
      __vue_module_identifier__$2,
      false,
      undefined,
      undefined,
      undefined
    );

  // packages/components/src/image-preview/index.js

  __vue_component__$2.install = function(Vue) {
    Vue.component(__vue_component__$2.name, __vue_component__$2);
  };

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script$1 = {
    name: 'ZEmpty',
    props: {
      // 图片地址
      image: {
        type: String,
        default: ''
      },
      // 图片大小
      imageSize: {
        type: Number,
        default: undefined
      },
      // 描述文字
      description: {
        type: String,
        default: '暂无数据'
      },
      // 容器高度
      height: {
        type: [String, Number],
        default: undefined
      }
    },
    computed: {
      containerStyle() {
        if (this.height) {
          const height = typeof this.height === 'number' ? `${this.height}px` : this.height;
          return { height }
        }
        return {}
      },
      imageStyle() {
        if (this.imageSize) {
          return {
            width: `${this.imageSize}px`,
            height: `${this.imageSize}px`
          }
        }
        return {}
      }
    }
  };

  var css_248z$1 = "\n.z-empty[data-v-95b53582] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 40px 0;\r\n  min-height: 200px;\n}\n.z-empty__image[data-v-95b53582] {\r\n  width: 160px;\r\n  height: 160px;\r\n  margin-bottom: 20px;\n}\n.z-empty__image img[data-v-95b53582],\r\n.z-empty__image svg[data-v-95b53582] {\r\n  width: 100%;\r\n  height: 100%;\r\n  object-fit: contain;\n}\n.z-empty__description[data-v-95b53582] {\r\n  margin-bottom: 20px;\r\n  color: #909399;\r\n  font-size: 14px;\r\n  line-height: 1.5;\r\n  text-align: center;\n}\n.z-empty__bottom[data-v-95b53582] {\r\n  margin-top: 16px;\n}\r\n";
  styleInject(css_248z$1);

  /* script */
  const __vue_script__$1 = script$1;
  /* template */
  var __vue_render__$1 = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "z-empty", style: _vm.containerStyle }, [
      _c(
        "div",
        { staticClass: "z-empty__image", style: _vm.imageStyle },
        [
          _vm._t("image", function () {
            return [
              _vm.image
                ? _c("img", { attrs: { src: _vm.image, alt: "empty" } })
                : _c(
                    "svg",
                    {
                      attrs: {
                        viewBox: "0 0 79 86",
                        xmlns: "http://www.w3.org/2000/svg",
                      },
                    },
                    [
                      _c("path", {
                        attrs: {
                          d: "M60.5 86H18.5C8.85 86 1 78.15 1 68.5V17.5C1 7.85 8.85 0 18.5 0H60.5C70.15 0 78 7.85 78 17.5V68.5C78 78.15 70.15 86 60.5 86Z",
                          fill: "#F2F3F5",
                        },
                      }),
                      _vm._v(" "),
                      _c("path", {
                        attrs: {
                          d: "M39.5 44C46.4036 44 52 38.4036 52 31.5C52 24.5964 46.4036 19 39.5 19C32.5964 19 27 24.5964 27 31.5C27 38.4036 32.5964 44 39.5 44Z",
                          fill: "#D8D8D8",
                        },
                      }),
                      _vm._v(" "),
                      _c("path", {
                        attrs: {
                          d: "M23 69C23 57.9543 31.9543 49 43 49H46C57.0457 49 66 57.9543 66 69V77H23V69Z",
                          fill: "#D8D8D8",
                        },
                      }),
                    ]
                  ),
            ]
          }),
        ],
        2
      ),
      _vm._v(" "),
      _vm.$slots.description || _vm.description
        ? _c(
            "div",
            { staticClass: "z-empty__description" },
            [
              _vm._t("description", function () {
                return [_vm._v("\n      " + _vm._s(_vm.description) + "\n    ")]
              }),
            ],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.$slots.default
        ? _c("div", { staticClass: "z-empty__bottom" }, [_vm._t("default")], 2)
        : _vm._e(),
    ])
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    const __vue_inject_styles__$1 = undefined;
    /* scoped */
    const __vue_scope_id__$1 = "data-v-95b53582";
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      undefined,
      undefined,
      undefined
    );

  // packages/components/src/empty/index.js

  __vue_component__$1.install = function(Vue) {
    Vue.component(__vue_component__$1.name, __vue_component__$1);
  };

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
    name: 'ZSteps',
    props: {
      // 当前激活步骤
      active: {
        type: Number,
        default: 0
      },
      // 步骤配置数组
      steps: {
        type: Array,
        required: true,
        default: () => []
      },
      // 当前步骤的状态
      processStatus: {
        type: String,
        default: 'process',
        validator: val => ['wait', 'process', 'finish', 'error', 'success'].includes(val)
      },
      // 结束步骤的状态
      finishStatus: {
        type: String,
        default: 'finish',
        validator: val => ['wait', 'process', 'finish', 'error', 'success'].includes(val)
      },
      // 是否居中对齐
      alignCenter: {
        type: Boolean,
        default: false
      },
      // 显示方向
      direction: {
        type: String,
        default: 'horizontal',
        validator: val => ['horizontal', 'vertical'].includes(val)
      },
      // 每个 step 的间距
      space: {
        type: [Number, String],
        default: undefined
      },
      // 是否应用简洁风格
      simple: {
        type: Boolean,
        default: false
      },
      // 是否显示操作按钮
      showButtons: {
        type: Boolean,
        default: true
      },
      // 按钮尺寸
      buttonSize: {
        type: String,
        default: 'small'
      },
      // 上一步按钮文字
      prevText: {
        type: String,
        default: '上一步'
      },
      // 下一步按钮文字
      nextText: {
        type: String,
        default: '下一步'
      },
      // 提交按钮文字
      submitText: {
        type: String,
        default: '提交'
      },
      // 下一步按钮加载状态
      nextLoading: {
        type: Boolean,
        default: false
      },
      // 提交按钮加载状态
      submitLoading: {
        type: Boolean,
        default: false
      },
      // 点击下一步前的钩子
      beforeNext: {
        type: Function,
        default: undefined
      },
      // 点击上一步前的钩子
      beforePrev: {
        type: Function,
        default: undefined
      }
    },
    methods: {
      // 下一步
      async next() {
        // 执行前置钩子
        if (this.beforeNext) {
          const result = await this.beforeNext(this.active);
          if (result === false) {
            return
          }
        }

        if (this.active < this.steps.length - 1) {
          this.$emit('update:active', this.active + 1);
          this.$emit('next', this.active + 1);
        }
      },

      // 上一步
      async prev() {
        // 执行前置钩子
        if (this.beforePrev) {
          const result = await this.beforePrev(this.active);
          if (result === false) {
            return
          }
        }

        if (this.active > 0) {
          this.$emit('update:active', this.active - 1);
          this.$emit('prev', this.active - 1);
        }
      },

      // 提交
      submit() {
        this.$emit('submit');
      },

      // 跳转到指定步骤
      goto(step) {
        if (step >= 0 && step < this.steps.length) {
          this.$emit('update:active', step);
          this.$emit('change', step);
        }
      }
    }
  };

  var css_248z = "\n.z-steps[data-v-1b1cabf0] {\r\n  width: 100%;\n}\n.z-steps__buttons[data-v-1b1cabf0] {\r\n  margin-top: 30px;\r\n  text-align: center;\n}\n.z-steps__buttons .el-button[data-v-1b1cabf0] {\r\n  margin: 0 8px;\n}\r\n";
  styleInject(css_248z);

  /* script */
  const __vue_script__ = script;
  /* template */
  var __vue_render__ = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "z-steps" },
      [
        _c(
          "el-steps",
          _vm._b(
            {
              attrs: {
                active: _vm.active,
                "process-status": _vm.processStatus,
                "finish-status": _vm.finishStatus,
                "align-center": _vm.alignCenter,
                direction: _vm.direction,
                space: _vm.space,
                simple: _vm.simple,
              },
            },
            "el-steps",
            _vm.$attrs,
            false
          ),
          _vm._l(_vm.steps, function (step, index) {
            return _c(
              "el-step",
              {
                key: index,
                attrs: {
                  title: step.title,
                  description: step.description,
                  icon: step.icon,
                  status: step.status,
                },
              },
              [
                _vm.$scopedSlots["title-" + index]
                  ? _c(
                      "template",
                      { slot: "title" },
                      [
                        _vm._t("title-" + index, null, {
                          step: step,
                          index: index,
                        }),
                      ],
                      2
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.$scopedSlots["description-" + index]
                  ? _c(
                      "template",
                      { slot: "description" },
                      [
                        _vm._t("description-" + index, null, {
                          step: step,
                          index: index,
                        }),
                      ],
                      2
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.$scopedSlots["icon-" + index]
                  ? _c(
                      "template",
                      { slot: "icon" },
                      [
                        _vm._t("icon-" + index, null, {
                          step: step,
                          index: index,
                        }),
                      ],
                      2
                    )
                  : _vm._e(),
              ],
              2
            )
          }),
          1
        ),
        _vm._v(" "),
        _vm.showButtons
          ? _c(
              "div",
              { staticClass: "z-steps__buttons" },
              [
                _vm._t(
                  "buttons",
                  function () {
                    return [
                      _vm.active > 0
                        ? _c(
                            "el-button",
                            {
                              attrs: { size: _vm.buttonSize },
                              on: { click: _vm.prev },
                            },
                            [
                              _vm._v(
                                "\n        " + _vm._s(_vm.prevText) + "\n      "
                              ),
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.active < _vm.steps.length - 1
                        ? _c(
                            "el-button",
                            {
                              attrs: {
                                type: "primary",
                                size: _vm.buttonSize,
                                loading: _vm.nextLoading,
                              },
                              on: { click: _vm.next },
                            },
                            [
                              _vm._v(
                                "\n        " + _vm._s(_vm.nextText) + "\n      "
                              ),
                            ]
                          )
                        : _c(
                            "el-button",
                            {
                              attrs: {
                                type: "primary",
                                size: _vm.buttonSize,
                                loading: _vm.submitLoading,
                              },
                              on: { click: _vm.submit },
                            },
                            [
                              _vm._v(
                                "\n        " + _vm._s(_vm.submitText) + "\n      "
                              ),
                            ]
                          ),
                    ]
                  },
                  { active: _vm.active, next: _vm.next, prev: _vm.prev }
                ),
              ],
              2
            )
          : _vm._e(),
      ],
      1
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = undefined;
    /* scoped */
    const __vue_scope_id__ = "data-v-1b1cabf0";
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject */
    
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      undefined,
      undefined,
      undefined
    );

  // packages/components/src/steps/index.js

  __vue_component__.install = function(Vue) {
    Vue.component(__vue_component__.name, __vue_component__);
  };

  // packages/components/src/directives/permission.js

  /**
   * 安装权限指令
   */
  function install$1(Vue) {
    Vue.directive('permission', {
      inserted(el, binding) {
        const { value, modifiers } = binding;
        const mode = modifiers.every ? 'every' : 'some';

        const hasPermission = permissionManager.has(value, mode);

        if (!hasPermission) {
          el.parentNode && el.parentNode.removeChild(el);
        }
      },

      update(el, binding) {
        const { value, oldValue, modifiers } = binding;

        if (JSON.stringify(value) === JSON.stringify(oldValue)) {
          return
        }

        const mode = modifiers.every ? 'every' : 'some';
        const hasPermission = permissionManager.has(value, mode);

        if (!hasPermission) {
          el.parentNode && el.parentNode.removeChild(el);
        }
      }
    });
  }

  // packages/components/src/utils/validate.js

  /**
   * 常用表单验证规则
   */

  // 手机号验证
  const phoneValidator = (rule, value, callback) => {
    if (!value) {
      callback();
      return
    }
    const phoneReg = /^1[3-9]\d{9}$/;
    if (!phoneReg.test(value)) {
      callback(new Error('请输入正确的手机号'));
    } else {
      callback();
    }
  };

  // 邮箱验证
  const emailValidator = (rule, value, callback) => {
    if (!value) {
      callback();
      return
    }
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailReg.test(value)) {
      callback(new Error('请输入正确的邮箱地址'));
    } else {
      callback();
    }
  };

  // 身份证验证
  const idCardValidator = (rule, value, callback) => {
    if (!value) {
      callback();
      return
    }
    const idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!idCardReg.test(value)) {
      callback(new Error('请输入正确的身份证号'));
    } else {
      callback();
    }
  };

  // 网址验证
  const urlValidator = (rule, value, callback) => {
    if (!value) {
      callback();
      return
    }
    const urlReg = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlReg.test(value)) {
      callback(new Error('请输入正确的网址'));
    } else {
      callback();
    }
  };

  // 密码强度验证（至少包含数字和字母，长度6-20）
  const passwordValidator = (rule, value, callback) => {
    if (!value) {
      callback();
      return
    }
    const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,20}$/;
    if (!passwordReg.test(value)) {
      callback(new Error('密码需包含数字和字母，长度6-20位'));
    } else {
      callback();
    }
  };

  // 整数验证
  const integerValidator = (rule, value, callback) => {
    if (!value && value !== 0) {
      callback();
      return
    }
    if (!Number.isInteger(Number(value))) {
      callback(new Error('请输入整数'));
    } else {
      callback();
    }
  };

  // 正整数验证
  const positiveIntegerValidator = (rule, value, callback) => {
    if (!value && value !== 0) {
      callback();
      return
    }
    const num = Number(value);
    if (!Number.isInteger(num) || num <= 0) {
      callback(new Error('请输入正整数'));
    } else {
      callback();
    }
  };

  // 正数验证（包括小数）
  const positiveNumberValidator = (rule, value, callback) => {
    if (!value && value !== 0) {
      callback();
      return
    }
    const num = Number(value);
    if (isNaN(num) || num <= 0) {
      callback(new Error('请输入正数'));
    } else {
      callback();
    }
  };

  // 数字范围验证
  const rangeValidator = (min, max) => {
    return (rule, value, callback) => {
      if (!value && value !== 0) {
        callback();
        return
      }
      const num = Number(value);
      if (isNaN(num)) {
        callback(new Error('请输入数字'));
      } else if (num < min || num > max) {
        callback(new Error(`请输入${min}到${max}之间的数字`));
      } else {
        callback();
      }
    }
  };

  // 长度范围验证
  const lengthValidator = (min, max) => {
    return (rule, value, callback) => {
      if (!value) {
        callback();
        return
      }
      const len = String(value).length;
      if (len < min || len > max) {
        callback(new Error(`长度应在${min}到${max}个字符之间`));
      } else {
        callback();
      }
    }
  };

  // 中文验证
  const chineseValidator = (rule, value, callback) => {
    if (!value) {
      callback();
      return
    }
    const chineseReg = /^[\u4e00-\u9fa5]+$/;
    if (!chineseReg.test(value)) {
      callback(new Error('请输入中文'));
    } else {
      callback();
    }
  };

  // 英文验证
  const englishValidator = (rule, value, callback) => {
    if (!value) {
      callback();
      return
    }
    const englishReg = /^[a-zA-Z]+$/;
    if (!englishReg.test(value)) {
      callback(new Error('请输入英文'));
    } else {
      callback();
    }
  };

  // 用户名验证（字母开头，允许字母数字下划线，4-16位）
  const usernameValidator = (rule, value, callback) => {
    if (!value) {
      callback();
      return
    }
    const usernameReg = /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/;
    if (!usernameReg.test(value)) {
      callback(new Error('用户名以字母开头，4-16位字母数字下划线'));
    } else {
      callback();
    }
  };

  // IP地址验证
  const ipValidator = (rule, value, callback) => {
    if (!value) {
      callback();
      return
    }
    const ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (!ipReg.test(value)) {
      callback(new Error('请输入正确的IP地址'));
    } else {
      callback();
    }
  };

  // 端口号验证
  const portValidator = (rule, value, callback) => {
    if (!value && value !== 0) {
      callback();
      return
    }
    const num = Number(value);
    if (!Number.isInteger(num) || num < 0 || num > 65535) {
      callback(new Error('请输入0-65535之间的端口号'));
    } else {
      callback();
    }
  };

  // 常用验证规则对象
  const rules = {
    // 必填
    required: { required: true, message: '此项为必填项', trigger: 'blur' },

    // 手机号
    phone: { validator: phoneValidator, trigger: 'blur' },
    phoneRequired: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { validator: phoneValidator, trigger: 'blur' }
    ],

    // 邮箱
    email: { validator: emailValidator, trigger: 'blur' },
    emailRequired: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { validator: emailValidator, trigger: 'blur' }
    ],

    // 身份证
    idCard: { validator: idCardValidator, trigger: 'blur' },
    idCardRequired: [
      { required: true, message: '请输入身份证号', trigger: 'blur' },
      { validator: idCardValidator, trigger: 'blur' }
    ],

    // 网址
    url: { validator: urlValidator, trigger: 'blur' },
    urlRequired: [
      { required: true, message: '请输入网址', trigger: 'blur' },
      { validator: urlValidator, trigger: 'blur' }
    ],

    // 密码
    password: { validator: passwordValidator, trigger: 'blur' },
    passwordRequired: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { validator: passwordValidator, trigger: 'blur' }
    ],

    // 用户名
    username: { validator: usernameValidator, trigger: 'blur' },
    usernameRequired: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { validator: usernameValidator, trigger: 'blur' }
    ]
  };

  var validate = {
    phoneValidator,
    emailValidator,
    idCardValidator,
    urlValidator,
    passwordValidator,
    integerValidator,
    positiveIntegerValidator,
    positiveNumberValidator,
    rangeValidator,
    lengthValidator,
    chineseValidator,
    englishValidator,
    usernameValidator,
    ipValidator,
    portValidator,
    rules
  };

  var validate$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    phoneValidator: phoneValidator,
    emailValidator: emailValidator,
    idCardValidator: idCardValidator,
    urlValidator: urlValidator,
    passwordValidator: passwordValidator,
    integerValidator: integerValidator,
    positiveIntegerValidator: positiveIntegerValidator,
    positiveNumberValidator: positiveNumberValidator,
    rangeValidator: rangeValidator,
    lengthValidator: lengthValidator,
    chineseValidator: chineseValidator,
    englishValidator: englishValidator,
    usernameValidator: usernameValidator,
    ipValidator: ipValidator,
    portValidator: portValidator,
    rules: rules,
    'default': validate
  });

  // packages/components/src/utils/format.js

  /**
   * 常用数据格式化方法
   */

  /**
   * 格式化日期时间
   * @param {Date|String|Number} date - 日期对象、时间戳或日期字符串
   * @param {String} format - 格式化模板，默认 'YYYY-MM-DD HH:mm:ss'
   * @returns {String} 格式化后的日期字符串
   */
  function formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
    if (!date) return ''

    const d = new Date(date);
    if (isNaN(d.getTime())) return ''

    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hour = d.getHours();
    const minute = d.getMinutes();
    const second = d.getSeconds();

    const padZero = (num) => String(num).padStart(2, '0');

    const formatMap = {
      YYYY: year,
      MM: padZero(month),
      M: month,
      DD: padZero(day),
      D: day,
      HH: padZero(hour),
      H: hour,
      mm: padZero(minute),
      m: minute,
      ss: padZero(second),
      s: second
    };

    let result = format;
    Object.keys(formatMap).forEach(key => {
      result = result.replace(key, formatMap[key]);
    });

    return result
  }

  /**
   * 格式化时间为相对时间
   * @param {Date|String|Number} date - 日期对象、时间戳或日期字符串
   * @returns {String} 相对时间描述
   */
  function formatRelativeTime(date) {
    if (!date) return ''

    const d = new Date(date);
    if (isNaN(d.getTime())) return ''

    const now = Date.now();
    const diff = now - d.getTime();

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;
    const year = 365 * day;

    if (diff < minute) {
      return '刚刚'
    } else if (diff < hour) {
      return `${Math.floor(diff / minute)}分钟前`
    } else if (diff < day) {
      return `${Math.floor(diff / hour)}小时前`
    } else if (diff < week) {
      return `${Math.floor(diff / day)}天前`
    } else if (diff < month) {
      return `${Math.floor(diff / week)}周前`
    } else if (diff < year) {
      return `${Math.floor(diff / month)}个月前`
    } else {
      return `${Math.floor(diff / year)}年前`
    }
  }

  /**
   * 格式化文件大小
   * @param {Number} bytes - 字节数
   * @param {Number} decimals - 小数位数，默认2位
   * @returns {String} 格式化后的文件大小
   */
  function formatFileSize(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes'
    if (!bytes) return ''

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  /**
   * 格式化金额
   * @param {Number|String} amount - 金额
   * @param {Number} decimals - 小数位数，默认2位
   * @param {Boolean} showSymbol - 是否显示货币符号，默认true
   * @returns {String} 格式化后的金额
   */
  function formatMoney(amount, decimals = 2, showSymbol = true) {
    if (amount === null || amount === undefined || amount === '') return ''

    const num = parseFloat(amount);
    if (isNaN(num)) return ''

    const formatted = num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return showSymbol ? `¥${formatted}` : formatted
  }

  /**
   * 格式化数字（千分位）
   * @param {Number|String} num - 数字
   * @param {Number} decimals - 小数位数
   * @returns {String} 格式化后的数字
   */
  function formatNumber(num, decimals) {
    if (num === null || num === undefined || num === '') return ''

    const number = parseFloat(num);
    if (isNaN(number)) return ''

    let result = decimals !== undefined ? number.toFixed(decimals) : String(number);
    return result.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  /**
   * 格式化手机号（隐藏中间4位）
   * @param {String} phone - 手机号
   * @returns {String} 格式化后的手机号
   */
  function formatPhone(phone) {
    if (!phone) return ''
    const str = String(phone);
    if (str.length === 11) {
      return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
    return str
  }

  /**
   * 格式化身份证号（隐藏中间部分）
   * @param {String} idCard - 身份证号
   * @returns {String} 格式化后的身份证号
   */
  function formatIdCard(idCard) {
    if (!idCard) return ''
    const str = String(idCard);
    if (str.length === 15) {
      return str.replace(/(\d{6})\d{5}(\d{4})/, '$1*****$2')
    } else if (str.length === 18) {
      return str.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2')
    }
    return str
  }

  /**
   * 格式化银行卡号（每4位空格分隔）
   * @param {String} cardNumber - 银行卡号
   * @returns {String} 格式化后的银行卡号
   */
  function formatBankCard(cardNumber) {
    if (!cardNumber) return ''
    return String(cardNumber).replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
  }

  /**
   * 格式化百分比
   * @param {Number} num - 数字（0-1之间）
   * @param {Number} decimals - 小数位数，默认2位
   * @returns {String} 百分比字符串
   */
  function formatPercent(num, decimals = 2) {
    if (num === null || num === undefined || num === '') return ''
    const number = parseFloat(num);
    if (isNaN(number)) return ''
    return (number * 100).toFixed(decimals) + '%'
  }

  /**
   * 保留小数位
   * @param {Number} num - 数字
   * @param {Number} decimals - 小数位数
   * @returns {Number} 保留指定小数位的数字
   */
  function toFixed(num, decimals = 2) {
    if (num === null || num === undefined || num === '') return ''
    const number = parseFloat(num);
    if (isNaN(number)) return ''
    return parseFloat(number.toFixed(decimals))
  }

  /**
   * 截断文本
   * @param {String} text - 文本
   * @param {Number} length - 保留长度
   * @param {String} ellipsis - 省略符号，默认'...'
   * @returns {String} 截断后的文本
   */
  function truncate(text, length, ellipsis = '...') {
    if (!text) return ''
    const str = String(text);
    if (str.length <= length) return str
    return str.substring(0, length) + ellipsis
  }

  /**
   * 首字母大写
   * @param {String} str - 字符串
   * @returns {String} 首字母大写的字符串
   */
  function capitalize(str) {
    if (!str) return ''
    return String(str).charAt(0).toUpperCase() + String(str).slice(1)
  }

  /**
   * 下划线转驼峰
   * @param {String} str - 字符串
   * @returns {String} 驼峰命名的字符串
   */
  function camelCase(str) {
    if (!str) return ''
    return String(str).replace(/_([a-z])/g, (match, letter) => letter.toUpperCase())
  }

  /**
   * 驼峰转下划线
   * @param {String} str - 字符串
   * @returns {String} 下划线命名的字符串
   */
  function underscoreCase(str) {
    if (!str) return ''
    return String(str).replace(/([A-Z])/g, '_$1').toLowerCase()
  }

  var format = {
    formatDate,
    formatRelativeTime,
    formatFileSize,
    formatMoney,
    formatNumber,
    formatPhone,
    formatIdCard,
    formatBankCard,
    formatPercent,
    toFixed,
    truncate,
    capitalize,
    camelCase,
    underscoreCase
  };

  var format$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    formatDate: formatDate,
    formatRelativeTime: formatRelativeTime,
    formatFileSize: formatFileSize,
    formatMoney: formatMoney,
    formatNumber: formatNumber,
    formatPhone: formatPhone,
    formatIdCard: formatIdCard,
    formatBankCard: formatBankCard,
    formatPercent: formatPercent,
    toFixed: toFixed,
    truncate: truncate,
    capitalize: capitalize,
    camelCase: camelCase,
    underscoreCase: underscoreCase,
    'default': format
  });

  // packages/components/src/utils/storage.js

  /**
   * 本地存储封装（支持过期时间）
   */

  const DEFAULT_PREFIX = 'zhui_';

  /**
   * 存储包装类
   */
  class Storage {
    constructor(storage, prefix = DEFAULT_PREFIX) {
      this.storage = storage;
      this.prefix = prefix;
    }

    /**
     * 获取完整的 key
     */
    getKey(key) {
      return this.prefix + key
    }

    /**
     * 设置存储
     * @param {String} key - 键名
     * @param {Any} value - 值
     * @param {Number} expire - 过期时间（秒），不传则永久有效
     */
    set(key, value, expire) {
      const data = {
        value,
        time: Date.now()
      };

      if (expire) {
        data.expire = expire * 1000;
      }

      try {
        this.storage.setItem(this.getKey(key), JSON.stringify(data));
        return true
      } catch (e) {
        console.error('Storage set error:', e);
        return false
      }
    }

    /**
     * 获取存储
     * @param {String} key - 键名
     * @param {Any} defaultValue - 默认值
     * @returns {Any} 存储的值
     */
    get(key, defaultValue = null) {
      try {
        const item = this.storage.getItem(this.getKey(key));
        if (!item) {
          return defaultValue
        }

        const data = JSON.parse(item);

        // 检查是否过期
        if (data.expire) {
          const now = Date.now();
          if (now - data.time > data.expire) {
            this.remove(key);
            return defaultValue
          }
        }

        return data.value
      } catch (e) {
        console.error('Storage get error:', e);
        return defaultValue
      }
    }

    /**
     * 删除存储
     * @param {String} key - 键名
     */
    remove(key) {
      try {
        this.storage.removeItem(this.getKey(key));
        return true
      } catch (e) {
        console.error('Storage remove error:', e);
        return false
      }
    }

    /**
     * 清空所有存储
     */
    clear() {
      try {
        // 只清空带前缀的项
        const keys = Object.keys(this.storage);
        keys.forEach(key => {
          if (key.startsWith(this.prefix)) {
            this.storage.removeItem(key);
          }
        });
        return true
      } catch (e) {
        console.error('Storage clear error:', e);
        return false
      }
    }

    /**
     * 获取所有键名
     * @returns {Array} 键名数组
     */
    keys() {
      try {
        const keys = Object.keys(this.storage);
        return keys
          .filter(key => key.startsWith(this.prefix))
          .map(key => key.replace(this.prefix, ''))
      } catch (e) {
        console.error('Storage keys error:', e);
        return []
      }
    }

    /**
     * 检查是否存在
     * @param {String} key - 键名
     * @returns {Boolean}
     */
    has(key) {
      return this.get(key) !== null
    }

    /**
     * 获取存储大小（字节）
     * @returns {Number}
     */
    getSize() {
      try {
        let size = 0;
        const keys = Object.keys(this.storage);
        keys.forEach(key => {
          if (key.startsWith(this.prefix)) {
            const item = this.storage.getItem(key);
            if (item) {
              size += item.length;
            }
          }
        });
        return size
      } catch (e) {
        console.error('Storage getSize error:', e);
        return 0
      }
    }
  }

  // localStorage 实例
  const local = new Storage(window.localStorage);

  // sessionStorage 实例
  const session = new Storage(window.sessionStorage);

  /**
   * 创建自定义前缀的存储实例
   * @param {String} prefix - 前缀
   * @param {Boolean} useSession - 是否使用 sessionStorage，默认 false
   * @returns {Storage} 存储实例
   */
  function createStorage(prefix, useSession = false) {
    const storage = useSession ? window.sessionStorage : window.localStorage;
    return new Storage(storage, prefix)
  }

  var storage = {
    local,
    session,
    createStorage,
    Storage
  };

  var storage$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    local: local,
    session: session,
    createStorage: createStorage,
    'default': storage
  });

  // packages/components/src/utils/request.js

  /**
   * 请求工具封装
   * 注意：这是一个基础封装，实际使用时建议根据项目需求进行扩展
   */

  /**
   * 默认配置
   */
  const defaultConfig = {
    baseURL: '',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: false
  };

  /**
   * 请求拦截器列表
   */
  const requestInterceptors = [];

  /**
   * 响应拦截器列表
   */
  const responseInterceptors = [];

  /**
   * 创建请求实例
   * @param {Object} config - 配置对象
   */
  function createRequest(config = {}) {
    const mergedConfig = { ...defaultConfig, ...config };

    /**
     * 请求方法
     */
    async function request(url, options = {}) {
      // 合并配置
      const finalConfig = {
        ...mergedConfig,
        ...options,
        headers: {
          ...mergedConfig.headers,
          ...options.headers
        }
      };

      // 构建完整 URL
      const fullURL = finalConfig.baseURL + url;

      // 请求拦截
      let requestConfig = { url: fullURL, ...finalConfig };
      for (const interceptor of requestInterceptors) {
        try {
          requestConfig = await interceptor.onFulfilled(requestConfig);
        } catch (error) {
          if (interceptor.onRejected) {
            return interceptor.onRejected(error)
          }
          throw error
        }
      }

      // 处理请求体
      let body;
      if (requestConfig.data) {
        if (requestConfig.headers['Content-Type'] === 'application/json') {
          body = JSON.stringify(requestConfig.data);
        } else if (requestConfig.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
          body = new URLSearchParams(requestConfig.data).toString();
        } else {
          body = requestConfig.data;
        }
      }

      // 发起请求
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), requestConfig.timeout);

        const response = await fetch(requestConfig.url, {
          method: requestConfig.method || 'GET',
          headers: requestConfig.headers,
          body,
          credentials: requestConfig.withCredentials ? 'include' : 'same-origin',
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        // 处理响应
        let data;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          data = await response.text();
        }

        const result = {
          data,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          config: requestConfig
        };

        // 响应拦截
        let finalResult = result;
        for (const interceptor of responseInterceptors) {
          try {
            finalResult = await interceptor.onFulfilled(finalResult);
          } catch (error) {
            if (interceptor.onRejected) {
              return interceptor.onRejected(error)
            }
            throw error
          }
        }

        // 检查响应状态
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
        }

        return finalResult
      } catch (error) {
        // 错误处理
        if (error.name === 'AbortError') {
          throw new Error('请求超时')
        }

        // 响应错误拦截
        for (const interceptor of responseInterceptors) {
          if (interceptor.onRejected) {
            try {
              return await interceptor.onRejected(error)
            } catch (e) {
              error = e;
            }
          }
        }

        throw error
      }
    }

    /**
     * GET 请求
     */
    request.get = function(url, params, options = {}) {
      if (params) {
        const queryString = new URLSearchParams(params).toString();
        url = url + (url.includes('?') ? '&' : '?') + queryString;
      }
      return request(url, { ...options, method: 'GET' })
    };

    /**
     * POST 请求
     */
    request.post = function(url, data, options = {}) {
      return request(url, { ...options, method: 'POST', data })
    };

    /**
     * PUT 请求
     */
    request.put = function(url, data, options = {}) {
      return request(url, { ...options, method: 'PUT', data })
    };

    /**
     * DELETE 请求
     */
    request.delete = function(url, data, options = {}) {
      return request(url, { ...options, method: 'DELETE', data })
    };

    /**
     * PATCH 请求
     */
    request.patch = function(url, data, options = {}) {
      return request(url, { ...options, method: 'PATCH', data })
    };

    return request
  }

  /**
   * 添加请求拦截器
   * @param {Function} onFulfilled - 成功回调
   * @param {Function} onRejected - 失败回调
   */
  function addRequestInterceptor(onFulfilled, onRejected) {
    requestInterceptors.push({ onFulfilled, onRejected });
  }

  /**
   * 添加响应拦截器
   * @param {Function} onFulfilled - 成功回调
   * @param {Function} onRejected - 失败回调
   */
  function addResponseInterceptor(onFulfilled, onRejected) {
    responseInterceptors.push({ onFulfilled, onRejected });
  }

  /**
   * 清空拦截器
   */
  function clearInterceptors() {
    requestInterceptors.length = 0;
    responseInterceptors.length = 0;
  }

  // 默认请求实例
  const request = createRequest();

  var request$1 = {
    createRequest,
    addRequestInterceptor,
    addResponseInterceptor,
    clearInterceptors,
    request
  };

  var request$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createRequest: createRequest,
    addRequestInterceptor: addRequestInterceptor,
    addResponseInterceptor: addResponseInterceptor,
    clearInterceptors: clearInterceptors,
    request: request,
    'default': request$1
  });

  // packages/components/src/index.js

  const components = [
    __vue_component__$b,
    __vue_component__$a,
    __vue_component__$9,
    __vue_component__$8,
    __vue_component__$7,
    __vue_component__$6,
    __vue_component__$5,
    __vue_component__$4,
    __vue_component__$3,
    __vue_component__$2,
    __vue_component__$1,
    __vue_component__
  ];

  const install = function(Vue) {
    // 注册组件
    components.forEach(component => {
      Vue.component(component.name, component);
    });

    // 注册权限指令
    install$1(Vue);
  };

  // 支持 script 标签引入
  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  var index = {
    install,
    ZForm: __vue_component__$b,
    ZTable: __vue_component__$a,
    ZDialog: __vue_component__$9,
    ZSearchForm: __vue_component__$8,
    ZDescriptions: __vue_component__$7,
    ZCard: __vue_component__$6,
    ZPageHeader: __vue_component__$5,
    ZChart: __vue_component__$4,
    ZUpload: __vue_component__$3,
    ZImagePreview: __vue_component__$2,
    ZEmpty: __vue_component__$1,
    ZSteps: __vue_component__,
    // 导出权限相关
    permissionManager,
    checkPermission,
    // 导出工具方法
    validate: validate$1,
    format: format$1,
    storage: storage$1,
    request: request$2
  };

  exports.ZCard = __vue_component__$6;
  exports.ZChart = __vue_component__$4;
  exports.ZDescriptions = __vue_component__$7;
  exports.ZDialog = __vue_component__$9;
  exports.ZEmpty = __vue_component__$1;
  exports.ZForm = __vue_component__$b;
  exports.ZImagePreview = __vue_component__$2;
  exports.ZPageHeader = __vue_component__$5;
  exports.ZSearchForm = __vue_component__$8;
  exports.ZSteps = __vue_component__;
  exports.ZTable = __vue_component__$a;
  exports.ZUpload = __vue_component__$3;
  exports.checkPermission = checkPermission;
  exports["default"] = index;
  exports.format = format$1;
  exports.permissionManager = permissionManager;
  exports.request = request$2;
  exports.storage = storage$1;
  exports.validate = validate$1;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
