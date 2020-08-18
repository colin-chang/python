# 装饰器

## 1. 装饰器
Python装饰器类似于C#当中的`Attrbute`实现的过滤器，作用和使用场景也基本相同。如在函数执行前进行权限校验，执行完毕后数据清理，记录日志等。

下面我们以权限校验为例对装饰器的实现原理和工作过程做简单说明。

```py
# 查询余额
def check_balance():
    print("balance is $100")


# 下单
def make_order():
    print("make order success")
```

假定我们有以上两个已在生产环境中运行的基础库函数。现在业务需求的变动，我们要求在调用两个函数的时候首先要进行权限校验。按照开放封闭的原则，我们不应该改动函数之前的内容，而是添加新的逻辑来满足业务需求。

现在业务很明确就是要在执行函数前先进行权限校验，既然不能修改现有函数，那我们可以尝试封装一个工具函数，功能就是包装现有函数，在现有函数之前进行权限校验，然后执行原函数。简言之就是传入原函数，返回一个附加了权限校验功能的新函数，这个可以包装函数的工具函数就称为装饰器(`decorator`)。

```py {10,11}
def authorize(func):
    # 定义新函数
    def new_func():
        print('authorize...')  # 模拟权限校验工作
        func()  # 执行原函数

    return new_func  # 返回有权限校验功能的新函数


check_balance = authorize(check_balance)  # 用原函数名指向新的包装后的函数
make_order = authorize(make_order)
``` 

以上就是装饰器的实现原理，不难发现装饰器就是一个闭包。

简单总结下，装饰一个函数需要三个步骤：
1. 定义装饰器函数
2. 以原函数作参数调用装饰器函数
3. 将原函数名指向装饰后的新函数

为了简化以上步骤，Python提供了一种简单的装饰器语法糖，直接在函数声明上标注`@decorator`即可，其本质就是对以上第2,3两个步骤的简化使用。
```py {10,15}
# 定义装饰器函数
def authorize(func):
    def new_func():
        print('authorize...')
        func()

    return new_func


@authorize  # 使用装饰器
def check_balance():
    print("balance is $100")


@authorize
def make_order():
    print("make order successfully")
```

简单总结下，要在保持现有函数逻辑不变的前提下扩展其功能，我们只需要定义一个装饰器，然后在现有方法上标注使用装饰器即可。

## 2. 多装饰器
当一个函数有多个装饰器时，装饰顺序由内而外，执行则由外而内，类似于栈的存值和取值的先进后出顺序。

```py {15,16}
def strong(func):
    def new_func():
        return "<strong>%s</strong>" % func()

    return new_func


def italic(func):
    def new_func():
        return "<i>%s</i>" % func()

    return new_func


@strong
@italic
def sayhi():
    return "hello world"


print(sayhi())  # <strong><i>hello world</i></strong>
```

## 3. 参数与返回值
### 3.1 装饰有参函数
要装饰一个有参的函数，只需要在装饰器内部函数声明相同的参数列表即可。如果要同时装饰有多个不同参数列表的函数，可以使用`*args`和`**kwargs`

```py
def authorize(func):
    def new_func(*args, **kwargs):
        print('authorize...')
        func(*args, **kwargs)

    return new_func


@authorize
def check_balance(user):
    print("%s's balance is $100" % user)


@authorize
def make_order(user, goods):
    print("%s buy %s successfully" % (user, goods))


check_balance("Colin")
make_order("Colin", "books")
```
### 3.2 装饰有返回值函数
如果装饰一个有返回值的函数，只需要在装饰器内部调用原函数完成后`return`其返回值即可。如果函数没有返回值，`return`会返回`None`，为了装饰器的通用性，不管是否有返回值我们都可以`return`其返回值。

```py
def authorize(func):
    def new_func(*args, **kwargs):
        print('authorize...')
        return func(*args, **kwargs)

    return new_func


@authorize
def check_balance(user):
    return 100


@authorize
def make_order(user, goods):
    print("%s buy %s successfully" % (user, goods))


print(check_balance("Colin"))    # 100
print(make_order("Colin", "books"))  # None
```

