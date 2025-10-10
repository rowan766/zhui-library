module.exports = {
  title: 'Zhui 组件库',
  description: '基于 Element UI 的 Vue 2 组件库',
  base: '/zhui-library/',  // zhui-library docs
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['script', {}, `
      if (typeof window !== 'undefined') {
        window.global = window;
      }
    `]
  ],
  
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/form' },
      { text: 'GitHub', link: 'https://github.com/rowan766/zhui-library' },
      { text: 'npm', link: 'https://www.npmjs.com/package/@rowan287630/zhui' }
    ],
    
    sidebar: {
      '/guide/': [
        {
          title: '开始',
          collapsable: false,
          children: [
            '',
            'installation',
            'quick-start'
          ]
        }
      ],
      '/components/': [
        {
          title: '基础组件',
          collapsable: false,
          children: [
            'form',
            'table',
            'dialog',
            'search-form',
            'descriptions',
            'card',
            'page-header'
          ]
        },
        {
          title: '数据展示',
          collapsable: false,
          children: [
            'chart',
            'image-preview',
            'empty'
          ]
        },
        {
          title: '表单组件',
          collapsable: false,
          children: [
            'upload',
            'steps'
          ]
        },
        {
          title: '工具方法',
          collapsable: false,
          children: [
            'validate',
            'format',
            'storage',
            'request'
          ]
        },
        {
          title: '其他',
          collapsable: false,
          children: [
            'permission'
          ]
        }
      ]
    },
    
    // 最后更新时间
    lastUpdated: '最后更新',
    
    // GitHub 编辑链接
    repo: 'rowan766/zhui-library',
    repoLabel: 'GitHub',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页'
  },
  
  markdown: {
    lineNumbers: true
  },

  plugins: [
    ['demo-container', {
      locales: [
        {
          "lang": "zh-CN",
          "demo-block": {
            "hide-text": "隐藏代码",
            "show-text": "显示代码",
            "copy-text": "复制代码",
            "copy-success": "复制成功"
          }
        },
        {
          "lang": "en-US",
          "demo-block": {
            "hide-text": "Hide",
            "show-text": "Expand",
            "copy-text": "Copy",
            "copy-success": "Successful"
          }
        }
      ]
    }]
  ],

  chainWebpack: (config) => {
    // 为 echarts 添加 polyfill
    config.node.set('global', true)

    config.plugin('provide').use(require('webpack').ProvidePlugin, [{
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser'
    }])
  }
}