# 列表/元组

## 1. 列表
Python中的列表是一个动态数据集合，类似于JavaScript的数组或C#当中的ArrayList，可以添加任意数量的任意数据类型的元素。

```py
list = [1,3.14,"awsome",True]  # 初始化一个列表
```

### 1) Create
函数|作用
:-|:-
append|附加元素
insert|在指定位置插入元素
extend|将新列表连接到当前列表中

```py
list = ["Colin","Robin"]
list.append("Sean")     # ['Colin', 'Robin', 'Sean']
list.insert(2,"Tom")    # ['Colin', 'Robin', 'Tom', 'Sean']
list.extend(["Jerry","John"])   # ['Colin', 'Robin', 'Tom', 'Sean', 'Jerry', 'John']
```

:::tip 连接列表
extend方法可以将一个列表添加到当前列表中，除此之外还可以直接将两个列表相加。
:::

```py
list1 = ["Colin","Robin"]
list2 = ["Jerry","John"]
list = list1 + list2    # ['Colin', 'Robin', 'Jerry', 'John']
```

### 2) Read
列表可以使用与字符串相同的下标和切片语法，字符串本质上是字符列表。

```py
list = ['Colin', 'Robin', 'Tom', 'Sean', 'Jerry', 'John']
list[1] # Robin 下标取元素
list[3:-1] # ['Sean', 'Jerry']  列表切片
list[::-1]  # ['John', 'Jerry', 'Sean', 'Tom', 'Robin', 'Colin'] 列表逆序
```

:::tip 逆序列表
`list[::-1]`和`list.reverse()`都可以实现逆序列表，`reverse`函数使用更方便。
:::

使用`in`和`not in`语法判断列表中是否存在某个元素。
```py
list = ["Colin","Robin"]
"Colin" in list # True
"Robin" not in list # False
```

### 3) Update
```py
list = ["Colin","Robin"]
list[0] = "Colin Chang" # ['Colin Chang', 'Robin']
```

###  4) Delete
函数|作用
:-|:-
pop|出栈最后的元素并返回
remove|删除列表中第一个匹配的元素
del list[n]|删除列表中特定下标的元素

```py
list = ['Colin', 'Robin', 'Tom', 'Sean', 'Jerry', 'John']
list.pop()  # ['Colin', 'Robin', 'Tom', 'Sean', 'Jerry'] 返回'John'
list.remove("Tom")   # ['Colin', 'Robin', 'Sean', 'Jerry'] 
del list[2] # ['Colin', 'Robin', 'Jerry'] 删除特定下标的元素
```

## 2. 元组
元组与列表类似，但元组定义之后是只读的，内容不允许修改。

```py
person = ("Colin",18)
name,age = person   # name = 'Colin',age = 18
```

开发中，列表多用于存储相同数据类型的多个元素，而元组则多用于组合多个任意类型数据或内容不变的情况，可以存储简单的只读对象。