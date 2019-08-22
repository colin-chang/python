# 字符串

## 1. 字符串基础
与javascript类似，python中用单引号或双引号声明字符串对象，python中只有字符串(str)类型，没有字符(char)类型。

### 1.1 下标
与其他语言类似，python字符串可以看作是字符数组，顺序下标从0开始。不同的是，python支持从后往前的逆序下标，使用负数作为字符串下标，从-1开始。

```py
name = "Colin"
name[0]  # name第一个字符 C
name[-1] # name最后一个字符 n
len(name)   # name长度 5
```

### 1.2 切片
切片就是从字符串中按规则提取部分内容。切片需要借助字符串下标。格式为 `str[start:end:step_length]`，
* 切片范围为前开后闭区间，即包含start，但不包含end。
* start和end都可以缺省。start缺省表示字符串头，end缺省表示字符串尾。头尾方向由步长决定。
* step_length可以省略，默认为1。负数则表示从右往左取，利用此特征可以实现字符串逆序截取。

```py
s = "abcdEFGH"
s[1:4]  # 截取下标1～3的内容。结果bcd
s[1:-1]  # 截取下标1～-2的内容。结果bcdEFG
s[1:]  # 从下标1开始截取到字符串尾。结果bcdEFGH
s[1:-1:2]  # 截取下标1～-2的内容，步长为2。结果bdf
s[::-1]  # 字符串逆序 结果HGFEdcba
```

### 1.3 字符串格式
* 原生字符串
与大多数编程语言相同，python使用"\"作为转义字符。同时使用`r`标记原生字符串，类似于C#中使用`@`标记原生字符串。
这在书写正则表达式中常用。

```py
print("a\tb")  # a    b
print("a\\tb")  # a\tb
print(r"a\tb")  # a\tb
```

* 带格式字符串
python中使用`"""`或`'''`声明带格式字符串。

```py
s = """<div>
    <p>我最不忍看你</p>
    <p>背向我转面</p>
</div>"""
```

### 1.4 字符串拼接
#### 1) 简单拼接
```py
a = "Colin"
b = "Hello " + a
c = "Hello %s" % a
```
#### 2) str.format()
Python2.6 开始，新增了一种格式化字符串的函数`str.format()`，可以方便地格式化字符串。
* 参数顺序
```py
# 默认顺序
"{} {}".format("how do", "you do")

# 指定顺序
"how {0} {1} {0}".format("do", "you")

# 命名参数
"how {do} {you} {do}".format(do="do", you="you")
```

* 复杂参数
```py
# 列表参数
names=["Colin","Robin","Sean"]
"the winners are {0[0]},{0[1]} and {0[2]}".format(names)

# 字典参数
person = {"name": "Colin", "age": 18}
"my name is {name} and I'm {age}".format(**person)

# 对象参数
class Person(object):
    def __init__(self, name, age):
        self.__name = name
        self.__age = age

    @property
    def name(self):
        return self.__name

    @property
    def age(self):
        return self.__age


p = Person("Colin", 18)
"my name is {0.name} and I'm {0.age}".format(p)
```

* 数字格式化

格式|描述|示例
:-|:-|:-
`{:.nf}`|保留小数点后n位|`"{:.2f}".format(3.1415926) -> 3.14`
`{:+.nf}`|带符号保留小数点后n位|`"{:+.2f}".format(-3.1) -> -3.10`
`{:0>nd}`|左侧补0填充,长为n|`"{:0>2d}".format(3) -> 03`
`{:x<nd}`|左侧补x填充,长为n|`"{:x<3d}".format(3) -> 3xx`
`{:,}`|逗号分隔|`"{:,}".format(10000) -> 10,000`
`{:.n%}`|百分比格式n位小数|`"{:.2%}".format(0.25678) -> 25.68%`

如果要输出`{}`可以使用`{}`转义。如：
```py
"{{{}}}".format(100)  # {100}
```

## 2. 常用操作
### 2.1 find / index
python中获取字符串索引可以使用`find / rfind`和`index / rindex`。`find`和`index`从左至右查找,`rfind`和`rindex`表示从右至左查找。
如果字符串没有找到，`find / rfind`返回-1，而`index / rindex`则会抛出异常。

```py
s = "Hello world"
s.find("o") # 4
s.rfind("o")  # 7
s.find("haha") # -1
s.index("haha") # 异常
```

:::tip contains
python中字符串没有contains函数，我们可以通过以下两种方式判断是否包含字符串。
:::

```py
s = "how do you do"

s.find("do") >= 0     # 根据索引判断是否包含
"do" in s             # 根据列表元素存在性判断是否包含
```

### 2.2 count
`count`方法用户统计字符串出现次数。
```py
s = "Hello world"
s.count("o")  # 2
```

### 2.3 replace
`replace`用于字符串替换。
```py
s = "how do you do"
s.replace("do","DO")  # how DO you DO
s.replace("do","DO",1)    # how DO you do 最后参数限定替换次数。
```

