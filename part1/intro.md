# Python简介

* [1. Python介绍](#1-python介绍)
* [2. python应用场景](#2-python应用场景)
* [3. Python版本](#3-Python版本)

## 1. Python介绍
Python是一种解释型、面向对象、动态数据类型的高级程序设计语言。
Pythoy具有简单、易学、免费、可移植、丰富扩展库等优点。但同时也存在执行效率慢的问题，这也是解释型语言所通有的，但是这个缺点也将被计算机越来越强大的性能所弥补。

C/C++等编译型语言一次编辑后即可交给CPU一次性执行，所以执行效率较高。Python等解释型语言则不会执行一次性编译，解释型语言的编译器也称为解释器，解释器会将代码顺序逐行解释并交给CPU执行，其过程为解释一行执行一行，执行遇到错误则终止程序执行。

Python的解释器如今有多个语言实现，我们常用的是CPython（官方版本的C语言实现），其他还有Jython（可以运行在Java平台）、IronPython（可以运行在.NET和Mono平台）、PyPy（Python实现的，支持JIT即时编译）

## 2. Python应用场景

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

    Google、NASA、Facebook都在内部大量地使用Python。

## 3. Python版本

目前市场上有两个Python版本并存，分别是Python2.x和Python3.x。

* Python2.x是过去版本解释器名称是python，Python3.x是现在主流版本，解释器名称为python3。
* 相对于2.x版本3.x是一个较大的升级，**不能向下兼容**
* 为了照顾现有程序，官方提供了一个过渡版本 -- **python2.6**
    * 基本使用了python2.x的语法和库
    * 同时考虑了向python3.x的迁移，允许使用部分python3.x的语法
    * 2010年推出的 **python2.7** 被确定为最后一个python2.x版本


> 开发中如果无法立即使用Python3.x(有极少的第三方库不兼容3.x)
* 先使用Python3.x进行开发
* 然后使用Python2.6/2.7来执行，并做一些兼容性处理