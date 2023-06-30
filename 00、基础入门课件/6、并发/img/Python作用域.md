# Python作用域

## 总结：

**总结：在python中,if、for、try、while这类语句的作用域和全局是一致的。只有方法和类有单独作用域!**



https://www.cnblogs.com/Jolly-hu/p/12228320.html.  原文出处。

**作用域指的是变量的有效范围**。变量并不是在哪个位置都可以访问的，访问权限取决于这个变量是在哪里赋值的，也就是在哪个作用域内的。

通常而言，在编程语言中，变量的作用域从代码结构形式来看，有块级、函数、类、模块、包等由小到大的级别。但是在Python中，没有块级作用域，

也就是类似if语句块、for语句块、with上下文管理器等等是不存在作用域概念的，他们等同于普通的语句。

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 1 if True:            # if语句块没有作用域
 2     x = 1
 3 print(x)
 4 # 1
 5 def func():         # 函数有作用域
 6     a = 8
 7 print(a)
 8 # Traceback (most recent call last):
 9 #   File "<pyshell#3>", line 1, in <module>
10 #     a
11 # NameError: name 'a' is not defined
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

从上面的例子中，我们可以发现，在if语句内定义的变量x，可以被外部访问，而在函数func()中定义的变量a，则无法在外部访问。

通常，函数内部的变量无法被函数外部访问，但内部可以访问；类内部的变量无法被外部访问，但类的内部可以。通俗来讲，就是内部代码可以访问外部变量，

而外部代码通常无法访问内部变量。

 

变量的作用域决定了程序的哪一部分可以访问哪个特定的变量名称。Python的作用域一共有4层，分别是：

- L （Local） 局部作用域
- E （Enclosing） 闭包函数外的函数中
- G （Global） 全局作用域
- B （Built-in） 内建作用域

```
1 global_var = 0  # 全局作用域
2 def outer():
3     out_var = 1  # 闭包函数外的函数中
4     def inner():
5         inner_var = 2  # 局部作用域
```

 

前面说的都是变量可以找得到的情况，那如果出现本身作用域没有定义的变量，那该如何寻找呢？

Python以`L –> E –> G –>B`的规则查找变量，即：在局部找不到，便会去局部外的局部找（例如闭包），再找不到就会去全局找，最后去内建中找。

如果这样还找不到，那就提示变量不存在的错误。例如下面的代码，函数func内部并没有定义变量a，可是print函数需要打印a，那怎么办？

向外部寻找！按照`L –> E –> G –>B`的规则，

层层查询，这个例子很快就从外层查找到了a，并且知道它被赋值为1，于是就打印了1。

```
1 a = 1
2 
3 def func():
4     print(a)
```

 

**全局变量和局部变量**

定义在函数内部的变量拥有一个局部作用域，被叫做局部变量，定义在函数外的拥有全局作用域的变量，被称为全局变量。（类、模块等同理）

所谓的局部变量是相对的。局部变量也有可能是更小范围内的变量的外部变量。

局部变量只能在其被声明的函数内部访问，而全局变量可以在整个程序范围内访问。调用函数时，所有在函数内声明的变量名称都将被加入到作用域中。

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 1 a = 1               # 全局变量
 2 
 3 def func():
 4     b = 2           # 局部变量
 5     print(a)        # 可访问全局变量a,无法访问它内部的c
 6 
 7     def inner():
 8         c = 3       # 更局部的变量
 9         print(a)    # 可以访问全局变量a
10         print(b)    # b对于inner函数来说，就是外部变量
11         print(c)
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

**global和nonlocal关键字**

我们先看下面的例子：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 1 total = 0                        # total是一个全局变量
 2 
 3 def plus( arg1, arg2 ):
 4     total = arg1 + arg2          # total在这里是局部变量.
 5     print("函数内局部变量total=  ", total)
 6     print("函数内的total的内存地址是: ", id(total))
 7     return total
 8 
 9 plus(10, 20)
10 print("函数外部全局变量total= ", total)
11 print("函数外的total的内存地址是: ", id(total))
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

很明显，函数plus内部通过`total = arg1 + arg2`语句，新建了一个局部变量total，它和外面的全局变量total是两码事。而如果我们，

想要在函数内部修改外面的全局变量total呢？使用global关键字！

 

**global**：指定当前变量使用外部的全局变量

 

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 1 global：指定当前变量使用外部的全局变量
 2 
 3 total = 0                        # total是一个全局变量
 4 
 5 def plus( arg1, arg2 ):
 6     global total    # 使用global关键字申明此处的total引用外部的total
 7     total = arg1 + arg2
 8     print("函数内局部变量total=  ", total)
 9     print("函数内的total的内存地址是: ", id(total))