### 2.4 capitalize / title
capitalize把字符串第一个字符大写。title把每个单词首字母大写
```py
s =  "colin chang"
s.capitalize()    # Colin chang
s.title()     # Colin Chang
```

### 2.5 ljust / rjust / center
`ljust / rjust / center`分表表示居左居右居中方式使用空格填充最小字符串长度。`ljust / rjust`类似于C#的`PadLeft / PadRight`。

```py
s = "how do you do"
s.ljust(20)   # 'how do you do       '
s.center(20)  # '   how do you do    '
```

### 2.6 lstrip / rstrip / strip
`lstrip / rstrip / strip`用于去除左侧右侧和两侧全部空格。类似于C#的`TrimStart / TrimEnd / Trim`

```py
s = '   how do you do    '
s.lstrip()    # 'how do you do    '
s.rstrip()    # '   how do you do'
s.strip()     # 'how do you do'
```

### 2.7 partition / rpartition
`partition`会将字符串按照特定关键字切割为三部分组成元组。（关键字左侧部分,关键字,关键字右侧部分)。`rpartition`功能相同，只是从右侧开始。

```py
s = "what do you do these years"
s.partition("do")     # ('what ', 'do', ' you do these years')
s.rpartition("do")    # ('what do you ', 'do', ' these years')
```

### 2.8 split / splitlines
`split / splitlines`分别以给定关键字和换行(`\n`)切割字符串。**如果split不提供参数则会使用空白字符(如，空格、\t、\n等)切割字符串**。

```py
s = "how do you do"
s.split(" ")      # ['how', 'do', 'you', 'do']
s.split("do",1)   # ['how ', ' you do'] 最后参数限定切割次数

s = "how\ndo\nyou\ndo" 
s.splitlines()    # ['how', 'do', 'you', 'do']

s = "how\ndo\tyou do"
s.split()         # ['how', 'do', 'you', 'do']
```

### 2.9 isalpha / isdigit / isalnum / isspace
`isalpha / isdigit / isalnum / isspace`分别用于判断字符串是否是字母/数字/字母或数字/纯空格。这里的数字只能是是正整数，不能是负数或小数等。

```py
number = "123"
number.isalpha()    # False
number.isdigit()    # True
number.isalnum()    # True  
```

### 2.10 join
join用于连接字符串。

```py
s = " "
list = ['how', 'do', 'you', 'do']
s.join(list)  # 'how do you do'
```

## 3. 正则表达式
`re`模块封装了正则相关的操作。

### 3.1 match
`match(pattern, string)`可以使用正则从开头匹配字符串，如果匹配成功可提取匹配分组。

它要求字符串**必须从开头匹配正则，相当于使用了`^`**，如果匹配不成功则返回`None`, 如果匹配成功则返回`Match`对象。可以使用`Match`对象的`group([group1, ...])`提取分组,`groups()`获取所有分组。

```py
import re

re.match(r"\d+", "abc123")  # None

mh = re.match(r"(\d+)([a-z]+)(\d+)", "123abc456")
mh.group()  # '123abc456'
mh.group(1)  # '123'
mh.group(1, 2)  # ('123', 'abc')
mh.groups()  # ('123', 'abc', '456')
```

#### 特殊语法
* `\group` 可以引用前面分组内容，此语法并非在所有语言中都支持，如javascript不支持此语法，python / C#则支持

    ```py
    re.match(r"<(\w*)><(\w*)>.*</\2></\1>", "<strong><i>text</i></strong>")
    ```

* `(?P<groupname>)`和`(?P=groupname)` 分别用于定义分组别名和引用分组别名，此语法仅python支持
    ```py
    re.match(r"<(?P<name1>\w*)><(?P<name2>\w*)>.*</(?P=name2)></(?P=name1)>", "<strong><i>text</i></strong>")
    ```

### 3.2 search / findall
`search(pattern, string)`和`findall(pattern, string)`都用来使用正则搜索字符串。`search()`搜索到一次即停止，`findall()`则搜索全部匹配内容。

```py
sc = re.search("\d+", "123abc456")
sc.group()  # '123'

fa = re.findall("\d+", "123abc456")
fa  # ['123','456']
```

### 3.3 sub
`sub(pattern, repl, string)`用于替换正则匹配内容，替换内容既可以是固定内容也可以是一个规则(使用函数)。

```py
re.sub(r"\d+", "20", "I'm 18 and my bro is 19")  # 'I'm 20 and my bro is 20'

re.sub(r"\d+", lambda mc: str(int(mc.group()) + 1), "I'm 18 and my bro is 19")  # 'I'm 19 and my bro is 20'
```

### 3.4 split
`split(pattern, string)`可以使用正则匹配内容做分隔符对字符串进行分隔。

```py
re.split(r":|,|\|", "name:colin,age|18")  # ['name', 'colin', 'age', '18']
```