# 动态扩展

## 1. 动态语言
动态编程语言是高级程序设计语言的一个类别,在计算机科学领域已被广泛应用。它是一类在运行时可以改变其结构的语言 :例如新的函数、对象、甚至代码可以被引进,已有的函数可以被删除或是其他结构上的变化。动态语言目前非常具有活力。例如JavaScript便是一个动态语言,除此之外如 PHP、Ruby、Python 等也都属于动态语言,而 C 、 C++ 等语言则不属于动态语言。

Python 的动态语言特性无处不在。比如变量类型的动态性，一个变量可以接收任何类型的对象，甚至我们可以在程序运行过程中去修改对象。

```py
a = 3.14
a = "hi there"
```

C#等强类型语言会自动进行类型约束和类型检查，限制了其灵活性但也避免了很多错误，提高了安全性，而python等动态语言则相反，使用灵活生动，但这也导致了其安全性隐患。值得一提的是，C#等非动态语言也在不断升级过程中融入了很多动态语言特性，如C#中的ExpandoObject类型就支持动态扩展。

```csharp
// C# 动态特性示例
dynamic d = new ExpandoObject();//创建动态对象 
d.Name = "Tom";
d.Age = 20;
Console.WriteLine(d.Age);
```

## 2. 动态扩展对象
 这里我们定义一个`Person`类并实例化一个`person`对象，下面操作都以此为例。
```py
class Person:
    def __init__(self,name):
        self.name = name

person = Person("Colin")
```
### 2.1 实例属性

```py
person.age = 18  # 为person对象扩展age属性，仅对当前对象有效
print(person.age)  # 18

p = Person("Robin")
print(p.age)  # 异常。 p没有age属性
```

对象扩展属性仅在当前对象中可用，不能通过其他实例访问，对象扩展属性也不应在实例方法中使用，否则其他实例使用时没有对应扩展属性会触发异常。
### 2.2 类属性

```py
Person.nationality = "China" # 动态扩展类属性
print(Person.nationality)  # China
print(person.nationality)  # China 
```

### 2.2 实例方法
我们知道类的实例方法中通常需要一个`self`接收当前对象，如果直接像扩展属性一样扩展实例方法，那扩展方法调用时并不会把当前实例作传到方法的`self`形参。这时候我们就需要把要扩展的实例方法与实例对象建立绑定关系，`types`模块中的`MethodType`类可以实现这一功能，它会把的给定的方法与实例建立绑定关系，并返回方法引用，方法被调用时会自动将实例作传递给`self`形参。

```py
import types

def sayhi(self):
    print("hi there...")

person.sayhi = types.MethodType(sayhi,person)  # 绑定sayhi方法与person对象，并将绑定后的方法引用赋值给person的sayhi扩展属性
person.sayhi()  # hi there
```

`types.MethodType`只是绑定了扩展方法与实例，保证方法被调用时会将实例作为参数传入，但并没有对实例做任何扩展，其返回值是扩展方法的引用，如果不接收返回值则无法调用扩展方法，我们通常会将其赋值给对象的同名扩展属性(非必须)以提高代码可读性，这样一来就相当于为实例扩展了一个方法。

### 2.3 类方法和静态方法
扩展类方法和静态方法与扩展属性一样简单，没有扩展实例方法参数传递问题。
```py
@classmethod
def count(cls):
    print("count instances")

@staticmethod
def test():
    print("test")
    
Person.count = count
Person.test = test

Person.count()  # count instances
Person.test()  # test
```
### 2.4 删除属性和方法
我们可以通过以下两种方式动态删除对象的属性和方法

```py
del person.name
delattr(person,"sayhi")
```

## 3. \_\_slots\_\_
通过前面学习我们知道python允许我们为对象动态扩展实例属性和方法，有时为了避免扩展属性带来的问题，我们可以通过`__slots__`变量限制扩展实例属性。
```py
class Person:
    __slots__ = ("name", "age")  # 限定当前实例对象可以使用的所有属性名称，包含现有属性和扩展属性

    def __init__(self, name):  # 现有属性也必须出现在__slots__中
        self.name = name


p = Person("Colin")
p.name, p.age = "Colin", 18
p.gender = "male"  # 异常，不允许使用非限定属性名称
```

需要注意的是，`__slots__`仅对当前类实例有效，对子类实例不起作用。