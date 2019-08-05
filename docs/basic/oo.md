# 面向对象

## 1. 类
* 类的帮助信息可以通过`ClassName.__doc__`查看
* 类中方法定义时至少有一个参数，通常名为`self`表示当前类实例。相当于C#当中`this`对象
* 类示例化与函数调用类似，而不需要像C#一样使用`new`关键字
* 类中定义的成员名称以`__`开头表示为私有成员，外部不可访问
* python中属性相当于C#当中的字段。为了数据安全我们通常将属性私有化而后定义并暴露属性操作方法
* **python中每个类本身就是一个对象，可以直接使用类名访问**

```py
# 示例代码
class Person:
    'Person帮助信息'

    def __init__(self, name):
        '''
        私有属性
        一般在此初始化所有私有属性，不管是否在参数列表中传值，
        否则直接调用属性对应get方法会抛异常
        '''
        self.__name = name
        self.__age = 0

    # 属性操作方法
    # __name 初始化后只读
    def getName(self):
        return self.__name

    def getAge(self):
        return self.__age

    def setAge(self, age):
        self.__age = age if age >= 0 and age <= 100 else 0


    # 业务方法
    def sayHi(self):
        print(self.__getText())

    # 私有方法
    def __getText(self):
        return "Hi,my name is %s and I'm %d years old" % (self.__name, self.__age)


p = Person("Colin")
p.setAge(18)
p.sayHi()  # Hi,my name is Colin and I'm 18 years old
```


:::warning 动态扩展属性
python是动态类型语言，可以为对象动态扩展属性，扩展属性仅在当前对象中可用。对象扩展属性不应在类内部使用，否则其他实例使用时没有对应扩展属性会触发异常。此方法仅在特殊情况下使用。
:::

```py
class Person:
    '人类'

    def sayHi(self):
        print("hi")


p = Person()
p.name = "Colin"  # 为对象动态扩展属性，仅对当前对象有效
```

## 2. 魔法方法
python中具有特殊功能的方法常称为魔法方法。
### 2.1 \_\_new\_\_
`__new__`方法用于创建对象。该方法定义在`object`类中，被所有类继承。

`__new__`方法至少有一个参数，通常为`cls`,指向要实例化的类自身对象， 此参数在实例化时由python解释器自动提供。除了`cls`参数，`__new__`方法参数列表应该与`__init__`方法相同。因为开发者实例化对象时提供的相关初始化参数会首先传递到`__new__`方法中，`__new__`方法必须定义相关形参接收，即使不使用这些参数。

`__new__`方法把创建的实例作为返回值。如果要重写`__new__`方法需要调用并返回父类或`object`的`__new__`创建的实例。

创建一个对象的过程包含如下三步：
* 执行`__new__`方法创建实例并返回。
* 执行`__init__`方法初始化对象。`__new__`方法返回值作为`__init__`方法的`self`参数。
* 将变量指向新建的对象引用。

**`__new__`方法执行完成并返回结果后才会执行`__init__`方法。**

