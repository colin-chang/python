# 可访问性

## 1. 可访问性
在C#中对象可访问性有`public/internal/protected/private`等，虽然没有像C#对可访问性做如此细分的控制，但python中也有类似的对象可访问性控制。

python对象的可访问性是通过对象命名区分的。

命名|可访问性
:-|:-
`xx`|公有变量。类似`public`。
`_xx`|模块内变量。类似`internal`。仅对`from module import *`方式导入模块时模块的全局变量起作用。
`__xx`|私有变量。类似`private`。仅在变量定义作用域内可用。

* python中没有类似C#的`protected`访问符。
* `_xx`方式定义的模块内变量，对`import module`方式无效。在模块内部或类内部使用与公有变量无异，较少使用
* 类中定义的所有类型的变量都会被子类继承，只是私有变量[名字重整](#_2-名字重整)不可直接访问而已。

`person.py`:
```py
public = "module public"
_internal = "module internal"
__private = "module private"


class Person:
    def __init__(self, name, age, gender):
        self.name = name  # 公有属性
        self._age = age  # 模块内属性
        self.__gender = gender  # 私有属性


class Student(Person):
    def self_introduce(self):
        print("my name is %s,I'm %d" % (self.name, self._age))
        # print(self.__gender) 私有属性不可访问
```
`main.py`:
```py
from setup import *

print(public)
# print(_internal)  # 模块内变量访问
# print(__private)  # 私有属性不可访问

s = Student("Colin", 18, "Male")
s.self_introduce()
print(s.name)
print(s._age)
# print(s.__gender)  # 私有属性不可访问
```

:::tip 其他常用变量命名
除了前面提到三种命名规则外，还有以下两种规则，下面命名规则并不影响可访问性。

* `__xx__`。系统魔法属性或方法专用命名规则。应避免使用此规则自定义变量。
* `xx_`。用于避免与Python关键词的冲突。应尽量避免使用类似系统关键字的变量名。
:::

## 2. 名字重整
对象的私有属性也存在与对象的内存空间中，那么为什么外部不能访问呢，因为python对其进行了名字重整(name mangling)。通俗的讲就是按照一定规则对其进行了重命名。

python2/3中名字重整的规则是在私有属性名称加`_ClassName`前缀，`_ClassName`是定义私有属性的类的类名称。在子类中也可以按此规则访问私有变量。

通过`dir(obj)`我们可以看到对象被名字重整之后的新属性名称。

```py
class Person:
    def __init__(self):
        self.__name = "Colin"


class Student(Person):
    pass


p = Person()
print(p._Person__name)  # Colin

s = Student()
print(s._Person__name)  # Colin
```

虽然了解名字重整规则后可以访问对象私有属性，但这违背了访问控制原则，不推荐直接操作私有成员。仅可在特殊情况下使用。