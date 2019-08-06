# 列表/元组/集合

## 1. 列表
python中的列表是一个动态数据集合，类似于JavaScript的数组或C#当中的ArrayList，可以添加任意数量的任意数据类型的元素。

```py
lst1,lst2 = [],list()   # 创建空列表的两种方式
lst = [1,3.14,"awsome",True]  # 初始化一个列表
```
### 1.1 常用操作
#### 1.1.1 Create
函数|作用
:-|:-
append|附加元素
insert|在指定位置插入元素
extend|将新列表连接到当前列表中

```py
lst = ["Colin","Robin"]
lst.append("Sean")     # ['Colin', 'Robin', 'Sean']
lst.insert(2,"Tom")    # ['Colin', 'Robin', 'Tom', 'Sean']
lst.extend(["Jerry","John"])   # ['Colin', 'Robin', 'Tom', 'Sean', 'Jerry', 'John']
```

:::tip 连接列表
extend方法可以将一个列表添加到当前列表中，除此之外还可以直接将两个列表相加。
:::

```py
lst1 = ["Colin","Robin"]
lst2 = ["Jerry","John"]
lst = lst1 + lst2    # ['Colin', 'Robin', 'Jerry', 'John']
```

#### 1.1.2 Read
列表可以使用与字符串相同的下标和切片语法，字符串本质上是字符列表。

```py
lst = ['Colin', 'Robin', 'Tom', 'Sean', 'Jerry', 'John']
lst[1] # Robin 下标取元素
lst[3:-1] # ['Sean', 'Jerry']  列表切片
lst[::-1]  # ['John', 'Jerry', 'Sean', 'Tom', 'Robin', 'Colin'] 列表逆序
```

:::tip 逆序列表
`list[::-1]`和`list.reverse()`都可以实现逆序列表，`reverse`函数使用更方便。
:::

使用`in`和`not in`语法判断列表中是否存在某个元素。
```py
lst = ["Colin","Robin"]
"Colin" in lst # True
"Robin" not in lst # False
```

#### 1.1.3 Update
```py
lst = ["Colin","Robin"]
lst[0] = "Colin Chang" # ['Colin Chang', 'Robin']
```

#### 1.1.4 Delete
函数|作用
:-|:-
pop|出栈最后的元素并返回
remove|删除列表中第一个匹配的元素
del list[n]|删除列表中特定下标的元素

```py
lst = ['Colin', 'Robin', 'Tom', 'Sean', 'Jerry', 'John']
lst.pop()  # ['Colin', 'Robin', 'Tom', 'Sean', 'Jerry'] 返回'John'
lst.remove("Tom")   # ['Colin', 'Robin', 'Sean', 'Jerry'] 
del lst[2] # ['Colin', 'Robin', 'Jerry'] 删除特定下标的元素
```

C#中不允许在遍历集合时新增或删除集合元素，这样会导致迭代器异常，而动态类型语言python则允许这么做，但这样会存在一定的问题。列表遍历列表过程中，
如果在遍历过的索引前插入n个元素，则新插入的元素无法被遍历到，而且导致后续元素索引后移n，next()取之后元素时由于之前元素被插入的元素往后挤了索引，会重新遍历到这些元素。如果是在遍历到的索引之后加入元素则不会存在这些问题。

类似的，如果列表遍历过程中删除n个元素，如果删除的元素在当前索引及其之前则会导致后续元素索引整体前移n,后续遍历就会跳过n个元素。如果在当亲索引之后则没有问题。

综上，**即使python允许在遍历过程中修改列表，我们也应当尽量避免这种容易导致莫名异常的用法，集合亦是如此**。如果确实需要遍历列表过程然后修改，我们通常可以分两步完成，首先遍历列表标记数据，完成遍历后直接按之前标记对列表修改。
```py
lst = [i for i in range(10)]

# 要求删除lst中奇数和质数
prime = [2, 3, 5, 7]  # 质数

toDel = []
# 遍历标记元素
for i in lst:
    if i in prime or i % 2 == 1:
        toDel.append(i)
# 删除元素
for i in toDel:
    lst.remove(i)
```

#### 1.1.5 排序/乱序
```py
nums = [4,1,3,2]
nums.sort() # [1,2,3,4] 默认为生序
nums.sort(reverse=True) # [4,3,2,1] 降序

persons = [{"name": "Colin", "age": 19}, {"name": "Robin", "age": 21}, {"name": "Sean", "age": 20}]
persons.sort(key=lambda p: p["age"])    # 指定排序规则
```

`random`模块的`shuffle`可以将列表随机打乱。
```py
import random

lst = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
random.shuffle(lst)
print(lst)
```

### 1.2 列表推导式
#### 1.2.1 range
range类用于产生一个整数序列(前开后闭),默认从0开始。常用初始化方式有以下两种:

```py
range(stop)
range(start, stop[, step])
```
如：<br/>
`range(5)` -> `0, 1, 2, 3, 4`<br/>
`range(5, 10)` -> `5, 6, 7, 8, 9`<br/>
`range(0, 10, 3)` -> `0, 3, 6, 9`

range对象作为整数序列，常被用于[控制循环次数](processctrl.md#_2-2-for-in)，或快速生产列表等。

#### 1.2.2 列表推导式
列表推导式是指轻量级循环创建列表的一种语法。第一个参数为最终输出的内容，后面循环语句负责控制执行次数，条件语句负责过滤内容。
```py
[x for x in range(4)]  # [0, 1, 2, 3]
[x for x in range(5, 10)]  # [5, 6, 7, 8, 9]

# 条件语句
[x for x in range(3, 10) if x % 2 == 0]  # [4, 6, 8]

# 多层循环
[(x, y) for x in range(1, 3) for y in range(3)]  # [(1, 0), (1, 1), (1, 2), (2, 0), (2, 1), (2, 2)]
```

请写出一段 Python 代码实现分组一个 list 里面的元素,比如 [1,2,3,...100]变成 [[1,2,3],[4,5,6]....]
```py
start, end, step = 1, 100, 3
lst = [i for i in range(start, end + 1)]  # 模拟现有列表

# 以下为分组方法
[lst[i:i+3] for i in range(start-1,len(lst),step)]
```

## 2. 元组
元组与列表类似，但**元组定义之后是只读的，内容不允许修改。**

空元组用`()`表示。元组只有一个元素时，第一个元素后必须加一个逗号,如`nums = (18,)`。

```py
tpl1, tpl2 = (), tuple()  # 创建空元组的两种方式
tpl3 = ("Colin",)  # 元组仅一个元素，元素后必须加一个逗号

person = ("Colin", 18)
name, age = person  # 拆包 name = 'Colin',age = 18
```

开发中，列表多用于存储相同数据类型的多个元素，而元组则多用于组合多个任意类型数据或内容不变的情况，可以存储简单的只读对象。

:::tip 
利用元组交换变量
:::
```py
a = 1
b = 2
a, b = b, a     # 等价于 (a,b) = (b,a)
```

## 3. 集合
python集合类似于C#当中的`HashSet`，最大的特点无重复元素，常用来对做数据去重。

```py
st= set()  # 创建空集合
st = {1, 2, 3}  # 初始化一个集合
```

列表/元组/集合之间可以直接使用类型名称方便互转。
```py
lst = [1, 2, 3]
tuple(lst)
set(lst)

tpl = (1, 2, 3)
list(tpl)
set(tpl)

st = {1, 2, 3}
list(st)
tuple(st)
```

使用集合快速对列表去重
```py
lst = [1, 2, 3, 3, 2, 1]
lst = list(set(lst))
```