# Python多线程与多线程中join()的用法



[sjp8497697](https://blog.csdn.net/sjp8497697) 2019-06-08 13:10:50 ![img](https://csdnimg.cn/release/blogv2/dist/pc/img/articleReadEyes.png) 281 ![img](https://csdnimg.cn/release/blogv2/dist/pc/img/tobarCollect.png) 收藏 3

分类专栏： [Python](https://blog.csdn.net/sjp8497697/category_9015608.html) 文章标签： [Python](https://www.csdn.net/tags/MtjaQg4sNDk0LWJsb2cO0O0O.html) [多线程](https://www.csdn.net/tags/MtTaEg0sMzM0MjItYmxvZwO0O0OO0O0O.html) [join](https://www.csdn.net/tags/MtTaEg0sMjY3MTktYmxvZwO0O0OO0O0O.html)



### Python多线程与多线程中join的用法


原文： https://www.cnblogs.com/cnkai/p/7504980.html



Python多线程与多进程中join()方法的效果是相同的。

下面仅以多线程为例：

首先需要明确几个概念：

知识点一：
当一个进程启动之后，会默认产生一个主线程，因为线程是程序执行流的最小单元，当设置多线程时，主线程会创建多个子线程，在python中，默认情况下（其实就是setDaemon(False)），主线程执行完自己的任务以后，就退出了，此时子线程会继续执行自己的任务，直到自己的任务结束，例子见下面一。

**注意：没有设置为守护线程，也会阻塞当前线程直到完成**

知识点二：
当我们使用setDaemon(True)方法，设置子线程为守护线程时，主线程一旦执行结束，则全部线程全部被终止执行，可能出现的情况就是，子线程的任务还没有完全执行结束，就被迫停止，例子见下面二。

知识点三：
此时join的作用就凸显出来了，join所完成的工作就是线程同步，即主线程任务结束之后，进入阻塞状态，一直等待其他的子线程执行结束之后，主线程在终止，例子见下面三。

知识点四：
join有一个timeout参数：

当设置守护线程时，含义是主线程对于子线程等待timeout的时间将会杀死该子线程，最后退出程序。所以说，如果有10个子线程，全部的等待时间就是每个timeout的累加和。简单的来说，就是给每个子线程一个timeout的时间，让他去执行，时间一到，不管任务有没有完成，直接杀死。
没有设置守护线程时，主线程将会等待timeout的累加和这样的一段时间，时间一到，主线程结束，但是并没有杀死子线程，子线程依然可以继续执行，直到子线程全部结束，程序退出。

一：Python多线程的默认情况

```python3
import threading
import time

def run():
    time.sleep(2)
    print('当前线程的名字是： ', threading.current_thread().name)
    time.sleep(2)


if __name__ == '__main__':

    start_time = time.time()

    print('这是主线程：', threading.current_thread().name)
    thread_list = []
    for i in range(5):
        t = threading.Thread(target=run)
        thread_list.append(t)

    for t in thread_list:
        t.start()

    print('主线程结束！' , threading.current_thread().name)
    print('一共用时：', time.time()-start_time)
123456789101112131415161718192021222324
```

执行结果：
这是主线程： MainThread
主线程结束！ MainThread
一共用时： 0.001049041748046875
当前线程的名字是： Thread-1
当前线程的名字是： Thread-2
当前线程的名字是： Thread-5
当前线程的名字是： Thread-3
当前线程的名字是： Thread-4

二：设置守护线程

```python3
import threading
import time

def run():
    time.sleep(2)
    print('当前线程的名字是： ', threading.current_thread().name)
    time.sleep(2)


if __name__ == '__main__':

    start_time = time.time()

    print('这是主线程：', threading.current_thread().name)
    thread_list = []
    for i in range(5):
        t = threading.Thread(target=run)
        thread_list.append(t)

    for t in thread_list:
        t.setDaemon(True)
        t.start()

    print('主线程结束！' , threading.current_thread().name)
    print('一共用时：', time.time()-start_time)
12345678910111213141516171819202122232425
```

执行结果：
这是主线程： MainThread
主线程结束！ MainThread
一共用时： 0.0010080337524414062

三：join的作用

```python3
import threading
import time

def run():
    time.sleep(2)
    print('当前线程的名字是： ', threading.current_thread().name)
    time.sleep(2)


if __name__ == '__main__':

    start_time = time.time()

    print('这是主线程：', threading.current_thread().name)
    thread_list = []
    for i in range(5):
        t = threading.Thread(target=run)
        thread_list.append(t)

    for t in thread_list:
        t.setDaemon(True)
        t.start()

    for t in thread_list:
        t.join()

    print('主线程结束！' , threading.current_thread().name)
    print('一共用时：', time.time()-start_time)
12345678910111213141516171819202122232425262728
```

执行结果：
这是主线程： MainThread
当前线程的名字是： Thread-1
当前线程的名字是： Thread-3
当前线程的名字是： Thread-2
当前线程的名字是： Thread-4
当前线程的名字是： Thread-5
主线程结束！ MainThread
一共用时： 4.01141881942749