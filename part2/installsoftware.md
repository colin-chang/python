## Ubuntu常用软件安装
* [1.设置服务器镜像源](#1设置服务器镜像源)
* [2.apt命令](#2apt命令)
* [3.安装常用软件](#3安装常用软件)
* [4.deb安装格式](#4deb安装格式)
* [5.安装Chrome和Sogou](#5安装chrome和sogou)

### 1.设置服务器镜像源
Ubuntu官方服务器在境外，连接速度较慢。为此Ubuntu提供了`选择最佳服务器`的功能，方便我们选择一个速度最快的镜像服务器。
步骤如下(Ubuntu 18.04.1 LTS)
* 搜索并打开 `软件和更新`
* 设置 `下载自`->`其他站点...`
* 点击 `选择最佳服务器` 稍后 `选择服务器`
![选择镜像服务器](../img/setmirror.jpg '设置镜像服务器')

<small>**提示**:更换服务器之后，需要一段时间的更新过程，需要耐心等候。更新完毕后再次安装和更新软件都会连接新设置的服务器。</small>

### 2.apt命令
* `apt`是`Advanced Packaging Tool`，是Ubuntu下的**包管理工具**
* Ubuntu中大部分的软件 安装/卸载/更新 都是使用`apt`命令
* `apt-get`和`apt`命令类似，早期使用`apt-get`，Ubuntu16之后官方建议使用`apt`。当前`apt`是强化版本，包含了`apt-get`
* `apt`常用命令如下

    ```
    # 1.安装软件
    $ sudo apt install <软件名>

    # 2.卸载软件
    $ sudo apt remove <软件名>

    # 3.更新可用软件列表
    $ sudo apt update

    # 4.更新软件已安装软件
    $ sudo apt upgrade

    ```

### 3.安装常用软件
**python工具**
```
$ sudo apt install ipython
$ sudo apt install ipython3
$ sudo apt install python-pip
$ sudo apt install python3-pip
```
**ssh服务器**
```
# 安装ssh后才可以远程登录
$ sudo apt install openssh-server
```

### 4.deb安装格式
deb是Debian Liunx的安装格式，在Ubuntu中同样可以使用。要安装deb安装包，需要使用`dpkg`命令。
```
$ sudo dpkg -i <deb安装包>
```

### 5.安装Chrome和Sogou
#### 1) 安装Chrome
* [下载](https://www.google.com/chrome/ 'Chrome官网')Chrome for Linux的Deb安装包

* 执行以下命令
    ```
    $ sudo apt install libappindicator1
    $ sudo dpkg -i <Chrome Deb安装包>
    $ sudo apt -f install
    ```

#### 2) 安装Sogou
* 搜索并打开`语言支持`修改`键盘输入法系统`为`fcitx`

![语言支持](../img/inputmethod.png '键盘输入法系统')

* 如果没有`fcitx`选项则需要先安装`fctix`。默认有`fctix`选项可以跳过此步

    ```
    # 安装fcitx所需组件
    $ sudo apt install fcitx fcitx-tools fcitx-config* fcitx-frontend* fcitx-module* fcitx-ui-* presage   

    # 卸载fctix与sogou冲突的组件
    $ sudo apt remove fcitx-module-autoeng-ng
    $ sudo apt remove fcitx-module-fullwidthchar-enhance
    $ sudo apt remove fcitx-module-punc-ng
    ```

* [下载](https://pinyin.sogou.com/linux/?r=pinyin '搜狗输入法下载')Sogou for Linux的Deb安装包
* 执行以下命令安装
    ```
    $ sudo dpkg -i <Sogou Deb安装包>
    # 执行安装命令会存在一个依赖关系配置错误，执行下面的语句可以修复此依稀配置问题
    $ sudo apt -f install
    ```

> 卸载iBus导致系统设置打不开修复方案

<small>安装输入法过程中，不要卸载系统自带的iBus输入法系统选项。如果不小心卸载输入法之后发现系统设置无法打开，可以通过以下方式修复</small>
```
sudo apt-get install gnome-control-center           #如果系统设置打不开，请重新安装gnome-control-center
sudo apt-get install unity-control-center           #如果设置里只有很少的几个图标请重新安装unity-control-center
```