通用的装饰器应该形似如下结构：
```py
def decorator_name(func):
    def new_func(*args, **kwargs):
        pass # do some extra work
        return func()
    
    return new_func
```

## 4. 有参装饰器
装饰器自身也可以接收参数。

```py
def color(col='red'):
    def inner_color(func):
        def new_func():
            return '<font color="%s">%s</font>' % (col, func())

        return new_func

    return inner_color


@color()
def sayhi():
    return "hi there"


@color("blue")
def say_hello():
    return "hello world"


print(sayhi())  # <font color="red">hi there</font>
print(say_hello())  # <font color="blue">hello world</font>
```

装饰器名称后使用`()`表示有参装饰器,否则表示无参装饰器。Python解释器发现函数声明上有标注装饰器时会立即执行装饰器。
* 无参装饰器。解释器会将当前函数作为参数，执行装饰器函数，然后将装饰后的函数引用返回并赋值给原有函数名。
* 有参装饰器。解释器会使用指定参数或默认参数，执行外装饰器返回内部闭包，然后将当前函数作为参数执行闭包，最后将装饰后的函数引用返回并赋值给原有函数名。

以上装饰器代码可以理解为:
```py
sayhi = color()(sayhi)()
say_hello = color('blue')(say_hello)()
```

## 5. 类装饰器
装饰器要求必须是`callable`对象，所以除了函数，我们还可以使用类的实例对象作装饰器，前提是类中定义了[\_\_call\_\_()](../basic/oo.md#_2-5-call)，这称为类装饰器。

### 5.1 类装饰器原理
当装饰器是类(无参)时，会首先创建类的一个实例对象，并把当前函数作参数传入`__init__()`中，然后返回新创建的对象并赋值给原函数名。当调用函数时实际调用的是装饰后的对象，因此会执行对象的`__call__()`。我们可以在`__call__()`中对原函数进行扩展。

```py {5}
class Strong(object):  # 声明类装饰器
    def __init__(self, func):
        self.__func = func

    def __call__(self, *args, **kwargs):
        return "<strong>%s</strong>" % self.__func(*args, **kwargs)


@Strong  # 使用类装饰器
def sayhi(name):
    return "hi %s" % name


print(sayhi("Colin"))  # <strong>hi Colin</strong>
```

### 5.2 有参类装饰器
有参类装饰器的代码执行顺序与无参类装饰器略有不同。装饰器名称后使用`()`表示有参装饰器,否则表示无参装饰器。

无参类装饰器的执行过程前面已经探讨过了，这里我们主要来看有参类装饰器。当解释器发现类装饰器有参时会使用指定参数或默认参数初始化一个装饰器类对象，紧接着自动调用其`__call__()`并将原函数作为参数传入，我们可以在`__call__()`中对原函数进行装饰扩展，然后将装饰后的函数返回并赋值给原函数名。

```py
class Color(object):
    def __init__(self, color='red'):
        self.__color = color

    def __call__(self, func):
        def color(*args, **kwargs):
            return '<font color="%s">%s</font>' % (self.__color, func(*args, **kwargs))

        return color


@Color()
def sayhi(name):
    return "hi %s" % name


@Color("blue")
def say_hello(name):
    return "hello %s" % name


print(sayhi("Colin"))  # <font color="red">hi Colin</font>
print(say_hello("Robin"))  # <font color="blue">hello Robin</font>
```

不难发现，有参类装饰器中的`__call__()`就是一个函数装饰器，不同的是，它是类实例函数，作用域被限定在类内部，当装饰器逻辑比较复杂时，可以在类内部拆解为多个方法处理，类内部共享数据，符合面向对象的思想且适合处理复杂逻辑。

## 6. wraps 装饰器
使用装饰器时，被装饰后的函数其实已经是另外一个函数了，函数的`doc`也会随之变成装饰器的`doc`,更多情况下我们期望使用原函数的`doc`，而`functools`模块中的`wraps`装饰器函数作用就是为了解决这个问题。

```py
from functools import wraps


def test_decorator(func):
    @wraps(func)
    def new_func():
        "new function"
        return func()

    return new_func


@test_decorator
def test():
    "origin function"
    pass


test()
print(test.__doc__)
```