# 日志处理

`logging`模块中封装了基础的日志功能，它提供了以下两种方式来记录日志：

* 使用logging日志模块函数简单记录日志
* 使用logging日志系统组件记录日志

前者封装了后者相关内容，提供了更简答的使用方式。

## 1. logging 简单日志

### 1.1 记录日志

```py
import logging

logging.debug('debug log')
logging.info('info log')
logging.warning('warning log')
logging.error('error log')
logging.critical('critical log')
```

以上`logging.debug()`等方法的定义中，除了`msg`和`args`参数，还有一个`**kwargs`参数支持3个关键字参数`exc_info, stack_info, extra`。

可选命名参数|说明
:-|:-
`exc_info`|bool。若为True会将异常信息添加到日志消息中
`stack_info`|bool。若为True，堆栈信息将会被添加到日志信息中
`extra`|dict。用来定义消息格式中所含的字段


### 1.2 简单配置

`logging.basicConfig()`用于对日志进行简单配置。

basicConfig 参数|描述
:-|:-
level|设置日志最低输出级别，默认为`logging.WARNING`(枚举)
format|格式化日志输出。可选字段格式见下表
filename|设置日志保存文件
filemode|设置日志文件写入方式。`w`表示覆盖写入，`a`表示追加写入
stream|日志输出目标stream，如sys.stdout、sys.stderr以及网络stream
handlers|日志处理程序列表

<small>filename、stream和handlers这三个配置项只能同时存在一项，否则会引发`ValueError`异常。</small>


format 字段格式|描述
:-|:-
`%(levelname)s`|级别名称(被filter修改后的)
`%(levelno)s`|日志记录的数字形式的日志级别(10, 20, 30, 40, 50)
`%(name)s`|logger名称，默认为`root`
`%(pathname)s`|日志产生模块的完整路径名
`%(filename)s`|pathname的文件名部分
`%(module)s`|filename无后缀
`%(lineno)d`|当前行号
`%(funcName)s`|日志产生的函数名
`%(message)s`|日志内容
`%(asctime)s`|日记产生时间
`%(process)s`|当前进程ID
`%(processName)s`|当前进程名称
`%(thread)s`|当前线程ID
`%(threadName)s`|当前线程名称


```py
import logging

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s - %(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s',
                    filename="log.txt",
                    filemode="a")

logging.warning('this is a warning log')
```

**程序中只需要进行一次日志配置，即可全局生效，一般在程序入口做统一配置**

## 2. logging 组件

组件|说明
:-|:-
`loggers`|提供应用程序代码直接使用的接口
`handlers`|用于将日志记录发送到指定的目的位置
`filters`|提供更细粒度的日志过滤功能，用于决定哪些日志记录将会被输出
`formatters`|用于控制日志信息的最终输出格式

`loggers`负责采集日志，`handlers`负责处理日志，如发送异常信息，每个`handler`可以定制`filters`过滤日志以及`formatters`格式化日志。

### 2.1 Logger

`logging.getLogger([name])`可以获取一个`Logger`对象,默认名为`root`。

方法|描述
:-|:-
`setLevel()`|设置最低日志级别。低于此级别日志将被丢弃
`addHandler() / removeHandler()`|新增/删除一个`handler`
`addFilter() / removeFilter()`|新增/删除一个`filter`
`debug() / info() / warning() / error() / critical()`|记录不同级别日志
`exception()`|记录异常日志(含堆栈追踪信息)，通常`exception handler`中使用

* `Logger`对象通过其名称构成层级结构。其名称以`'.'`分割，`'.'`后面的`logger`是前面的`children`，如，名为 `foo.bar`, `foo.bar.baz` 和 `foo.bam`的`logger`都是 `foo` 的`children`。
* `Logger`对象都有一个有效等级(effective level),若未显式设置则将从其祖先继承。`root`默认level为`WARNING`
* `Logger`对象的`handler`处理完成后，会沿记成链继续向上传递。因此`root`绑定的`handler`可以捕捉到所有日志。可以设置`logger.propagate=False`关闭某个对象的传递机制。

### 2.2 Handler
`Handler`对象的作用是（基于日志消息的level）将消息分发到handler指定的位置（文件、网络、邮件等）。`Logger`对象添加任意个`Handler`对象。

方法|描述
:-|:-
`setLevel()`|设置最低日志级别。低于此级别日志将被丢弃
`setFormatter()`|设置一个`formatter`
`addFilter() / removeFilter()`|	添加/删除一个`filter`

`Handler`是一个抽象类，不应被实例化，其常用示例子类如下表。

