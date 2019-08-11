# 模块/包

## 1. 模块简介
有过C语言编程经验的朋友都知道在C语言中如果要引用sqrt函数，必须用语句`#include <math.h>`引入`math.h`这个头文件，否则是无法正常进行调用的。

在python中有一个概念叫做模块（module），这个和C语言中的头文件以及Java中的包很类似。模块就好比是工具包，要想使用这个工具包中的工具(就好比函数)，就需要导入这个模块

在python中，相关功能代码写到一个python文件中，我们就称该文件为模块，模块的名字就是文件的名字。如果模块需要在其他地方使用，文件名需要严格遵循标识符命名规范。

## 2. 导入模块
导入一个模块时，python会首先把模块文件的代码执行一遍。

为了提升代码执行效率，解释器会在首次程序执行时把需要使用的模块解释成的字节码文件缓存到`__pycache__`目录下，缓存文件名一般为`模块名.解释器.python版本.pyc`。程序下次执行需要调用模块时会首先从缓存中读取，避免耗时的重复解释。

### 2.1 import
在python中用关键字import来引入某个模块。使用`模块名.成员名`方式调用的。

```py
import time   # 引入time模块

time.ctime()  # 调用time模块ctime函数
time.sleep(5)  # 让程序延迟执行5秒
```

### 2.2 from...import...

#### 2.2.1 模块的成员
如果要引用某个模块中指定成员,可以使用`from module import member`语法。这只会单独引入指定的成员，而不会引入整个模块。

```py
from math import sqrt,sin  # 引入math模块的sqrt和sin函数

sqrt(4)  # 调用引入的模块函数
sin(60)

'''
此方式引入，调用函数时只能给出函数名，不能给出模块名
当多个模块中含有相同名称函数时，后面引入会覆盖前面引入

如先引入A模块funciton(),再引入B模块function(),调用function函数会执行B模块的function()
'''
```

#### 2.2.2 路径下模块
如果要引用某个路径中指定模块,可以使用`from path import module`语法。python3中在非根目录中模块之间引用不支持使用`import module`方式，此时就需要使用`from path import module`。python2同时支持以上两种语法。

在包(`package`)`__init__`文件中导入包模块时常用此方式。

### 2.3 别名
`import`模块时可以使用`as`关键字定义模块或模块成员别名。定义别名后原名不能再使用。

* 模块别名

```py
import math as mt

mt.sqrt(4)
```

* 模块成员别名

```py
from math import sqrt as kf

kf(4)
```

### 2.4 导入方式对比

