# 异常处理

## 1. 异常基本处理
异常捕获及处理示例如下：
```py
try:
    # 1 / 0
    # int("abc")
    # open("", "r")
    # print(abc)
    print("good")
except ZeroDivisionError:
    print("division by zero")
except (ValueError, FileNotFoundError):
    print("catch many exceptions")
except Exception as ex:
    print(ex)
else:
    print("no exception")
finally:
    print("done")
```

* 同时捕获多种异常时，`except`之后需要使用异常类型元组
* 需要使用异常信息时使用`as`关键字拿到异常
* `Exception`类型是所有异常类型的基类，可以捕获所有类型异常，
* `try`配对的`else`仅会在没有异常时执行
* `finally`在所有情况下都会执行

## 2. 自定义异常
自定义异常类继承`Exception`即可，异常相关数据和逻辑可以自定义。使用`raise`关键字可以手动抛出异常，也可以在向上抛出异常。

```py
class InvalidContentException(Exception):
    '自定义异常'

    def __init__(self, content):
        self.__content = content
        self.__errorMessage = "'%s' can only be letters or numbers" % content

    def __str__(self):
        return self.__errorMessage


class User:
    def __init__(self, userName, password: str):
        self.__userName = userName
        if not password.isalnum():
            raise InvalidContentException(password)  # 手动抛出异常
        else:
            self.__password = password


try:
    user = User("Colin", "pwd#")
except InvalidContentException as ex:
    print(ex)  # 'pwd#' can only be letters or numbers
    raise  # 继续向上抛出异常
```