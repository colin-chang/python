# MongoDB

MongoDB是非常流行的入门级的大数据数据库，关于MongoDB的详细介绍可以参阅 [https://architecture.colinchang.net/nosql/mongo.html](https://architecture.colinchang.net/nosql/mongo.html#)。

本节我们来简单演示如何使用`pymongo`扩展包与Mongo服务交互。`pymongo`的API基本与 [Mongo Shell](https://architecture.colinchang.net/nosql/mongo.html#_4-mongo-shell) 一致。

> Mongo Python Driver 官方文档 : [https://api.mongodb.com/python/current/tutorial.html](https://api.mongodb.com/python/current/tutorial.html)


```sh
# 安装 pymongo 扩展包
pip3 install pymongo
```

```py
from pymongo import *
from bson.objectid import ObjectId

# 创建连接
client = MongoClient("mongodb://localhost:27017/")

# 获取数据库
db = client.db_test
# db = client["db_test"]

# 获取集合
students = db.students
# students = db["students"]

# 新增
inserted_id = db.students.insert_one({"name": "Colin", "age": 18, "gender": 1})
print(inserted_id)
inserted = db.students.insert_many(
    [{"name": "Robin", "age": 20, "gender": 0}, {"name": "Sean", "age": 21, "gender": 1}])
print(inserted.inserted_ids)

# 删除
deleted = db.students.delete_one({"name": "Sean"})
print(deleted.deleted_count)
deleted = db.students.delete_many({"age": {"$lt": 18}})
print(deleted.deleted_count)

# 更新
updated = db.students.update_one({"name": "Robin"}, {"$set": {"age": 21}})
print(updated.matched_count)
updated = db.students.update_many({"age": {"$lt": 18}}, {"$set": {"age": 18}})
print(updated.matched_count)

# 查询
first_doc = db.students.find_one()
print(first_doc)
item = db.students.find_one({"_id": ObjectId('5d6e63dd007e8ec23d93a906')})
print(item)

for doc in db.students.find({"age": {"$gte": 18}}).sort("age"):
    print(doc)

adult_count = db.students.count_documents({"age": {"$gte": 18}})
print(adult_count)

# Aggregate
results = db.students.aggregate([
    {"$match": {"age": {"$gte": 18}}},
    {"$group": {
        "_id": '$gender',
        "total": {"$sum": 1},
        "avg_age": {"$avg": '$age'},
        "names": {"$push": '$name'}
    }
    }
])
print(list(results))

# 创建索引
db.students.create_index([("name", ASCENDING)], unique=True)
```

> API : [https://api.mongodb.com/python/current/index.html](https://api.mongodb.com/python/current/index.html)

> 高可用集群交互参阅 : [https://api.mongodb.com/python/current/examples/high_availability.html](https://api.mongodb.com/python/current/examples/high_availability.html)