# UDP

## 1. Socket
操作系统内核封装了应用程序间的网络通信模块，并将其命名为Socket。现在Socket更多的代表的是进程间通过网络通信的一种方式，我们网络上各种各样的服务大多都是基于Socket来完成通信的。

在Python中使用`socket`非常简单,`socket`模块中封装了`socket`相关对象。

* Python中`socket`对象为全双工通信，可以同时收发消息，即可作为客户端也可做服务端。
* 每次创建`socket`对象都会使用随机的端口号。一般情况下，服务器需要绑定端口让客户端能够正确发送到此进程。

```py
from socket import *

tcp_socket = socket(AF_INET, SOCK_STREAM)  # 创建跨主机TCP socket
udp_socket = socket(AF_INET, SOCK_DGRAM)  # 创建跨主机UDP socket
```
* `family`：可选`AF_INET`(跨主机进程通信)或`AF_UNIX`(本机进程通信)
* `type`：`socket`类型可选`SOCK_STREAM`(流式套接字，主要用于TCP协议)或者`SOCK_DGRAM`(数据报套接字，主要用于UDP协议)


## 2. UDP 协议
UDP为用户数据报协议，是一个无连接的面向数据报的运输层协议。UDP不提供可靠性，它只是把应用程序传给IP层的数据报发送出去，但是并不能保证它们能到达目的地。由于UDP在传输数据报前不用在客户和服务器之间建立一个连接，且没有超时重发等机制，故而传输速度很快。

UDP数据包括目的端口号和源端口号信息，由于通讯不需要连接，所以可以实现广播发送。UDP传输数据时有大小限制，每个被传输的数据报必须限定在64KB之内。UDP是一个不可靠的协议，发送方所发送的数据报并不一定以相同的次序到达接收方。

UDP一般用于多点通信和实时的数据业务，比如视频会议系统,语音广播,DNS等。

