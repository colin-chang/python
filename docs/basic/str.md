# 字符串

## 1. 字符串拼接
```py
a = "Colin"
b = "Hello " + a
c = "Hello %s" % a # 类似于C#的String.Format()
```

## 2. 下标/长度
与其他语言类似，Python字符串可以看作是字符数组，顺序下标从0开始。不同的是，Python支持从后往前的逆序下标，使用负数作为字符串下标，从-1开始。

```py
name = "Colin"
name[0]  # name第一个字符 C
name[-1] # name最后一个字符 n
len(name)   # name长度 5
```

## 3. 切片
切片就是从字符串中按规则提取部分内容。切片需要借助字符串下标。格式为 `str[start:end:stepLength]`，
* 切片范围为前开后闭区间，即包含start，但不包含end。
* start和end都可以缺省。start缺省表示字符串头，end缺省表示字符串尾。头尾方向由步长决定。
* stepLength可以省略，默认为1。负数则表示从右往左取，利用此特征可以实现字符串逆序截取。

```py
str = "abcdEFGH"
str[1:4]  # 截取下标1～3的内容。结果bcd
str[1:-1]  # 截取下标1～-2的内容。结果bcdEFG
str[1:]  # 从下标1开始截取到字符串尾。结果bcdEFGH
str[1:-1:2]  # 截取下标1～-2的内容，步长为2。结果bdf
str[::-1]  # 字符串逆序 结果HGFEdcba
```

## 4. 常用操作
### 1) find/index
Python中获取字符串索引可以使用`find/rfind`和`index/rindex`。`find`和`index`从左至右查找,`rfind`和`rindex`表示从右至左查找。
如果字符串没有找到，`find/rfind`返回-1，而`index/rindex`则会抛出异常。

```py
str = "Hello world"
str.find("o") # 4
str.rfind("o")  # 7
str.find("haha") # -1
str.index("haha") # 异常
```

### 2）count
`count`方法用户统计字符串出现此处。
```py
str = "Hello world"
str.count("o")  # 2
```

### 3) replace
`replace`用于字符串替换。
```py
str = "how do you do"
str.replace("do","DO")  # how DO you DO
str.replace("do","DO",1)    # how DO you do 最后参数限定替换次数。
```

### 4）capitalize/title
capitalize把字符串第一个字符大写。title把每个单词首字母大写
```py
str =  "colin chang"
str.capitalize()    # Colin chang
str.title()     # Colin Chang
```

### 5) ljust/rjust/center
`ljust/rjust/center`分表表示居左居右居中方式使用空格填充最小字符串长度。`ljust/rjust`类似于C#的`PadLeft/PadRight`。

```py
str = "how do you do"
str.ljust(20)   # 'how do you do       '
str.center(20)  # '   how do you do    '
```

### 6) lstrip/rstrip/strip
`lstrip/rstrip/strip`用于去除左侧右侧和两侧全部空格。类似于C#的`TrimStart/TrimEnd/Trim`

```py
str = '   how do you do    '
str.lstrip()    # 'how do you do    '
str.rstrip()    # '   how do you do'
str.strip()     # 'how do you do'
```

### 7) partition/rpartition
`partition`会将字符串按照特定关键字切割为三部分组成元组。（关键字左侧部分,关键字,关键字右侧部分)。`rpartition`功能相同，只是从右侧开始。

```py
str = "what do you do these years"
str.partition("do")     # ('what ', 'do', ' you do these years')
str.rpartition("do")    # ('what do you ', 'do', ' these years')
```

### 8) split/splitlines
`split/splitlines`分别以给定关键字和换行(`\n`)切割字符串。**如果split不提供参数则会使用空白字符(如，空格、\t、\n等)切割字符串**。

```py
str = "how do you do"
str.split(" ")      # ['how', 'do', 'you', 'do']
str.split("do",1)   # ['how ', ' you do'] 最后参数限定切割次数

str = "how\ndo\nyou\ndo" 
str.splitlines()    # ['how', 'do', 'you', 'do']

str = "how\ndo\tyou do"
str.split()         # ['how', 'do', 'you', 'do']
```

### 9) isalpha/isdigit/isalnum/isspace
`isalpha/isdigit/isalnum/isspace`分别用于判断字符串是否是字母/数字/字母或数字/纯空格。这里的数字只能是是正整数，不能是负数或小数等。

```py
number = "123"
number.isalpha()    # False
number.isdigit()    # True
number.isalnum()    # True  
```

### 10) join
join用于连接字符串。

```py
str = " "
list = ['how', 'do', 'you', 'do']
str.join(list)  # 'how do you do'
```