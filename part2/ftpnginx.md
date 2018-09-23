## CentOS7配置 FTP 与 Nginx
* [1.vsftpd安装与配置](#1vsftpd安装与配置)
* [2.Nginx安装与配置](#2nginx安装与配置)

### 1.vsftpd安装与配置

##### 1) 更新yum源
更新yum源，便捷工具下载地址：http://help.aliyun.com/manual?spm=0.0.0.0.zJ3dBU&helpId=1692

##### 2) 安装vsftp
```
# yum install vsftpd -y
```

##### 3) 添加ftp帐号和目录
先检查一下nologin的位置，通常在 `/usr/sbin/nologin` 或 `/sbin/nologin` 目录下。
```
# useradd -d /web -s /sbin/nologin test #创建帐户，该命令指定了/web 为用户test的家目录，您可以自己定义帐户名和目录
# passwd test                           #修改该帐户密码
# chown -R test.test /web               #修改指定目录的权限
```

##### 4) 配置vsftp
编辑vsftp配置文件
```
# vi /etc/vsftpd/vsftpd.conf
```
* 配置项 `anonymous_enable=YES` 改为 `anonymous_enable=NO`
* 启用以下配置(反注释)
    * `local_enable=YES`
    * `write_enable=YES`
    * `chroot_local_user=YES`

* 添加配置项 `allow_writeable_chroot=YES`

##### 5) 设置vsftpd开机启动
```
# systemctl enable vsftpd
```

##### 6) 修改shell配置
如果该文件里没有 `/usr/sbin/nologin` 或者 `/sbin/nologin` (具体看当前系统配置)则追加进去
```
# vi /etc/shells 
```

##### 7) 配置防火墙和SELinux
```
# firewall-cmd --permanent --zone=public --add-service=ftp  #添加ftp入站规则
# firewall-cmd --reload                                     #重启防火墙
# setsebool -P ftp_home_dir 1
# setsebool -P allow_ftpd_full_access 1
```

##### 8) 启动vsftp服务并测试登录
```
# service vsftpd start	#启动vsftp服务
```
用帐号test测试下是否可以登陆ftp。目录是 `/web`

> 相关命令

```
# systemctl start firewalld.service       #启动firewall
# systemctl stop firewalld.service        #停止firewall
# systemctl disable firewalld.service     #禁止firewall开机启动
```

### 2.Nginx安装与配置

##### 1) 下载对应当前系统版本的nginx包
```
# wget http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
```

##### 2) 建立nginx的yum仓库
```
# rpm -ivh nginx-release-centos-7-0.el7.ngx.noarch.rpm
```

##### 3) 下载并安装nginx
```
# yum install nginx
```

##### 4) 启动nginx服务
```
# systemctl start nginx
```

##### 5) 配置
打开 `nginx.conf`，配置文件里的 `http` 配置区块中用 `include` 指令，把所有的在 `/etc/nginx/conf.d` 这个目录下面的 `.conf` 文件包含到了这里。也就是如果我们想去添加自己的配置，可以把配置放到一个以 `.conf` 结尾的文件里面，再把这个文件放到 `/etc/nginx/conf.d` 这个目录的下面，重新加载 nginx 以后，这些配置就会生效了。

如创建 `taishanlive.conf`,内容如下
```
upstream taishan.live {
        server chanyikeji.com:50001 weight=1;
}
server {
        listen 80;
        server_name 59.188.252.15 taishan.live www.taishan.live;
        location / {
            proxy_pass http://taishan.live;
            proxy_set_header   Host             #host;
            proxy_set_header   X-Real-IP        #remote_addr;
            proxy_set_header   X-Forwarded-For  #proxy_add_x_forwarded_for;
        }
}
```

##### 6) 权限
负载均衡如果遇到此权限问题，error.log日志：`*** connect() to 127.0.0.1:8080 failed (13: Permission denied) while connecting to upstream**` 这是SeLinux的导致，可用以下命令解决：
```
# setsebool -P httpd_can_network_connect 1
```

##### 7) 重启nginx
```
# systemctl restart nginx
```