![UDP网络通信过程](https://i.loli.net/2020/02/25/3yet94kmlIcosMS.jpg)

UDP的网络通信过程如上图所示。客户端发送消息是消息被逐层组包的一个过程。客户端应用层传输字符串消息Hello，消息到达传输层后附加目标端口等信息，到达网络层后则会附加目标IP地址等信息，到达链路层后会附加目标MAC地址等信息，然后数据包进入物理网络开始传输。

数据经由网络路由到达服务端后，服务端则会经历一个与客户端过程相反的解包过程。数据包首先到达链路层，链路层判断数据包MAC地址是否为当前设备，如果不是则直接丢弃数据包，否则进入网络层，网络层会判断数据包IP地址与当前IP是否匹配，如果不匹配则丢弃，否则进入传输层，传输层判断数据包断后与当前程序绑定端口是否一致，不一致则丢弃，否则进入应用层。应用层最终接收到的数据就是客户端最初发送的数据。

综合来看，UDP的网络通讯会经理客户端组包，服务端解包的两个过程，类似于电商网购的过程，卖家需要组包商品然后通过物流网络发货，买家收到货物后验证信息是否正确并逐层拆去包装最终拿到商品。

## 3. UDP Socket

![UDP 通信模型](https://i.loli.net/2020/02/25/6YZ3iGpoKzUdJRc.jpg)

### 3.1 基本用法
基本函数|功能
:-|:-
`sendto(data,('hostaddr',port))`|发送数据。`data`如果是字符串需要进行编码
`recvfrom(buffersize)`|接收数据。返回值为`(data, address info)`
`bind(('hostaddr',port))`|绑定地址。`hostaddr`为空则会绑定本机所有可用地址(多网卡)
`close()`|关闭连接

```py {4,7,8,12,13}
from socket import *

# 客户端
udp_client = socket(AF_INET, SOCK_DGRAM)  # 创建跨主机UDP socket
msg = "测试消息".encode("gb2312")  # 处理编码问题
# msg = b"test message"
udp_client.sendto(msg, ("192.168.0.200", 8080))  # 发送数据
udp_client.close()

# 服务器
udp_server = socket(AF_INET, SOCK_DGRAM)
udp_server.bind(('', 8080))  # ''表示绑定本机所有可用IP，8080为绑定端口
msg,(host,port) = udp_client.recvfrom(1024)  # 阻塞等待接收消息。1024表示每次接收最大字节数
print(msg.decode("gb2312"))
udp_server.close()
```

下面是UDP两个简单案例。

#### 1）echo服务器
接收到客户端消息并原样原路返回消息的服务端称为echo服务器，一般用来测试网络是否可用。

```py
from socket import *

def main():
    echo = socket(AF_INET, SOCK_DGRAM)
    echo.bind(('', 8080))
    while True:
        msg, src = echo.recvfrom(1024)
        echo.sendto(msg, src)
        print("received %s from %s" % (msg, src))

    echo.close()


if __name__ == "__main__":
    main()
```

#### 2) 即时聊天软件
```py
from socket import *
from threading import Thread
from time import ctime


def receive():
    while True:
        msg, (host, port) = skt.recvfrom(1024)
        print("%s:%d %s\t%s" % (host, port, ctime(), msg.decode()))


def send(addr):
    while True:
        msg = input().encode()
        skt.sendto(msg, addr)


skt: socket = None


def main():
    global skt
    skt = socket(AF_INET, SOCK_DGRAM)
    skt.bind(('', 8080))

    ip = input("target ip:")
    port = int(input("target port:"))

    Thread(target=receive).start()
    Thread(target=send, args=(ip, port)).start()


if __name__ == '__main__':
    main()
```

### 3.2 UDP 广播

UDP通讯中，我们想广播地址发送的数据，网络交换机会自动广播到当前网络中的所有地址。如局域网通讯软件，一个用户上线之后就可以广播上线信息，这样所有在线用户都可以收到他的上线通知。

局域网中，主机号全部为1的地址为广播地址。如 192.168.0.0/24 网络广播地址为 192.168.0.255; 192.168.0.0/16 网络广播地址为 192.168.255.255。

Python中使用UDP广播需要做简单配置，然后发送消息到广播地址即可，`<broadcast>`可以自动确定当前网络广播地址。

```py {4,5}
from socket import *

bd = socket(AF_INET, SOCK_DGRAM)
bd.setsockopt(SOL_SOCKET, SO_BROADCAST, 1)  # 设置广播
bd.sendto("test broadcast".encode(), ("<broadcast>", 8080))  # 发送到广播地址
bd.close()
```

## 4. TFTP
### 4.1 TFTP 简介
TFTP（Trivial File Transfer Protocol,简单文件传输协议）是一个基于UDP协议的简单的、低开销的文件传输协议。使用端口号为69。TFTP常用于小容量存储的服务器，如路由器等。

从网络服务器下载文件时，首先会在按照一定规则在本地创建一个空文件。服务器则会打开文件并逐次向客户端发送文件字节流，客户端接收到后将其写入之前创建的文件中，如此往复直到文件内容传输完成，即文件下载完成。文件上传过程与之类似，只是在服务端创建文件和传输方向不同。

![TFTP数据包格式](https://i.loli.net/2020/02/25/NbASriBYkpXP1LM.jpg)

TFTP传输的数据包格式固定，如上图所示。传输中有三种模式：netascii，这是8位的ASCII码形式，另一种是octet，这是8位源数据类型；最后一种mail已经不再支持，它将返回的数据直接返回给用户而不是保存为文件。

客户端第一次向服务器发送1(下载)/2(上传)操作码，同时请求文件。如果服务器找到文件会立即打开文件并通过TFTP协议发送给客户端。如果文件尺寸较大，服务器会分多次发送每次512B，为了让客户端对接收到的数据进行排序，在服务器发送数据的时候会多发2B数据，用来存放序号，序号是从1开始。

因为udp的数据包不安全，即发送方发送是否成功不能确定，所以TFTP协议中规定，为了让服务器知道客户端已经接收到了刚刚发送的那个数据包，所以当客户端接收到一个数据包的时候需要向服务器进行发送确认信息，即发送收到了，这样的包成为ACK(应答包)。

客户端接收到的数据小于516B(2B操作码+2B序号+512B数据),表示文件传输完成。如果最后一个数据包文件内容刚好512B，TFTP服务器会再发一次一个文件数据长度为0的包。

TFTP服务器默认绑定端口为69，但开始文件内容传输后每次使用动态端口。

> [TFTP Server on mac](/it/tftp)

### 4.2 TFTP 客户端开发
#### 1）大端 / 小端

内存单位的地址是有高低位不同顺序的。一个多字节对象也是有高低位的，如0x1122,11是高位,22是低位。多字节的内存对象一般会占用多个内存单位，此时对象在内存中的存储顺序就有两种选择。如过，对象低位存储使用低位内存，称为小端。反之，低位对象使用高位内存则称为大端。

一般个人PC操作系统内存多使用小端存储方式，而大型服务器系统多使用大端。**网络数据传输必须使用大端。**


#### 2） 字节对象 组包 / 拆包
前面我们了解到，TFTP的传输的数据包(字节对象)是有格式的，不能直接传输字符串。我们需要按照其格式组包和拆包。不只TFTP，大多数的网络数据传输都对数据包要特定格式要求。

Python的`struct`模块提供了`pack()`和`unpack()`两个函数分别用于组包和拆包。假定我们要组装一个数据包下载TFTP服务器的`test.txt`文件，可以按如下方式组包。
```py {3}
from struct import pack

pack("!H8sb5sb",1,"test.txt",0,"octet",0)

"""
pack函数第一个参数为数据包格式，后面各参数填充各位置

1. '!'开头表示此为网络数据包,使用大端组织数据
2. 'H'表示整数占位2B，第二个参数1会占用2B
1. 's'表示字符占位1B，8s表示第三个参数test.txt占用8B
4. 'b'表示整数占位1B，第四个参数0占用1B
5. '5sb'分别为最后octet和0两个参数占位5B和1B
"""
```

#### 3）TFTP 客户端
下面我们使用Python来简单完成一个TFTP客户端。

```py
from socket import *
from struct import pack, unpack


def download(file):
    rrq = pack("!H{}sb5sb".format(len(file)), 1, file.encode(), 0, b"octet", 0)  # 构建下载请求
    udp.sendto(rrq, (ip, 69))  # 发送下载文件请求

    chunk = 0  # 本地模块号
    recv_file = None

    while True:
        recv_data, recv_addr = udp.recvfrom(1024)
        recv_len = len(recv_data)
        code_chunk = unpack("!HH", recv_data[:4])
        code = code_chunk[0]  # 操作码
        current_chunk = code_chunk[1]  # 模块号

        if code == 3:  # 数据包
            if current_chunk == 1:  # 如果是第一次接收到数据，那么就创建文件
                recv_file = open(file, "ab")

            if chunk + 1 == current_chunk:  # 校验模块号
                recv_file.write(recv_data[4:])
                chunk += 1
                print("第{}次接收到数据 {} byte(s)".format(chunk, recv_len))
                ack = pack("!HH", 4, chunk)
                udp.sendto(ack, recv_addr)

            if recv_len < 516:  # 判断是否完成
                recv_file.close()
                print('文件下载成功')
                break

        elif code == 5:  # 错误应答
            (error_msg,) = unpack("!{}s".format(recv_len - 4), recv_data[4:recv_len])
            print("error occured at chunk-{}.error message:{}".format(current_chunk, error_msg.decode()))
            break


def upload(file):
    wrq = pack("!H{}sb5sb".format(len(file)), 2, file.encode(), 0, b"octet", 0)  # 构建上传请求
    udp.sendto(wrq, (ip, 69))  # 发送下载上传请求

    chunk = 1  # 本地模块号
    send_file = None

    while True:
        recv_data, recv_addr = udp.recvfrom(1024)
        code, current_chunk = unpack("!HH", recv_data[:4])

        if code == 4:  # ACK
            if current_chunk == 0:  # 如果是第一次，那么就打开文件
                send_file = open(file, "rb")

            if current_chunk + 1 == chunk:  # 校验模块号
                data = send_file.read(512)  # 读取 512 byte数据
                send_data = pack("!HH{}s".format(len(data)), 3, chunk, data)
                udp.sendto(send_data, recv_addr)  # 打包发送数据
                print("第{}次数据已发送 {} byte(s)".format(chunk, len(send_data)))
                chunk += 1

                if len(data) <= 0:  # 判断文件是否读取完成
                    send_file.close()
                    print("文件上传完成...")
                    break

        elif code == 5:  # 错误应答
            recv_len = len(recv_data)
            (error_msg,) = unpack("!{}s".format(recv_len - 4), recv_data[4:recv_len])
            print("error occured at chunk-{}.error message:{}".format(current_chunk, error_msg.decode()))
            break


ip = ''
udp = None


def main():
    global ip, udp

    ip = input("please type the hostname of TFTP server:\n")
    udp = socket(AF_INET, SOCK_DGRAM)  # 创建udp套接字
    udp.bind(('', 8080))

    while True:
        act = int(input("please choose what to do?\n1:download\n2:upload\n3:quit\n"))
        if act == 1:
            file = input("type the name of the file you wanna download...\n")
            download(file)
        elif act == 2:
            file = input("type the name of the file you wanna upload...\n")
            upload(file)
        elif act == 3:
            break

    udp.close()


if __name__ == '__main__':
    main()
```