`__new__`方法使用参见[单例类](#_3-4-1-单例类)。

### 2.2 \_\_init\_\_
`__init__`方法用于初始化对象。`__new__`和`__init__`组合起来相当与C#中的构造方法。

`__init__`方法至少有一个参数，通常为`self`，指向`__new__`方法创建的实例。

`__init__`方法没有返回值。


一般需要在`__init__`方法中初始化所有私有属性，不管是否在参数列表中传值，否则直接调用属性对应get方法会抛异常。

如果父类定义了多参`__init__`方法，其子类必须也要定义`__init__`方法,参数列表可以与父类不同，但应当在`__init__`方法中调用其所有父类`__init__`方法(非强制)初始化必要属性，否则可能会在访问到未按父类`__init__`方法初始化的成员时触发异常。

```py
class Chinese():
    def __init__(self, name):
        self.__name = name

    def getName(self):
        return self.__name


class American():
    def __init__(self, age):
        self.__age = age

    def getAge(self):
        return self.__age


class ChineseAmerican(Chinese, American):
    def __init__(self, name, age, gender):
        # 调用父类初始化方法
        Chinese.__init__(self, name)
        American.__init__(self, age)
        self.__gender = gender

    def selfIntroduce(self):
        print("my name is %s,I'm %d years old and my gender is %s"
              % (self.getName(), self.getAge(), self.__gender))


ca = ChineseAmerican("Colin", 18, "Male")
ca.selfIntroduce()
```

### 2.3 \_\_del\_\_
`__del__`类似于C#当中的析构函数，会在对象销毁时调用。由于对象是地址引用，一个对象实际可能有多个变量引用，只有当对象的引用数为0时才会真正删除对象。类似与Linux中的文件硬链接。

可以通过`sys`模块的`sys.getrefcount(obj)`获取obj对象的引用数，由于该函数执行时会内部会定义变量接收对象，统计完即释放，所以`测量引用数=实际引用数+1`。

```py
import sys


class Person:
    def __del__(self):
        print("对象被销毁")


p1 = Person()
p2 = p1

print(sys.getrefcount(p1))  # 3

del p1
print("p1被删除")
del p2
print("p2被删除")

'''
p1,p2指向同一个地址引用，所以p1指向的地址应用数为3。
删除p1并不会删除内存对象，删除p2后，内存对象引用数为0，此时会调用__del__方法并删除该内存对象。
'''

# 输出内容如下：
3
p1被删除
对象被销毁
p2被删除
```

### 2.4 \_\_str\_\_
C#中一个对象被直接打印时默认会输出其类名，我们可以通过`override`其`ToString()`方法定制输出内容。与之类似，python中对象被直接`print`时会默认输出类名和对象内存地址，我们可以通过`__str__`方法定制输出内容，该方法必须返回字符串。

```py
class Person:
    def __init__(self, name):
        self.__name = name

    def __str__(self):
        return "my name is %s" % self.__name        


p = Person("Colin")
print(p)  # my name is Colin
```

## 3. 类特殊成员
类属性多用于存储当前类的全局数据，如统计当前类有多少实例等，类方法用于操作类属性。

在C#等多数语言中没有类属性，如果我们要存储一个类有多少实例和每个实例的情况等统计数据，往往需要另外声明一个静态集合变量去存储这些统计信息，而python则可以直接存储到类属性当中即可。

静态方法则常用于封装工具方法。

### 3.1 类属性
前面我们用到的属性都是实例属性，实例属性一般在`__init__`中初始化。除此之外，我们还可以直接在类根代码块中定义类属性。

```py
class Person:
    count = 0  # 类属性。一般需要私有化类属性，通过类方法操作类属性

    def __init__(self):
        self.__name = None  # 实例属性


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
```
类属性属于类本身，但类属性既可以通过类名访问也可以通过实例访问。通过实例访问,修改其值仅对当前实例有效。通过类名访问，修改其值会对类属性本身和未修改过的实例有效，新创建实例也会使用新的修改后的类属性值。因为会被全局修改影响，故而不推荐使用类属性做实例方式访问使用。

### 3.2 类方法
与普通实例属性类似，为了数据安全我们通常会私有化类属性，并通过类方法暴露类属性操作。调用类方法修改的类属性全局有效。同样为避免相互影响，不推荐将类方法通过实例访问。

类方法至少有一个参数，通常为`cls`指向类本身(类本身就是一个对象)。

```py
class Person:
    __count = 0  # 类属性

    # 类方法
    @classmethod  # 类方法修饰器
    def setCount(cls, cnt):  # cls代表当前类，与实例方法中的self类似
        cls.__count = cnt

    @classmethod
    def getCount(cls):
        return cls.__count


p1 = Person()
p2 = Person()
print(p1.getCount())  # 0
print(p2.getCount())  # 0
print(Person.getCount())  # 0

p1.setCount(10)
print(p1.getCount())  # 10
print(p2.getCount())  # 10
print(Person.getCount())  # 10

Person.setCount(20)
print(p1.getCount())  # 20
print(p2.getCount())  # 20
print(Person.getCount())  # 20
```

### 3.3 静态方法
静态方法常用于封装通用工具方法，静态方法既可以通过类名访问也可以通过实例访问。静态方法可以无参。

```py
class Message:
    # 静态文件装饰器
    @staticmethod
    def sendNotification(msg):
        print("消息通知" + msg)

    @staticmethod
    def sendEmail(msg):
        print("邮件通知" + msg)


# 类名方式访问
Message.sendNotification("hello")
msg = Message()
msg.sendEmail("hello")
```

### 3.4 类属性案例
#### 3.4.1 单例类
```py
class China:
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

    def getName(self):
        return self.__name


c1, c2, c3 = China("中国"), China("台湾"), China.singleton()
print(id(c1) == id(c2) == id(c3))
print(c1.getName())
print(c2.getName())
print(c3.getName())
```
#### 3.4.2 在线用户统计
```py
class User:
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
            if user.getId() == id:
                cls.__onlineUsers.remove(user)
                break

    @staticmethod
    def displayObjectList(list):  # 打印对象列表
        listStr = []
        for item in list:
            listStr.append(eval(str(item)))
        print(listStr)

    def __init__(self, id, name):
        self.__id, self.__name = id, name

    def __str__(self):
        return "{'id':%d,'name':'%s'}" % (self.__id, self.__name)

    def getId(self):
        return self.__id

    # 登录
    def login(self):
        User.addOnlineUser(self)
        print("%s login" % self.__name)

    # 登出
    def logout(self):
        User.removeOnlineUser(self.__id)
        print("%s logout" % self.__name)


user1 = User(1, "Colin")
user2 = User(2, "Robin")

user1.login()
user2.login()
onlineUsers = User.getOnlineUsers()
User.displayObjectList(onlineUsers)  # [{'id': 1, 'name': 'Colin'}, {'id': 2, 'name': 'Robin'}]

user2.logout()
onlineUsers = User.getOnlineUsers()
User.displayObjectList(onlineUsers)  # [{'id': 1, 'name': 'Colin'}]
```

## 4. 继承
继承语法如下:
```py
class BaseClass:
    pass

class SubClass(BaseClass):
    pass
```
* 所有类最终都继承自`object`类。
* 子类不能访问父类私有成员。

### 4.1 方法重写
在子类中定义与父类同名的方法即可重写父类方法。子类中可以通过父类名称或`super()`调用父类方法。
```py
class Animal:
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

### 4.2 多继承
python支持多继承。如果多个或多级父类中存在同名方法，解释器会按照一定顺序选择进行调用。这个选择顺序保存在当前类的`__mro__`属性当中，该顺序由C3算法决定。如果要明确调用某个父类的方法或不按照`__mro__`顺序调用，可以使用[方法重写](#_4-1-方法重写)中提到的第一种方法根据父类名称调用父类方法。

```py
class People:
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


ca = ChineseAmerican()
print(ChineseAmerican.__mro__)  # 多父类同名方法调用顺序
ca.speak()  # 默认顺序方法调用
Chinese.speak(ca)  # 强制调用指定父类方法
```

## 5. 多态
C#等强类型多态主要包括方法重载体现的编译时的多态性和虚方法重写体现的运行时多态性。

作为解释型语言python没有编译过程，同时不支持函数或方法重载，故而没有编译时多态性。
作为动态类型语言python虽然支持方法重写但变量数据类型可变，导致其没有强类型语言多态特性体现明显。


以下示例演示了python中重写父类方法体现的简单多态特性。
```py
# 模拟抽象类
class People:
    # 模拟抽象方法
    def sayHi(self):
        pass

    # 通用业务方法
    def sleep(self):
        print("huhuhu...")


# 具体业务类
class Chinese(People):
    # 模拟重写实现抽象方法
    def sayHi(self):
        print("你好...")


# 具体业务类
class American(People):
    # 模拟重写实现抽象方法
    def sayHi(self):
        print("Hello...")


def greeting(people: People):
    people.sayHi()  # 定义时不确定执行内容，执行时根据调用对象确定实际执行内容


c, a = Chinese(), American()
greeting(c)
greeting(a)
```

我们常在一个业务基类中完成整理业务流程，实现通用方法(相当于C#中的抽象业务基类的工作)，具体不同的业务方法则只做声明，而后在具体业务子类中重写并实现具体业务方法(相当于C#的具体业务子类的工作)。python中没有抽象类和抽象方法，但我们可以在基类中定义方法但不实现来模拟抽象方法。