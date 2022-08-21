module.exports = {
    title: 'Python 修炼手册',
    description: '深入浅出的Python学习文档，从Python基础和高级编程到算法数据结构,Web开发，爬虫，大数据和人工智能',
    base: '/',
    head: [
        ['link', {
            rel: 'icon',
            href: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1658902565243/IDyIb_63A.png'
        }]
    ],
    plugins: [
        '@vuepress/active-header-links',
        '@vuepress/back-to-top',
        '@vuepress/last-updated',
        '@vuepress/medium-zoom',
        ['@vuepress/google-analytics', {
            ga: 'UA-131744342-1'
        }]
    ],
    themeConfig: {
        logo:'https://s2.loli.net/2022/08/04/UXqgLBVfzPuvb5A.png',
        repo: 'https://github.com/colin-chang/python',
        smoothScroll:true,
        search: false,
        algolia: {
            apiKey: '8560f06db7508fff341be702fc136cbb',
            indexName: 'python-a-nomad',
            appId: '6MH6QA2TSK'
        },
        nav: [{
                text: 'Get Start',
                link: '/basic/intro'
            },
            {
                text: 'Books',
                items: [
                    { text: '.Net', link: 'https://dotnet.a-nomad.com' },
                    { text: 'Linux', link: 'https://linux.a-nomad.com' },
                    { text: '系统架构设计', link: 'https://architecture.a-nomad.com' }
                  ]
            },
            {
                text: 'Blog',
                link: 'https://a-nomad.com'
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
                    '/basic/function',
                    '/basic/oo',
                    '/basic/module',
                    '/basic/accessibility',
                    '/basic/copy',
                    '/basic/file',
                    '/basic/exception',
                    '/basic/logging'
                ]
            },
            {
                title: 'Python高级',
                collapsable: false,
                children: [
                    '/senior/generator',
                    '/senior/iterator',
                    '/senior/decorator',
                    '/senior/contextmanager',
                    '/senior/dynamic',
                    '/senior/metaclass',
                    '/senior/intern',
                    '/senior/gc',
                    '/senior/pdb',
                    '/senior/process',
                    '/senior/thread',
                    '/senior/coroutine',
                    '/senior/network',
                    '/senior/udp',
                    '/senior/tcp'
                ]
            },
            {
                title: '算法与数据结构',
                collapsable: false,
                children: [
                    '/datastructure/algorithm',
                    'datastructure/sort',
                    '/datastructure/datastructure',
                    'datastructure/sequencelist',
                    'datastructure/linkedlist',
                    'datastructure/stackqueue',
                    'datastructure/tree'
                ]
            },
            {
                title: '数据操作',
                collapsable: false,
                children: [
                    '/database/mysql',
                    '/database/redis',
                    '/database/mongo'
                ]
            }
        ],
        sidebarDepth:3,
        displayAllHeaders: true,
        lastUpdated: '更新时间',
    },
    markdown: {
        lineNumbers: true
    }
}
