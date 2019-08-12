# 多线程

## 1. 多线程
python的`thread`模块比较底层的，而`threading`模块是基于`thread`模块的包装，使用更加简单方便。

### 1.1 Thread

`threading.Thread`用法与 [multiprocessing.Progress](process.md#_2-process) 基本相同，相关参数配置也如出一辙，此处不再赘述。

```py
from threading import Thread, enumerate
import time


def sing():
    for i in range(3):
        print("singing %d" % i)
        time.sleep(1)


def dance():
    for i in range(3):
        print("dancing %d" % i)
        time.sleep(1)


def main():
    thread_sing = Thread(target=sing)  # 创建线程
    thread_dance = Thread(target=dance)

    thread_sing.start()  # 启动线程
    thread_dance.start()

    for thread in enumerate():  # 枚举所有线程(包括主线程)
        print(thread)


if __name__ == '__main__':
    main()
```

### 1.2 自定义线程封装
与封装进程类似，我们也可以用同样方式封装线程。

```py
from threading import Thread
import time


class PRThread(Thread):
    def __init__(self, request):
        super().__init__()  # 务必执行父类初始化方法
        self.__request = request

    def run(self):  # 会被自动调用
        time.sleep(2)  # 模拟耗时操作
        print("%s processed" % self.__request)


def main():
    thread = PRThread("request-0")
    thread.start()


if __name__ == '__main__':
    main()
```