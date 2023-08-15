# MySQL

本节我们以最流行的关系型数据库MySQL为例，简单介绍python的数据库交互。

## 1. MySQL

MySQL是最流行的关系型数据库之一，下面我们来简单介绍一些MySQL特有的语法和并穿插讲解一些注意点。

```sh
# 用于显示所有数据库
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| python             |
| sys                |
+--------------------+

# 使用指定数据库
mysql> USE python;
Database changed

# 显示当前使用的数据库
mysql> SELECT DATABASE();
+------------+
| DATABASE() |
+------------+
| python     |
+------------+

# 显示当前库所有表
mysql> SHOW TABLES;
+------------------+
| Tables_in_python |
+------------------+
| students         |
+------------------+

# 显示表创建语句
mysql> SHOW CREATE TABLE students;
+----------+--------------------------------------------------------+
| Table    | Create Table                                                                                                                                                                                                                                           |
+----------+--------------------------------------------------------+
| students | CREATE TABLE `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `gender` char(1) NOT NULL DEFAULT '0',
  `classId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 |
+----------+--------------------------------------------------------+
```

### 1.1 GROUP_CONCAT

mysql在分组中提供了一个`GROUP_CONCAT()`可以按组将特定字段用逗号拼接，作为一个聚合字段。

```sh
mysql> SELECT gender,GROUP_CONCAT(name) as names FROM students GROUP BY gender;
+--------+---------------+
| gender | names         |
+--------+---------------+
| 0      | Colin,Robin   |
| 1      | Lily,Victoria |
+--------+---------------+
```

### 1.2 CREATE TABLE ... SELECT

```sql
-- 创建年级表，并且将从班级中查询到的年级数据插入新建的年级表中
create table grades (
id int unsigned primary key auto_increment,     
name varchar(30) not null) select grade as name from classes group by grade;
```

### 1.3 UPDATE ... JOIN

```sql
-- 查看classes表中的年级名称对应的年级id
SELECT * FROM classes as c JOIN grades as g ON c.grade=g.name

-- 根据连接查询结果，将grade.id更新到class.grade字段中。 可以将UPDATE关键字后的表连接结果视作一张虚拟表
UPDATE classes as c JOIN grades as g ON c.grade=g.name set c.grade=g.id
```

### 1.4 存储引擎

```sh
# 显示当前支持的表存储引擎
mysql> SHOW ENGINES;
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
| Engine             | Support | Comment                                                        | Transactions | XA   | Savepoints |
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
| FEDERATED          | NO      | Federated MySQL storage engine                                 | NULL         | NULL | NULL       |
| MEMORY             | YES     | Hash based, stored in memory, useful for temporary tables      | NO           | NO   | NO         |
| InnoDB             | DEFAULT | Supports transactions, row-level locking, and foreign keys     | YES          | YES  | YES        |
| PERFORMANCE_SCHEMA | YES     | Performance Schema                                             | NO           | NO   | NO         |
| MyISAM             | YES     | MyISAM storage engine                                          | NO           | NO   | NO         |
| MRG_MYISAM         | YES     | Collection of identical MyISAM tables                          | NO           | NO   | NO         |
| BLACKHOLE          | YES     | /dev/null storage engine (anything you write to it disappears) | NO           | NO   | NO         |
| CSV                | YES     | CSV storage engine                                             | NO           | NO   | NO         |
| ARCHIVE            | YES     | Archive storage engine                                         | NO           | NO   | NO         |
+--------------------+---------+----------------------------------------------------------------+--------------+------+------------+
```

常用的表的存储引擎是`InnoDB`和`MyISAM`。**InnoDB 支持事务。MyISAM 不支持事务，但访问速度快**，对事务没有要求或者以`select`、`insert`为主的都可以使用该存储引擎来创建表。

```sql
-- 以下两种方式均可开始事务
begin;
start transaction;

-- 提交事务
commit

-- 回滚事务
rollback
```

### 1.5 字符集与排序规则

* 字符集。数据库字符集即编码格式，一般选择`utf8`的国际通用编码格式, 支持中文。
* 排序规则。常用`utf8_general_ci`和`utf8_bin`.前者大小写不敏感，后者大小写敏感

## 2. PyMySQL

PyMySQL是python中的MySQL Driver。

```py
# 安装 pymsql 模块
pip3 install pymysql
```

### 2.1 CRUD

