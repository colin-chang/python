# 树

## 1. 树
树(tree)是一种抽象数据类型（ADT）或是实作这种抽象数据类型的数据结构，用来模拟具有树状结构性质的数据集合。它是由n（n>=1）个有限节点组成一个具有层次关系的集合。把它叫做“树”是因为它看起来像一棵倒挂的树，也就是说它是根朝上，而叶朝下的。

树具有以下的特点： 
* 每个节点有零个或多个子节点；
* 没有父节点的节点称为根节点；
* 每一个非根节点有且只有一个父节点；
* 除了根节点外，每个子节点可以分为多个不相交的子树；

![树状图](https://s2.ax1x.com/2020/01/21/1FnUQP.png)

### 1.1 相关术语

术语|含义
:-|:-
节点的度|一个节点含有的子树的个数称为该节点的度
树的度|一棵树中，最大的节点的度称为树的度
叶节点或终端节点|度为零的节点
父节点|若一个节点含有子节点，则这个节点称为其子节点的父节点
子节点|一个节点含有的子树的根节点称为该节点的子节点
兄弟节点|具有相同父节点的节点互称为兄弟节点
节点层次|从根开始定义起，根为第1层，根的子节点为第2层，以此类推
树高度或深度|树中节点的最大层次
堂兄弟节点|父节点在同一层的节点互为堂兄弟
节点祖先|从根到该节点所经分支上的所有节点
子孙|以某节点为根的子树中任一节点都称为该节点的子孙
森林|由m（m>=0）棵互不相交的树的集合称为森林

### 1.2 树分类
* **有序树**。树中任意节点的子节点之间有顺序关系，这种树称为有序树；
    * **二叉树**。每个节点最多含有两个子树的树称为二叉树；
        * **完全二叉树**。除最后一层外，其它各层的节点数目均已达最大值，且最后一层从左向右连续地紧密排列，这样的二叉树被称为完全二叉树
        * **满二叉树**。所有叶节点都在最底层的完全二叉树。如下图所示。
        * **平衡二叉树**(AVL树)。当且仅当任何节点的两棵子树的高度差不大于1的二叉树
        * **排序二叉树**(二叉查找树，也称二叉搜索树、有序二叉树）
    * **霍夫曼树**(用于信息编码)。带权路径最短的二叉树称为哈夫曼树或最优二叉树
    * **B树**。一种对读写操作进行优化的自平衡的二叉查找树，能够保持数据有序，拥有多余两个子树
* **无序树**。树中任意节点的子节点之间没有顺序关系，这种树称为无序树，也称为自由树。

![满二叉树](https://s2.ax1x.com/2020/01/19/1CuxzV.png)


### 1.3 应用场景
* xml，html结构
* 路由协议
* mysql 数据库索引
* 文件系统目录结构
* 很多经典AI算法使用树搜索。机器学习中的`decision tree`也是树结构

## 2. 二叉树
二叉树是每个节点最多有两个子树的树结构。通常子树被称作“左子树”(left subtree)和“右子树”(right subtree)。

二叉树有以下特性：
* 第 n 层最多有 2<sup>n-1</sup> 个结点(n>0)
* 深度为 n 的二叉树最多有 2<sup>n</sup>-1 个结点(n>0)
* 叶结点数为 n0，而度数为2的结点总数为 n2，则 n0 = n2+1
* 具有 n 个结点的完全二叉树的深度为 log<sub>2</sub>(n+1)

## 3. 构建二叉树

一般情况下，二叉树多使用完全二叉树方式存储，如下图就是一个完全二叉树。

<img id="cbt" src="https://s2.ax1x.com/2020/01/19/1CKSMT.png" alt="完全二叉树" />

我们可以仿照链表的数据结构方式，构建完全二叉树。

```py
class Node(object):
    """二叉树节点"""
    def __init__(self, elem=-1, lchild=None, rchild=None):
        self.elem = elem
        self.lchild = lchild
        self.rchild = rchild
```

我们首先构建一个只有根节点的二叉树，然后逐个挂载节点。定义一个待处理节点队列(默认加入根节点)。出队一个待分析节点，先判断其左子树是否为None，如果是则直接挂载新节点并退出，否则判断其柚子树是否为None，如果是则直接挂载新节点并退出，否则将其左右节点都入队。然后重复以上操作直到挂载成功。

```py
class BinaryTree(object):
    """完全二叉树"""
    def __init__(self, root=None):
        self.root = root

    def add(self, elem):
        """添加节点"""
        node = Node(elem)
        #如果树是空的，则对根节点赋值
        if self.root == None:
            self.root = node
        else:
            queue = []
            queue.append(self.root)
            #对已有的节点进行层次遍历
            while queue:
                #弹出队列的第一个元素
                cur = queue.pop(0)
                if cur.lchild == None:
                    cur.lchild = node
                    return
                elif cur.rchild == None:
                    cur.rchild = node
                    return
                else:
                    #如果左右子树都不为空，加入队列继续判断
                    queue.append(cur.lchild)
                    queue.append(cur.rchild)
```

## 4. 遍历二叉树
树的遍历是树的一种重要的运算。所谓遍历是指对树中所有结点的信息的访问，即依次对树中每个结点访问一次且仅访问一次，我们把这种对所有节点的访问称为遍历（traversal）。那么树的两种重要的遍历模式是深度优先遍历和广度优先遍历,深度优先一般用递归，广度优先一般用队列。

### 4.1 广度优先遍历
广度优先遍历也称层次遍历，其策略是从树的根节点开始，从上到下从从左到右遍历整个树的节点，与构建完全二叉树的思路一致,此处不再赘述。

```py
def breadth_travel(self):
    """广度优先遍历"""
    if self.root == None:
        return
    queue = [self.root]
    while queue:
        node = queue.pop(0)
        print(node.elem, end=' ')

        if node.lchild != None:
            queue.append(node.lchild)
        if node.rchild != None:
            queue.append(node.rchild)
```

[上图二叉树](#cbt)，广度优先遍历结果为 `ABCDEFGHIJ`

### 4.2 深度优先遍历
深度遍历根据访问根节点的次序不同分为三种方法，先序遍历(preorder)，中序遍历(inorder)和后序遍历(postorder)

* 先序遍历。先访问根节点，然后递归使用先序遍历访问左子树，再递归使用先序遍历访问右子树。

```py
def preorder(self, node):
      """先序遍历"""
      if node == None:
          return

      print(node.elem, end=' ')
      self.preorder(node.lchild)
      self.preorder(node.rchild)
```

[上图二叉树](#cbt)，先序遍历结果为 `ABDHIEJCFG`

* 中序遍历。递归使用中序遍历访问左子树，然后访问根节点，最后再递归使用中序遍历访问右子树。

```py
def inorder(self, node):
      """中序遍历"""
      if node == None:
          return

      self.inorder(node.lchild)
      print(node.elem, end=' ')
      self.inorder(node.rchild)
```

[上图二叉树](#cbt)，中序遍历结果为 `HDIBJEAFCG`

* 后序遍历。先递归使用后序遍历访问左子树和右子树，最后访问根节点。
```py
def postorder(self, node):
      """后序遍历"""
      if node == None:
          return

      self.postorder(node.lchild)
      self.postorder(node.rchild)
      print(node.elem, end=' ')
```

[上图二叉树](#cbt)，后序遍历结果为 `HIDJEBFGCA`

> 本节二叉树及其遍历算法代码已共享在 [Github](https://github.com/colin-chang/pythonstructure)

:::tip 深度遍历确定唯一完全二叉树
二叉树遍历过程中，所有节点会作为一个序列输出，左右子树的节点是同级的且有序的(先左后右)，如果可以确定根节点，那就可以使用根节点递归划分左右子树来，这样就可以唯一确定、一棵二叉树树的结构。

简单讲，只要确定中序遍历结果，结合先序或后序遍历结果任意一种，就能确定一个二叉树。
:::

如：有先序遍历结果为 `ABDHIEJCFG`，中序遍历结果为 `HDIBJEAFCG`。我们来尝试构建完全二叉树。

先序规则为根左右，首个节点`A`就是树的根节点，依此中序结果以`A`为界分为`HDIBJE`(左子树)和`FCG`(右子树)。先序第二个节点`B`为左子树节点`HDIBJE`的根节点，以`B`为界分为`HDI`(左子树)和`JE`(右子树)。依此类推，逐层确定根节点，最终分组小于等于2时，每组一个元素，根节点左侧为左树，右侧为右树，这样就可以确定如[上图](#cbt)所示的二叉树。