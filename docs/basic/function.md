# 函数

## 1. 声明调用
```py
# 定义函数
def function_name(arg1: data_type, arg2: data_type, ...) -> return_type:
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
* 函数必须先定义后调用，python顺序逐行解释执行
* 函数注释文档类似于C#中`///`中对函数的说明，可以在`Quick Documentation`中查看(F1)。命令行中可以使用`help()`函数查看，如`help(print)`可以查看`print`函数说明文档
* 函数参数默认按照函数定义顺序书写。如果只提供部分参数或者无序提供，可以显式声明形参名称
* 函数参数和返回值数据类型可以省略
* 函数有多个返回值时可以通过元组或列表返回。元组做函数返回值时括号可以省略。

```py
# 完整版
def sum(x: int, y: int) -> int:
    '''
    计算两个数字的和
    :param x: 第一个加数
    :param y:第二个加数
    :return:和
    '''
    return x + y


# 简化版
'''
def sum(x, y):
    return x + y
'''

sum(1, 2)
sum(b=3, a=1)
```

## 2. 函数参数
### 2.1 缺省参数
在形参中默认有值的参数，称之为缺省参数，缺省位于参数列表的最后面。
```py {1}
def print_info(name, age=18, gender='男'):
    print("name = %s age = %d gender = %s" % (name, age, gender))


print_info("colin")
# 输出 name = colin age = 18 gender = 男
```

::: tip 偏函数
`functiontool`模块中的`partial()`被称作偏函数，它可以把一个函数的某些参数设置默认值。
:::
```py {7}
import functools


def line(k, b, x):
    return k * x + b

ln = functools.partial(line, 2, 3) # 固定了line()中k=2,b=3，此处相当于得到了一个线性函数。
[(i, ln(i)) for i in range(5)] # [(0, 3), (1, 5), (2, 7), (3, 9), (4, 11)]
```

**如果缺省参数是可变类型，参数只会初始化一次，下次调用时会使用上次已经存在的值**，一定要避免这么写，如果确实需要默认参数可以在函数内部初始化，不要把可变类型做缺省参数。

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

```py{1}
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

如果以变量形式对 `*args`和`**kwargs` 传参，则需要按如下方式对实参拆包,否则未命名参数都会作为元组组成部分传递被 `*args`接收。

```py
args = (3, 4, 5)
kwargs = {"m": 6, "n": 7, "p": 8}
fun(1, 2, *args, **kwargs)        # 对元组和字典拆包
```


## 3. 作用域
### 3.1 局部变量与全局变量
* 函数内部定义的变量为局部变量，外部的为全局变量。如果在函数内部定义了与全局变量同名的局部变量，则变量的修改只在函数内部生效，不会修改全局变量。如果函数内部没有定义而直接修改全局变量(列表或字典)，全局变量则会被全局修改。
* 函数中使用`global`引用全局变量后,如果函数中出现与全局变量同名的局部变量，变量修改后全局生效。

```py {14}
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


fun1()  # 100
fun2()  # 0
fun3()  # 200
fun4()  # 200
```

局部变量与全局变量同名会在一定程度上降低代码可读性，实际开发中我们应该遵循一定规则避免此问题，如全局变量使用global前缀等，如全局变量为`global_name`，局部变量为`name`。

:::tip
* `locals()` 可以查看当前作用域中所有局部变量
* `globals()` 可以查看当前作用域中所有全局变量
:::

```py {6}
num = 10


def test():
    num = 20
    print(locals())  # {'num': 20}


test()
```

### 3.2 LEGB 规则
LEGB是指 `局部作用域(locals)—>闭包函数作用域(enclosing function)->全局作用域(globals)->内建模块作用域(builtins)`
python 使用LEGB顺序来查找变量，找到即止，LEGB查找完毕没有找到会抛出`NameError`异常。

```py
a = 0


def test():
    b = 1

    def inner():
        c = 2
        print("locals : c = %d" % c)
        print("enclosing function : b = %d" % b)
        print("globals : a = %d" % a)
        print("builtins : __name__ = %s" % __name__)

    return inner


func = test()
func()
```

## 4. lambda 匿名函数
Pyton中可以使用lambda表达式创建匿名函数。语法格式为 `lambda [arg1[, arg2, ... argN]]: expression`。可以有任意参数任，且主体只有一条表达式返回。

```py
sum = lambda x, y: x + y
```

lambda函数主要用来写一些小体量的一次性函数，简化代码,常作为函数参数传递，类似与C#的委托和Lamda表达式。

## 5. 闭包
### 5.1 函数引用
函数创建的过程为，python解释器执行到`def`关键字后会在内存中创建函数对象，然后将对象引用返回并赋值给函数名。相当于函数名是指向函数对象的一个变量。其实，不仅仅是函数创建过程如此，python中一切皆对象，而对象的创建过程都是先执行的创建代码完后返回对象引用给对应的变量。

```py {1,4,5,8}
def func():
    print("func...")

def func():
    print("new func...")

func() # new func
f = func  # 函数引用
f()  # new func
```
以上代码，python解释器执行到第1行时会在内存中创建一个函数并将`func`指向此函数，执行到第4行时则会创建一个新的函数并将`func`指向此新建的函数，如果此时原来的函数没有其他变量指向，就会被GC自动回收。由此我们发现，**python中不支持函数重载，如果存在同名函数，则仅最后声明的函数可用。**

直接将函数名赋值给一个变量相当于将一个新的变量指向了现有函数，这种对函数地址的引用类似于C#当中的委托和C/C++中的函数指针。

### 5.2 闭包
在函数内部定义再定义一个内部函数，同时内部函数引用了外层函数的变量，则称之为闭包。
```py {5}
def test(name):
    def test_inner(greet):
        print("%s %s" % (greet, name))

    return test_inner  # 返回对闭包函数的引用