对比内容|`import...`|`from...import...`
:-|:-|:-
导入全部内容|`import module`|`from module import *`
[开放内容控制](#_3-4-all)(`__all__`)|不支持|支持
[模块重新加载](#_3-1-重新加载)|支持。`importlib.reload(module)`|不支持
[可访问性控制](accessibility.md)|所有级别成员均可访问，不利于访问控制|模块内全局变量(形如`_xx`)和私有变量(形如`__xx`)不可访问。


::: tip 导入模块全部内容
如果要引入一个模块的全部内容有以下两种方式。

第一种方式通过模块名.成员名访问模块成员。第二种方式直接使用成员名访问模块成员，会存在不同模块之间同名成员覆盖的问题(可以通过[ as ](#_2-3-别名)指定别名区分)。
:::

```py
import module

from module import *
```




## 3. 模块高级
### 3.1 重新加载
当我们导入一个模块使用过程中，如果此模块内容被修改，就需要我们重新加载模块。`importlib`模块的`reload(module)`方法就用于重新加载模块。

```py {5,7}
import test

test.greet()

from importlib import reload

reload(test)  # 重新加载模块
test.greet()
```

::: warning
`reload`仅支持`import module`方式导入的模块
:::

### 3.2 模块查找
导入一个模块时，python解释器会按照一定的顺序到在某些目录下寻找模块文件。搜索目录和顺序存储在`sys`模块的`path`变量中。
```py {4}
import sys


print(sys.path)
```
`sys.path`是一个目录列表，python解释器会按照列表顺序依次查找，找到即止。最终找不到会抛出`ModuleNotFoundError`异常。

既然定位模块依赖`sys.path`，那我们可以按需修改此列表。如果我们想要解释器到我们自定义的某个路径下查找模块文件，那我们可以将目录加入到`sys.path`当中，也可以控制其优先顺序。

```py {1,2}
sys.path.append("/home/colin/modules")
sys.path.insert(0,"/home/robin/modules")  # 确保先搜索这个路径
```

### 3.3 循环导入
`a.py`:
```py
from b import b 

def a():
    print("hello, a")
    b() 

a() # 异常 ImportError
```
`b.py`:
```py
from a import a

def b():
    print("hello, b")
    a()
```
以上两个模块中代码相互以来会导致循环导入(`ImportError`)异常。

我们通常通过以下方式避免循环导入问题。

1. 分层设计，避免基础模块间引用，降低模块耦合。如果a,b基础模块间存在依赖，可以抽象一个更高层c模块导入a,b后进行逻辑聚合
2. 需要依赖时再导入。如在一个函数中依赖其他模块，则可以在函数内部进行导入

### 3.4 \_\_all\_\_
#### 3.4.1 模块
当使用`from ... import *`方式导入一个模块全部内容时，在模块中可以通过`__all__`变量指定对外公开的成员，只有在其列表中的成员才允许被外部使用。

通过`import...`方式导入时，`__all__`无效。

`test.py`:
```py
__all__ = ["TestClass", "sum"]


class TestClass:
    pass


num = 123


def sum(a, b):
    return a + b
```

`main.py`:
```py
from test import *

c = TestClass()
sum(1, 2)
print(num)  # 异常。num没有出现在test模块的__all__列表中，外部不可访问
```

#### 3.4.2 包
通过`from ... import *`方式导入包时，在包的`__init__`文件中可以通过`__all__`指定对外公开的模块，只有在其列表中的模块才允许被外部使用。

相关使用方式参阅 [包](#_4-包)。

### 3.5 \_\_name\_\_
实际开中，模块编写完成后，为了验证模块是否达到预期效果，通常会在模块文件中添加一些测试代码，但测试代码不应该在模块被外部调用时执行。

python模块在执行时有一个`__name__`变量表征当前代码被执行调用的文件。此变量值为`__main__`时表示当前在模块定义文件内部执行,否则为模块被外部调用，值为引用此模块的文件名(不含扩展名)。因此，我们可以选择性的执行模块测试代码。

`calc.py`:
```py
def sum(a, b):
    return a + b


# 以下测试代码只会在该模块内部执行
if __name__ == '__main__':
    a, b = 1, 2
    c = sum(a, b)
    print("test inside. %d + %d = %d" % (a, b, c))
```
`main.py`:
```py
import calc # 导入模块时不会打印测试信息


sum = calc.sum(1, 2)
print(sum)
```

除了模块外，类和函数也有`__name__`属性表示自身名称。

```py
class Person:
    def sayhi():
        pass

Person.__name__  # Person
Person().sayhi.__name__  # sayhi
```

## 4. 包
### 4.1 包使用简介
日常开发中，我们通常会将关联性较强的模块组织在一起，放在同一个目录下，为了管理其中的模块，我们通常通会在目录中建一个名为`__init__.py`的特殊文件(python2必须,python3非必须)，类似于模块清单，此时我们就把这个目录就称之为包。python包相当于C#中的类库和Java中的包。

当包被引用时，会首先执行包的`__init__.py`文件,它控制着包的导入行为。与模块使用类似，包也有两种引用方式，示例如下图：

![包引用示例](../img/basic/package.jpg)

包支持嵌套使用，即在包中包含子包，多级目录。

### 4.2 发布包
包开发完成后，如果想共享给他人，就需要我们发布包。
#### 1) 配置
假设我们有包目录结构如下。
```
.
├── setup.py
├── notification
│   ├── __init__.py
│   ├── mail.py
│   └── sms.py
└── persistance
    ├── __init__.py
    ├── db.py
    └── file.py
```
在包同级目录下创建`setup.py`文件，内容如下：
```py
from distutils.core import setup

setup(name="colinutils", version="1.0", description="some utils", author="colin chang",
      py_modules=['notification.mail', 'notification.sms', 'persistance.db', 'persistance.file'])
```
#### 2) 构建
```sh
python3 setup.py build
```
构建完成后会生成`build`目录。
```py
.
├── build
│   └── lib
│       ├── notification
│       │   ├── __init__.py
│       │   ├── mail.py
│       │   └── sms.py
│       └── persistance
│           ├── __init__.py
│           ├── db.py
│           └── file.py
├── setup.py
├── notification
│   ├── __init__.py
│   ├── mail.py
│   └── sms.py
└── persistance
    ├── __init__.py
    ├── db.py
    └── file.py
```
#### 3) 打包
```sh
python3 setup.py sdist
```
打包完成后会生成`dist`目录和`MANIFEST`文件,压缩包`colinutils-1.0.tar.gz`生成在`dist`目录下。
```py
.
├── build
│   └── lib
│       ├── notification
│       │   ├── __init__.py
│       │   ├── mail.py
│       │   └── sms.py
│       └── persistance
│           ├── __init__.py
│           ├── db.py
│           └── file.py
├── dist
│   └── colinutils-1.0.tar.gz
├── MANIFEST.py
├── setup.py
├── notification
│   ├── __init__.py
│   ├── mail.py
│   └── sms.py
└── persistance
    ├── __init__.py
    ├── db.py
    └── file.py
```
至此包的发布就完成了，我们可以把生成的压缩包分享给他人。

#### 4) 安装
拿到分享的压缩包后解压执行如下命令进行安装
```sh
tar -zxvf colinutils-1.0.tar.gz && cd colinutils-1.0 # 解压并进入解压目录
python3 setup.py install
```

#### 5) 引用
安装完成后就可以像系统模块一样在任意位置所以使用。
```py
# 方式1
from notification import *

mail.send("zhangcheng5468@gmail.com", "hi there")
sms.send("110", "hi there")

# 方式2
import persistance

persistance.db.save("db0", "data")
persistance.file.save("file.txt", "data")
```

## 5. 标准库
python的强大有很大一部分是因为其庞大的标准库(standard library)提供了各式各样的功能，基本上日常使用中你所需要的功能都可以从中找到，从而大大减轻开发人员的压力，节省开发人员的时间。标准库会随着Python解释器，一起安装在你的电脑中的。它是python的一个组成部分。

标准库|说明
:-|:-
builtins|内建函数默认加载
os|操作系统接口
sys|Python自身的运行环境
functools|常用的工具
json|编码和解码JSON对象
logging|记录日志，调试
multiprocessing|多进程
threading|多线程
copy|拷贝
time|时间
datetime|日期和时间
calendar|日历
hashlib|加密算法
random|生成随机数
re|字符串正则匹配
socket|标准的BSD Sockets API
shutil|文件和目录管理
glob|基于文件通配符搜索

```py
# 标准库使用示例
import hashlib

md5 = hashlib.md5()
md5.update(b"something to encrypt")
md5.hexdigest()
```

pyhton除了强大标准库，还有异常丰富的第三方扩展库。

扩展库|说明
:-|:-
requests|使用的是urllib3，继承了urllib2的所有特性
urllib|基于http的高层库
scrapy|爬虫
beautifulsoup4|HTML/XML的解析器
celery|分布式任务调度模块
redis|缓存
Pillow(PIL)|图像处理
xlsxwriter|仅写excle功能,支持xlsx
xlwt|仅写excle功能,支持xls ,2013或更早版office
xlrd|仅读excle功能
elasticsearch|全文搜索引擎
pymysql|数据库连接库
mongoengine/pymongo|mongodbpython接口
matplotlib|画图
numpy/scipy|科学计算
django/tornado/flask|web框架
xmltodict|xml 转dict
SimpleHTTPServer|简单地HTTP Server,不使用Web框架
gevent|基于协程的Python网络库
fabric|系统管理
pandas|数据处理库
scikit-learn|机器学习库