# 字典

## 1. 字典简介
Python中的字典是一个动态键值对集合，类似于JavaScript的对象或C#当中的HashTable。

```py
person = {"name": "Colin", "age": 18, "married": False}
```

## 2. CRUD
### 1) Create
```py
person = {"name": "Colin", "age": 18}
person["married"] = False   # {"name": "Colin", "age": 18, "married": False}
```
### 2) Read
字典元素可以通过`key`索引器来访问，但不能通过 `dict.key`方式访问。通过索引访问时，如果`key`不存在则会抛出异常，而通过`get`函数获取如果`key`不存在则返回空而不抛出异常，日常**推荐使用get函数安全取值**。

```py
person = {"name": "Colin", "age": 18}
person["age"]           # 18
person["gender"]        # 异常，key不存在
person.get("name")      # Colin
person.get("gender")    # None
```

### 3) Update
```py
person = {"name": "Colin", "age": 18}
person["name"] = "Colin Chang"  # {'name': 'Colin Chang', 'age': 18}
```

### 4) Delete
```py
person = {"name": "Colin", "age": 18}
del person["age"]  # {"name": "Colin"}
del person["married"] # 异常。删除不存在的键会抛出异常
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
