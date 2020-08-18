# Python简介

## 1. Python介绍
Python是一种解释型、面向对象、动态数据类型的高级程序设计语言。
Pythoy具有简单、易学、免费、可移植、丰富扩展库等优点。但同时也存在执行效率慢的问题，这也是解释型语言所通有的，但是这个缺点也将被计算机越来越强大的性能所弥补。

C/C++等编译型语言一次编辑后即可交给CPU一次性执行，所以执行效率较高。Python等解释型语言则不会执行一次性编译，解释型语言的编译器也称为解释器，解释器会将代码顺序逐行解释并交给CPU执行，其过程为解释一行执行一行，执行遇到错误则终止程序执行。

Python的解释器如今有多个语言实现，我们常用的是CPython（官方版本的C语言实现），其他还有Jython（可以运行在Java平台）、IronPython（可以运行在.NET和Mono平台）、PyPy（Python实现的，支持JIT即时编译）

## 2. Python与AI

![人工智能未来蓝图](https://i.loli.net/2020/02/25/Qj6x47WVUYtOkaA.png '人工智能未来蓝图')

#### Python是人工智能（AI）和数据分析常用语言
Google开源机器学习框架：TensorFlow
<br/>开源社区主推学习框架：Scikit-learn
<br/>百度开源深度学习框架：Paddle
<br/>... ...

<br/>以上框架，均是由Python语言开发。
<br/>不仅如此，Python还含有优质的文档、丰富的AI库、机器学习库、自然语言和文本处理库。尤其是Python中的机器学习，实现了人工智能领域中大量的需求。

#### 人工智能时代来临 规模将持续增长
* 政策：在《国务院关于积极推进“互联网+”行动的指导意见》中被推上国家战略层面
* 经济：互联网经济持续增长，2015年中国网络经济增长约33%，规模超千亿，人工智能创业公司共获得投资资金12.6亿。
* 社会：我国科研投入占GDP20%，仅次于美国，信息技术投入占“863计划”15.5%，是国家重点投资领域。 近五年科研人员保持20%的增长，给行业带来人才红利。
* 技术：目前在视觉识别、语音识别等领域率先技术突破，处于国际领先水平。

## 3. Python应用场景

* Web应用开发

    Python经常被用于Web开发。比如，通过mod_wsgi模块，Apache可以运行用Python编写的Web程序。Python定义了WSGI标准应用接口来协调Http服务器与基于Python的Web程序之间的通信。一些Web框架，如Django,TurboGears,web2py,Zope等，可以让程序员轻松地开发和管理复杂的Web程序。

* 操作系统管理、服务器运维的自动化脚本

    在很多操作系统里，Python是标准的系统组件。 大多数Linux发行版以及NetBSD、OpenBSD和Mac OS X都集成了Python，可以在终端下直接运行Python。有一些Linux发行版的安装器使用Python语言编写，比如Ubuntu的Ubiquity安装器,Red Hat Linux和Fedora的Anaconda安装器。Gentoo Linux使用Python来编写它的Portage包管理系统。Python标准库包含了多个调用操作系统功能的库。通过pywin32这个第三方软件 包，Python能够访问Windows的COM服务及其它Windows API。使用IronPython，Python程序能够直接调用.Net Framework。一般说来，Python编写的系统管理脚本在可读性、性能、代码重用度、扩展性几方面都优于普通的shell脚本。

* 网络爬虫

    Python有大量的HTTP请求处理库和HTML解析库，并且有成熟高效的爬虫框架Scrapy和分布式解决方案scrapy-redis，在爬虫的应用方面非常广泛。

* 科学计算

    NumPy、SciPy、Pandas、Matplotlib可以让Python程序员编写科学计算程序。

* 桌面软件

    PyQt、PySide、wxPython、PyGTK是Python快速开发桌面应用程序的利器。

* 服务器软件（网络软件）

    Python对于各种网络协议的支持很完善，因此经常被用于编写服务器软件、网络爬虫。第三方库Twisted支持异步网络编程和多数标准的网络协议(包含客户端和服务器)，并且提供了多种工具，被广泛用于编写高性能的服务器软件。

* 游戏

    很多游戏使用C++编写图形显示等高性能模块，而使用Python或者Lua编写游戏的逻辑、服务器。相较于Python，Lua的功能更简单、体积更小；而Python则支持更多的特性和数据类型。

* 构思实现，产品早期原型和迭代

    YouTube、Google、Yahoo!、NASA都在内部大量地使用Python。

## 4. Python版本

目前市场上有两个Python版本并存，分别是Python2.x和Python3.x。

* Python2.x是过去版本解释器名称是Python，Python3.x是现在主流版本，解释器名称为Python3。
* 相对于2.x版本3.x是一个较大的升级，**不能向下兼容**
* 为了照顾现有程序，官方提供了一个过渡版本 -- **Python2.6**
    * 基本使用了Python2.x的语法和库
    * 同时考虑了向Python3.x的迁移，允许使用部分Python3.x的语法
    * 2010年推出的 **Python2.7** 被确定为最后一个Python2.x版本


::: warning 开发中如果无法立即使用Python3.x(有极少的第三方库不兼容3.x)
* 先使用Python3.x进行开发
* 然后使用Python2.6/2.7来执行，并做一些兼容性处理
:::