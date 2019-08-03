# 文件操作

## 1. 文件读写
Python中进行文件读写的基本流程如下：
* 打开文件。以不同的访问模式打开已存在的文件或创建新文件。
* 读写文件。读取或修改文件内容。
* 关闭文件。保存并关闭文件。

### 1.1 打开文件
Python中使用`open`函数打开一个已存在的文件或者创建一个新文件，获得文件流。其格式为:

`open(file, mode='r', buffering=None, encoding=None, errors=None, newline=None, closefd=True)`

* `file` 是要打开的文件名(文本或二进制文件)或文件描述器。
* `mode` 可选参数用于指定文件访问方式。可选方式如下：

    字符|模式含义
    :-|:-
    `r`| 只读方式打开文件。文件的指针将会放在文件的开头。(default)
    `w`| 打开文件只用于写入。若该文件已存在则将其覆盖。若该文件不存在，创建新文件。
    `x`| 创建新文件只用于写入。若文件已存在会抛`FileExistsError`异常。不推荐使用。
    `a`| 追加写入模式。若文件存在，则追加内容。若该文件不存在，则创建新文件写入。
    `t`| 文本模式 (default)
    `b`| 二进制模式。
    `+`| 以读写模式打开文件

    以上基本模式常组合使用，常见组合如下：
    组合|模式含义
    :-|:-
    `rb` | 以二进制格式打开一个文件用于只读。文件指针将会放在文件的开头。这是默认模式。
    `wb` | 以二进制格式打开一个文件只用于写入。如果该文件已存在则将其覆盖。如果该文件不存在，创建新文件。
    `ab` | 以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。
    `r+` | 打开一个文件用于读写。文件指针将会放在文件的开头。
    `w+` | 打开一个文件用于读写。如果该文件已存在则将其覆盖。如果该文件不存在，创建新文件。
    `a+` | 打开一个文件用于读写。如果该文件已存在，文件指针将会放在文件的结尾。文件打开时会是追加模式。如果该文件不存在，创建新文件用于读写。
    `rb+` | 以二进制格式打开一个文件用于读写。文件指针将会放在文件的开头。
    `wb+` | 以二进制格式打开一个文件用于读写。如果该文件已存在则将其覆盖。如果该文件不存在，创建新文件。
    `ab+` | 以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。如果该文件不存在，创建新文件用于读写。

    :::warning 文本与二进制模式
    Python打开文件时会区分文本模式和二进制模式，即便操作系统不会。二进制模式打开会返回字节组而不转码。文本模式则会根据编码模式转码后以字符串形式访问文件内容。
    :::

* `encoding` 指定文件编码(仅用于文本模式)。

### 1.2 关闭文件
文件读写完成后需要调用`close`函数刷新缓冲区里任何还没写入的信息，并关闭该文件，这之后便不能再进行写入。当一个文件对象的引用被重新指定给另一个文件时，Python 会自动关闭之前的文件。

### 1.3 文件读写
`read/write`不仅可以处理文本，也可以处理二进制数据。

读写文件时，会有一个文件位置指针，类似于文本编辑器的光标位置，也可以看作是一个游标，读写操作都在指针指向的位置执行。

`tell/seek`函数分别用于获取和设置指针位置。
```py
file = open("test.txt", "r")
file.tell()  # 获取文件指针位置
file.seek(0)  # 将文件指针移动到文件头
```


#### 1.3.1 写文件
`write/writelines`函数常用户写入字符串和字符串列表(并不会换行，换行可自行添加`\n`)。

```py
file = open("test.txt", "w")
file.write("write something...\n")  # 写入字符串
file.writelines(["try\n", "writelines"])  # 写入列表

# file.flush()    # 强制清空缓存去并保存文件修改
file.close()
```

一般情况下修改文件内容后，修改的文件流内容会保存在内存缓存区而不会马上写磁盘，调用`flush`函数可以强制其立即写入磁盘并清空缓存区。

#### 1.3.2 读文件
读取文件常用`read/readline/readlines`三个函数。

```python
file = open("test.txt", "r")
content = file.read()  # 一次性读取文件所有内容
line = file.readline()  # 读取一行，并将文件指针下移一行。
lines = file.readlines()  # 一次性读取所有行。返回列表
file.close()
```

当文件较大时一次性读取文件会占用大量内存甚至内存溢出导致程序奔溃。我们可以考虑使用`readline`逐行读取，但如果文件压缩没有换行，此方案也不适用，此外我们可以设定`read`函数每次读取内容的字节数，然后逐步读取，此方案可以应对所有情况。

```py
file = open("test.txt", "r")
while True:
    content = file.read(10 * 1024)  # 每次读取10KB
    if len(content) <= 0:
        break
    print(content)
file.close()
```

## 2. 文件/目录操作
常见文件和目录操作主要包含在`shutil`和`os`两个模块中。

```py
import shutil, os

shutil.copy("src.txt", "destDir")  # 复制文件到目录
shutil.copy("src.txt", "dest.txt")  # 复制并重命名文件
shutil.copy("srcDir", "destDir")  # 复制目录

shutil.move("src.txt", "destDir")  # 移动文件
shutil.move("src.txt", "dest.txt")  # 重命名文件
shutil.move("srcDir", "destDir")  # 移动或重命名目录

os.rename("src.txt", "dest.txt")  # 重命名文件
os.rename("srcDir", "destDir")  # 重命名目录

os.remove("file.txt")  # 删除文件
os.removedirs("dir")  # 删除空目录
shutil.rmtree("dir")  # 递归删除目录及其内容

os.mkdir("dir")  # 创建目录。不支持创建多层目录

os.getcwd()  # 获取当前目录

os.chdir("/path")  # 切换当前目录

os.listdir("/path")  # 列出目录下所有内容，默认为当前目录
```

## 3. 路径操作
```py
import os

os.path.basename("path")  # 获得文件名
os.path.dirname("path")  # 获得目录
os.path.split("path")  # 分离目录与文件名
os.path.splitext("path")  # 分离文件名与扩展名
os.path.abspath("path")  # 获得绝对路径

os.path.join("path1", "path2")  # 连接路径

os.path.exists("path")  # 判断path(文件/目录)是否存在
os.path.isdir("path")  # 判断path是否是目录
os.path.isfile("path")  # 判断path是否是文件

os.path.getsize("file")  # 获得文件大小
os.path.getmtime("path")  # 获取文件或目录修改时间
os.path.getctime("path")  # 获取文件或目录创建时间
```

## 4.案例
下面是文件操作的一个简单案例。

```py
import os


def backupFile(file: str, backupFile='', binary=False):
    '''
    制作文件备份
    :param file:文件名
    :param backupFile:备份文件名
    :param binary:是否为二进制文件
    :return:
    '''

    # 判断file是否存在且是文件
    if (not os.path.exists(file)) or (not os.path.isfile(file)):
        return

    # 确定备份文件名
    if len(backupFile) <= 0:
        fileName, ext = os.path.splitext(file)
        backupFile = fileName + "[copy]" + ext

    # 确定文件打开方式
    if binary:
        readMode = "rb"
        writeMode = "wb"
    else:
        readMode = "r"
        writeMode = "w"

    # 打开文件
    oldFile = open(file, readMode)
    newFile = open(backupFile, writeMode)

    # 备份文件
    while True:
        content = oldFile.read(10 * 1024)
        if len(content) <= 0:
            break
        newFile.write(content)

    # 关闭文件
    oldFile.close()
    newFile.close()
```