Handler|描述
:-|:-
`logging.StreamHandler`|将日志发送到输出到Stream，如std.out, std.err或任何file-like对象。
`logging.FileHandler`|将日志发送到磁盘文件，默认情况下文件大小会无限增长
`logging.NullHandler`|忽略error messages。可以避免`No handlers could be found for logger XXX`错误
`logging.handlers.RotatingFileHandler`|将日志发送到磁盘文件，并支持日志文件按大小切割
`logging.hanlders.TimedRotatingFileHandler`|将日志发送到磁盘文件，并支持日志文件按时间切割
`logging.handlers.SocketHandler`|将日志发送到[TCP Socket](../senior/tcp.md)
`logging.handlers.DatagramHandler`|将日志发送到[UDP Socket](../senior/udp.md)
`logging.handlers.HTTPHandler`|将日志发送到web服务器(支持GET和POST)
`logging.handlers.SMTPHandler`|将日志发送到email
`logging.handlers.QueueHandler`|将日志添加到指定[多进程队列](../senior/process.html#_4-进程间通信-ipc)


### 2.3 Formater
`Formater`用于配置日志信息的最终顺序、结构和内容。可以直接实例化`Formatter`类。也可以实现一个`Formatter`的子类来完成自定义处理行为。

```py
Formatter(fmt=None, datefmt=None, style='%')
```
* fmt。消息格式化字符串，默认为message原始值
* datefmt。日期格式字符串，默认为`%Y-%m-%d %H:%M:%S`
* style。可取值为`%`,`{`,`$`，默认为`%`

### 2.4 Filter
`Filter`可以被`Handler`和`Logger`用来做比`level`更细粒度的、更复杂的过滤功能。`Filter`是一个过滤器基类，它只允许某个`logger`层级下的日志事件通过过滤。

```py
class logging.Filter(name='')
    filter(record)
```
如，一个filter实例化时传递的name参数值为'A.B'，那么该filter实例将只允许名称为类似如下规则的loggers产生的日志记录通过过滤：'A.B'，'A.B,C'，'A.B.C.D'，'A.B.D'，而名称为'A.BB', 'B.A.B'的loggers产生的日志则会被过滤掉。如果name的值为空字符串，则允许所有的日志事件通过过滤。

`filter`方法用于具体控制传递的`record`记录是否能通过过滤，如果该方法返回值为`0`表示不能通过过滤，返回值为非`0`表示可以通过过滤。如果有需要，也可以在`filter`(`record`)方法内部改变该`record`，比如添加、删除或修改一些属性。我们还可以通过`filter`做一些统计工作，比如可以计算下被一个特殊的`logger`或`handler`所处理的`record`数量等。

## 3. 日志处理

### 3.1 日志处理流程
使用`logging`四大组件处理日志的简要流程如下:

1. 创建一个`logger`
2. 设置`logger`的日志的等级
3. 创建合适的`Handler`
4. 设置每个`Handler`的日志等级
5. 创建日志的`Formatter`
6. 向`Handler`中添加`Formatter`
7. 将上面创建的`Handler`添加到`logger`中
8. 输出日志

一条日志信息要想被最终输出需要依次经过以下几次过滤：
* `logger`等级过滤
* `logger.filter`过滤
* `logger.handler`等级过滤
* `logger.handler.filter`过滤

### 3.2 记录日志(组件方式)

```py {10,28}
import logging
from logging import handlers

# 创建logger
logger = logging.getLogger("colin_logger")  # 如果参数为空则返回root logger
logger.setLevel(logging.WARNING)  # 设置logger日志等级

# 创建handler
stream_handler = logging.StreamHandler()  # 打印到控制台
socket_handler = handlers.SocketHandler("192.168.0.200", 5000)  # 发送到指定TCP服务器

# 设置输出日志格式
formatter = logging.Formatter(fmt="%(asctime)s - %(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s")

# 为handler指定输出格式，注意大小写
stream_handler.setFormatter(formatter)
socket_handler.setFormatter(formatter)

# 为logger添加的日志处理器
logger.addHandler(socket_handler)
logger.addHandler(stream_handler)

# 输出不同级别的log
logger.warning("this is a warning log")
try:
    print(colin)  # 测试异常
except Exception as ex:
    logger.error(ex, exc_info=1, stack_info=1)  # 记录错误日志,同时记录异常和堆栈信息
```

## 4. 日志配置
配置日志输出有以下三种方式。
* 代码显式的创建`loggers`, `handlers`和`formatters`并分别调用它们的配置函数
* 创建一个日志配置文件，然后使用`fileConfig`()函数来读取该文件的内容
* 创建一个包含配置信息的`dict`，然后把它传递个`dictConfig`()函数

三种方式更详尽内容参阅 [https://www.cnblogs.com/yyds/p/6885182.html](https://www.cnblogs.com/yyds/p/6885182.html)

## 5. 记录上下文信息
除了传递给日志记录函数的参数外，有时候我们还想在日志输出中包含一些额外的上下文信息。比如，在一个网络应用中，可能希望在日志中记录客户端的特定信息，如：远程客户端的IP地址和用户名。这里我们来介绍以下几种实现方式：

* 通过向日志记录函数传递一个`extra`参数引入上下文信息
* 使用`LoggerAdapters`引入上下文信息
* 使用`Filters`引入上下文信息

三种方式更详尽内容参阅 [https://www.cnblogs.com/yyds/p/6897964.html](https://www.cnblogs.com/yyds/p/6897964.html)

## 6. 分布式日志
如果需要使用分布式日志,可以借助`logging`的`HTTPHandler/SocketHandler/DatagramHandler`等组件发送日志到分布式日志服务器监听地址。

[ELK](https://colin-chang.site/architecture/log/elk.html)作为流行的分布式日志框架，可以借助[Docker快速搭建](https://github.com/colin-chang/ELK.Stack)。

分布式日志服务器搭建和使用参见 [https://colin-chang.site/architecture/log/elk.html](https://colin-chang.site/architecture/log/elk.html)