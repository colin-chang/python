# 代码规范

## 1. 注释
python单行注释使用`#`,多行注释使用`'''`或`"""`。

```py
# 单行注释

'''
这里是
多行注释
'''

"""
双引号也可以
多行注释
"""
```

`#`做注释，解释器会直接忽略注释内容，而`"""/'''`注释，解释器依然会处理器内容，它注释会作为特殊文本处理。

## 2. 中文支持

python2不支持直接使用中文，仅支持ASCII。如果要使用中文需要在文件首行添加 `#coding=utf-8`即可。python语法规范推荐使用`# -*- coding:utf-8 -*-`

```py
# -*- coding:utf-8 -*-
print("你好")
```

## 3. 命名规则
* python中标识符 **大小写敏感**
* 官方推荐使用`lower_with_under`命名(类和扩展则使用大驼峰命名法)
* 避免于系统关键字冲突

> tip 查看系统关键字

```py
import keyword
keyword.kwlist

"""
['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']
"""
```

## 4. 代码规范

一行可以书写多个语句，语句之间用分号隔开即可。一行过长的语句可以使用反斜杠分解成几行
```py
print('I love you');print('very much!') 

3 > 4 and \
1 < 2
```

python官方提供了一系列的PEP(python增强规范)文档。其中第8篇专门针对python的代码格式给出了建议，俗称 **PEP8**

::: tip 规范文档

* PEP8: [https://www.python.org/dev/peps/pep-0008/](https://www.python.org/dev/peps/pep-0008/)
* Google文档: [https://zh-google-styleguide.readthedocs.io/en/latest/google-python-styleguide/python_style_rules/](https://zh-google-styleguide.readthedocs.io/en/latest/google-python-styleguide/python_style_rules/)
:::

在python文件中，我们通常按照以下顺序书写代码：
* 模块导入
* 全局变量定义
* 代码封装(类/函数等)
* 业务代码

## 5. pass
在编写代码过程中，如果暂时不确定代码逻辑但需要完成整体代码结构，可以使用`pass`关键字占位，解释器会跳过`pass`的执行。
```py
num = 0
if num < 0:
    pass    # 暂不确定代码逻辑而先完成代码结构
elif num == 0:
    pass
else:
    pass
```