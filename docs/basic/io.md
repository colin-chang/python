# 输入输出

## 1. 输入
Python捕获用户输入使用`input`函数。任何输入都将以`str`类型接收。

```py
age = input("请输入您的年龄")
print(age)
```

::: warning  
Python2.x中使用`raw_input`函数获取用户输入，而`input`则只能接收表达式。Python3.x已将两者合并为`input`函数
:::

## 2. 输出
Python中输出内容使用`Print`函数。普通的输出一个字符串可以直接使用`print(str)`如,`print("Hello")`。如果要按照特定格输出内容或者输出动态内容，就需要利用格式化输出，Python的格式化输出于C语言类似。

格式符|转换
-:|:-
%c | 字符
%s | 字符串
%d | 十进制整数。`%06d`表示至少6位整数,不足6位自动左侧补0,超过6为正常输出
%u | 无符号十进制整数
%o | 八进制整数
%x | 十六进制整数（小写字母0x）
%X | 十六进制整数（大写字母0X）
%f | 浮点数。`%.2f`表示显示2位小数,不足2位右侧自动补0，超过2位则只截取显示2位
%e | 科学计数法（小写'e'）
%E | 科学计数法（大写“E”）
%g | ％f和％e 的简写
%G | ％f和％E的简写

::: warning 
格式化输出中使用使用`%%`输出`%`
:::

```py
name = "Colin"
print("my name is %s" % name)

age = 20
print("I'm %d years old" % age)

idno = 1
print("my ID NO is %06d" % idno)

phone_number = 110
balance = 10.2
print("my phone number is %s and its balance is %.2f" % (phone_number, balance))

percent = 0.875
print("my homework is finished about %.2f%%" % (percent * 100))

"""
输出内容为:
my name is colin
I'm 20 years old
my id number is 000001
my phone number is 110 
and its balance is 10.20
my homework is finished about 87.50%
"""
```

::: tip
print函数`end`参数控制输出内容以什么结尾，默认为`end='\n'`输出完成自动换行,如果想单行输出可以指定`end=''`
:::

```py
print(123)
print(456)

"""
123
456
"""

print(123,end='')
print(456)

"""
123456
"""
```

## 3. 程序参数

当我们执行Python程序时可以指定需要的参数，这些参数可以通过以下方式获得。

`main.py`:
```py
import sys

print(sys.argv)
```
执行以下`python3 main.py colin 18`启动程序,程序会输出`['main.py', 'colin', '18']`。

我们看出`sys.argv`是一个参数列表，第一个参数是当前程序入口文件，后面则是我们的自定义参数。