t = test("Colin")
t("Hi")  # Hi Colin
```
### 5.3 闭包作用域
与基本函数作用域一样，闭包函数的内部没有相关变量时会到闭包外层函数中寻找,还找不到会继续到全局变量中寻找。

```py
def test(name):
    def test_inner(greet):
        print("%s %s" % (greet, name))

    return test_inner  # 返回对闭包函数的引用


t1 = test("Colin")
t2 = test("Robin")

t1("Hi")  # Hi Colin
t2("Hi")  # Hi Robin

t1 = test("Sean")
t1("Hi")  # Hi Sean
```

闭包外层函数返回内部函数引用，执行完成后如果接收了返回值，相当于将一个变量指向了闭包函数，函数执行完毕后，因为存在内部资源引用，闭包函数和外层函数变量不会被释放，会带来一定的的内存占用。

再次调用闭包外层函数时，如果接收返回值的是新的变量名，则不会相互影响，如果使用之前的变量名则会将变量指向新的函数引用，之前的闭包资源没有引用的情况下就会被释放。

### 5.4 闭包应用
在闭包的作用域一节我们发现闭包外层函数执行完毕且接收返回值后，资源不会释放，且每次调用闭包函数时依然可以访问外层函数之前的固定变量值。

```py
# y = kx + b 线性函数
def line_conf(k, b):
    def line(x):
        return k * x + b

    return line


ln = line_conf(2, 3)
# 获取线性函数坐标点
[(i, ln(i)) for i in range(5)]  # [(0, 3), (1, 5), (2, 7), (3, 9), (4, 11)]
```
如果没有闭包，我们需要每次创建线性函数的时候同时说明k,b,x。这样，我们就需要更多的参数传递，也减少了代码的可移植性。除了闭包，我们也可以使用`functools.partial()`来实现。

除此之外，闭包还是[装饰器](../senior/decorator.md#_1-装饰器)的技术实现基础。

## 6. 内建函数
python系统标准库中有一个内建(`builtins`)模块，其中定义了许多日常会频繁使用的函数，称为内建函数，Cpython解释器用C语言实现了这些函数，启动解释器时默认加载。内建函数数量众多，在这里介绍些常用的内建函数。

`dir()`内建函数可以查看对象所有公有属性(方法)列表，我们可以通过`dir(__builtin__)`查看内建函数列表。

### 6.1 map()
`map()`可以对可迭代对象每个元素执行特定函数，返回处理后的新的可迭代对象。类似于C#中`Linq`的`Select`扩展方法,但`map()`更强大，它支持对多个`iterable`操作，多个`iterable`顺序对应给定函数的参数列表。

```py
result = map(lambda i: i ** 2, [1, 2, 3])
list(result)  # [1,4,9]

# 支持多个iterable
result = map(lambda i, j: i + j, [1,2,3], [4,5,6])
list(result)  # [5,7,9]
```

### 6.2 filter()
`filter()`可以使用给定函数过滤可迭代对象，返回过滤后的可迭代对象。类似于C#中`Linq`的`Where`扩展方法。

```py
users = [{"name": "Colin", "age": 16}, {"name": "Robin", "age": 20}, {"name": "Sean", "age": 21}]
result = filter(lambda u: u["age"] >= 18, users)
list(result)  # [{'name': 'Robin', 'age': 20}, {'name': 'Sean', 'age': 21}]
```

### 6.3 sorted()
对可迭代对象排序。

```py
sorted([3,4,2,1]) # [1, 2, 3, 4]
```

### 6.4 reversed()
逆序可迭代对象。

```py
result = reversed([1,3,2])
list(result) # [2, 3, 1]
```

### 6.5 max()/min()
`max()`取可迭代对象的最大值。

`min()`取可迭代对象的最小值。

```py
lst = [1, 3, 2]
max(lst)  # 3
min(lst)  # 1
```
### 6.6 sum()
对可迭代对象求和。
```py
sum([1, 2, 3]) # 6
```
### 6.7 zip()
以元组方式组合多个可迭代对象。
```py
x = [1, 2, 3]
y = [4, 5, 6]
z = [7, 8, 9]
result = zip(x, y, z)
list(result) # [(1, 4, 7), (2, 5, 8), (3, 6, 9)]
```
### 6.8 all()/any()
`all`判断可迭代对象中是否所有元素为真。**特别要注意可迭代对象中没有元素则返回True**
`any`判断可迭代对象中是否有任意元素为真。可迭代对象中没有元素则返回False

```py
all([None, 1])  # False
all(["a", 1])  # True
all([])  # True

any([None, 1])  # True
any(["", {}])  # False
any([])  # false
```

### 6.9 isinstance()/issubclass()
`isinstance()`判断对象是否是指定类(或子类)的实例。

`issubclass()`判断一个类是否是指定类的子类。

```py
class A:
    pass

class B(A):
    pass

b = B()
isinstance(b, B)  # True
isinstance(b, A)  # True
issubclass(B, A)  # True
```

### 6.10 round()/abs()
`round()`对一个数字用于四舍五入。

`abs()`取一个数字的绝对值。

```py
round(3.1415, 2)  # 3.14
abs(-1)  # 1
```