10     return total
11 
12 plus(10, 20)
13 print("函数外部全局变量total= ", total)
14 print("函数外的total的内存地址是:
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

打印结果是：

```
1 函数内局部变量total=   30
2 函数内的total的内存地址是:  503494624
3 函数外部全局变量total=  30
4 函数外的total的内存地址是:  503494624
```

 

我们再来看下面的例子：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 1 a = 1
 2 print("函数outer调用之前全局变量a的内存地址： ", id(a))
 3 
 4 def outer():
 5     a = 2
 6     print("函数outer调用之时闭包外部的变量a的内存地址： ", id(a))
 7     def inner():
 8         a = 3
 9         print("函数inner调用之后闭包内部变量a的内存地址： ", id(a))
10     inner()
11     print("函数inner调用之后，闭包外部的变量a的内存地址： ", id(a))
12 outer()
13 print("函数outer执行完毕，全局变量a的内存地址： ", id(a))
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

如果你将前面的知识点都理解通透了，那么这里应该没什么问题，三个a各是各的a，各自有不同的内存地址，是三个不同的变量。

打印结果也很好的证明了这点：

```
1 函数outer调用之前全局变量a的内存地址：  493204544
2 函数outer调用之时闭包外部的变量a的内存地址：  493204576
3 函数inner调用之后闭包内部变量a的内存地址：  493204608
4 函数inner调用之后，闭包外部的变量a的内存地址：  493204576
5 函数outer执行完毕，全局变量a的内存地址：  493204544
```

 

那么，如果，inner内部想使用outer里面的那个a，而不是全局变量的那个a，怎么办？用global关键字？先试试看吧：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 1 a = 1
 2 print("函数outer调用之前全局变量a的内存地址： ", id(a))
 3 def outer():
 4     a = 2
 5     print("函数outer调用之时闭包外部的变量a的内存地址： ", id(a))
 6     def inner():
 7         global a   # 注意这行
 8         a = 3
 9         print("函数inner调用之后闭包内部变量a的内存地址： ", id(a))
10     inner()
11     print("函数inner调用之后，闭包外部的变量a的内存地址： ", id(a))
12 outer()
13 print("函数outer执行完毕，全局变量a的内存地址： ", id(a))
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
运行结果如下，很明显，global使用的是全局变量a。
1 函数outer调用之前全局变量a的内存地址：  494384192
2 函数outer调用之时闭包外部的变量a的内存地址：  494384224
3 函数inner调用之后闭包内部变量a的内存地址：  494384256
4 函数inner调用之后，闭包外部的变量a的内存地址：  494384224
5 函数outer执行完毕，全局变量a的内存地址：  494384256

那怎么办呢？使用nonlocal关键字！它可以修改嵌套作用域（enclosing 作用域，外层非全局作用域）中的变量。将global a改成nonlocal a，代码这里我就不重复贴了，
运行后查看结果，可以看到我们真的引用了outer函数的a变量。
1 函数outer调用之前全局变量a的内存地址：  497726528
2 函数outer调用之时闭包外部的变量a的内存地址：  497726560
3 函数inner调用之后闭包内部变量a的内存地址：  497726592
4 函数inner调用之后，闭包外部的变量a的内存地址：  497726592
5 函数outer执行完毕，全局变量a的内存地址：  497726528
```

 

**面试真题：**

不要上机测试，请说出下面代码的运行结果：

```
1 a = 10
2 def test():
3     a += 1
4     print(a)
5 test()
```

很多同学会说，这太简单了！函数内部没有定义a，那么就去外部找，找到a=10，于是加1，打印11！

我会告诉你，这段代码有语法错误吗？`a += 1`相当于`a = a + 1`，按照赋值运算符的规则是先计算右边的`a+1`。但是，Python的规则是，如果在函数内部要

修改一个变量，那么这个变量需要是内部变量，除非你用global声明了它是外部变量。很明显，我们没有在函数内部定义变量a，所以会弹出局部变量在未

定义之前就引用的错误。

 

**更多的例子：**

再来看一些例子（要注意其中的闭包，也就是函数内部封装了函数）：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 1 name = 'jack'
 2 
 3 def outer():
 4     name='tom'
 5 
 6     def inner():
 7         name ='mary'
 8         print(name)
 9 
10     inner()
11 
12 outer()
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

 

 

 

上面的题目很简单，因为inner函数本身有name变量，所以打印结果是mary。那么下面这个呢？

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 1 name ='jack'
 2 
 3 def f1():
 4     print(name)
 5 
 6 def f2():
 7     name = 'eric'
 8     f1()
 9 
10 f2()
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

这题有点迷惑性，想了半天，应该是‘eric’吧，因为f2函数调用的时候，在内部又调用了f1函数，f1自己没有name变量，那么就往外找，发现f2定义了个name，于是就打印这个name。错了！！！结果是‘jack’！

**Python函数的作用域取决于其函数代码块在整体代码中的位置，而不是调用时机的位置。**调用f1的时候，会去f1函数的定义体查找，对于f1函数，

它的外部是`name ='jack'`，而不是`name = 'eric'`。

 

再看下面的例子，f2函数返回了f1函数：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
 1 name = 'jack'
 2 
 3 def f2():
 4     name = 'eric'
 5     return f1
 6 
 7 def f1():
 8     print(name)
 9 
10 ret = f2()
11 ret()
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

```
仔细回想前面的例子，其实这里有异曲同工之妙，所以结果还是‘jack’。
```