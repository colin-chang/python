# Python执行方式

 * [1. 解释器执行](#1-解释器执行)
 * [2. 交互式执行python](#2-交互式执行python)
 * [3. Python开发IDE](#3-python开发ide)

## 1. 解释器执行

```sh
# python 2.x解释器
$ python xxx.py
·
# python 2.x解释器
$ python3 xxx.py
```
python解释器有多语言实现，如：
* `CPython` 官方C语言实现
* `Jython` Java平台
* `IronPython` .Net和Mono平台
* `Pypy` Python实现，支持JIT即时编辑

#### mac OS 安装 Python3
mac OS 中默认安装了Python 2.7,如果需要使用Python 3.x可以自行安装。Mojave中使用Homebrew安装Python3时会存在链接失败的问题。系统出于安全性考虑不允许使用sudo或root用户执行安装操作。情况如下
```sh
$ brew install python3
Warning: python3 3.7.0 is already installed, it's just not linked.
You can use `brew link python3` to link this version.

$ brew link python3
Linking /usr/local/Cellar/python3/3.6.3... Error: Permission denied @ dir_s_mkdir - /usr/local/Frameworks
```

查看发现路径`/usr/local/Frameworks`并不存在，我们可以创建此目录并给予操作权限。

```sh
$ sudo mkdir /usr/local/Frameworks
$ sudo chown $(whoami):admin /usr/local/Frameworks
```

完成后重新尝试链接成功

```sh
$ brew link python3
Linking /usr/local/Cellar/python3/3.6.3... 1 symlinks created
```


## 2. 交互式执行Python

#### 1) Python Shell

直接在Python的shell中输入Python代码，可以立即查看程序执行结果，此为交互式运行Python。

交互式运行方式适合学习或验证Python语法或局部代码，但是代码不能保存，不适合运行较大的程序。

可以使用使用 `exit()` 函数或 `ctrl + D` 退出Python Shell。

#### 2) IPython
IPython是一个第三方python的交互式shell，功能远胜于python shell。
* 支持代码智能提示，自动补全
* 支持自动缩紧
* 内置常用功能函数
* **支持bash shell**,可以直接使用Linux命令

IPython存在IPython 2.x和3.x两个版本。可以直接使用 `exit` 指令退出

#### mac OS 安装 IPython3
在mac中安装IPython有很多方式，如Homebrew,pip等。
```sh
$ brew install ipython
```

运行ipython时可能会遇到以下错误
```
Traceback (most recent call last):
  File "/usr/local/Cellar/ipython/7.0.1/libexec/bin/ipython", line 6, in <module>
    from pkg_resources import load_entry_point
ModuleNotFoundError: No module named 'pkg_resources'
```
关于此错误，网上说法众说纷纭。大多是说因为mac的环境配置等问题引发此问题，而mac系统中部分组件需要默认安装的python2.7来执行，所以很多python2.7的配置即使使用root用户也不允许修改，但是我们可以修改自己安装的Python3.x环境。通过以下命令可以修复此问题。

* 确保`pip`已正确安装
``` sh
$ pip --version
```

* 若未安装则可执行以下命令安装
```sh
$ sudo python3 -m ensurepip --default-pip
```

* 确保pip,setuptools,wheel最新
```sh
$ sudo python3 -m pip install --upgrade pip setuptools wheel
```
执行完毕后重试执行`ipython`成功

## 3. Python开发IDE
推荐使用PyCharm。Pycharm是流行的Python集成开发环境,支持Windows/mac OS/Linux。