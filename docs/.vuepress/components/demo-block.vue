<template>
  <div class="demo-block">
    <div class="demo-block__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemoBlock'
}
</script>

<style scoped>
.demo-block {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: .2s;
  margin: 20px 0;
}

.demo-block:hover {
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
}

.demo-block__content {
  padding: 24px;
}

.demo-block__content >>> .el-button + .el-button,
.demo-block__content >>> .my-button + .my-button {
  margin-left: 10px;
}
</style>
