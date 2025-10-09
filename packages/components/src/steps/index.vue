<!-- packages/components/src/steps/index.vue -->
<template>
  <div class="z-steps">
    <el-steps
      :active="active"
      :process-status="processStatus"
      :finish-status="finishStatus"
      :align-center="alignCenter"
      :direction="direction"
      :space="space"
      :simple="simple"
      v-bind="$attrs"
    >
      <el-step
        v-for="(step, index) in steps"
        :key="index"
        :title="step.title"
        :description="step.description"
        :icon="step.icon"
        :status="step.status"
      >
        <!-- 自定义标题 -->
        <template v-if="$scopedSlots[`title-${index}`]" slot="title">
          <slot :name="`title-${index}`" :step="step" :index="index" />
        </template>
        <!-- 自定义描述 -->
        <template v-if="$scopedSlots[`description-${index}`]" slot="description">
          <slot :name="`description-${index}`" :step="step" :index="index" />
        </template>
        <!-- 自定义图标 -->
        <template v-if="$scopedSlots[`icon-${index}`]" slot="icon">
          <slot :name="`icon-${index}`" :step="step" :index="index" />
        </template>
      </el-step>
    </el-steps>

    <!-- 操作按钮 -->
    <div v-if="showButtons" class="z-steps__buttons">
      <slot name="buttons" :active="active" :next="next" :prev="prev">
        <el-button
          v-if="active > 0"
          :size="buttonSize"
          @click="prev"
        >
          {{ prevText }}
        </el-button>
        <el-button
          v-if="active < steps.length - 1"
          type="primary"
          :size="buttonSize"
          :loading="nextLoading"
          @click="next"
        >
          {{ nextText }}
        </el-button>
        <el-button
          v-else
          type="primary"
          :size="buttonSize"
          :loading="submitLoading"
          @click="submit"
        >
          {{ submitText }}
        </el-button>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
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
        const result = await this.beforeNext(this.active)
        if (result === false) {
          return
        }
      }

      if (this.active < this.steps.length - 1) {
        this.$emit('update:active', this.active + 1)
        this.$emit('next', this.active + 1)
      }
    },

    // 上一步
    async prev() {
      // 执行前置钩子
      if (this.beforePrev) {
        const result = await this.beforePrev(this.active)
        if (result === false) {
          return
        }
      }

      if (this.active > 0) {
        this.$emit('update:active', this.active - 1)
        this.$emit('prev', this.active - 1)
      }
    },

    // 提交
    submit() {
      this.$emit('submit')
    },

    // 跳转到指定步骤
    goto(step) {
      if (step >= 0 && step < this.steps.length) {
        this.$emit('update:active', step)
        this.$emit('change', step)
      }
    }
  }
}
</script>

<style scoped>
.z-steps {
  width: 100%;
}

.z-steps__buttons {
  margin-top: 30px;
  text-align: center;
}

.z-steps__buttons .el-button {
  margin: 0 8px;
}
</style>
