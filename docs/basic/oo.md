# 面向对象

## 1. 类
* 类中方法定义时至少有一个参数，通常名为`self`表示当前类实例。相当于C#当中`this`对象
* 类示例化与函数调用类似，而不需要像C#一样使用`new`关键字
* python中类的实例属性(类中的变量)相当于C#中类的字段，而[property](#_3-property)则相当于C#当中操作字段的`get`和`set`方法。属性+`property`组合才相当C#中的属性。
* **python中每个类本身就是一个对象常称做[类对象](../senior/metaclass.md#_1-类对象)，可以直接使用类名访问**。

```py
class Person(object):
    'Person帮助信息'

    def __init__(self, name):
        '''
        私有属性
        一般在此初始化所有私有属性，不管是否在参数列表中传值，
        否则直接调用属性对应get方法会抛异常
        '''
        self.__name = name

    @property
    def name(self):
        "姓名"
        return self.__name

    @name.setter
    def name(self, value):
        self.__name = value

    # 业务方法
    def sayhi(self):
        print(self.__getText())

    # 私有方法
    def __getText(self):
        return "Hi,my name is %s" % self.__name


def main():
    p = Person("Colin")
    print(p.name)  # Colin
    p.name = "Robin"
    p.sayhi()  # Hi,my name is Robin


if __name__ == '__main__':
    main()
```
以上示例中涉及的[\_\_init\_\_()](#_2-2-init)和[property](#_3-property)会在后面章节中介绍。

## 2. 类内建属性和方法
python中类默认定义了一些特殊属性和方法，称为类内建属性和方法。具有特殊功能的方法也称为魔法方法。
### 2.1 \_\_new\_\_()
`__new__()`用于创建对象。该方法定义在`object`类中，被所有类继承。

`__new__()`至少有一个参数，通常为`cls`,指向要实例化的类自身对象， 此参数在实例化时由python解释器自动提供。除了`cls`参数，`__new__()`参数列表应该与`__init__()`相同。因为开发者实例化对象时提供的相关初始化参数会首先传递到`__new__()`中，`__new__()`必须定义相关形参接收，即使不使用这些参数。

`__new__()`把创建的实例作为返回值。如果要重写`__new__()`需要调用并返回父类或`object`的`__new__`创建的实例。

创建一个对象的过程包含如下三步：
* 执行`__new__()`创建实例并返回。
* 执行`__init__()`初始化对象。`__new__()`返回值作为`__init__()`的`self`参数。
* 将变量指向新建的对象引用。

**`__new__()`执行完成并返回结果后才会执行`__init__()`。**

`__new__()`使用参见[单例类](#_3-4-1-单例类)。

### 2.2 \_\_init\_\_()
`__init__()`用于初始化对象。`__new__`和`__init__`组合起来相当与C#中的构造方法。

`__init__()`至少有一个参数，通常为`self`，指向`__new__()`创建的实例。

`__init__()`没有返回值。


一般需要在`__init__()`中初始化所有私有属性，不管是否在参数列表中传值，否则直接调用属性对应get方法会抛异常。

如果父类定义了`__init__()`，子类中没有重写`__init__()`，则新建子类对象时会调用父类`__init__()`并要求相应的参数列表。当然子类也可以重写`__init__()`,参数列表可以与父类不同，但应当在`__init__()`中调用其所有父类`__init__()`(非强制)初始化必要属性，否则可能会在访问到未按父类`__init__()`初始化的成员时触发异常。

```py {20,21}
class Chinese():
    def __init__(self, name):
        self.__name = name

    def get_name(self):
        return self.__name


class American():
    def __init__(self, age):
        self.__age = age

    def get_age(self):
        return self.__age


class ChineseAmerican(Chinese, American):
    def __init__(self, name, age, gender):
        # 调用父类初始化方法
        Chinese.__init__(self, name)
        American.__init__(self, age)
        self.__gender = gender

    def self_introduce(self):
        print("my name is %s,I'm %d years old and my gender is %s"
              % (self.get_name(), self.get_age(), self.__gender))


def main():
    ca = ChineseAmerican("Colin", 18, "Male")
    ca.self_introduce()


if __name__ == '__main__':
    main()
```

### 2.3 \_\_del\_\_()
`__del__()`类似于C#当中的析构函数，会在对象销毁时调用。由于对象是地址引用，一个对象实际可能有多个变量引用，一般会在对象的[引用计数](../senior/gc.md#_1-引用计数)为0时才会[GC](../senior/gc.md)。

```py {2}
class Person(object):
    def __del__(self):
        print("对象被销毁")


def main():
    p1 = Person()
    p2 = p1

    del p1
    print("p1被删除")
    del p2
    print("p2被删除")

    '''
    p1,p2指向同一个地址引用，所以p1指向的地址应用数为3。
    删除p1并不会删除内存对象，删除p2后，内存对象引用数为0，此时会调用__del__方法并删除该内存对象。
    '''


if __name__ == '__main__':
    main()

    """
    3
    p1被删除
    对象被销毁
    p2被删除
    """
```

### 2.4 \_\_str\_\_()
C#中一个对象被直接打印时默认会输出其类名，我们可以通过`override`其`ToString()`方法定制输出内容。与之类似，python中对象被直接`print`时会默认输出类名和对象内存地址，我们可以通过`__str__()`定制输出内容，该方法必须返回字符串。

```py {5}
class Person(object):
    def __init__(self, name):
        self.__name = name

    def __str__(self):
        return "my name is %s" % self.__name        

def main():
    p = Person("Colin")
    print(p)  # my name is Colin


if __name__ == '__main__':
    main()
```

### 2.5 \_\_call\_\_()
在一个在对象后使用`()`表示调用对象，如,`print('hi')`。目前我们都知道函数和类是可以被调用的(`callable`),那如何判断一个对象是否可以被调用呢？python内建函数`callable(obj)`功能就是判断一个对象是否可以别调用。

```py
class Person(object):
    def sayhi(self):
        print("Hi there...")


def main():
    p = Person()
    callable(Person)  # True 类可调用
    callable(p.sayhi)  # True 函数可调用
    callable(p)  # False


if __name__ == '__main__':
    main()
```

实例对象是不可调用的，但只要在类定义中声明一个`__call__()`，该类的实例对象就是`callable`了。实例对象被调用时会执行`__call__()`

```py {2}
class Person(object):
    def __call__(self):
        print("called...")


p = Person()
p()  # called...
```

### 2.6 \_\_getattribute\_\_()
`__getattribute__()`会在访问实例属性时被触发，称为属性访问拦截器。通常可以在拦截器中记录日志或控制返回内容。

```py {11,14}
class Person(object):
    def __init__(self, name, age, gender):
        self.name = name
        self.__age = age
        self.__gender = gender

    @property
    def age(self):
        return self.__age

    def __getattribute__(self, item):
        print("%s was visited..." % item)  # 记录访问日志

        val = object.__getattribute__(self, item)  # 不要使用 self.xx 否则会陷入递归死循环
        if item == "age":  # 控制返回内容
            return 18 if val < 18 else val
        else:
            return val

    def self_introduce(self):
        print(self.__format())

    def __format(self):
        return "my name is %s,I'm %d and my gender is %s" % (self.name, self.age, self.__gender)


def main():
    p = Person("Colin", 16, "male")
    p.self_introduce()

    """
    self_introduce was visited...
    _Person__format was visited...
    name was visited...
    age was visited...
    _Person__age was visited...
    _Person__gender was visited...
    my name is Colin,I'm 18 and my gender is male
    """


if __name__ == '__main__':
    main()
```
通过以上示例我们发现，`__getattribute__()`拦截实例属性访问效果如下：
* 实例公有属性。
* `property`。同时会访问其绑定的私有属性(名字重整)
* 实例私有属性。会访问名字重整后的属性
* 实例公有方法。实例方法也属于`attribute`，故而也会被拦截
* 实例私有方法。与私有属性类似，会访问其名字重整后的方法

**切勿在`__getattribute__()`中使用实例属性**，属性拦截器中访问实例属性会进入再次触发拦截器，导致陷入递归死循环。

### 2.7 \_\_getattr\_\_()
python遵循以下顺序来访问一个对象的属性。

* `obj.__dict__`
* `class.__dict__`
* `obj.__getattr__()`

首先搜索对象本身的`__dict__`字典，找到则返回，否则搜索对象所属类型的`__dict__`字典，找到则返回，否则尝试执行对象的`__getattr__()`，如果对象定义了`__getattr__()`则执行，否则将抛出`AttributeError`。

**只有访问对象不存在的属性时才会执行`__getattr__()`，只要定义了此方法，访问任何不存在属性都不再报错。`__getattr__()`不适用于方法。**

```py {2,4,10}
class Person(object):
    def __getattr__(self, item):
        print(item)
        return self  # 返回当前实例，以此可使用链式属性访问


def main():
    p = Person()
    p.name
    p.age.gender


if __name__ == '__main__':
    main()
```

对象的`__getattribute__()`控制着对象属性整个访问流程，而`__getattr__()`则仅仅是检索对象属性的最后一环而已。

### 2.8 内建属性
常用属性|说明|
:-|:-
`__class__`|实例类型。`obj.__class__`等价于`type(obj)`
`__dict__`|实例**自定义**公有属性和值，不含`property`。`dir(obj)`则可拿到实例所有公有属性，含`property`
`__doc__`|类文档,子类不继承。
`__bases__`|类的所有父类构成元素

```py
class Person(object):
    "人类"

    def __init__(self, name, age, gender):
        self.name = name
        self.__age = age
        self.__gender = gender

    @property
    def age(self):
        return self.__age


def main():
    p = Person("Colin", 16, "male")
    print(p.__class__)  # <class '__main__.Person'>
    print(p.__dict__)  # {'name': 'Colin', '_Person__age': 16, '_Person__gender': 'male'}
    print(p.__doc__)  # 人类
    print(Person.__bases__)  # (<class 'object'>,)


if __name__ == '__main__':
    main()
```

## 3. property
直接暴露对象的属性是不全安的，我们之前使用了`getter`和`setter`方法来封装对私有属性的操作，在外部可以通过`getter`和`setter`以方法方式操作私有属性。

除了之外python还提供`property`方式操作属性。

```py {12}
class Person(object):
    def __init__(self):
        self.__name = "Colin"

    def get_name(self):
        return self.__name

    def set_name(self, value):
        self.__name = value

    # property对象关联了属性的getter和setter方法
    name = property(get_name, set_name, doc="姓名")


def main():
    p = Person()
    print(p.name)  # Colin
    p.name = "Robin"
    print(p.name)  # Robin


if __name__ == '__main__':
    main()
```
通过以上代码我们可以看到`property`对象关联了`getter`和`setter`方法，我们直接操作`proeprty`对象会自动调用其绑定属性的`getter`和`setter`方法。

除了以上方式，我们还可以使用`property`[装饰器](../senior/decorator.md)简化其使用。此方式要求`getter`和`setter`方法必须使用相同方法名，此方法名也是我们最终操作的`property`对象名称。`getter`方法必须在`setter`前面定义。

```py {5,10}
class Person(object):
    def __init__(self):
        self.__name = "Colin"

    @property
    def name(self):
        "姓名"
        return self.__name

    @name.setter
    def name(self, value):
        self.__name = value


def main():
    p = Person()
    print(p.name)  # Colin
    p.name = "Robin"
    print(p.name)  # Robin


if __name__ == '__main__':
    main()
```

::: tip
只读 / 只写 property
:::
```py {6,13}
class Person(object):
    def __init__(self, name, age):
        self.__name = name
        self.__age = age

    @property
    def name(self):  # 只读
        return self.__name

    def set_age(self, value):  # 只写
        self.__age = value

    age = property(None, set_age)


def main():
    p = Person("Colin", 18)
    print(p.name)
    p.age = 20


if __name__ == '__main__':
    main()
```

## 4. 类级别成员
类属性多用于存储当前类的全局数据，如统计当前类有多少实例等，类方法用于操作类属性。

在C#等多数语言中没有类属性，如果我们要存储一个类有多少实例和每个实例的情况等统计数据，往往需要另外声明一个静态集合变量去存储这些统计信息，而python则可以直接存储到类属性当中即可。

静态方法则常用于封装工具方法。

### 4.1 类属性
前面我们用到的属性都是实例属性，实例属性一般在`__init__`中初始化。除此之外，我们还可以直接在类根代码块中定义类属性。

```py {2}
class Person(object):
    count = 0  # 类属性。一般需要私有化类属性，通过类方法操作类属性

    def __init__(self):
        self.__name = None  # 实例属性


def main():
    p1 = Person()
    p2 = Person()

    print(p1.count)  # 0
    print(p2.count)  # 0
    print(Person.count)  # 0

    p1.count = 10  # 仅p1有效
    print(p1.count)  # 10
    print(p2.count)  # 0
    print(Person.count)  # 0

    Person.count = 30  # 全局有效
    print(p1.count)  # 10
    print(p2.count)  # 30
    print(Person.count)  # 30


if __name__ == '__main__':
    main()
```
类属性属于类本身，但类属性既可以通过类名访问也可以通过实例访问。通过实例访问,修改其值仅对当前实例有效。通过类名访问，修改其值会对类属性本身和未修改过的实例有效，新创建实例也会使用新的修改后的类属性值。因为会被全局修改影响，故而不推荐使用类属性做实例方式访问使用。

### 4.2 类方法
与普通实例属性类似，为了数据安全我们通常会私有化类属性，并通过类方法暴露类属性操作。调用类方法修改的类属性全局有效。同样为避免相互影响，不推荐将类方法通过实例访问。

类方法至少有一个参数，通常为`cls`指向类本身(类本身就是一个对象)。

```py {5,9}
class Person(object):
    __count = 0  # 类属性

    # 类方法
    @classmethod  # 类方法修饰器
    def set_count(cls, cnt):  # cls代表当前类，与实例方法中的self类似
        cls.__count = cnt

    @classmethod
    def get_count(cls):
        return cls.__count


def main():
    p1 = Person()
    p2 = Person()
    print(p1.get_count())  # 0
    print(p2.get_count())  # 0
    print(Person.get_count())  # 0

    p1.set_count(10)
    print(p1.get_count())  # 10
    print(p2.get_count())  # 10
    print(Person.get_count())  # 10

    Person.set_count(20)
    print(p1.get_count())  # 20
    print(p2.get_count())  # 20
    print(Person.get_count())  # 20


if __name__ == '__main__':
    main()
```

### 4.3 静态方法
静态方法常用于封装通用工具方法，静态方法既可以通过类名访问也可以通过实例访问。静态方法可以无参。

```py {3,7}
class Message(object):
    # 静态文件装饰器
    @staticmethod
    def send_notification(msg):
        print("消息通知" + msg)

    @staticmethod
    def send_email(msg):
        print("邮件通知" + msg)


def main:
    # 类名方式访问
    Message.send_notification("hello")
    msg = Message()
    msg.send_email("hello")


if __name__ == '__main__':
    main()
```

### 4.4 类属性案例
#### 4.4.1 单例类
```py {2,3,10,11,15,16}
class China(object):
    __instance = None
    __initialized = False

    @classmethod
    def singleton(cls):
        return cls.__instance

    def __new__(cls, name):
        if not cls.__instance:  # 确保只会创建一次
            cls.__instance = object.__new__(cls)
        return cls.__instance

    def __init__(self, name):
        if China.__initialized:  # 确保只会初始化一次
            return
        self.__name = name
        China.__initialized = True

    def get_name(self):
        return self.__name


def main():
    c1, c2, c3 = China("中国"), China("台湾"), China.singleton()
    print(id(c1) == id(c2) == id(c3))
    print(c1.get_name())
    print(c2.get_name())
    print(c3.get_name())


if __name__ == '__main__':
    main()
```
#### 4.4.2 在线用户统计
```py
class User(object):
    __onlineUsers = []  # 记录所有在线用户

    @classmethod
    def getOnlineUsers(cls):  # 获取在线用户
        return cls.__onlineUsers

    @classmethod
    def addOnlineUser(cls, user):  # 添加在线用户
        cls.__onlineUsers.append(user)

    @classmethod
    def removeOnlineUser(cls, id):  # 移除在线用户
        for user in cls.__onlineUsers:
            if user.get_id() == id:
                cls.__onlineUsers.remove(user)
                break

    @staticmethod
    def displayObjectList(list):  # 打印对象列表
        list_str = []
        for item in list:
            list_str.append(eval(str(item)))
        print(list_str)

    def __init__(self, id, name):
        self.__id, self.__name = id, name

    def __str__(self):
        return "{'id':%d,'name':'%s'}" % (self.__id, self.__name)

    def get_id(self):
        return self.__id

    # 登录
    def login(self):
        User.addOnlineUser(self)
        print("%s login" % self.__name)

    # 登出
    def logout(self):
        User.removeOnlineUser(self.__id)
        print("%s logout" % self.__name)


def main():
    user1 = User(1, "Colin")
    user2 = User(2, "Robin")

    user1.login()
    user2.login()
    online_users = User.getOnlineUsers()
    User.displayObjectList(online_users)  # [{'id': 1, 'name': 'Colin'}, {'id': 2, 'name': 'Robin'}]

    user2.logout()
    online_users = User.getOnlineUsers()
    User.displayObjectList(online_users)  # [{'id': 1, 'name': 'Colin'}]


if __name__ == '__main__':
    main()
```

## 5. 继承
继承语法如下:
```py
class BaseClass(object):
    pass

class SubClass(BaseClass):
    pass
```

所有类最终都继承自`object`类。

### 5.1 方法重写
在子类中定义与父类同名的方法即可重写父类方法。子类中可以通过父类名称或`super()`调用父类方法。
```py {2,6,8}
class Animal(object):
    def eat(self):
        print("开吃...")


class Cat(Animal):
    # 重写父类方法
    def eat(self):
        # 调用父类方法。以下两种方式均可
        # Animal.eat(self)
        super().eat()

        print("吃鱼...")


tom = Cat()
tom.eat()
```

### 5.2 多继承
python支持多继承。如果多个或多级父类中存在同名方法，解释器会按照一定顺序选择进行调用。这个选择顺序保存在当前类的`__mro__`属性当中，该顺序由C3算法决定。如果要明确调用某个父类的方法或不按照`__mro__`顺序调用，可以使用[方法重写](#_4-1-方法重写)中提到的第一种方法根据父类名称调用父类方法。

显式声明继承自`object`的类称为新式类，否则称为旧式类，旧式类仅存在于python2中。多继承中，搜索类的继承成员时，新式类使用广度搜索，旧式类使用深度搜索。

```py {16,23,25}
class People(object):
    def speak(self):
        print("说话...")


class Chinese(People):
    def speak(self):
        print("说中文...")


class American(People):
    def speak(self):
        print("说英文...")


class ChineseAmerican(Chinese, American):
    def speak(self):
        print("说多种语言...")


def main():
    ca = ChineseAmerican()
    print(ChineseAmerican.__mro__)  # 多父类同名方法调用顺序
    ca.speak()  # 默认顺序方法调用
    Chinese.speak(ca)  # 强制调用指定父类方法


if __name__ == '__main__':
    main()
```

## 6. 多态
C#等强类型多态主要包括方法重载体现的编译时的多态性和虚方法重写体现的运行时多态性。

作为解释型语言python没有编译过程，同时不支持函数或方法重载，故而没有编译时多态性。
作为动态类型语言python虽然支持方法重写但变量数据类型可变，导致其没有强类型语言多态特性体现明显。


以下示例演示了python中重写父类方法体现的简单多态特性。
```py
# 模拟抽象类
class People(object):
    # 模拟抽象方法
    def sayhi(self):
        pass

    # 通用业务方法
    def sleep(self):
        print("huhuhu...")


# 具体业务类
class Chinese(People):
    # 模拟重写实现抽象方法
    def sayhi(self):
        print("你好...")


# 具体业务类
class American(People):
    # 模拟重写实现抽象方法
    def sayhi(self):
        print("Hello...")


def greeting(people: People):
    people.sayhi()  # 定义时不确定执行内容，执行时根据调用对象确定实际执行内容


def main():
    c, a = Chinese(), American()
    greeting(c)
    greeting(a)


if __name__ == '__main__':
    main()
```

我们常在一个业务基类中完成整体业务流程，实现通用方法(相当于C#中的抽象业务基类的工作)，具体不同的业务方法则只做声明，而后在具体业务子类中重写并实现具体业务方法(相当于C#的具体业务子类的工作)。python中没有抽象类和抽象方法，但我们可以在基类中定义方法但不实现来模拟抽象方法。