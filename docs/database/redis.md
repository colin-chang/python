# Redis

## 1. Redis 交互
本节我们来简单演示如何使用`redis`扩展包与Redis服务交互。

> 更详尽的Redis资料，请参阅 [https://architecture.a-nomad.com/nosql/redis.html](https://architecture.a-nomad.com/nosql/redis.html)

```sh
# 安装 redis 扩展包
pip3 install redis
```

`redis`扩展包中提供了`StrictRedis`对象，⽤于连接Redis服务器，它同时按Redis不同数据类型提供了对应的交互接口。

```py {1,4,6,10}
from redis import StrictRedis

# 创建redis连接
sr = StrictRedis(host="192.168.0.200", password="123123")
# 1. 设值
res = sr.set("name", "Colin")
print(res)  # True

# 2. 取值
name = sr.get("name")  # 取值 字符串. 若不不存在则返回None
name = name.decode() if name else ""
print(name)  # 'Colin'
```

需要注意的是，`redis-py`默认维护了Reids连接池，一般不需要我们单独处理连接建立和关闭的问题。以下摘自其官方文档。[Behind the scenes, redis-py uses a connection pool to manage connections to a Redis server. By default, each Redis instance you create will in turn create its own connection pool.](https://pypi.org/project/redis/)

`redis`提供的数据类型操作接口基本与Redis命令一致。

<table>
    <thead><tr><th>类型</th><th>方法</th><th>说明</th><th>示例</th></tr></thead>
    <tbody>
        <tr><td rowspan='6'><code>key</code></td><td><code>keys</code></td><td>查所有键(可过滤)</td><td><code>sr.keys("n")  # 名称包含'n'的key</code></td></tr>
        <tr><td><code>exists</code></td><td>判断key是否存在</td><td><code>sr.exists("name")</code></td></tr>
        <tr><td><code>type</code></td><td>查看key对应value类型</td><td><code>sr.type("name")</code></td></tr>
        <tr><td><code>delete</code></td><td>删除键及对应的值</td><td><code>sr.delete("name", "age")</code></td></tr>
        <tr><td><code>expire</code></td><td>设置过期时间(秒)</td><td><code>sr.expire("name",3)</code></td></tr>
        <tr><td><code>ttl</code></td><td>查看有效时间(秒)</td><td><code>sr.ttl("name")</code></td></tr>
        <tr><td rowspan='6'><code>string</code></td><td><code>set</code></td><td>设值</td><td><code>sr.set("name","Colin")</code></td></tr>
        <tr><td><code>setex</code></td><td>设值及过期时间(秒)</td><td><code>sr.setex("name",3,"Colin")</code></td></tr>
        <tr><td><code>mset</code></td><td>设多键值</td><td><code>sr.mset({"name": "Colin", "age": 18})</code></td></tr>
        <tr><td><code>append</code></td><td>追加值</td><td><code>sr.append("name"," Chang")</code></td></tr>
        <tr><td><code>get</code></td><td>取值</td><td><code>sr.get("name")</code></td></tr>
        <tr><td><code>mget</code></td><td>取多值</td><td><code>sr.mget("name", "age")</code></td></tr>
        <tr><td rowspan='6'><code>list</code></td><td><code>lpush</code></td><td>左侧插⼊数据</td><td><code>sr.lpush("orders","Colin")</code></td></tr>
        <tr><td><code>rpush</code></td><td>右侧插⼊数据</td><td><code>sr.rpush("orders","Robin")</code></td></tr>
        <tr><td><code>linsert</code></td><td>在指定元素的前或后插⼊新元素</td><td><code>sr.linsert("orders", "before", "Robin", "Sean")  # 在'Robin'前插入'Sean'</code></td></tr>
        <tr><td><code>lrange</code></td><td>返回列表⾥指定范围的元素</td><td><code>sr.lrange("orders", 1, -2)  # 返回第1个元素之后到倒数第2个列表元素</code></td></tr>
        <tr><td><code>lset</code></td><td>设置指定位置元素值</td><td><code>sr.lset("orders",1,"Tom")</code></td></tr>
        <tr><td><code>lrem</code></td><td>删除指定元素</td><td><code>sr.lrem("orders", -2, "Tom")  # 从右侧开始向左删除连个值为'Tom'的元素</code></td></tr>
        <tr><td rowspan='3'><code>set</code></td><td><code>sadd</code></td><td>添加元素</td><td><code>sr.sadd("boys", "Colin", "Robin")</code></td></tr>
        <tr><td><code>smembers</code></td><td>返回所有的元素</td><td><code>sr.smembers("boys")</code></td></tr>
        <tr><td><code>srem</code></td><td>删除指定元素</td><td><code>sr.srem("boys", "Robin")</code></td></tr>
        <tr><td rowspan='6'><code>zset</code></td><td><code>zadd</code></td><td>添加元素</td><td><code>sr.zadd("students", {"Colin": 100, "Robin": 95})</code></td></tr>
        <tr><td><code>zrange</code></td><td>返回指定范围的元素</td><td><code>sr.zrange("students",0,-1)</code></td></tr>
        <tr><td><code>zrangebyscore</code></td><td>返回指定score值范围的成员</td><td><code>sr.zrangebyscore("students",95,100)</code></td></tr>
        <tr><td><code>zscore</code></td><td>返回指定成员score值</td><td><code>sr.zscore("students","Colin")</code></td></tr>
        <tr><td><code>zrem</code></td><td>删除指定元素</td><td><code>sr.zrem("students","Robin")</code></td></tr>
        <tr><td><code>zremrangebyscore</code></td><td>删除指定score范围的元素</td><td><code>sr.zremrangebyscore("student", 0, 60)</code></td></tr>
        <tr><td rowspan='7'><code>hash</code></td><td><code>hset</code></td><td>设置单个属性</td><td><code>sr.hset("mvp", "name", "Colin")</code></td></tr>
        <tr><td><code>hmset</code></td><td>设置多个属性</td><td><code>sr.hmset("mvp", {"age": 18, "gender": "male"})</code></td></tr>
        <tr><td><code>hkeys</code></td><td>获取所有属性名</td><td><code>sr.hkeys("mvp")</code></td></tr>
        <tr><td><code>hget</code></td><td>获取⼀个属性值</td><td><code>sr.hget("mvp", "name")</code></td></tr>
        <tr><td><code>hmget</code></td><td>获取多个属性值</td><td><code>sr.hmget("mvp", "name", "age")</code></td></tr>
        <tr><td><code>hvals</code></td><td>获取所有属性的值</td><td><code>sr.hvals("mvp")</code></td></tr>
        <tr><td><code>hdel</code></td><td>删除属性</td><td><code>sr.hdel("mvp", "gender")</code></td></tr>
    </tbody>
</table>

## 2. Redis 集群交互

### 2.1 redis-sentinel
redis-sentinel更多内容请参阅 [https://architecture.a-nomad.com/nosql/redis.html#_2-3-redis-sentinel](https://architecture.a-nomad.com/nosql/redis.html#_2-3-redis-sentinel)
```py
from redis.sentinel import Sentinel

# 连接哨兵服务器(主机名也可以用域名)
sentinel = Sentinel([('192.168.0.225', 26379),
                     ('192.168.0.225', 26380),
                     ('192.168.0.225', 26381)])

# 获取主服务器地址
master = sentinel.discover_master('redis-service')
print(master)

# 获取从服务器地址
slaves = sentinel.discover_slaves('redis-service')
print(slaves)

# 获取主服务器进行写入
master = sentinel.master_for('redis-service')
master.set('comment', b'handsome')

# # 获取从服务器进行读取（默认是round-roubin）
slave = sentinel.slave_for('redis-service')
comment = slave.get('comment')
print(comment)
```

### 2.2 redis-cluster

使用`redis-py-cluster`扩展包可以实现Redis集群交互。

```sh
# 安装 redis-py-cluster 扩展包
pip3 install redis-py-cluster
```

除了Redis连接对象不同，其他操作与单节点交互无异。
```py
from rediscluster import RedisCluster

# 集群节点列表
redis_nodes = [
    {'host': '192.168.26.128', 'port': '7000'},
    {'host': '192.168.26.130', 'port': '7003'},
    {'host': '192.168.26.128', 'port': '7001'},
]

# 创建集群连接
rc = RedisCluster(startup_nodes=redis_nodes, decode_responses=True)
# 1. 设值
res = rc.set("name", "Colin")
print(res)  # True

# 2. 取值
name = rc.get("name")  # 取值 字符串. 若不不存在则返回None
name = name.decode() if name else ""
print(name)  # 'Colin'
```

> Redis集群环境搭建参阅 [https://architecture.a-nomad.com/nosql/redis.html#_2-4-redis-cluster](https://architecture.a-nomad.com/nosql/redis.html#_2-4-redis-cluster)