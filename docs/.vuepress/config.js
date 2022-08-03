module.exports = {
    title: 'Python 修炼手册',
    description: '深入浅出的Python学习文档，从Python基础和高级编程到算法数据结构,Web开发，爬虫，大数据和人工智能',
    base: '/',
    head: [
        ['link', {
            rel: 'icon',
            href: 'https://i.loli.net/2020/02/25/AOjBhkIxtb8dRgl.png'
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
        displayAllHeaders: true,
        lastUpdated: '更新时间',
    },
    markdown: {
        lineNumbers: true
    }
}
