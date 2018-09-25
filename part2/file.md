## 文件和目录命令

| 命令 | 说明 |
|:-|:-|
| [`cd [dir]`](#1cd命令)|切换到指定目录|
| [`ls [-options] [dir,file]`](#2ls命令)|查看指定目录所有内容|
| [`tree [-options] [dir]`](#3tree命令)|可以以树状图方式展示目录内容(层级子目录及文件)|
| `pwd [-options]`|打印当前工作目录|
| `touch [-options] file`|若文件不存在则创建文件,否则修改文件最后编辑时间|
| `mkdir [-options] dir`|创建目录。`-p`可以**层级创建目录**，如`mkdir -p a/b/c`|
| [`rm [-options] file`](#4rm命令)|删除文件或目录,删除后**不可恢复**|
| `rmdir [-options] dir`|删除目录,目录必须为空|
| [`cp [-options] source_file target_file`](#5cp命令)|复制文件或目录|
| [`mv [-options] source_file/dir target_file/dir`](#6mv命令)|移动/重命名 文件或目录|
| [`cat [-options] [file]`](#7cat命令)|查看文件内容/创建文件/文件合并/追加文件内容等|
| [`more [-options] file`](#8more命令)|分页显示文件内容|
| [`grep [-opinions] [pattern] [file]`](#9grep命令)|在文本文件中查找内容|
| `echo [-option] [string]`|在终端中打印字符串。通常会和重定向联合使用|
| [重定向和管道](#10重定向和管道)|重定向:将终端输出保存至文件;管道:对终端输出进行再操作|

### 1.cd命令
```
# 命令格式
$ cd [dir]
```

`cd`是change directory缩写，其功能为改变当前工作目录。

|命令|含义|
|:-|:-|
|`cd`|切换到当前用户主目录(`/home/username`)|
|`cd ~`|切换到当前用户主目录(`/home/username`)|
|`cd .`|保持当前目录不变|
|`cd ..`|切换到上级目录|
|`cd -`|在上次目录和当前目录来换切换|

### 2.ls命令
```
# 命令格式
$ ls [-options] [dir,file]
```
`ls`是list缩写，其功能为列出目录的内容(文件及子目录)，类似于Dos的`dir`命令

##### 1) options
|options|含义|
|:-|:-|
|`-a`|显示目录下 **所有** 子目录与文件，包含隐藏文件|
|`-l`|以列表方式显示文件的详细信息|
|`-h`|配合`-l`以人性化的方式显示 **文件大小**,`-h` 单独使用没有效果|
<small>注：options可以叠加使用且顺序无关。</small>
```
# 以下所有命令等价
$ ls -a -l -h
$ ls -l -h -a
$ ls -alh
$ ls -lha
```
##### 2) parameter
* parameter可以为文件或目录。parameter为目录则列出给定目录下的内容，parameter为文件名则列出给定文件。
* parameter可以使用通配符进行模糊匹配。模糊匹配结果为多个时会列出匹配的所有文件和目录。通配符使用方式与正则类似。

|通配符|含义|
|:-|:-|
|`*`|任意多个任意字符|
|`?`|一个任意字符|
|`[]`|匹配字符组中任意一个。`[1,2,3]`等价于`[1-3]`,`[a,b,c]`等价于`[a-c]`|
```
$ ls colin*         # 匹配 以colin开头
$ ls colin?         # 匹配 以colin+单个字符
$ ls colin[1-3]     # 匹配 colin1,colin2,colin3
```
### 3.tree命令
```
# 命令格式
$ tree [-options] [dir]
```

* `tree`可以以树状图方式展示目录内容(层级子目录及文件)
* 系统若没有安装`tree`命令，可以通过`sudo apt install tree`来进行安装。

|options|含义|
|:-|:-|
| `-d`|限制只显示目录，忽略文件|

```
# 显示当前目录树状图
$ tree

# 显示～/Desktop 的目录树状结构
$ tree -d ~/Desktop
```

### 4.rm命令
```
# 命令格式
$ rm [-options] file
```

`rm`是remove缩写，其功能是删除文件或目录(不可恢复)。
##### 1) options
|options|含义|
|:-|:-|
|`-r`|删除文件或 **递归删除目录** (包含子目录和文件)|
|`-f`|强制删除，忽略不存在文件|
<small>注：删除目录可以使用`rmdir dir`或`rm -r dir`，前者只能删除空目录，后者则可以递归删除目录(不管是否为空)</small>
##### 2) parameter
`rm`命令的parameter同样可以使用通配符。
```
# 删除以ab开头的文本文件
$ rm ab*.txt

# 删除 test目录
$ rm -r test

# 清空当前目录,谨慎使用
$ rm -rf * 
```

### 5.cp命令
`cp`是copy缩写，其功能是将拷贝文件或目录。
```
# 命令格式
$ cp [-options] source_file target_file
```

##### 1) options
|options|含义|
|:-|:-|
|`-i`|开启覆盖文件提示。`cp`执行时会 **默认覆盖** 同名目标文件。建议每次使用`-i`进行安全复制|
|`-r`|复制文件或 **递归复制目录** (包含子目录和文件)。格式为:`cp -r source_dir target_dir`|
##### 2) parameter
* 目标文件若与源文件同名，则`target_file`参数可以只写目录部分，省略目标文件名。
* **操作对象为目录时，如果`target_dir`存在，则将源目录拷贝至`target_dir`;如果`target_dir`不存在，则将源目录拷贝至`../target_dir`重命名为指定目录。mv操作亦是如此。**

```
# 将 ~/Documents/readme.txt 拷贝为 ~/Desktop/readme.txt
$ cp ~/Documents/readme.txt ~/Desktop

# 将 ~/Download/Python 拷贝到 ~/Desktop中
$ cp -r ~/Download/Python ~/Desktop
```

### 6.mv命令
```
# 命令格式
$ mv [-options] source_file/dir target_file/dir
```
* `mv`命令是move缩写，其功能是移动/重命名文件或目录。如果移动文件或目录的源路径和目标路径一致，仅目标名称不同，可以实现文件或目录重命名。
* `mv`命令默认可以操作文件或目录，不需要提供像 `cp`和`rm`命令一样使用`-r`选项

|options|含义|
|:-|:-|
|`-i`|开启覆盖文件提示。`mv`执行时会 **默认覆盖** 同名目标文件。建议每次使用`-i`进行安全移动|

```
# 将～/Download/Python目录移动到 ～/Desktop
# 若~/Desktop/PythonCourse目录存在则拷贝至其中，若不存在则拷贝到～/Desktop中并重命名为PythonCourse
$ mv ~/Download/Python ~/Desktop/PythonCourse

# 将当前目录 test.txt 重命名为 demo.txt
$ mv -i test.txt demo.txt
```

### 7.cat命令
```
# 命令格式
$ cat [-options] [file]
```
`cat`是Concatenate缩写，其功能包含查看文件内容、创建文件、文件合并、追加文件内容等。其中最常用来查看文本文件内容。
`cat`会一次显示所有内容，适合 **查看内容较少** 的文本文件

|options|含义|
|:-|:-|
|`-b`|显示非空行号|
|`-n`|显示所有行号|

>`nl file` 与 `cat -b file` 效果相同，都可以查看文本文件内容并显示非空行号

### 8.more命令
```
# 命令格式
$ more [-options] file
```

* `more`命令可以用于分屏显示文本文件内容，每次只显示一页内容
* `more`适合于 **查看内容较多** 的文本文件
* 使用 `more` 查看文件时常用操作键：

|操作键|功能|
|:-|:-|
|`Blank`|下一屏|
|`Enter`|下一行|
|`b`|上一屏|
|`q`|退出|
|`/keyword`|搜索关键字|

### 9.grep命令
```
# 命令格式
$ grep [-opinions] [pattern] [file]
```
* `grep`命令是一个强大的文本搜索工具
* `grep`允许对文本进行模式查找

##### 1) options
|options|含义|
|:-|:-|
|`-n`|显示行号|
|`-v`|搜索不匹配内容(相当于搜索结果取反)|
|`-i`|忽略字母大小写|

##### 2) pattern
常用的两种搜索模式,正则匹配
|参数|含义|
|:-|:-|
|`^b`|行首，搜索以b开头的行|
|`e$`|行尾, 搜索以e结尾的行|

```
# 在test.txt中搜索包含colin的行
$ grep colin test.txt

# 在test.txt中忽略大小写搜素以colin开头的行并显示行号
$ grep -ni ^colin test.txt
```

### 10.重定向和管道
重定向和管道都需要配合其他命令使用。
#### 10.1 重定向
重定向命令可以将终端输出内容保存到文件中
* `>` 将终端输出保存到文件中。文件不存在则创建，存在则覆盖
* `>>` 将终端输出追加到文件末尾。文件不存在则创建，存在则追加

```
# 将“Hello”保存到 a.txt 中
$ echo Hello > a.txt

# 将当前目录树状结构 追加到 a.txt 中
$ tree -d >> a.txt
```

#### 10.2 管道
管道是将一个命令的输出作为另一个命令的输入。可以理解为现实生活中一根管子，管子一头塞东西进去，另一头取东西出来。

常用管道命令有：
* `more`:分屏显示输出内容
* `grep`:对输出内容进行查询

```
# 分屏显示 当前目录所有内容
$ ls -lha | more

# 在前目录所有内容中 搜索名称包含colin的文件或目录
$ ls -lha | grep colin
```
