# 生成器

## 1. 生成器
开发中，我们有时会创建一个庞大的集合但并不会马上使用或者并不需要使用其全部元素，这样一来就会造成巨大的内存占用，甚至导致内存溢出。于是python提供了生成器(`generator`)来解决此问题。

生成器并不会马上生成集合，而是记录集合的生成算法，在真正需要使用集合元素时才会根据算法去计算生成。这样一来就避免了大量内存占用的问题。

生成器并非python独有，其他语言平台中也都有类似的问题解决方案，如 EF中使用`IQueryable<T>`实现延迟加载数据，WPF中使用依赖属性避免UI控件不必要资源占用，.Net中的`Lazy<T>`懒加载，以及使用`yiled`关键字动态计算集合元素等。

## 2. 生成器推导式
开发中我们经常会使用[列表推导式](../basic/list.md#_1-2-2-列表推导式)来快速生成一个列表，列表推导式会立即生成列表中所有的元素，当列表元素较多时就会出现前面我们提到的内存占用的问题，此时我们只需要将列表推导式的`[]`替换为`()`即可得到一个生成器。

```py
g = (i for i in range(10)) # 创建生成器
type(g)  # generator
print(g)  # <generator object <genexpr> at 0x107157d50>

next(g)  # 0
next(g)  # 1
g.__next__()  # 2
```

通过以上代码我们可以看到变量`g`的类型是生成器(`generator`)。`generator`中记录的是集合产生的算法而非集合元素，我们可以通过`next(iterator)`(或`generator.__next__()`方法)使其计算并返回下一个元素值。每次调用`next`，就计算出下一个元素的值，直到计算到最后一个元素，没有更多的元素时，会抛出`StopIteration`异常。一般做法是使用`for in`循环遍历`generator`，而不需关心`StopIteration`异常。

```py
for i in (x for x in range(5)):
    print(i,end=' ')

"""
0 1 2 3 4
"""
```

## 3. yield
当生成器的元素生成逻辑较为复杂，生成器推导式可能无法实现，这时我们可以通过函数来实现。如果一个函数中使用了`yield`关键字，则此函数就被称作生成器。**直接调用生成器，其函数内容并不会执行，而仅仅是返回生成器本身对象，直到对其迭代时，生成器函数才会被执行。**

python中的`yield`关键字与C#中功能和用法类似，**每迭代一次都会中断函数运行并将`yield`关键字之后的值返回，同时记录自身的执行状态与相关变量, 下次迭代时直接在上次执行中断处恢复变量并继续执行**。

```py {5}
# 斐波那契数列
def fib(n):
    a, b = 0, 1
    for i in range(n):
        yield b
        a, b = b, a + b
    
    return 'done'   # 不会执行

for i in fib(5):
    print(i, end=' ')

"""
1 1 2 3 5
"""
```
上面案例中生成器遍历完成后就会退出，所以`return`语句不会被执行，如果需要拿到`return`值则不能使用`for`循环迭代生成器，使用`next`函数一直取值到出现`StopIteration`异常，捕捉异常后可以在其中拿到`return`返回值。**一般情况下不会在生成器循环之后写return语句**。

`yield`生成器可以用来实现[协程](coroutine.md#_2-yield-协程)。

## 4. send
**`yield`语句本身是没有的返回值的**，所以通常情况下我们不会接收其返回值。但我们可以使用`generator.send(arg)`函数把`arg`作为`yield`语句的返回值，这样一来就可以在生成器的**每次迭代过程中**传递参数。

使用`send(arg)`函数特别需要注意的是，第一次执行到`yield`语句时，程序会被阻断并返回`yield`语句中的值，而不会执行赋值语句,所以python不允许第一次调用生成器时`send`非`None`值，一般情况下第一次执行需要调用的`generator.__next__()`或`generator_.send(None)`

```py {12}
def gen():
    i = 0
    while i < 5:
        temp = yield i  # yield中断后再次执行时会进行赋值操作，如果此次使用send函数传递了参数，参数将直接赋值给temp，与i无关。
        print(temp)
        i += 1


g, n = gen(), 0
while True:
    try:
        r = g.send(n * '-' if n > 0 else None)
        print(r)
    except StopIteration:
        break
    n += 1

"""
-
1
--
2
---
3
----
4
-----
"""
```