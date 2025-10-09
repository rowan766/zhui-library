<!-- packages/components/src/button/index.vue -->
<template>
  <el-button
    v-bind="$attrs"
    v-on="$listeners"
    :type="type"
    :size="size"
  >
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: 'MyButton',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'medium'
    }
  }
}
</script>