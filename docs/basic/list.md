# 列表/元组

## 1. 列表
Python中的列表是一个动态数据集合，类似于JavaScript的数组或C#当中的ArrayList，可以添加任意数量的任意数据类型的元素。

```py
list = [1,3.14,"awsome",True]  # 初始化一个列表
```

### 1.1 Create
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

### 1.2 Read
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

### 1.3 Update
```py
list = ["Colin","Robin"]
list[0] = "Colin Chang" # ['Colin Chang', 'Robin']
```

### 1.4 Delete
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

### 1.5 排序
```py
nums = [4,1,3,2]
nums.sort() # [1,2,3,4] 默认为生序
nums.sort(reverse=True) # [4,3,2,1] 降序

persons = [{"name": "Colin", "age": 19}, {"name": "Robin", "age": 21}, {"name": "Sean", "age": 20}]
persons.sort(key=lambda p: p["age"])    # 指定排序规则
```

## 2. 元组
元组与列表类似，但**元组定义之后是只读的，内容不允许修改。**

空元组用`()`表示。元组只有一个元素时，第一个元素后必须加一个逗号,如`nums = (18,)`。

```py
person = ("Colin",18)
name,age = person   # name = 'Colin',age = 18
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
