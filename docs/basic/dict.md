# 字典

## 1. 字典简介
python中的字典是一个动态键值对集合，类似于JavaScript的对象或C#当中的`HashTable`。字典是python里唯一的映射类型，它存储了键值对的关联，是由键到键值的映射关系。

```py
dct1, dct2 = {}, dict()  # 创建空字典的两种方式
person = {"name": "Colin", "age": 18, "married": False}
```

字典`key`不能重复，如果`key`已经存在，则最后的赋值会覆盖之前的`value`。
```py
dct = {"name":"Colin","name":"Robin"} # dct = {"name": "Robin"}
```

:::warning 字典key必为不可变类型
python会将字典的key取hash关联内存地址，而value则存储在此内存地址中。如果key为可变类型，key改变之后根据其hash可能无法找到关联的内存地址，也就无法取到对应的value。
:::
```py
# key可选类型示例
dct = {1:"int",2.1:"float",True:"bool","string":"str",(1,2):"tuple"} 
```

## 2. CRUD
### 2.1 Create
```py
person = {"name": "Colin", "age": 18}
person["married"] = False   # {"name": "Colin", "age": 18, "married": False}

p1 = person.copy()  # 复制到字典，非地址引用
```
### 2.2 Read
字典元素可以通过`key`索引器来访问。通过索引访问时，如果`key`不存在则会抛出异常，而通过`get`函数获取如果`key`不存在则返回空而不抛出异常，日常**推荐使用get函数安全取值**。

```py
person = {"name": "Colin", "age": 18}
person["age"]                 # 18
person["gender"]              # 异常，key不存在
person.get("name")            # Colin
person.get("gender")          # None
person.get("nation","China")  # China key不存在则使用提供的默认值
```

### 2.3 Update
```py
person = {"name": "Colin", "age": 18}
person["name"] = "Colin Chang"  # {'name': 'Colin Chang', 'age': 18}

person1 = {"gender":"male"}
person.update(person1)  # 将一个字典合并到当前字典。 此时person为{'name': 'Colin Chang', 'age': 18,"gender":"male"}
```

### 2.4 Delete
```py
person = {"name": "Colin", "age": 18}
del person["age"]  # {"name": "Colin"}
del person["married"] # 异常。删除不存在的键会抛出异常

person.clear()  # 清空字典
```

## 3. 遍历
函数|作用
:-|:-
keys|获取字典key集合。
values|获取字典value集合。
items|获取字典键值对集合，每一项是一个元组。

:::warning
以上三个函数在python3中返回对象，python2中返回列表。
:::

与javascrip类似，使用`for...in`遍历字典时，每一项表示的是键值对的key。

```py
person = {"name": "Colin", "age": 18}

for key in person:
    print("%s = %s" %(key,person[key]))

for k,v in person.items():
    print("%s = %s" %(k,v))
```