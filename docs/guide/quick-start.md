# 快速开始

本节将介绍如何在项目中使用 Zhui。

## 完整引入

在 main.js 中写入以下内容:

```js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Zhui from '@rowan287630/zhui'
import App from './App.vue'

Vue.use(ElementUI)
Vue.use(Zhui)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

以上代码便完成了 Zhui 的引入。需要注意的是,样式文件需要单独引入。

## 按需引入

借助 babel-plugin-component,我们可以只引入需要的组件,以达到减小项目体积的目的。

首先,安装 babel-plugin-component:

```bash
npm install babel-plugin-component -D
```

然后,将 .babelrc 修改为:

```json
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

接下来,如果你只希望引入部分组件,比如 MyButton,那么需要在 main.js 中写入以下内容:

```js
import Vue from 'vue'
import { Button } from 'element-ui'
import { MyButton } from '@rowan287630/zhui'
import App from './App.vue'

Vue.component(Button.name, Button)
Vue.component(MyButton.name, MyButton)

new Vue({
  el: '#app',
  render: h => h(App)
})
```

## 开始使用

至此,一个基于 Vue 和 Zhui 的开发环境已经搭建完毕,现在就可以编写代码了。各个组件的使用方法请参阅它们各自的文档。
