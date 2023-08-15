import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: "Python 修炼手册",
  description: "深入浅出的Python学习文档，从Python基础和高级编程到算法数据结构,Web开发，爬虫，大数据和人工智能",
  lastUpdated: true,
  head: [['link', { rel: 'icon', href: 'https://s2.loli.net/2023/08/14/dWrCDTFK9z1m5Ii.png' }]],
  themeConfig: {
    logo: { src: 'https://s2.loli.net/2023/08/14/dWrCDTFK9z1m5Ii.png', width: 24, height: 24 },
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Books',
        items: [
          {
            text: '大前端',
            link: 'https://frontend.a-nomad.com'
          },
          {
            text: '.Net',
            link: 'https://dotnet.a-nomad.com'
          },
          {
            text: 'Linux',
            link: 'https://linux.a-nomad.com'
          }
        ]
      },
    ],

    sidebar: [
      {
        text: 'Python基础',
        collapsed: false,
        items: [
          { text: 'Python简介', link: '/basic/intro' },
          { text: 'Python执行方式', link: '/basic/ide' },
          { text: '代码规范', link: '/basic/standard' },
          { text: '输入输出', link: '/basic/io' },
          { text: '数据类型', link: '/basic/datatype' },
          { text: '运算符', link: '/basic/operator' },
          { text: '流控制语句', link: '/basic/processctrl' },
          { text: '字符串', link: '/basic/str' },
          { text: '列表 / 元组 / 集合', link: '/basic/list' },
          { text: '字典', link: '/basic/dict' },
          { text: '函数', link: '/basic/function' },
          { text: '面向对象', link: '/basic/oo' },
          { text: '模块 / 包', link: '/basic/module' },
          { text: '可访问性', link: '/basic/accessibility' },
          { text: '深拷贝与浅拷贝', link: '/basic/copy' },
          { text: '文件操作', link: '/basic/file' },
          { text: '异常处理', link: '/basic/exception' },
          { text: '日志处理', link: '/basic/logging' }
        ]
      },
      {
        text: 'Python高级',
        collapsed: false,
        items: [
          { text: '生成器', link: 'senior/generator' },
          { text: '迭代器', link: 'senior/iterator' },
          { text: '装饰器', link: 'senior/decorator' },
          { text: '上下文管理器', link: 'senior/contextmanager' },
          { text: '动态扩展', link: 'senior/dynamic' },
          { text: '元类', link: 'senior/metaclass' },
          { text: '对象池与intern', link: 'senior/intern' },
          { text: '垃圾回收（GC）', link: 'senior/gc' },
          { text: 'pdb 调试工具', link: 'senior/pdb' },
          { text: '多进程', link: 'senior/process' },
          { text: '多线程', link: 'senior/thread' },
          { text: '协程', link: 'senior/coroutine' },
          { text: '网络通信', link: 'senior/network' },
          { text: 'UDP', link: 'senior/udp' },
          { text: 'TCP', link: 'senior/tcp' },
        ]
      },
      {
        text: '算法与数据结构',
        collapsed: false,
        items: [
          { text: '算法', link: 'datastructure/algorithm' },
          { text: '排序算法与搜索算法', link: 'datastructure/sort' },
          { text: '数据结构', link: 'datastructure/datastructure' },
          { text: '顺序表', link: 'datastructure/sequencelist' },
          { text: '链表', link: 'datastructure/linkedlist' },
          { text: '栈 / 队列', link: 'datastructure/stackqueue' },
          { text: '树', link: 'datastructure/tree' }
        ]
      },
      {
        text: '数据操作',
        collapsed: false,
        items: [
          { text: 'MySQL', link: 'database/mysql' },
          { text: 'Redis', link: 'database/redis' },
          { text: 'MongoDB', link: 'database/mongo' }
        ]
      }
    ],
    outline: 'deep',

    socialLinks: [
      { icon: { svg: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1692000911469" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1832" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M344.407934 453.627004c-29.198618-5.799725-56.39733 17.799157-56.39733 47.597746V602.019978c0 20.399034 14.199328 36.798258 33.398419 43.997917 36.398277 13.599356 62.597036 48.79769 62.597037 89.995739 0 52.997491-42.997964 95.995455-95.995456 95.995456s-95.995455-42.997964-95.995455-95.995456V240.037116c0-26.598741-21.398987-47.997728-47.997727-47.997728H48.021966c-26.598741 0-47.997728 21.398987-47.997727 47.997728v495.976518c0 178.991526 164.192227 320.384832 349.98343 281.386678 108.794849-22.798921 196.590693-110.794755 219.389614-219.389613 34.798353-165.792151-73.996497-314.385116-224.989349-344.383695zM418.00445 0.048478c-18.399129-0.999953-33.99839 13.599356-33.99839 31.998485v63.197008c0 16.999195 13.199375 30.998532 29.998579 31.798494 258.787748 13.999337 466.777901 223.989396 481.777191 482.977134 0.999953 16.799205 14.99929 29.99858 31.798495 29.99858h64.196961c18.399129 0 32.998438-15.599261 31.998485-33.99839C1006.776575 279.635241 744.388998 17.247663 418.00445 0.048478z m0.599972 191.99091c-18.599119-1.399934-34.598362 13.399366-34.598362 32.198476v64.19696c0 16.799205 12.999385 30.598551 29.598598 31.798495 153.592728 12.599403 275.986934 136.393543 289.786281 290.386252 1.599924 16.599214 15.19928 29.398608 31.798494 29.398608h64.396952c18.599119 0 33.598409-15.999243 32.198475-34.598362-16.799205-220.189575-192.990863-396.381234-413.180438-413.380429z" p-id="1833"></path></svg>' }, link: 'https://a-nomad.com' },
      { icon: 'youtube', link: 'https://www.youtube.com/channel/UCMhN4CHJMuSOYe9CMXIoV7Q?sub_confirmation=1' },
      { icon: 'github', link: 'https://github.com/colin-chang/python' }
    ],
    editLink: {
      pattern: 'https://github.com/colin-chang/python/edit/main/docs/:path'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: "Copyright © <a href='https://a-nomad.com' target='_blank'>A-Nomad</a> 2018"
    },
    search: {
      provider: 'algolia',
      options: {
        appId: '6MH6QA2TSK',
        apiKey: '8560f06db7508fff341be702fc136cbb',
        indexName: 'python-a-nomad'
      }
    },
  },
  markdown: {
    lineNumbers: true
  }
})
