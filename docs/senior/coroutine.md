# 协程

## 1. 协程
### 1.1 协程简介
协程(Coroutine)，又称微线程，纤程。协程视为比线程更小的执行单元。它自带CPU上下文，在合适的时机，可以把一个协程切换到另一个协程，同时保留和恢复执行现场。

简单讲，协程允许开发者控制程序在执行到某处时切保留执行现场并切换执行其他协程，如常见的通过 [yield](generator.md#_3-yield) 生成器实现协程。协程只是控制了程序的执行顺序本身是单线程的，因此操作系统并不知道协程的存在。

### 1.2 协程与多线程
线程切换从系统层面远不止保存和恢复CPU上下文，OS为了程序运行的高效性每个线程都有Cache等数据，OS负责这些数据的恢复操作，所以线程切换相对损耗性能，而协程的切换只是单纯的操作CPU的上下文，因此协程更加高效。

目前的协程框架一般都是设计成1:N 模式。所谓1:N 就是一个线程作为一个容器里面放置多个协程。那么谁来适时的切换这些协程？答案是有协程自己主动让出CPU，也就是每个协程池里面有一个调度器， 这个调度器是被动调度的。意思就是他不会主动调度。而且当一个协程发现自己执行不下去了(比如异步等待网络的数据回来，但是当前还没有数据到)， 这个时候就可以由这个协程通知调度器，这个时候执行到调度器的代码，调度器根据事先设计好的调度算法找到当前最需要CPU的协程。切换这个协程的CPU上下文把CPU的运行权交个这个协程，直到这个协程出现执行不下去需要等等的情况，或者它调用主动让出CPU的API之类，触发下一次调度。

### 1.3 应用场景

在CPU密集型程序中，由于没有IO等相对耗时操作，协程调度器不会被触发，就会出现其他协程执行不到的情况。因此协程仅适用于切换IO密集型的耗时操作。

前面我们讲到，协程切换比多线程更加高效，而且由于CPython中[GIL](thread.md#_4-全局解释器锁-gil)的存在，多线程本质上仍是单线程。

综合来看，**IO密集型应用可以选择协程(推荐)和多线程，而计算密集型应用推荐使用多进程以充分利用多核CPU性能。**

## 2. yield 协程
最简单的我们可以借助 [yield](generator.md#_3-yield) 实现协程。如下面示例代码，`A() B()`两个协程会交替执行。

```py {7,14}
import time


def A():
    while True:
        print("----A---")
        yield
        time.sleep(0.5)


def B(c):
    while True:
        print("----B---")
        c.next()
        time.sleep(0.5)


a = A()  # 创建一个生成器
B(a)
```

## 3. greenlet
通过`yield`关键字控制协程，代码不易理解，可读性不高。`greenlet`库对其进行了封装，使得协程切换更加简单且可读性更高。

```sh
# 安装greenlet
pip3 install greenlet
```

```py {8,15,19,20,22}
from greenlet import greenlet
import time


def A():
    while True:
        print("---A--")
        b.switch()
        time.sleep(0.5)


def B():
    while True:
        print("---B--")
        a.switch()
        time.sleep(0.5)


a = greenlet(A)
b = greenlet(B)

a.switch()  # 切换到a协程并运行
```

## 4. gevent
`greenlet`库简单实现了协程但仍需要手动而控制协程切换，而`gevent`库则是对其更高级别的封装，且实现了协程的自动任务切换。

当`gevent`遇到IO等耗时操作(如网络通信，文件读写等)，会自动切换到其它的协程，等到IO操作完成，会在适当的时机切换回来继续执行。

```sh
# 安装gevent
pip3 install gevent
```

```py {1,7,16,17}
from gevent import *


def A():
    while True:
        print("---A--")
        sleep(0.5)  # 模拟耗时操作。必须使用gevent中的sleep()


def B():
    while True:
        print("---B--")
        sleep(0.5)


a = spawn(A)  # 创建协程
b = spawn(B)
a.join()  # 等待协程执行完成
b.join()
```
实际开发中我们不会用`gevent.sleep()`去切换协程，而是在执行到IO操作时`gevent`自动切换,如以下示例。

```py {1,3,16}
from gevent import monkey  # 从gevent包导入monkey模块

monkey.patch_all()  # 执行所有匹配函数。仅在有IO操作时需要。patch必须在其他任何语句之前，包括导包
from gevent import spawn, joinall  # 导入gevent模块
import requests
from time import ctime


def download(url):
    print("GET: %s %s" % (url, ctime()))
    response = requests.get(url)  # 耗时网络请求
    print("received %d bytes from %s" % (len(response.content), url))
    response.close()


joinall([
    spawn(download, "https://python.a-nomad.com"),
    spawn(download, "https://dotnet.a-nomad.com"),
    spawn(download, "https://linux.a-nomad.com")
])
```