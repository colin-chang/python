# 元类

## 1. 类对象
在python中一切皆对象，包括类本身也是一个对象，只是这个对象同时具有创建自身实例对象的能力。从类对象来看，类属性和类方法本质就是类本身对象的成员。

定义类的过程同时也是创建类对象的过程。简单讲，当遇到`class`关键字时,python解释器会自动创建这个类对象。

```py
class Test(object):  # 创建类对象
    pass


Test1 = Test  # 将类对象赋值给变量
Test.name = "Test class"  # 扩展一个类属性
print(Test)  # 打印类对象
```

## 2. type 类
我们知道对象是通过类创建的，那类对象怎么通过其类型创建呢。我们知道内建函数`type`常用来查看对象类型，那我们下面就使用`type`来查看以下类对象的类型。
```py
class Person(object):
    pass


p = Person()
type(p)  # __main__.Perso
type(Person)  # type
```
通过以上代码我们发现对象`p`的类型是`Person`,使用`Person`创建了`p`对象，而类对象`Person`的类型竟然是`type`,那是不是可以通过`type`来创建`Person`类(对象)呢，答案是肯定的。

```py
Person = type("Person",(),{})  # 动态创建Person类
```
至此，我们可以简单总结下创建类(对象)的两种方式：
* `class`。使用`class`关键字定义类并同时创建类对象
* `type`。通过`type`类动态创建类(对象)

::: warning type 的双重功能
* `type(object)` 作为内建函数查看对象的类型
* `type(name,bases,dict)` 作为元类动态创建新类型(类对象)

仅通过参数列表的不同来区分并实现两种毫无关联的功能是不合理的，这只是python为了向后兼容的妥协行为。
:::

```py {30,31,32,33}
class Animal(object):
    def eat(self):
        print("eat something...")


def fly(self):
    print("fly with me...")


@classmethod
def count_birds(cls):
    cls.count += 1


@staticmethod
def sayhi():
    print("hi there...")


'''
动态Bird类(对象)
1.继承Animal类。 
2.__name为私有属性
3.get_name为属性方法
4.fly为实例方法
6.count为类属性
7.count_birds为类方法
8.sayhi为静态方法
'''
Bird = type("Bird", (Animal,),
            {"__name": "黄鹂", "get_name": lambda self: self.__name, "fly": fly, "count": 0,
             "count_birds": count_birds,
             "sayhi": sayhi})
             

def main():          
    bird = Bird()
    print(bird.get_name())
    bird.fly()
    print(Bird.count)
    Bird.count_birds()
    Bird.sayhi()


if __name__ == "__main__":
    main()
```

## 3. 元类
python中一切皆对象，实例对象的类型是类，而类对象的类型称为元类。简单说，元类就是类的类。

我们知道一个实例对象的父类和成员已经初始化行为等都是在类中定义的，那类(对象)的成员和初始化行为就是在其元类中定义的。默认情况下，一个类的元类是`type`,但是python允许我们自定义元类，这意味着可以像用类来定义实例对象一样，通过元类来定制类的行为。

元类不一定是一个类，也可以是一个简单的函数等。元类是类对象的模板，只会在创建类对象(即定义类)的时候会被执行一次，而且指定定制类成员如类属性，类方法等，而不能定制实例成员，实例成员是通过类来定义的。

例如我们需要将类属性全部改为大写，我们就可以通过定制元类来实现。

```py {2,14}
class UpperAttrMetaClass(type):
    def __new__(cls, class_name, base_classes, attrs):
        upper_attrs = {}
        for name, value in attrs.items():
            if name.startswith("__"):
                upper_attrs[name] = value
            else:
                upper_attrs[name.upper()] = value

        # return type(class_name, base_classes, upper_attrs)
        return super().__new__(cls, class_name, base_classes, upper_attrs)


class Person(object, metaclass=UpperAttrMetaClass):
    category = "People"

    def __init__(self, name):
        self.name = name

'''
python2用法：

class Person(object):
    __metaclass__ = UpperAttrMetaClass
    category = "People"

    def __init__(self, name):
        self.name = name
'''


def main():
    print(hasattr(Person, "category"))  # False
    print(hasattr(Person, "CATEGORY"))  # True 元类定制了类属性为大写
    print(Person.CATEGORY)  # People

    p = Person("colin")
    print(hasattr(p, "name"))  # True
    print(hasattr(p, "NAME"))  # False  元类不能修改实例属性
    print(p.name)  # colin


if __name__ == '__main__':
    main()
```