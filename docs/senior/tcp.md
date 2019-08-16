# TCP

## 1. TCP 协议
与UDP不同，TCP协议需要首先建立稳定连接后方可通信，保证数据可以送达。由于需要比较复杂的过程建立连接，TCP需要耗费比UDP更多的资源，且速度略慢于UDP。


## 2. TCP Socket
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

TCP通讯中如果接收到的客户端数据长度为0，则意味着客户端断开连接。