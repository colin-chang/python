# 栈 / 队列

## 1. 栈
栈（stack）又名堆栈，它是一种运算受限的线性表。限定仅在表尾进行插入和删除操作的线性表。这一端被称为栈顶，相对地，把另一端称为栈底。向一个栈插入新元素又称作进栈、入栈或压栈，它是把新元素放到栈顶元素的上面，使之成为新的栈顶元素；从一个栈删除元素又称作出栈或退栈，它是把栈顶元素删除掉，使其相邻的元素成为新的栈顶元素。

由于栈数据结构只允许在一端进行操作，因而按照后进先出（LIFO, Last In First Out）的原理运作。

![栈示意图](https://s2.ax1x.com/2020/01/21/1Fn3IH.png)

栈在Python中也没有默认提供，需要我们自定义实现。我们可以使用顺序表或链表实现。

```py
class Stack(object):
    """栈"""

    def __init__(self):
        self.items = []

    def push(self, item):
        """压栈元素"""
        self.items.append(item)

    def pop(self):
        """出栈元素"""
        return self.items.pop()

    def peek(self, position: int = 0):
        """查看栈顶元素"""
        position = (position if position < self.count() else self.count() - 1) if position >= 0 else 0
        return self.items[self.count() - 1 - position]

    def count(self):
        """返回栈的大小"""
        return len(self.items)


if __name__ == "__main__":
    stack = Stack()
    stack.push("hello")
    stack.push("world")
    print(stack.peek(1))
    print(stack.count())
    print(stack.pop())
```

## 2. 队列
队列(queue)是一种特殊的线性表，特殊之处在于它只允许在表的前端（front）进行删除操作，而在表的后端（rear）进行插入操作，和栈一样，队列是一种操作受限制的线性表。进行插入操作的端称为队尾，进行删除操作的端称为队头。

队列的数据元素又称为队列元素。在队列中插入一个队列元素称为入队，从队列中删除一个队列元素称为出队。因为队列只允许在一端插入，在另一端删除，所以只有最早进入队列的元素才能最先从队列中删除，故队列又称为先进先出（FIFO—first in first out）线性表。

![队列示意图](https://s2.ax1x.com/2020/01/19/1CYxAK.jpg)

队列在Python中也没有默认提供，需要我们自定义实现。我们可以使用顺序表或链表实现。

```py
class Queue(object):
    """队列"""

    def __init__(self):
        self.items = []

    def enqueue(self, item):
        """入队元素"""
        self.items.insert(0, item)

    def dequeue(self):
        """出队元素"""
        return self.items.pop()

    def peek(self, position: int):
        "查看队内元素而不出栈"
        position = (position if position < self.count() else self.count() - 1) if position >= 0 else 0
        return self.items[position]

    def count(self):
        """返回大小"""
        return len(self.items)


if __name__ == "__main__":
    q = Queue()
    q.enqueue("hello")
    q.enqueue("world")
    print(q.peek(1))
    print(q.count())
    print(q.dequeue())
```

## 3. 双端队列

双端队列（deque，全名double-ended queue），是一种具有队列和栈的性质的数据结构。双端队列中的元素可以从两端弹出，其限定插入和删除操作在表的两端进行。双端队列可以在队列任意一端入队和出队。Redis的List类型就是双端队列。

![双端队列示意图](https://s2.ax1x.com/2020/01/19/1CuXin.jpg)

下面我们使用顺序表简单实现一个双端队列。

```py
class Deque(object):
    """双端队列"""

    def __init__(self):
        self.items = []

    def enqueue_front(self, item):
        """从队头入队元素"""
        self.items.insert(0, item)

    def enqueue_rear(self, item):
        """从队尾入队元素"""
        self.items.append(item)

    def dequeue_front(self):
        """从队头出队元素"""
        return self.items.pop(0)

    def dequeue_rear(self):
        """从队尾出队元素"""
        return self.items.pop()

    def count(self):
        """返回队列大小"""
        return len(self.items)


if __name__ == "__main__":
    deque = Deque()
    deque.enqueue_front(1)
    deque.enqueue_front(2)
    deque.enqueue_rear(3)
    deque.enqueue_rear(4)
    print(deque.count())
    print(deque.dequeue_front())
    print(deque.dequeue_front())
    print(deque.dequeue_rear())
    print(deque.dequeue_rear())

```

> 本节自定义栈和队列模块已共享在 [Github](https://github.com/colin-chang/pythonstructure)