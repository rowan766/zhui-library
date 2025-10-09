<!-- packages/components/src/empty/index.vue -->
<template>
  <div class="z-empty" :style="containerStyle">
    <div class="z-empty__image" :style="imageStyle">
      <slot name="image">
        <img v-if="image" :src="image" alt="empty">
        <svg v-else viewBox="0 0 79 86" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M60.5 86H18.5C8.85 86 1 78.15 1 68.5V17.5C1 7.85 8.85 0 18.5 0H60.5C70.15 0 78 7.85 78 17.5V68.5C78 78.15 70.15 86 60.5 86Z"
            fill="#F2F3F5"
          />
          <path
            d="M39.5 44C46.4036 44 52 38.4036 52 31.5C52 24.5964 46.4036 19 39.5 19C32.5964 19 27 24.5964 27 31.5C27 38.4036 32.5964 44 39.5 44Z"
            fill="#D8D8D8"
          />
          <path
            d="M23 69C23 57.9543 31.9543 49 43 49H46C57.0457 49 66 57.9543 66 69V77H23V69Z"
            fill="#D8D8D8"
          />
        </svg>
      </slot>
    </div>

    <div v-if="$slots.description || description" class="z-empty__description">
      <slot name="description">
        {{ description }}
      </slot>
    </div>

    <div v-if="$slots.default" class="z-empty__bottom">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
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
        const height = typeof this.height === 'number' ? `${this.height}px` : this.height
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
}
</script>

<style scoped>
.z-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  min-height: 200px;
}

.z-empty__image {
  width: 160px;
  height: 160px;
  margin-bottom: 20px;
}

.z-empty__image img,
.z-empty__image svg {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.z-empty__description {
  margin-bottom: 20px;
  color: #909399;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
}

.z-empty__bottom {
  margin-top: 16px;
}
</style>
