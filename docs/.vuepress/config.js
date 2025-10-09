module.exports = {
  title: 'Zhui 组件库',
  description: '基于 Element UI 的 Vue 2 组件库',
  base: '/zhui-library/',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/button' },
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
            'button'
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
  }
}