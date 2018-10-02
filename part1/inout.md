# 输入输出

* [1. 输入](#1-输入)
* [2. 输出](#2-输出)

## 1. 输入
Python捕获用户输入使用`input`函数。任何输入都将以`str`类型接收。

```py
age = input("请输入您的年龄")
print(age)
```

>  python2.x中使用`raw_input`函数获取用户输入，而`input`则只能接收表达式。python3.x已将两者合并为`input`函数

## 2. 输出
Python中输出内容使用`Print`函数。普通的输入一个字符串可以直接使用`print(str)`如,`print("Hello")`。如果要按照特定格输出内容或者输出动态内容，就需要利用格式化输出，Python的格式化输出于C语言类似。

格式符|转换
-:|:-
%c | 字符
%s | 字符串
%d | 十进制整数。`%06d`表示至少6位整数,不足6位自动左侧补0,超过6为正常输出
%u | 无符号十进制整数
%o | 八进制整数
%x | 十六进制整数（小写字母0x）
%X | 十六进制整数（大写字母0X）
%f | 浮点数。`%.2f`表示显示2位小数,不足2为右侧自动补0，超过6位只截取显示2位
%e | 科学计数法（小写'e'）
%E | 科学计数法（大写“E”）
%g | ％f和％e 的简写
%G | ％f和％E的简写

> 格式化输出中使用使用`%%`输出`%`，输出换行使用 `\n`

```py
name = "colin"
print("my name is %s" %name)

age = 20
print("I'm %d years old" %age)

idno=1
print("my id number is %06d" %idno)

phone=110
balance=10.2
print("my phone number is %s and \nits balance is %.2f" %(phone,balance))

percent=0.875
print("my homework is finished about %.2f%%" %(percent*100))
```
输出内容为
```
my name is colin
I'm 20 years old
my id number is 000001
my phone number is 110 
and its balance is 10.20
my homework is finished about 87.50%
```

