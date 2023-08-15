# 流控制语句

## 1. 条件语句

```py
if condition1:
    do something
elif condition2:
    do something
elif condition3:
    do something
else:
    do something
```

* `if`之后判断条件可以省略括号，如果判断条件较长则可以使用括号后将条件换行
* 判断条件之后使用`:`
* 执行内容之前的代码缩进为一个tab键，或者4个空格。Tab和空格不可混用
* 缩进相同的代码视作一个代码块，而不是通过{}来界定
* Python当中不支持`switch`语法

```py
import random

player = int(input('请输入：剪刀(0)  石头(1)  布(2):'))
computer = random.randint(0, 2)

if ((player == 0 and computer == 2)
        or (player == 1 and computer == 0)
        or (player == 2 and computer == 1)):
    print('获胜，哈哈，你太厉害了')
elif player == computer:
    print('平局，要不再来一局')
else:
    print('输了，不要走，决战到天亮')
```

::: warning if 真假条件

* if之后除了使用bool值，还可以使用其他类型，这些类型会转为真假条件。真假相当于True和Flase，但不等于True和False
* `"" /  None / 0 / [] / {}` 以上内容的均为假。一般表示空的内容都为假，否则为真。
* 数字类型比较特殊,0为假，非0为真。
:::

::: tip
三元表达式
:::

```py
x, y = 1, 2
max = x if x > y else y # 三元表达式
```

## 2. 循环语句

### 2.1 while

```py
while condition:
    do something
```

```py
# 求0-100之间偶数和
i = 0
sum = 0
while i <= 100:
    if i % 2 == 0:
        sum += i
    i = i + 1

print(sum)  # 2550
```

::: warning

* Python不支持 `i++` / `i--` 等自增自减等语法
* Python不支持 `do while`语法
* Python支持`break`和`continue`语法
:::

```py
# 输出99乘法表
i = 1
while i <= 9:
    j = 1
    while j <= i:
        print("%d*%d=%d" % (j, i, i * j), end=" ")
        j += 1
    i += 1
    print("")

"""
1*1=1 
1*2=2 2*2=4 
1*3=3 2*3=6 3*3=9 
1*4=4 2*4=8 3*4=12 4*4=16 
1*5=5 2*5=10 3*5=15 4*5=20 5*5=25 
1*6=6 2*6=12 3*6=18 4*6=24 5*6=30 6*6=36 
1*7=7 2*7=14 3*7=21 4*7=28 5*7=35 6*7=42 7*7=49 
1*8=8 2*8=16 3*8=24 4*8=32 5*8=40 6*8=48 7*8=56 8*8=64 
1*9=9 2*9=18 3*9=27 4*9=36 5*9=45 6*9=54 7*9=63 8*9=72 9*9=81
"""
```

### 2.2 for...in

Python的`for in`循环与JavaScript类似,相当与C#的`foreach`。

```py
for x in "name":
    print(x)

"""
n
a
m
e
"""
```

Python没有C#等语言中普通的`for`循环语法方便的控制循环次数，但可以借助 [range](list.md#_1-2-1-range) 实现。

```py
# 从0-4循环5次
for i in range(5):
    pass

# 从5-9循环5次
for i in range(5, 10):
    pass
```

### 2.3 循环中的else

在while和for循环当中也可以使用else关键字。执行逻辑是，**只要循环中执行了break则else不执行，否则else必定执行**。此语法仅在Python中存在，较少使用。

```py
names = ["Colin", "Robin", "Sean"]
keyword = "Tom"
for name in names:
    if name == keyword:
        print(name)
        break
else:
    print("cannot find %s" % keyword)

"""
cannot find Tom
"""
```