```py {1,4,6,9,12,17,27,34,36}
from pymysql import connect

# 1.创建数据库连接
conn = connect(host="127.0.0.1", port=3306, user="root", password="123123", database="python", charset='utf8')
# 2.获取游标
cur = conn.cursor()

# 3.1 查询
cur.execute("SELECT * FROM students")  # 执行查询语句

# 一次性读取所有数据
# for row in cur.fetchall():
#     print(row)

# 逐条读取
while True:
    row = cur.fetchone()
    if not row:
        break
    print(row)

# 3.2 非查询

try:
    sql_insert = "INSERT INTO students (`name`,gender,classId) VALUES (%s,%s,%s)"
    params = ["Tom", 1, 2]
    cur.execute(sql_insert, params)  # 参数化查询

    # sql_update = "UPDATE students SET gender=0 WHERE id=%s"
    # cur.execute(sql_update, [6])
    # sql_delete = "delete from students where id=%s"
    # cur.execute(sql_delete, [6])

    conn.commit()
except Exception as ex:
    conn.rollback()
    print(ex)

# 4.释放资源
cur.close()
conn.close()
```

参数化查询语句中，不管字段是什么类型，统一使用`%s`占位符,且不能加引号。

### 2.2 with

```py
from pymysql import connect

with connect(host="127.0.0.1", port=3306, user="root", password="123123", database="python",
             charset='utf8') as cur:  # connect上下文管理器返回的是其游标对象而非连接对象
    try:
        sql_insert = "INSERT INTO students (`name`,gender,classId) VALUES (%s,%s,%s)"
        cur.execute(sql_insert, ["Tom", 1, 2])
        cur.connection.commit()
    except Exception as ex:
        cur.connection.rollback()
        print(ex)
```

## 3. SqlHelper

```py
from pymysql import connect
import logging


class MySqlHelper(object):
    def __init__(self, **kwargs):
        self.__connection = connect(**kwargs)
        self.__cursor = self.__connection.cursor()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.__connection is not None:
            self.__connection.close()
        if self.__cursor is not None:
            self.__cursor.close()

    def execute_datatable(self, sql, *args):
        self.__cursor.execute(sql, args)
        return self.__cursor.fetchall()

    def execute_datareader(self, sql, *args):

        self.__cursor.execute(sql, args)
        while True:
            row = self.__cursor.fetchone()
            if not row:
                break
            yield row

    def execute_nonquery(self, sql, *args, many=False):
        try:
            if many:
                affected = self.__cursor.executemany(sql, [("Tom", 1, 2), ("Jerry", 2, 1)])
            else:
                affected = self.__cursor.execute(sql, args)
            self.__cursor.connection.commit()
            return affected
        except Exception as ex:
            self.__cursor.connection.rollback()
            logging.error(ex, exc_info=1, stack_info=1)
            return 0


if __name__ == '__main__':
    db_config = {
        'host': '127.0.0.1',
        'port': 3306,
        'user': 'root',
        'password': '123456',
        'database': 'test'
    }
    with MySqlHelper(**db_config) as helper:
        students = helper.execute_datatable("select * from students where id<=%s", 4)
        print(students)

        students = helper.execute_datareader("select * from students where id between %s and %s", 4, 5)
        for s in students:
            print(s)

        affected = helper.execute_nonquery("delete from students where id between %s and %s", 10, 20)
        print("Affected rows: %d" % affected)

        records = (("Tom", 1, 2), ("Jerry", 2, 1))
        affected = helper.execute_nonquery("insert into students (`name`,gender,classId) values (%s,%s,%s)", *records,
                                           many=True)
        print("Affected rows: %d" % affected)


    """ 测试数据
    -- ----------------------------
    -- Table structure for students
    -- ----------------------------
    DROP TABLE IF EXISTS `students`;
    CREATE TABLE `students` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `name` varchar(30) NOT NULL,
      `gender` char(1) NOT NULL DEFAULT '0',
      `classId` int(11) DEFAULT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    
    -- ----------------------------
    -- Records of students
    -- ----------------------------
    BEGIN;
    INSERT INTO `students` VALUES (1, 'Colin', '0', 1);
    INSERT INTO `students` VALUES (2, 'Robin', '0', 2);
    INSERT INTO `students` VALUES (3, 'Lily', '1', 2);
    INSERT INTO `students` VALUES (10, 'Tom', '1', 2);
    INSERT INTO `students` VALUES (11, 'Jerry', '2', 1);
    COMMIT;
    """
```
