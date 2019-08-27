# 文件操作

## 1. 文件读写
python中进行文件读写的基本流程如下：
* 打开文件。以不同的访问模式打开已存在的文件或创建新文件。
* 读写文件。读取或修改文件内容。
* 关闭文件。保存并关闭文件。

### 1.1 打开文件
python中使用`open()`打开一个已存在的文件或者创建一个新文件，获得文件流。其格式为:

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
    python打开文件时会区分文本模式和二进制模式，即便操作系统不会。二进制模式打开会返回字节组而不转码。文本模式则会根据编码模式转码后以字符串形式访问文件内容。任何文件都可以以二进制模式进行读写。
    :::

* `encoding` 指定文件编码(仅用于文本模式)。

### 1.2 关闭文件
文件读写完成后需要调用`close()`刷新缓冲区里任何还没写入的信息，并关闭该文件，这之后便不能再进行写入。当一个文件对象的引用被重新指定给另一个文件时，python 会自动关闭之前的文件。

:::tip 使用 with 语句安全操作文件
`open()`是[上下文管理器](../senior/contextmanager.md)，可以使用 `with` 语句可以在离开其作用域时自动调用文件对象的`close()`,简单且安全的操作文件。
:::

```py
with open("test.txt","w") as file:
    file.write("content")

# 离开with作用域不管是否发生异常都会自动调用 file.close()
```

### 1.3 文件读写

读写文件时，会有一个文件位置指针，类似于文本编辑器的光标位置，也可以看作是一个游标，读写操作都在指针指向的位置执行。

`tell()/seek()`分别用于获取和设置指针位置。
```py
with open("test.txt", "r") as file:
    file.tell()  # 获取文件指针位置
    file.seek(0)  # 将文件指针移动到文件头
```

#### 1.3.1 写文件
`write()/writelines()`常用于写入文件内容和内容列表(并不会换行，换行可自行添加`\n`)。

```py
with open("test.txt", "w") as file:
    file.write("write something...\n")  # 写入字符串
    file.writelines(["try\n", "writelines"])  # 写入列表

    # file.flush()    # 强制清空缓存去并保存文件修改
```

一般情况下修改文件内容后，修改的文件流内容会保存在内存缓存区而不会马上写磁盘，调用`flush()`可以强制其立即写入磁盘并清空缓存区。

#### 1.3.2 读文件
读取文件常用`read()/readline()/readlines()`三个函数。

```python
with open("test.txt", "r") as file:
    content = file.read()  # 一次性读取文件所有内容
    line = file.readline()  # 读取一行，并将文件指针下移一行。
    lines = file.readlines()  # 一次性读取所有行。返回列表
```

当文件较大时一次性读取文件会占用大量内存甚至内存溢出导致程序奔溃。我们可以考虑使用`readline()`逐行读取，但如果文件压缩没有换行，此方案也不适用，此外我们可以设定`read()`每次读取内容的字节数，然后逐步读取，此方案可以应对所有情况。

```py
with open("test.txt", "r") as file:
    while True:
        content = file.read(10 * 1024)  # 每次读取10KB
        if len(content) <= 0:
            break
        print(content)
```

## 2. 文件 / 目录操作
常见文件和目录操作主要包含在`shutil`和`os`两个模块中。

```py
import shutil, os

shutil.copy("src.txt", "dest_dir")  # 复制文件到目录
shutil.copy("src.txt", "dest.txt")  # 复制并重命名文件
shutil.copy("src_dir", "dest_dir")  # 复制目录

shutil.move("src.txt", "dest_dir")  # 移动文件
shutil.move("src.txt", "dest.txt")  # 重命名文件
shutil.move("src_dir", "dest_dir")  # 移动或重命名目录

os.rename("src.txt", "dest.txt")  # 重命名文件
os.rename("src_dir", "dest_dir")  # 重命名目录

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

os.walk("path")  # 递归搜索路径，并返回各层路径、子目录列表、文件列表

os.path.join("path1", "path2")  # 连接路径

os.path.exists("path")  # 判断path(文件/目录)是否存在
os.path.isdir("path")  # 判断path是否是目录
os.path.isfile("path")  # 判断path是否是文件

os.path.getsize("file")  # 获得文件大小
os.path.getmtime("path")  # 获取文件或目录修改时间
os.path.getctime("path")  # 获取文件或目录创建时间
```
路径操作大部分只是单纯的字符串处理操作，并不会校验目录或文件是否正确。如，`os.path.abspath("path")`获取绝对路径只是把当成执行程序所在目录与参数`path`做字符串拼接，如果参数`path`代表的文件或目录不在程序根目录下那得到的结果就是错误的。

如果要确保路径拼接正确，操作非程序根目录时需要转到相应目录下。

```py
# 从当前目录递归搜索.pyc文件
import os

pycs = []
for root, dirs, files in os.walk("."):
    for file in files:
        if (file.endswith(".pyc")):
            pycs.append(os.path.join(root, file))
print(pycs)
```

## 4.案例
下面是文件操作的一个简单案例。

```py
import os


def backup(file: str, backup_file=''):
    '''
    制作文件备份
    :param file:文件名
    :param backup_file:备份文件名
    :return:
    '''

    # 判断file是否存在且是文件
    if (not os.path.exists(file)) or (not os.path.isfile(file)):
        return False

    # 确定备份文件名
    if not backup_file:
        file_name, ext = os.path.splitext(file)
        backup_file = file_name + "[copy]" + ext

    # 备份文件
    with open(file, "rb") as old_file:
        with open(backup_file, "wb") as new_file:        
            while True:
                content = old_file.read(10 * 1024)
                if len(content) <= 0:
                    break
                new_file.write(content)

    return True
```