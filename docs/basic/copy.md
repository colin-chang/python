# 深拷贝与浅拷贝

## 1. 深拷贝与浅拷贝

深拷贝与浅拷贝是大多数语言中都会讨论的问题。它是拷贝对象的两种不同的方式。

简单的讲，浅拷贝只拷贝地址引用，并没有拷贝内容。深拷贝则是对象所有层次的递归拷贝，深拷贝会完整拷贝内容并在内存中建立全新的对象。

要理解深拷贝与浅拷贝，需要首先理解Python中的[对象引用](datatype.md#_3-对象引用)和[可变类型 / 不可变类型](datatype.md#_4-可变类型-不可变类型)。

## 2. 浅拷贝

```py
a = [1,2,3]
b = a  # 浅拷贝，b与a指向同一个地址。
b is a  # True

a.append(4)
print(b)  # [1,2,3,4]
```

## 3. 深拷贝

深拷贝需要使用`copy`模块中的`deepcopy()`

```py {6}
import copy

a = [1, 2, 3]
b = [4, 5, 6]

c = copy.deepcopy(a)  # 深拷贝
c is a  # False
a.append(8)
print(a)  # [1,2,3,8]
print(c)  # [1,2,3]

d = [a, b]  # [[1,2,3,8],[4,5,6]]
e = copy.deepcopy(d)  # 深拷贝 会递归拷贝
a.remove(8)
print(d)  # [[1,2,3],[4,5,6]]
print(e)  # [[1,2,3,8],[4,5,6]]

d[0] is a  # True
e[0] is a  # False
```

深拷贝一个对象时，如果对象中存在其它对象引用，会同时将所有引用的对象也一并进行递归深拷贝。

## 4. copy.copy()

除了深拷贝与浅拷贝，`copy`模块中还有一个`copy`方法，它既不是深拷贝也不是浅拷贝，而且对可变类型和不可变类型作用也不同，要谨慎使用。

```py
import copy

a = [1, 2, 3]
b = [4, 5, 6]

c = copy.copy(a)  # 深拷贝
c is a  # False
a.append(8)
print(c)  # [1,2,3]

d = [a, b]
e = copy.copy(d)  # 仅第一层深拷贝
e is d  # False
a.remove(8)
print(d)  # [[1, 2, 3], [4, 5, 6]]
print(e)  # [[1, 2, 3], [4, 5, 6]]

f = (a, b)
g = copy.copy(f)  # 浅拷贝
g is f  # True
```

使用`copy.copy()`拷贝对象，如果是可变类型则仅对第一层深拷贝，如果是不可变类型则是浅拷贝。
