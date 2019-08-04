module.exports = {
    title: 'Python学习笔记',
    description: 'Python—人工智能主流语言',
    base: '/python/',
    head: [
        ['link', {
            rel: 'icon',
            href: '/favicon.ico'
        }]
    ],
    plugins: [
        '@vuepress/active-header-links',
        '@vuepress/back-to-top',
        ['@vuepress/google-analytics', {
            ga: 'UA-131744342-1'
        }]
    ],
    themeConfig: {
        repo: 'https://github.com/colin-chang/python',
        nav: [{
                text: 'Get Start',
                link: '/basic/intro'
            },
            {
                text: 'Books',
                items: [
                    { text: '.Net Core', link: 'https://colin-chang.site/netcore/' },
                    { text: 'Linux', link: 'https://colin-chang.site/linux/' },
                    { text: '分布式', link: 'https://colin-chang.site/distribution/' }
                  ]
            },
            {
                text: 'Blog',
                link: 'https://colin-chang.site/'
            }
        ],
        sidebar:[
            {
                title: 'Python基础',
                collapsable: false,
                children: [
                    '/basic/intro',
                    '/basic/ide',
                    '/basic/standard',
                    '/basic/io',
                    '/basic/datatype',
                    '/basic/operator',
                    '/basic/processctrl',
                    '/basic/str',
                    '/basic/list',
                    '/basic/dict',
                    '/basic/exception',
                    '/basic/function',
                    '/basic/oo',
                    '/basic/module',
                    '/basic/file'
                ]
            },
            {
                title: '高级编程',
                collapsable: false,
                children: [
                    '/senior/network'
                ]
            }
        ],
        displayAllHeaders: true,
        lastUpdated: '更新时间',
    },
    markdown: {
        lineNumbers: true
    }
}