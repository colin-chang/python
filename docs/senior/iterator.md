# 迭代器

## 1. 可迭代对象
可以被迭代的对象称为可迭代对象(Iterable)。简单讲凡是可用作`for`循环的对象，如集合(`list / tuple / set / dict / str`)和生成器(generator)对象都是可迭代对象。

可迭代类型都继承自`Iterable`类(位于`collections`模块)，我们可以通过内建函数`isinstance(obj,class)`来判断一个对象是否是可迭代对象。通过`issubclass(cls,baseclass)`来判断一个类型是否为可迭代类型。

```py
from collections.abc import Iterable

# 可迭代对象判断
isinstance([], Iterable)  # True
isinstance((), Iterable)  # True
isinstance('abc', Iterable)  # True
isinstance((x for x in range(10)), Iterable)  # True 生成器

# 可迭代类型判断
issubclass(set, Iterable)  # True
issubclass(dict, Iterable)  # True
issubclass(range,Iterable)  # True
```

## 2. 迭代器
可以被`next()`函数调用并不断返回下一个值的对象称为迭代器(`Iterator`)。

迭代器都继承自`Iterator`类(位于`collections`模块)，类似可迭代对象的判定方式，我们可以通过`isinstance(obj,class)`来判断一个对象是否是迭代器。通过`issubclass(cls,baseclass)`来判断一个类型是否为迭代器。

```py
from collections.abc import Iterator

# 迭代器对象判断
isinstance([], Iterator)  # False
isinstance((), Iterator)  # False
isinstance('abc', Iterator)  # False
isinstance((x for x in range(10)), Iterator)  # True 生成器

# 迭代器类型判断
issubclass(set, Iterator)  # False
issubclass(dict, Iterator)  # False
issubclass(range,Iterator)  # False
```

**迭代器对象一定是可迭代对象，可迭代对象不一定是迭代器对象。**

我们发现`list / tuple / set / dict / str`都是可迭代对象(`Iterable`)，但却不是迭代器(`Iterator`),生成器(`generator`)是迭代器(`Iterator`)。

:::tip 迭代器转换
在确定一个对象是可迭代对象时，可以使用`iter(iterable)`函数将其转为迭代器对象。
:::

```py
isinstance(iter([]), Iterator)  # True
isinstance(iter('abc'), Iterator)  # True
```