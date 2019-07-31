# 函数

## 1. 函数定义与调用
```py
# 定义函数
def function_name(arg1: dataType, arg2: dataType, ...):
    '''
    函数注释文档
    :param arg1: 第一个参数说明
    :param arg2: 第二个参数说明
    :...:其他参数说明
    :return: 函数返回值
    '''
    do something

# 调用函数
function_name(arg1, arg2)
function_name(arg2=sth, arg1=sth)
```
* 函数必须先定义后调用，Python顺序逐行解释执行
* 函数注释文档类似于C#中`///`中对函数的说明，说明可以在`Quick Documentation`中查看
* 函数参数默认按照函数定义顺序书写。如果只提供部分参数或者无序提供，可以显式声明形参名称
* 函数参数数据类型可以省略
* Python不支持函数重载

```py
def sum(a, b):
    '''
    计算两个数字的和
    :param a: 第一数字
    :param b: 第二个数字
    :return: 和值
    '''
    return a + b


sum(1, 2)
sum(b=3, a=1)
```

## 2. 函数参数
### 2.1 缺省参数
在形参中默认有值的参数，称之为缺省参数，缺省位于参数列表的最后面。
```py
def print_info(name, age=18, gender='男'):
    print("name = %s age = %d gender = %s" % (name, age, gender))


print_info("colin")
# 输出 name = colin age = 18 gender = 男
```

### 2.2 不定长参数
有时可能需要一个函数能处理比当初声明时更多的参数, 这些参数叫做不定长参数，声明时不会命名，类似与C#中可变参数。
语法格式如下：
```py
def functionname([formal_args,] *args, **kwargs):
   do something
```
* `*args`会存放所有未命名的变量参数，args为元组
* `**kwargs`会存放命名参数，即形如key=value的参数， kwargs为字典
* 如果同时存在`*args`,`**kwargs`,缺省参数。三者的顺序为 `*args 缺省参数 **kwargs`
* 如果参数较为复杂或不确定长度，也可使用元组字典等复杂类型传参

```py
def fun(a, b, *args, **kwargs):
    print("a = %d" % a)
    print("b = %d" % b)
    print("args: ")
    print(args)
    print("kwargs: ")
    for key, value in kwargs.items():
        print("%s = %s" % (key, value))


fun(1, 2, 3, 4, 5, m=6, n=7, p=8)

# 输出结果为
a = 1
b = 2
args: 
(3, 4, 5)
kwargs: 
m = 6
n = 7
p = 8
```

## 3. 变量作用域
* 函数内部定义的变量为局部变量，外部的为全局变量。如果在函数内部定义了与全局变量同名的局部变量，则变量的修改只在函数内部生效，不会修改全局变量
* 函数中使用`global`引用全局变量后,如果函数中出现与全局变量同名的局部变量，变量修改后全局生效。

```py
a = 0


def fun1():
    a = 100
    print(a)


def fun2():
    print(a)


def fun3():
    global a
    a = 200
    print(a)


def fun4():
    print(a)


fun1()
fun2()
fun3()
fun4()

# 输出结果
100
0
200
200
```