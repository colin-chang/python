# TCP

## 1. TCP 协议
传输控制协议（TCP，Transmission Control Protocol）是一种面向连接的、可靠的、基于字节流的传输层通信协议。TCP是为了在不可靠的互联网络上提供可靠的端到端字节流而专门设计的一个传输协议。

### 1.1 三次握手
TCP使用三次握手协议建立连接。当主动方发出SYN连接请求后，等待对方回答SYN+ACK，并最终对对方的 SYN 执行 ACK 确认。

TCP三次握手的过程如下：
* (1) 客户端发送SYN（SEQ=x）报文给服务器端，进入SYN_SEND状态。
* (2) 服务器端收到SYN报文，回应一个SYN （SEQ=y）ACK（ACK=x+1）报文，进入SYN_RECV状态。
* (3) 客户端收到服务器端的SYN报文，回应一个ACK（ACK=y+1）报文，进入Established状态。

TCP 标志位|含义
:-|:-
URG | 紧急
ACK | 确认，使得确认号有效。
PSH | 发送数据
RST | 重置连接
SYN | 同步(建立连接)
FIN | 终止。发送方已经结束向对方发送数据。

TCP 标志位为6bit，从左至右分别为URG/ACK/PSH/RST/SYN/FIN。如`0b000010`表示SYN，`0b010000`表示ACK。

### 1.2 四次挥手
![TCP三次握手四次挥手与十种状态](../img/senior/tcp-status.jpg)

由于TCP连接是全双工的，因此每个方向都必须单独进行关闭。这原则是当一方完成它的数据发送任务后就能发送一个FIN来终止这个方向的连接。收到一个 FIN只意味着这一方向上没有数据流动，一个TCP连接在收到一个FIN后仍能发送数据。首先进行关闭的一方将执行主动关闭，而另一方执行被动关闭。

TCP四次挥手过程如下：
* (1) TCP客户端发送一个FIN，用来关闭客户到服务器的数据传送。
* (2) 服务器收到这个FIN，它发回一个ACK，确认序号为收到的序号加1。和SYN一样，一个FIN将占用一个序号。
* (3) 服务器关闭客户端的连接，发送一个FIN给客户端。
* (4) 客户端发回ACK报文确认，并将确认序号设置为收到序号加1。

### 1.3 2MSL
MSL(Maximum Segment Lifetime) 是报文最大生存时间，即报文在网络上存在的最长时间，超过这个时间报文将被丢弃。

2MSL即两倍的MSL，TCP的TIME_WAIT状态也称为2MSL等待状态，当TCP的一端发起主动关闭，前第三次挥手完成后发送了第四次握手的ACK包后就进入了TIME_WAIT状态，如果出现服务端没有收到最后一次ACK确认的情况，服务端会在超时后重发第三次挥手的FIN包，经历来回数据包传输，所以客户端必须在此状态上停留两倍的MSL时间。客户端接到重发的FIN包后可以再发一个ACK应答包。

在TIME_WAIT状态时两端的端口不能使用，要等到2MSL时间结束才可继续使用。实际应用中可以通过设置SO_REUSEADDR选项达到不必等待2MSL时间结束再使用此端口。

### 1.4 长连接与短连接
TCP在真正的读写操作之前，server与client之间会通过三次握手建立一个连接，当读写操作完成后，双方不再需要这个连接时会经历四次挥手释放这个连接，每次连接都会有一定的资源和时间消耗。

在建立一次TCP连接之后完成一次数据传输工作后立即关闭连接，这种连接使用方式称为短链接，而连接建立后进行一次数据传输完成后，保持连接不关闭，直接进行后续数据操作直到完成后关闭连接，这种方式则称为长连接。

![短连接](../img/senior/short-conn.jpg)

短连接对于服务器来说管理较为简单，存在的连接都是有用的连接，不需要额外的控制手段。但客户请求频繁，将在TCP的建立和关闭操作上浪费时间和带宽。Web网站的http服务一般都用短链接。

![长连接](../img/senior/long-conn.jpg)

长连接可以省去较多的TCP建立和关闭的操作，减少浪费，节约时间。但可能存在大量闲置连接不关闭，甚至恶意连接，造成资源浪费。可以以客户端机器为颗粒度，限制每个客户端的最大长连接数。数据库的连接用长连接。

### 1.5 常见网络攻击

## 2. TCP Socket
TCP是一种面向连接的单播协议，在发送数据前，通信双方必须在彼此间建立一条连接。由于需要比较复杂的过程建立连接，TCP需要耗费比UDP更多的资源，且速度略慢于UDP。

![TCP通信模型](../img/senior/tcp.png)

基本函数|功能
:-|:-
`listen()`|TCP服务端启动监听
`accept()`|TCP服务器接受客户端连接并创建通信socket
`connect(('hostaddr',port))`|TCP客户端连接服务端
`recv(buffersize)`|接收数据。返回值为(data, address info)
`send()`|发送数据

```py {6,7,9,11,19}
from socket import *

# 服务端
tcp_server = socket(AF_INET, SOCK_STREAM)  # 创建tcp socket
tcp_server.bind(('', 5678))  # 服务端绑定端口
tcp_server.listen()  # 开启监听客户端连接。阻塞程序
com_socket, (ip, port) = tcp_server.accept()  # 接受客户端连接并创建返回一个专门与之通信的socket

msg = com_socket.recv(1024)  # 通信socket接收客户端数据
print("%s:%d - %s" % (ip, port, msg.decode()))
com_socket.send("test message from tcp server".encode())  # 通信socket发送数据到客户端

com_socket.close()  # 关闭通信socket，断开客户端连接。如果需要与之再次通信，需要客户端重新连接
tcp_server.close()  # 关闭服务端socket，无法再监听客户端连接


# 客户端
tcp_client = socket(AF_INET, SOCK_STREAM)  # 创建tcp socket
tcp_client.connect(('192.168.0.223', 5678))  # 连接tcp服务端
tcp_client.send("test message from tcp client".encode())  # 发送消息给服务端
msg = tcp_client.recv(1024)  # 接收服务端消息。阻塞程序
print(msg.decode())
tcp_client.close()
```

当一个连接被建立或被终止时，交换的报文段只包含TCP头部，而没有数据。也就是说如果接收到的客户端数据长度为0，则意味着客户端断开连接。

:::tip TCP 最大连接数
当TCP客户端与服务端完成第一次握手但尚未建立连接时，服务端会将此客户端加入到半连接队列，在三次握手后连接建立，服务端会将客户端从半连接队列已到已连接队列中。

半连接队里与已连接队列中客户端的总和称为TCP服务器最大连接数，即同一时间TCP服务器可以接收的最多客户端连接数。这个数值就是`socket.listen(backlog)`中`backlog`设定的值。需要注意的是，**Linux会忽略用户设置而由系统决定最大连接数**。
:::