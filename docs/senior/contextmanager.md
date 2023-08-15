# 上下文管理器

## 1. 上下文管理器

一个类如果实现了`__enter()__`和`__exit()___`两个魔法方法，该类创建的对象我们称为上下文管理器。

对于上下文管理器我们可以使用`with`语句。进入`with`语句会调用上下文管理器的`__enter__()`，离开`with`语句作用域时会自动调用上下文管理器的`__exit()__`。

```py {6,10,16}
class File(object):
    def __init__(self, file_name, open_mode):
        self.__file_name = file_name
        self.__open_mode = open_mode

    def __enter__(self):
        self.__file = open(self.__file_name, self.__open_mode)
        return self.__file

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.__file.close()


if __name__ == '__main__':
    # with语句使用上下文管理器
    with File("test.txt", "w") as file:
        # w模式不允许读取文件。操作出错，离开with语句时依然会执行__exit__()方法关闭文件
        content = file.read()  
        print(content)

```

**`with`语句必须配合上下文管理器使用**。上下文管理可以实现`try...finally...`的效果，它提供了一种简单且安全的方式来使用需要及时关闭和释放的资源。

`with`和上下文管理器的搭配非常类似于.Net中`using`和`IDisposable`的组合来使用和释放非托管资源，而`using`方式使用`IDisposable`对象本质就是使用了`try...finally...`结构，在`finally`语句中调用对象的`Close`和`Dispose`方法。

## 2. contextmanager

上下文管理器除了上述使用方式之外，还提供了一个`contextmanager`装饰器配合`yield`生成器来简化上下文管理器的使用。

`yield`之前的内容在`__enter()__`中执行，`yield`之后的内容在`__exit()__`中执行。`yield`后面的值作为`__enter()__`返回值。

```py {1,4,7}
from contextlib import contextmanager


@contextmanager
def file(file_name, open_mode):
    _file = open(file_name, open_mode)  # yield前 在__enter__()中执行
    yield _file
    _file.close()  # yield后 在__exit__()中执行


if __name__ == '__main__':
    with file("test.txt", "w") as f:
        content = f.read()
        print(content)
```
