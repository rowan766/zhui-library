// packages/components/rollup.config.js
import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'

// 外部依赖（不打包进组件库）
const external = ['vue', 'element-ui']

// UMD 格式需要的全局变量映射
const globals = {
  vue: 'Vue',
  'element-ui': 'ELEMENT'
}

export default [
  // ESM 格式（用于 tree-shaking）
  {
    input: 'src/index.js',
    output: {
      format: 'es',
      file: 'es/index.js',
      exports: 'named'
    },
    external,
    plugins: [
      nodeResolve(),
      vue({
        css: false // CSS 单独处理
      }),
      postcss({
        extract: false // 暂时不提取 CSS
      }),
      commonjs()
    ]
  },
  // CommonJS 格式
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      file: 'lib/index.js',
      exports: 'named'
    },
    external,
    plugins: [
      nodeResolve(),
      vue({
        css: false
      }),
      postcss({
        extract: false
      }),
      commonjs()
    ]
  },
  // UMD 格式（用于 CDN）
  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      file: 'dist/index.js',
      name: 'Zhui',
      exports: 'named',
      globals
    },
    external,
    plugins: [
      nodeResolve(),
      vue({
        css: false
      }),
      postcss({
        extract: false
      }),
      commonjs()
    ]
  },
  // UMD 压缩版
  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      file: 'dist/index.min.js',
      name: 'Zhui',
      exports: 'named',
      globals
    },
    external,
    plugins: [
      nodeResolve(),
      vue({
        css: false
      }),
      postcss({
        extract: false
      }),
      commonjs(),
      terser() // 压缩代码
    ]
  }
]