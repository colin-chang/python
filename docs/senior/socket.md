# Socket

## 1. 网络基础
### 1.1 TCP/IP 协议族
TCP/IP协议（传输控制协议/互联网协议）不是简单的一个协议，而是一组特别的协议，包括：TCP，IP，UDP，ARP等，这些被称为子协议。在这些协议中，最重要、最著名的就是TCP和IP。因此，大部分网络管理员称整个协议族为“TCP/IP”。由于它的简洁、实用，TCP/IP协议已成为建立计算机局域网、广域网的首选协议，已成为事实上的工业标准和国际标准。

计算机网络中，实际应用的网络协议是TCP/IP协议族。TCP/IP包含 链路层/网络层/传输层/应用层 四层。TCP/IP的应用层大体上对应着OSl/RM模型的应用层、表示层和会话层，TCP/IP的网络接口层对应着OSI/RM的数据链路层和物理层，而传输层和网络层在两个模型中对应得很好。

* 链路层

    链路层有时也称作数据链路层或网络接口层，通常包括操作系统中的设备驱动程序和计算机中对应的网络接口卡。它们一起处理与电缆（或其他任何传输媒介）的物理接口细节。把链路层地址和网络层地址联系起来的协议有ARP（Address Resolution Protocol，地址解析协议）和RARP（Reverse Address Resolution Protocol，逆地址解析协议）。
* 网络层

    网络层处理分组在网络中的活动，例如分组的选路。在TCP/IP协议族中，网络层协议包括IP协议（Internet Protocol，网际协议）、ICMP协议（Internet Control Message Protocol，网际控制报文协议）和IGMP协议（Internet Group Management Protocol，网际组管理协议）。
* 传输层

    传输层主要为两台主机上的应用程序提供端到端的通信。在TCP/IP协议族中，有两个互不相同的传输协议：TCP（Transmission Control Protocol，传输控制协议）和UDP（User Datagram Protocol，用户数据报协议）。
* 应用层

    应用层负责处理特定的应用程序细节。几乎各种不同的TCP/IP实现都会提供下面这些通用的应用程序：Telnet远程登录、SMTP、FTP、HTTP等。


<style>#tcpip tr th:first-child,#tcpip tr td:first-child{border-right:3px solid lightblue;}#tcpip tr:nth-child(5),#tcpip tr:nth-child(6),#tcpip tr:nth-child(7){border-top:2px dashed green;}</style>
<table id='tcpip'>
    <tr><th>OSI</th><th colspan='2'>TCP/IP族</th></tr></thead>
    <tr><td>应用层</td><td rowspan='3'>应用层</td><td rowspan='3'>Telnet / SMTP / FTP / HTTP / DNS等</td></tr>
    <tr><td>表示层</td></tr>
    <tr><td>会话层</td></tr>
    <tr><td>传输层</td><td>传输层</td><td>TCP / UDP</td></tr>
    <tr><td>网络层</td><td>网络层</td><td>IP / ICMP / IGMP等</td></tr>
    <tr><td>数据链路层</td><td rowspan='2'>链路层</td><td rowspan='2'>物理网络接口(以太网等)</td></tr>
    <tr><td>物理层</td></tr>
</table>

### 1.2 子网掩码
IP地址在设计时就考虑到地址分配的层次特点，将每个IP地址都分割成网络号和主机号两部分，以便于IP地址的寻址操作。

![IP地址分类](../img/senior/ip.jpg)

IP地址的网络号和主机号各是多少位呢,这就需要通过子网掩码了。子网掩码作用就是将IP分割为网络号和主机号两部分。子网掩码的长度也是32位，从左到右“1”为网络位“0”为主机位。简言之，子网掩码用于划定子网范围。

如IP地址“192.168.1.1”，子网掩码“255.255.255.0”。掩码中前24位均为1即,后8位为0表示，192.168.1.0 是固定网络号，最后可变的8位主机号可以位0,255。最终IP:192.168.1.1，子网掩码:255,255,255,0就表示 192.168.1.0～192.168.1.255的IP地址段。

以上IP地址段，还可以用 192.168.1.0/24 的简化方式表示。 192.168.1.0为地址段起始地址，24表示掩码中固定不变的位数即网络号。
IP相关的转换可以参阅 [IpMaskConverter](https://github.com/colin-chang/IpMaskConverter)。

主机号全为0，表示网络号，主机号全为1，表示网络广播。

如果将子网掩码设置过大，也就是说子网范围扩大，那么，根据子网寻径规则，很可能发往和本地主机不在同一子网内的目标主机的数据，会因为错误的判断而认为目标主机是在同一子网内，那么，数据包将在本子网内循环，直到超时并抛弃，使数据不能正确到达目标主机，导致网络传输错误；如果将子网掩码设置得过小，那么就会将本来属于同一子网内的机器之间的通信当做是跨子网传输，数据包都交给缺省网关处理，这样势必增加缺省网关(文章下方有解释)的负担，造成网络效率下降。因此，子网掩码应该根据网络的规模进行设置。如果一个网络的规模不超过254台电脑，采用“255.255.255.0”作为子网掩码就可以了，现在大多数局域网都不会超过这个数字，因此“255.255.255.0”是最常用的IP地址子网掩码；假如在一所大学具有1500多台电脑，这种规模的局域网可以使用“255.255.0.0”。

## 2. Socket 简介
Socket是进程间通信的一种方式，它能实现不同主机间的进程间通信，我们网络上各种各样的服务大多都是基于Socket来完成通信的。

在python中使用`socket`非常简单,`socket`模块中封装了`socket`相关对象。



* python中`socket`对象为全双工通信，可以同时收发消息，即可作为客户端也可做服务端。
* 每次创建`socket`对象都会使用随机的端口号。一般情况下，服务器需要绑定端口让客户端能够正确发送到此进程。

```py
from socket import *

tcp_socket = socket(AF_INET, SOCK_STREAM)  # 创建跨主机TCP socket
udp_socket = socket(AF_INET, SOCK_DGRAM)  # 创建跨主机UDP socket
```
* `family`：可选`AF_INET`(跨主机进程通信)或`AF_UNIX`(本机进程通信)
* `type`：`socket`类型可选`SOCK_STREAM`(流式套接字，主要用于TCP协议)或者`SOCK_DGRAM`(数据报套接字，主要用于UDP协议)
